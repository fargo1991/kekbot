module.exports = function(app){

    //admin.rustradamus.ru
    app.get("/.well-known/acme-challenge/w_tXX5eK2fA0_rq2WivqPZhik0xo6Om6yKu9O5p9qaE", (req, res) => {

        res.status(200);
        res.sendFile("/usr/local/bin/rustradamusbot/letsencrypt/w_tXX5eK2fA0_rq2WivqPZhik0xo6Om6yKu9O5p9qaE");

    });

    //api.rustradamus.ru
    app.get("/.well-known/acme-challenge/NUaB0Y1PuzMMNSL4e1nOFhBB0VtjTVo0R3IVCSVw2Tw", (req, res) => {

        res.status(200);
        res.sendFile("/usr/local/bin/rustradamusbot/letsencrypt/NUaB0Y1PuzMMNSL4e1nOFhBB0VtjTVo0R3IVCSVw2Tw")

    });

    //rustradamus.ru
    app.get("/.well-known/acme-challenge/eK4nMmP9B17nq2ymwW9YNiEPbrsf1hHRW_VJ-_qd0oQ", (req, res) => {

        res.status(200);
        res.sendFile("/usr/local/bin/rustradamusbot/letsencrypt/eK4nMmP9B17nq2ymwW9YNiEPbrsf1hHRW_VJ-_qd0oQ")

    })
}