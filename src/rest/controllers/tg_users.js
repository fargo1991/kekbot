module.exports = function(app,db){

  app.get('/api/v1/tg_users', (req, res) => {

    db.query(`SELECT * FROM tg_users`)
      .then(
        result => {
          res.status(200);
          res.send(result.rows);
        },
        err => {
          res.status(500);
          res.send(err);
        }
      )

  });

};