var ChatService = require('../ChatService.js');

module.exports = function(bot, db){

  const chatService = new ChatService(bot, db);

  return (chat_id, msg, tg_user_id) => {

    if(!tg_user_id && tg_user_id !== 0)
      throw new Error('bot.sendMessage() tg_user_id is required!');

    bot.sendMessage(chat_id, msg)
      .then(
        result => {
          if(tg_user_id !== 0)
            chatService.pushMessage({ chat: { id : chat_id }, text : msg}, tg_user_id, false);
        },
        error => {
          console.error(error);
        }
      );


  };

};
