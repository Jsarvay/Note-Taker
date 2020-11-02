var express = require("express");
var path = require("path");
var db = require("./db/db.json");

var app = express();
//set up PORT
var PORT = process.env.PORT || 8000;
//set up express code
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
//set up paths
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
//set up api paths
app.get("/api/db", function(req, res){
  res.json(db);
  });
app.post("/api/db", function(req, res){
  db.push(req.body);
  });
//set up server to listen
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });