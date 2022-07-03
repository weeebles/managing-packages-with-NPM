let express = require('express');
let app = express();
var bGround = require('fcc-express-bground');
require('dotenv').config();

app.use(function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});



bGround.log("Hello World");
console.log("Hello World");



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(__dirname + "/public"));

// app.get("/json", (req, res) => {
//     res.json(
//         {"message": "Hello json"}
//         );
// });

app.get("/json", function(req, res) {
    console.log(process.env.MESSAGE_STYLE, "<=message style");
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json(
          { "message": "HELLO JSON" }
        )
    } else {
        res.json(
          { "message": "Hello json"}
        )
    }
});

function getTheCurrentTimeString() {
    return new Date().toString();
}

app.get("/now", (req, res, next) => {
    req.time = getTheCurrentTimeString();
    next();
}, (req,res) => {
  res.json({ time: req.time });
})

app.get("/:word/echo", (req, res) => {
    res.json({ echo: req.params.word });
});

app.get("/name", function(req, res) {
    res.json({ name: req.query.first + " " + req.query.last});
});












 module.exports = app;
