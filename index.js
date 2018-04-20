const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var pizza = require('pizzapi');
var MongoClient = require('mongodb').MongoClient;
var passwordHash = require('password-hash');
var url = "mongodb://joey:joey@ds229465.mlab.com:29465/sliceline";
var firebase = require('firebase');
var config = require('./config.js');
firebase.initializeApp(config.fbconfig);
firebase.auth().signInWithEmailAndPassword("admin@sliceline.com", config.password);

//var url = "mongodb://10.192.1.46:27017/";
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/assets/index.html");
})

app.get('/login', (req, res) => {
	res.sendFile(__dirname + "/assets/routes/login.html");
});

app.get('/pizza', (req, res) => {
	res.sendFile(__dirname + "/assets/routes/pizza.html");
});

app.get('/order', (req, res) => {
	res.sendFile(__dirname + "/assets/routes/order.html");
});

app.get('/pizzapals', (req, res) => {
	res.send("ahhhhhhhh");
})

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
	db.authenticate(log.username, hashedPass, function(err, ress) {
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
		var userObj = {
			username: userObject.username,
			password: hashedPass
		}
		firebase.database().ref("users/" + userObject.username).set(userObj).then(() => {
			res.status(200).send(hashedPass);
		});

	}	
})

app.get('/*.*', (req, res) => {
	res.sendFile(__dirname + "/assets/res/"+req.url);
})

app.listen(3000, () => {
	console.log("Listening on 3000");
});

