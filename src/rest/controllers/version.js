var VERSION = require("../../../config").VERSION;

module.exports = function(app, db){

    app.get("/appversion", (req, res) => {

        res.status(200);
        res.send(VERSION);

    })

}