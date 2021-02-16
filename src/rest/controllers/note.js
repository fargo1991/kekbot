var Query = require("../../db/queries.js");

module.exports = function(app, db){

    const query = Query(db);

    app.post("/api/v1/note", (req, res) => {

        query.createNote(req.user.id, {
            title : req.body.title,
            content : req.body.content
        })
            .then(
                result => {
                    res.status(200);
                    res.send({ success : true, note : result.rows[0] })
                },
                error => {
                    console.log(error);
                    res.status(500);
                    res.send({ success : false, msg :  error });
                }
            );

    });

    app.get("/api/v1/notes", (req, res) =>  {

        db.query(`
            SELECT * FROM notes
        `)
            .then(
                result => {
                    res.status(200);
                    res.send(result.rows)
                },
                error => {
                    console.log(error);
                    res.status(500);
                    res.send({success : false, msg : error});
                }
            )

    })

}