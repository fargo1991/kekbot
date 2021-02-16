var axios = require("axios");
const token = require("../token.json");
var fs = require("fs");
var CONFIG = require("../config");
//
let downloadTgFile = async (file_path) => {
  return axios.create({
    baseURL : `https://api.telegram.org/file/bot${token}/${file_path}`,
    responseType : "stream"
  })
    .get()
  };

let getFilePath = async (file_id) => {
   return axios.create({
     baseURL : `https://api.telegram.org/bot${token}/getFile?file_id=${file_id}`
    })
     .get()
   };

module.exports = {
  push : (photos, query) => {

    return new Promise( (resolve, reject) => {
      try {
      let download = (photo) => new Promise( (resolve, reject) => {
        let tgFile;

        getFilePath(photo.file_id)
          .then(
            result => {
              tgFile = {
                        ...result.data.result,
                        extension : result.data.result.file_path.split('.').pop()
                       }
              return downloadTgFile(result.data.result.file_path)
            }
          )
          .then(
            response => {

              let path = `storage/${tgFile.file_unique_id}.${tgFile.extension}`;

              response.data.pipe(
                fs.createWriteStream(`${CONFIG.IMAGE_STORAGE_FULL_PATH}/${path}`))
                         .on('finish', () => {
                           console.log(`new photo ${photo.file_id} ${photo.width}x${photo.height} was successfully uploaded! `);
                           resolve({ ...photo, path : path });
                         })
                         .on('error', err => {
                           console.log(err);
                           reject(err);
                         });
            });
      });

      let photosPromises = photos.map( photo => download(photo) ),
          mainPhoto;

      Promise.all(photosPromises)
        .then(
          photos => {
            mainPhoto = photos.pop();

            query.addPhoto({
              width : mainPhoto.width,
              height : mainPhoto.height,
              path : mainPhoto.path
            })
            .then(result => {
              mainPhoto.id = result;

              let addPhotoPromises = photos.map( photo =>
                query.addPhoto({
                  width : photo.width,
                  height : photo.height,
                  path : photo.path
                })
              );

              return Promise.all(addPhotoPromises)
             })
             .then(
               savedToDbPhotos => {
                 query.setSmallImages(mainPhoto.id, savedToDbPhotos);
                 resolve(mainPhoto);
               }
             )

          }
        )
      } catch(e){
        reject(e)
      }

    })

  },
  saveToDb : (photos, user, text) => new Promise( (resolve, reject) => {

    query.createSuggestion(photos, user, text)
      .then(
        result => {
          console.log(result)
        }
      )
  })
}
