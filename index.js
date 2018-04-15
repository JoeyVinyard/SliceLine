const express = require('express')
const app = express()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var passwordHash = require('password-hash');
var db;
var adminDb;

MongoClient.connect(url, function(err, dbo) {
  if (err) throw err;
  db = dbo.db("SliceLineDB");
  adminDb = db.admin();
  console.log("Database loaded");
});

function createUser(userObject){
	
	console.log("User Created");
	return 0;

}

var bodyParser = require('body-parser');
var pizza = require('pizzapi');

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
	var log = req.body;
	if(!log.username || !log.password){
		res.status(500).send('Failed to provided username password');
		return;
	}
	var hashedPass = passwordHash.generate(log.password);
	console.log(hashedPass);
	adminDb.authenticate(log.username, hashedPass, function(err, ress) {
		if(ress){
			res.status(200).send("You logged in! Now go find some pizza to eat");
		}else {
			res.status(501).send("Invald Username and Password combination");
		}
	});
});

app.post("/signup", (req, res) => {
	console.log(req.body);	
	var userObject = req.body;
	if(!userObject.username || !userObject.password || !userObject.confpass) {
		res.status(500).send('Failed to provided username password or password confirmation');
	}else if(userObject.password != userObject.confpass){
		res.status(501).send('Password and Password Confirmation do not match');
	}else {
		var hashedPass = passwordHash.generate(userObject.password);
		console.log(hashedPass);
		adminDb.addUser(userObject.username, hashedPass, {
			roles:  [{
				role : "userAdmin",
				db   : "admin"
			}]
		},
		function(err, result) {
			if (err){
				console.log(err);
				res.status(400).send(err);
			}else{
				res.status(200).send("Woo! You can now find pizza Pals! Proced to Pizza");
			}
		});

	}	
})

app.get('/*.*', (req, res) => {
	res.sendFile(__dirname + "/assets/res/"+req.url);
})

app.listen(3000, () => {
	console.log("Listening on 3000");
});

//