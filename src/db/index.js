const CONFIG = require("../../config");
const { Client } = require("pg");
const createTables = require("./tables.js");
const update = require('./update.js');

const pg = new Client(CONFIG.DB);

function dropTables(){
  return pg.query(`
      DROP TABLE IF EXISTS images, tg_users, suggestions, notes, posts, tg_chat_messages;
    `);
}

module.exports = function(){

  return new Promise( (resolve, reject) => {

    pg.connect()
    .then(
      result => {

        if(CONFIG.DB_START_MODE === 'RESET')
          dropTables()
            .then( result => createTables(pg) )
            .then( result => {
              console.log('DB is connected')
              resolve(pg)
            });
        else if(CONFIG.DB_START_MODE === 'UPDATE'){
          update(pg);
          console.log('DB was successfully updated');
          resolve(pg);
        }
        else { console.log('DB is connected'); resolve(pg); }

      },
      err => {
        console.log('Error was occured during DB-connection' )
        reject(err);
      }
    )

  });


}
