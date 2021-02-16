var app = require("express")();
var cors = require("cors");
var bodyParser = require("body-parser");

var CONFIG = require("../../config");

var suggestions = require("./controllers/suggestions.js");
var image = require("./controllers/image.js");
var login = require("./controllers/login.js");
var auth = require("./authorizeMiddleware.js");
var note = require("./controllers/note.js");
var settings = require("./controllers/settings.js");
var letsencrypt = require("./controllers/letsencrypt.js");
var version = require("./controllers/version.js");
var post = require("./controllers/post.js");
var tg_users = require("./controllers/tg_users.js");
var chat = require("./controllers/chat.js");
var tg_image =  require("./controllers/tg_image.js");

module.exports = function(db, bot, query){

  app.use(cors());
  app.use(bodyParser.json());
  app.use(auth);

  suggestions(app, db, bot, query);
  image(app, db);
  login(app, db);
  note(app, db);
  settings(app, db, bot);
  letsencrypt(app);
  version(app, db);
  post(app, db, bot);
  tg_users(app, db);
  chat(app, db);
  tg_image(app, db, bot);

  app.listen(CONFIG.REST_API_PORT, () => {
    console.log(`REST-server listening at port:${CONFIG.REST_API_PORT}`);
  })

};