var moment = require("moment");

module.exports = function (bot, db) {

  var self = this;

  return {
    pushMessage : (msg, tg_user_id, fromUser = true) => {

      if(fromUser){
        if(!msg.photo)
          return db.query(`INSERT INTO tg_chat_messages (tg_id, tg_user_id, text, date, is_from_user) VALUES(${msg.chat.id}, ${tg_user_id}, '${msg.text}', ${msg.date}, true)`);
        else
          return db.query(`INSERT INTO tg_chat_messages 
                          (tg_id, tg_user_id, photo, text, date, is_from_user) 
                          VALUES(${msg.chat.id}, ${tg_user_id}, '${JSON.stringify(msg.photo)}', 
                          '${msg.caption ? msg.caption : ''}', 
                          ${msg.date}, 
                          true)`)
      } else {
        return db.query(`INSERT INTO tg_chat_messages (tg_id, tg_user_id, text, date, is_from_user) VALUES(${msg.chat.id}, ${tg_user_id}, '${msg.text}', ${moment().unix()}, false)`)
      }


    }
  }

};