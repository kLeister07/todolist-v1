// npm init, npm install express body-parser ejs
// nodemon app.js to start server

// require express and body-parser
const express = require("express");
const bodyParser = require("body-parser");
var items = ["Buy Food", "Cook Food", "Eat Food"];
// use express and body-parser
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
// set up views directory and template for ejs to utilize
app.set('view engine', 'ejs');
// get and render data for the current day, also renders new list items
app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("list", {kindOfDay: day, newListItems: items});
});
// receive new item entry and push to item array
app.post("/", function(req, res){
   var item = req.body.newItem;
   items.push(item);
 res.redirect("/");
});
// express local server
app.listen(3000, function () {
    console.log("Server started on port 3000.")
});