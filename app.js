

const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

var todos = ["Drink water", "Read a novel"];

var workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    let day = date();

    res.render("list", {
        listTitle: day,
        newListItems: todos
    });

})

app.post("/", function (req, res) {

    console.log(req.body);

    var todo = req.body.task;

    if (req.body.list === "Work List") {
        workItems.push(todo);
        res.redirect("/work");
    }
    else {
        todos.push(todo);
        res.redirect("/");
    }

})

app.get("/work", function (req, res) {

    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    })

})

app.post("/work", function (req, res) {

    var todo = req.body.task;

    workItems.push(todo);
    res.redirect("/work");

})

app.get("/about", function (req, res) {

    res.render("about");

})

app.listen(3000, function () {
    console.log("Server started at port 3000.");
})