var images = require("./tables/images");
var tg_users = require("./tables/tg_users");
var suggestions = require("./tables/suggestions");
var notes = require("./tables/notes");
var posts = require("./tables/posts");
var tg_chat_messages = require("./tables/tg_chat_messages");

module.exports = function(db){

    const tableFabric = (query) => {
        return db.query(query)
    };
    let promises = [];

    promises.push(tableFabric(images));
    promises.push(tableFabric(tg_users));
    promises.push(tableFabric(suggestions));
    promises.push(tableFabric(notes));
    promises.push(tableFabric(posts));
    promises.push(tableFabric(tg_chat_messages));

    return Promise.all(promises)
};
