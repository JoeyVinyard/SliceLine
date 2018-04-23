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
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});


app.get('/', (req, res) => {
	console.log("here");
	res.sendFile(__dirname + "/assets/index.html");
})

app.get('/login', (req, res) => {
	console.log("here");
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

	console.log("login", req.body);
	
	var log = req.body;
	
	//console.log(log[1]);
	

	console.log(log);
	if(!log.username || !log.password){
		console.log("invalid login");
		res.status(401).send('Failed to provided username password');
		return;
	}
	var hashedPass = passwordHash.generate(log.password);
	console.log(hashedPass);

	firebase.database().ref("users/" + log.username).once("value").then((user) => {

		if(user.val() && user.val().password){
			if(passwordHash.verify(log.password, user.val().password)){
				console.log("Login succesful");
				res.status(200).send("You succesfully logged in! Now go find some pizza to eat");	
			}else {
				console.log("Invalid pass");
				res.status(401).send("Invalid username and password combination");
			}
		}
	}).catch((err) =>{
		console.log(err);
		res.status(500).send(err);
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
	console.log("in here");
	res.sendFile(__dirname + "/assets/res/"+req.url);
})

app.listen(3000, () => {
	console.log("Listening on 3000");
});

pizza.Util.findNearbyStores(
	"219 Littleton St, West Lafayette, IN, 47906",
	"Delivery",
	(store) => {
		var myStore = new pizza.Store(store.result.Stores[0].StoreID);
		myStore.ID=store.result.Stores[0].StoreID;
		myStore.getMenu(
			function(storeData){
				//console.log(storeData.result);

			}
		);
	}
)
	