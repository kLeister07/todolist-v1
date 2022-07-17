// npm init, npm install express body-parser ejs
// nodemon app.js to start server

// require express, body-parser, date module
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];
// use express, body-parser, and create static public folder for css
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// set up views directory and template for ejs to utilize
app.set('view engine', 'ejs');
// get and render data for the current day, also renders new list items
app.get("/", function (req, res) {
let day = date();
    res.render("list", {listTitle: day, newListItems: items});
});
// receive new item entry and push to item array
app.post("/", function(req, res){
   let item = req.body.newItem;
   if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
   } else {
       items.push(item);
     res.redirect("/");
   }
});
// create a work list
app.get("/work", function(req, res){
res.render("list", {listTitle: "Work List", newListItems: workItems});
});
app.post("/work", function(req, res){
let item = req.body.newItem;
workItems.push(item);
res.redirect("/work");
});
// about page route
app.get("/about", function(req, res){
res.render("about");
});
// express local server
app.listen(3000, function () {
    console.log("Server started on port 3000.")
});