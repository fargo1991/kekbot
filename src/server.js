var token = require("../token.json");
var Users = require("./users.js");
var TelegramBotApi = require("node-telegram-bot-api");

const CONFIG = require("../config");

const bot = new TelegramBotApi(token, { polling : true });
var db = require("./db");
var Query = require("./db/queries.js");
var controllers = require("./controllers.js");
var rest = require("./rest/rest.js");

var setBotSendMessageMiddleware =  require("./utils/sendMessageWithLoggingChat.js");

let pg, query;

// bot.sendMessage = (chat_id, msg) => {
//   bot.sendMessage(chat_id, msg);
// };

db().then(
  result => {
    pg = result;
    query = Query(pg);
    setBotSendMessageMiddleware(bot, pg);
    controllers(bot, query, pg);
    rest(pg, bot, query);
  }
)
    .catch(err => console.log(err));

var testScript = require("../test.js");
