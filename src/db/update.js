const version = require("../../config/version.js");


const updateToVersion = {
  '0.1.1' : require("./updates/v0.1.1")
}

module.exports = function(db){

  updateToVersion[version](db);

};