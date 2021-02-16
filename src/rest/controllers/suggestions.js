var PublicService = require("../../PublicService.js");

module.exports = function(app, db, bot, dbQuery){

  let publicService = PublicService(bot, db);

  app.get("/api/v1/suggestions/stat/general/cates_count", (req, res) => {
    db.query(`BEGIN;
              SELECT count(id) FROM suggestions WHERE is_publicated = true;
              SELECT count(id) FROM suggestions WHERE is_deferred = true;
              SELECT count(id) FROM suggestions WHERE is_deleted = true;
              SELECT count(id) FROM suggestions 
              WHERE is_deleted = false
                  AND is_deferred = false
                  AND is_publicated = false;
              SELECT count(id) FROM suggestions WHERE is_deleted = false;
              COMMIT;`)
        .then(
            result => {
            let respData = {
                new: result[4].rows[0].count,
                posted: result[1].rows[0].count,
                deferred: result[2].rows[0].count,
                deleted: result[3].rows[0].count,
                all : result[5].rows[0].count
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


  app.get("/api/v1/suggestions", (req, res) => {

    let pageSize = req.query.pageSize || 3,
        pageNumber = req.query.pageNumber || 0;

    const FILTERS_KEYS = ['NEW', 'ALL', 'DEFERRED', 'POSTED', 'DELETED'];

    let queryStrings = {
            NEW : `SELECT s.*,
                     u.tg_username AS username,
                     u.tg_nickname AS nickname
                     FROM suggestions AS s
              LEFT JOIN tg_users AS u ON s.user_id = u.id
              WHERE s.is_deleted = false
              AND s.is_deferred = false
              AND s.is_publicated = false
              ORDER BY created DESC
              LIMIT ${pageSize}
              OFFSET ${pageNumber * pageSize}`,

            ALL : `SELECT s.*,
                     u.tg_username AS username,
                     u.tg_nickname AS nickname
                     FROM suggestions AS s
              LEFT JOIN tg_users AS u ON s.user_id = u.id
              WHERE s.is_deleted = false
              ORDER BY created DESC
              LIMIT ${pageSize}
              OFFSET ${pageNumber * pageSize}
              `,

            DEFERRED : `SELECT s.*,
                     u.tg_username AS username,
                     u.tg_nickname AS nickname
                     FROM suggestions AS s
              LEFT JOIN tg_users AS u ON s.user_id = u.id
              WHERE s.is_deferred = true 
              AND s.is_deleted = false
              ORDER BY created DESC
              LIMIT ${pageSize}
              OFFSET ${pageNumber * pageSize}`,

            POSTED : `SELECT s.*,
                     u.tg_username AS username,
                     u.tg_nickname AS nickname
                     FROM suggestions AS s
              LEFT JOIN tg_users AS u ON s.user_id = u.id
              WHERE s.is_publicated = true
              AND s.is_deleted = false
              ORDER BY publicated DESC
              LIMIT ${pageSize}
              OFFSET ${pageNumber * pageSize}`,

            DELETED : `SELECT s.*,
                     u.tg_username AS username,
                     u.tg_nickname AS nickname
                     FROM suggestions AS s
              LEFT JOIN tg_users AS u ON s.user_id = u.id
              WHERE s.is_deleted = true
              ORDER BY deleted DESC
              LIMIT ${pageSize}
              OFFSET ${pageNumber * pageSize}`
        },
        filter = FILTERS_KEYS
            .find(key => {
                return req.query[key] ? JSON.parse(req.query[key]) : false
            });

        db.query(queryStrings[filter])
          .then(
            result => {
              res.status(200);
              res.send( JSON.stringify(result.rows) );
            },
            error => {
              console.log(error);
              res.status(500);
              res.send(JSON.stringify(error));
            }
          );
  });

  app.post("/api/v1/suggestion/post", (req, res) => {
    let suggestionId = req.body.id;

    publicService.postSuggestion(suggestionId)
        .then(
            result => {
                dbQuery.postSuggestion(suggestionId);

                res.status(200);
                res.send({ success : true })
            },
            error => {
                console.log(error)
                res.status(500);
                res.send({ success : false, msg : error })
            }
        );
  });

  app.get('/api/v1/suggestion/:id', (req, res) => {

      const { id } = req.params;

      db.query(`SELECT s.*,
                     u.tg_username AS username,
                     u.tg_nickname AS nickname
                     FROM suggestions AS s
              LEFT JOIN tg_users AS u ON s.user_id = u.id
              WHERE s.id = ${id}`)
          .then(
              result => {
                  res.status(200);
                  res.send(result.rows[0]);
              },
              error => {
                  res.status(500);
                  res.send(error);
                  console.warn(error);
              }
          );

  });

  app.delete('/api/v1/suggestion/:id', (req, res) => {

      const suggestionId = req.params.id;

      db.query(`UPDATE suggestions SET is_deleted = true, deleted = Now() WHERE id=${suggestionId}`)
          .then(
              result => {
                  res.status(200);
                  res.send('ok');
              },
              error => {
                  res.status(500);
                  res.send(error);
              }
          );

  });

};
