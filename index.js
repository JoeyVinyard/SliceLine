const express = require('express')
const app = express()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var db;

MongoClient.connect(url, function(err, dbo) {
  if (err) throw err;
  db = dbo.db("SliceLineDB");
  console.log("Database loaded");
  createUser({username: "calvin", password: "123456"});
});

function createUser(userObject){
	if(!userObject.username || !userObject.password){
		return -1;
	}
	db.collection("users").insertOne(userObject, function(err, res) {
    if (err) throw err;
	console.log("User Created");
	return 0;
  });
}


app.get('/', (req, res) => {
	res.sendFile(__dirname + "/assets/index.html");
})

app.get('/*.*', (req, res) => {
	res.sendFile(__dirname + "/assets/res/"+req.url);
})

app.listen(3000, () => {
	console.log("Listening on 3000");
});

//