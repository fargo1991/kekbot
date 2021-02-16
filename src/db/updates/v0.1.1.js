const tg_chat_messages = require("../tables/tg_chat_messages");

module.exports=function(db){

  db.query(`
      ${tg_chat_messages}
  `)

};