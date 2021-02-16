var PublicService = require('../../PublicService.js');

module.exports = function(app, db, bot){

    const publicService = PublicService(bot, db);

    app.get("/api/v1/post/:id", (req, res) => {

        function map(data){
            return {
                author : {
                    nickname: data.author_nickname,
                    username: data.author_username
                },
                caption: data.caption,
                id : data.id,
                image_id : data.image_id,
                isPublicated: data.is_publicated,
                suggestion_id : data.suggestion_id
            }
        }

        const post_id = req.params.id;

        db.query(`
            SELECT p.* ,
                   tg_u.tg_username AS author_username,
                   tg_u.tg_nickname AS author_nickname
            FROM posts AS p
            LEFT JOIN suggestions AS s ON p.suggestion_id = s.id
            LEFT JOIN tg_users AS tg_u ON tg_u.id = s.user_id
            WHERE p.id=${post_id}
        `)
            .then(
                result => {
                    res.status(200);
                    res.send(map(result.rows[0]));
                }
            )
            .catch(
                err => {
                    console.log(err)
                    res.status(500);
                    res.send(err);
                }
            );

    });

    app.post("/api/v1/post", (req, res) => {

        const parse = req => {
            return {
                suggestion_id : req.body.suggestionId,
                image_id : req.body.image_id,
                caption : req.body.caption,
                user_id : req.user.id
            }
        };

        const { suggestion_id, image_id, caption, user_id } = parse(req);

        db.query(`
            DO $$
            DECLARE pid integer;
            BEGIN
              INSERT INTO posts(suggestion_id, image_id, caption, created_user_id, created)
              VALUES(${suggestion_id}, ${image_id}, '${caption}', '${user_id}', Now())
              RETURNING id INTO pid;
              UPDATE suggestions 
                SET post_id = pid,
                    is_publicated = true,
                    publicated = Now()
                WHERE id = ${suggestion_id};
            END $$;
            COMMIT;`
        )
            .then(
                result => {
                    return  db.query(`
                        SELECT post_id FROM suggestions WHERE id=${suggestion_id} 
                    `);
                }
            )
            .then(
                result => {
                    console.log(result);
                    res.status(200);
                    res.send({ id : result.rows[0].post_id});
                }
            )
            .catch(err => {
                res.status(500);
                console.warn(err);
                res.send(err);

            })
    });

    app.put('/api/v1/post/:id', (req, res) => {

        db.query(`
        UPDATE posts SET
        caption = '${req.body.caption}'
        WHERE id=${req.params.id};
        `)
            .then(
                result => {
                    res.status(200);
                    res.send('ok')
                },
                error => {
                    res.status(500);
                    res.send(error);
                }
            );
    });

    app.get('/api/v1/posts', (req, res) => {

        let pageSize = req.query.pageSize || 3,
            pageNumber = req.query.pageNumber || 0;

        const FILTERS_KEYS = ['NEW', 'ALL', 'DEFERRED', 'SCHEDULED', 'POSTED', 'DELETED'];

        const queryStrings = {
                NEW : `SELECT p.*,
                         u.tg_username AS author_username,
                         u.tg_nickname AS author_nickname
                         FROM posts AS p
                         LEFT JOIN suggestions AS s ON s.post_id = p.id
                         LEFT JOIN tg_users AS u ON s.user_id = u.id
                         WHERE p.is_deleted = false
                         AND p.is_deferred = false
                         AND p.is_publicated = false
                         AND p.is_scheduled = false
                         ORDER BY created DESC
                         LIMIT ${pageSize}
                         OFFSET ${pageNumber * pageSize}`,

                ALL : `SELECT p.*,
                         u.tg_username AS author_username,
                         u.tg_nickname AS author_nickname
                         FROM posts AS p
                         LEFT JOIN suggestions AS s ON s.post_id = p.id
                         LEFT JOIN tg_users AS u ON s.user_id = u.id
                         ORDER BY created DESC
                         LIMIT ${pageSize}
                         OFFSET ${pageNumber * pageSize}`,

                DEFERRED :`SELECT p.*,
                         u.tg_username AS author_username,
                         u.tg_nickname AS author_nickname
                         FROM posts AS p
                         LEFT JOIN suggestions AS s ON s.post_id = p.id
                         LEFT JOIN tg_users AS u ON s.user_id = u.id
                         WHERE p.is_deleted = false
                         AND p.is_deferred = true
                         ORDER BY created DESC
                         LIMIT ${pageSize}
                         OFFSET ${pageNumber * pageSize}`,

                SCHEDULED :`SELECT p.*,
                            u.tg_username AS author_username,
                            u.tg_nickname AS author_nickname
                            FROM posts AS p
                            LEFT JOIN suggestions AS s ON s.post_id = p.id
                            LEFT JOIN tg_users AS u ON s.user_id = u.id
                            WHERE p.is_deleted = false
                            AND p.is_scheduled = true
                            ORDER BY created DESC
                            LIMIT ${pageSize}
                            OFFSET ${pageNumber * pageSize}`,

                POSTED : `SELECT p.*,
                         u.tg_username AS author_username,
                         u.tg_nickname AS author_nickname
                         FROM posts AS p
                         LEFT JOIN suggestions AS s ON s.post_id = p.id
                         LEFT JOIN tg_users AS u ON s.user_id = u.id
                         WHERE p.is_deleted = false
                         AND p.is_publicated = true
                         ORDER BY created DESC
                         LIMIT ${pageSize}
                         OFFSET ${pageNumber * pageSize}`,

                DELETED : `SELECT p.*,
                         u.tg_username AS author_username,
                         u.tg_nickname AS author_nickname
                         FROM posts AS p
                         LEFT JOIN suggestions AS s ON s.post_id = p.id
                         LEFT JOIN tg_users AS u ON s.user_id = u.id
                         WHERE p.is_deleted = true
                         ORDER BY created DESC
                         LIMIT ${pageSize}
                         OFFSET ${pageNumber * pageSize}`
            },
            filter = FILTERS_KEYS
                .find(key => {
                    return req.query[key] ? JSON.parse(req.query[key]) : false
                });

        const map = rows => {
            return rows.map(row => {
                return {
                    ...row,
                    author_username : undefined,
                    author_nickname : undefined,
                    author : {
                        username : row.author_username,
                        nickname : row.author_nickname
                    }
                }
            })
        };

        db.query(queryStrings[filter])
            .then(
                result => {
                    res.status(200);
                    res.send( map(result.rows) );
                },
                error => {
                    console.log(error);
                    res.status(500);
                    res.send(error);
                }
            );

    });

    app.get('/api/v1/posts/stat/general/cates_count', (req, res) => {
        db.query(`BEGIN;
              SELECT count(id) FROM posts WHERE is_publicated = true;
              SELECT count(id) FROM posts WHERE is_deferred = true;
              SELECT count(id) FROM posts WHERE is_deleted = true;
              SELECT count(id) FROM posts 
              WHERE is_deleted = false
                  AND is_deferred = false
                  AND is_publicated = false;
              SELECT count(id) FROM posts WHERE is_deleted = false;
              SELECT count(id) FROM posts WHERE is_scheduled = true AND is_publicated = false;
              COMMIT;`)
            .then(
                result => {
                    let respData = {
                        posted: result[1].rows[0].count,
                        deferred: result[2].rows[0].count,
                        deleted: result[3].rows[0].count,
                        new: result[4].rows[0].count,
                        all : result[5].rows[0].count,
                        scheduled : result[6].rows[0].count,
                    };

                    res.status(200);
                    res.send(respData);
                },
                err => {
                    res.status(500);
                    res.send(err);
                    console.log(err);
                });
    });

    app.post('/api/v1/post/public/', (req, res) => {

        const postId = req.body.id;

       publicService.publicPost(postId)
           .then(
               result => db.query(`UPDATE posts SET is_publicated = true, publicated = Now() WHERE id =${postId}`)
           )
           .then(
               result => {
                   res.status(200);
                   res.send('ok');
               }
           )
           .catch(
               error => {
                   console.warn(error);
                   res.status(500);
                   res.send(error);
               }
           )
    });

    app.delete('/api/v1/post/:id', (req, res) => {

        const postId = req.params.id;

        db.query(`UPDATE posts SET is_deleted = true, deleted = Now() WHERE id=${postId}`)
            .then(
                result => {
                    res.status(200);
                    res.send('ok');
                },
                error => {
                    console.warn(error);
                    res.status(500);
                    res.send(error);
                }
            )

    })
};
