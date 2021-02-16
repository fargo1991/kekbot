var messages = require("./messages.js");
var PhotoService = require("./PhotoService.js");
var ChatService = require("./ChatService.js");
var sendMessageWithLoggingChat = require("./utils/sendMessageWithLoggingChat.js");

module.exports = function(bot, query, pg){

  let chat = ChatService(bot, pg);
  const sendMessage = sendMessageWithLoggingChat(bot, pg);

  bot.onText(/\/start/, (msg, match) => {
    // users.add(msg.from.msg.chat.id);

    let chat_id = msg.chat.id,
        tg_user;

    try {
    query.checkUserExistByTgId(msg.from.id)
      .then(
        result => {
          if(!result){
            return query.createUser(
              {
                tg_id : msg.from.id,
                tg_username : msg.from.first_name,
                tg_nickname : msg.from.username
              }
            )
          } else {
            tg_user = result;
            sendMessage(chat_id, messages.USER_CAME_BACK_WELCOME({ username : result.tg_nickname || result.tg_username }), tg_user.id)
            // юзер уже есть в базе
          }
        }
      )
      .then(
        result => {
          sendMessage(chat_id, messages.NEW_USER_WELCOME({ username : result.tg_nickname || result.tg_username }), result.id )
        }
      )
      .catch(err => console.log(err))
    } catch(err){
      console.log(err)
    }
  });

  bot.on('message', (msg) => {
    let chat_id = msg.chat.id,
        user_tg_id = msg.from.id,
        tg_user;

    //TODO жуткий костыль, надо будет  выпилить
    if(msg.text === '/start')
      return;

    query.checkUserExistByTgId(user_tg_id)
      .then(
        result => {

          if(!result) {
            sendMessage(chat_id, messages.ERROR_USER_NOT_EXIST(), 0);
            return;
          }
          tg_user = result;

          chat.pushMessage(msg, tg_user.id)
            .catch(
              err => console.error(err)
            );

          if(msg.photo){
            PhotoService.push(msg.photo, query)
              .then(
                mainPhoto => {
                  return query.createSuggestion(tg_user, mainPhoto, msg.caption ? msg.caption : '')
                }
              )
              .then(
                result => {
                  sendMessage(chat_id, messages.SUGGESTION_RECEIVED_SUCCESSFULLY(), tg_user.id);
                }
              );
          }
      })
      .catch(err => console.error(err));


  })

};
