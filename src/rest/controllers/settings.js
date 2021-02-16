var CONFIG = require("../../../config");

module.exports = function(app, db, bot){

    app.get("/api/v1/settings", (req, res) => {

        bot.getMe()
            .then(
                result => {
                    res.status(200);
                    res.send({
                        channel : CONFIG.CHANNEL,
                        bot : result
                    })
                }
            );

    })

};