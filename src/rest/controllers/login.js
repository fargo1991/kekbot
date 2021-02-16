var CONFIG = require("../../../config");

module.exports = function(app, db){

    app.post("/api/v1/login", (req, res) => {

        let user = CONFIG.ADMIN_USERS.find(user => {
            return `${req.body.username}${req.body.password}` === `${user.login}${user.password}`
        });

        if(user){
            res.status(200);
            res.send({ token : user.token });
        } else {
            res.status(401);
            res.send({ msg : "User unauthorized" });
        }


    });

}