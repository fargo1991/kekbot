var CONFIG = require("../../config");
var { PUBLIC_URLS }  = require("../../config/url.js");

module.exports = function(req, res, next){
    let token;

    if(PUBLIC_URLS.find(url => req.url == url)) {
        next();
        return;
    }

    if(req.url.indexOf("/api/v1/image") > -1){
        token = req.url.split('/')[4];
    } else if(req.url.indexOf("/api/v1/tg_image") > -1){
        token = req.url.split('/')[1];
    }
    else {
        token = req.headers.authorization;
    }

    let user = CONFIG.ADMIN_USERS.find(user => user.token === token);

    req.user = user;

    if(user){
        next();
    } else {
        res.status(401);
        res.send({ msg : 'User is unauthorized'});
    }

}