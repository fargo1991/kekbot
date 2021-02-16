module.exports = function(pg){
  var self = this;
  self.pg = pg;

  return {
    checkUserExistByTgId : (tg_id) => new Promise(
      (resolve, reject) => {
        self.pg.query(`SELECT * FROM tg_users WHERE tg_id =${tg_id}`)
          .then(
            result => {
              if(result.rows.length) resolve(result.rows[0]);
              else resolve(false);
            },
            err => {
              reject();
            }
          )
      }
    ),

    createUser : (user) => new Promise(
      (resolve, reject) => {

        self.pg.query(
          `INSERT INTO tg_users( tg_id, tg_username, tg_nickname)
            values(
              ${user.tg_id},
              ${user.tg_username ? "'" + user.tg_username + "'" : null },
              ${user.tg_nickname ? "'" + user.tg_nickname + "'" : null } )
          RETURNING *`
        )
        .then(
          result => resolve(result.rows[0]) ,
          err => reject(err)
        )

      }
    ),

    createSuggestion : (user, mainPhoto, text) => new Promise(
      (resolve, reject) =>
        self.pg.query(`
          INSERT INTO suggestions (user_id, image_id, text)
          VALUES(${user.id}, ${mainPhoto.id}, '${text}')
          RETURNING *`)
          .then(
            result => resolve(result),
            err => reject(err)
          )
    ),

    postSuggestion : (suggestionId) => new Promise(
        (resolve, reject) =>
            self.pg.query(`
            UPDATE suggestions SET 
            is_publicated = ${true},
            publicated =  Now(),
            updated = Now()
            WHERE id=${suggestionId}
            `)
    ),
    addPhoto : (photo) => new Promise( (resolve, reject) => {

      self.pg.query(`
        INSERT INTO images(width, height, path)
        values( ${photo.width}, ${photo.height}, '${photo.path}')
        RETURNING *
        `)
        .then(
          result => resolve(result.rows[0].id),
          err => reject(err)
        )

    }),

    setSmallImages : (photo_id, images_ids) =>
      self.pg.query(`
        UPDATE images
        SET small_image_ids=ARRAY[${images_ids.map(id => id).join(',')}]
        WHERE id=${photo_id}`),


    createNote : (user_id, note) =>
        self.pg.query(`
        INSERT INTO notes(user_id, title, content)
        values(${user_id}, '${note.title}', '${note.content}')
        `)
  }
}
