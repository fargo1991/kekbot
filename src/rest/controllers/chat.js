module.exports = function(app, db){

  app.get(`/api/v1/chat/messages/:tg_user_id`, (req, res) => {

    const { tg_user_id } = req.params;

    db.query(`SELECT * FROM tg_chat_messages WHERE tg_user_id=${tg_user_id}`)
      .then(
        result => {
          res.status(200);
          res.send(result.rows);
        },
        error => {
          console.error(error)
          res.status(500);
          res.send(error);
        }
      );

  });

};