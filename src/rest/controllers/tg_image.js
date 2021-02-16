var axios = require('axios'),
    token = require("../../../token.json");
const { Readable, Writable } = require('stream');

module.exports = function(app, db, bot){

  app.get('/:token/api/v1/tg_image/:tg_image_id',  (req, res) => {

    const { tg_image_id } = req.params,
          request = axios.create({
            responseType : 'stream'
          });

    let fileType;

    bot.getFile(tg_image_id)
      .then(
        result => {
          let splited =  result.file_path.split('.');
          fileType = splited[splited.length-1];

          return request.get(`https://api.telegram.org/file/bot${token}/${result.file_path}`)
        }
      )
      .then(
        response => {
          const writable  = new Writable();
          let img;

          writable._write = function (chunk, encoding, done) { // step 3
            res.write(chunk)
            done();
          };

          response.data.pipe(writable);

          writable.on('finish', (chunk) => { res.send() });
        }
      )
      .catch(
        err => {
          console.error(err);
          res.status(500);
          res.send(err);
        }
      )

  });

};