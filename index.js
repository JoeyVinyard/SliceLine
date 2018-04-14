const express = require('express')
const app = express()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var db;
var adminDb;

MongoClient.connect(url, function(err, dbo) {
  if (err) throw err;
  db = dbo.db("SliceLineDB");
  adminDb = db.admin();
  console.log("Database loaded");
});

function createUser(userObject){
	if(!userObject.username || !userObject.password){
		return -1;
	}

	adminDb.addUser(userObject.username, userObject.password, {
      roles:  [{
        role : "userAdmin",
        db   : "SliceLineDb"
        }]
    },
    function(err, result) {

    if (err){
      return console.log('Error: could not add new user')
    }
});

	
/*	db.createUser({
		
	});*/

	console.log("User Created");
	return 0;

}

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/assets/index.html");
})

app.get('/login', (req, res) => {
	res.sendFile(__dirname + "/assets/routes/login.html");
});

app.get("/signup", (req, res) => {
	res.sendFile(__dirname + "/assets/routes/signup.html");
})

app.post('/login', (req, res) => {
	console.log(req.body);
});

app.post("/signup", (req, res) => {
	createUser(req.body);
	console.log(req.body);
})

app.get('/*.*', (req, res) => {
	res.sendFile(__dirname + "/assets/res/"+req.url);
})

app.listen(3000, () => {
	console.log("Listening on 3000");
});

//