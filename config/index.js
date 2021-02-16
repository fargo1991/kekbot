var DEV = require("./develop.js");
var PROD = require("./production.js");

module.exports = ( mode => {

    switch (mode) {
        case 'DEV':
            return DEV;
        case 'PROD':
            return PROD;
    }

})(process.env.MODE);
