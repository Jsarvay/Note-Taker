var db = require("../db/db.json");
var fs = require("fs");
var { v4: uuidv4 } = require("uuid");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        fs.readFile("./db/db.json", "utf8", (err,data) => {
            if (err) throw (err);
            res.JSON(JSON.parse(data));
        });
    });

    app.post("/api/notes", function(req, res) {
        let id = uuidv4();
        let note = {
            id: id,
            title: req.body.title,
            text: req.body.text
        };

        console.log(note);

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw (err);

            const noteDb = JSON.parse(data);

            noteDb.push(note);

            fs.writeFile("./db/db.json", JSON.stringify(noteDb, null, 2), err => {
                if (err) throw (err);
                res.send(db);
                console.log("New note!");
            });
        });
    });

    app.delete("/api/notes", function(req, res) {
        let setId = req.params.id;

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw (err);
            const noteDb = JSOn.parse(data);
            const filteredNotes = noteDb.filter(note => note.id != setId);

            fs.writeFile("./db/db.json", JSON.stringify(filteredNotes, null, 2), err => {
                if (err) throw (err);
                res.send(db);
                console.log("Deleted note!")
            });
        });
    });
};