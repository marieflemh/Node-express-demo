//Using Node.js & Express.js to save data to MongoDB Database

var express = require("express"); //require the express.js applicaton
var app = express(); //calls express
var port = 3000; //defines the port

//adding the body-parser middleware to our app
var bodyParser = require("body-parser");
app.use(bodyParser.json()); //convert to JSON
app.use(bodyParser.urlencoded({ extended: true }));

//connecting to the database
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/demo");

//create a schema to know the format of the data in the database
var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

//create a model
var User = mongoose.model("User", nameSchema);

//use GET to display the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//creating an endpoint
app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    //saves the data in the database and mongoose returns a promise
    .then(item => {
      //response if successful
      res.send("item saved to database");
    })
    .catch(err => {
      //response if unsuccessful
      res.status(400).send("unable to save to database");
    });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
