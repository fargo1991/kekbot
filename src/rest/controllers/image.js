var mime = require("mime");
var CONFIG = require("../../../config");

module.exports = function(app, db){

  app.get('/api/v1/image/:token/:id', (req, res) => {

    let imageId = req.params.id,
        { token } = req.params;

    db.query(`SELECT path FROM images WHERE id=${imageId}`)
      .then(
        result=>{
          let { path } = result.rows[0];

          res.status(200);
          // res.set('Content-Type', mime.getType(`${CONFIG.IMAGE_STORAGE_FULL_PATH}/${path}`));
          res.type(mime.getType(`${CONFIG.IMAGE_STORAGE_FULL_PATH}/${path}`));
          res.sendFile(`${CONFIG.IMAGE_STORAGE_FULL_PATH}/${path}`);

        }
      )

  });

    app.get('/api/v1/image_for_tg/:token/:id', (req, res) => {

        let imageName = req.params.id,
            { token } = req.params;

        let  imageId = imageName.split('_')[1].split('.')[0];

        db.query(`SELECT path FROM images WHERE id=${imageId}`)
            .then(
                result=>{
                    let { path } = result.rows[0];

                    res.status(200);
                    // res.set('Content-Type', mime.getType(`${CONFIG.IMAGE_STORAGE_FULL_PATH}/${path}`));
                    res.type(mime.getType(`${CONFIG.IMAGE_STORAGE_FULL_PATH}/${path}`));
                    res.sendFile(`${CONFIG.IMAGE_STORAGE_FULL_PATH}/${path}`);

                }
            )


    })

}
