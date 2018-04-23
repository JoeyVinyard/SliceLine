const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var geo = require('node-geocoder');
var pizza = require('pizzapi');
var passwordHash = require('password-hash');
var firebase = require('firebase');
var config = require('./config.js');
firebase.initializeApp(config.fbconfig);
firebase.auth().signInWithEmailAndPassword("admin@sliceline.com", config.password);

 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyAYPFjyBz7atRsbr5GyJtlRiBLpu6hcD0A',
  formatter: null
};
 
var geocoder = geo(options);

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
	var log = req.body;
	if(!log.username || !log.password){
		console.log("invalid login");
		res.status(401).send('Failed to provided username password');
		return;
	}
	var hashedPass = passwordHash.generate(log.password);
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

app.get('/getNearbyStores', (req, res) => {
	geocoder.reverse(req.query, (err, location) => {
		var loc = location[0];
		var address = loc.city + ", " + loc.administrativeLevels.level1short + ", " + loc.zipcode;
		console.log(address);
		pizza.Util.findNearbyStores(address, "Delivery", (store) => {
			res.status(200).send(store.result.Stores);
			// var myStore = new pizza.Store(store.result.Stores[0].StoreID);
			// myStore.ID=store.result.Stores[0].StoreID;
			// myStore.getMenu((storeData) => {
			// 	res.status(200)
			// });
		})
	})
})

app.get('/*.*', (req, res) => {
	console.log("in here");
	res.sendFile(__dirname + "/assets/res/"+req.url);
})

app.listen(3000, () => {
	console.log("Listening on 3000");
});


	