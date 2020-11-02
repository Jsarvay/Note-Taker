var express = require("express");
var path = require("path");

var app = express();

//set up PORT
var PORT = process.env.PORT || 8000;
//set up express code
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/db')));
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
//set up api routes
require("./routes/api.js")(app);
//set up server to listen
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });