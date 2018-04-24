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

app.post('/login', (req, res) => {
	var log = req.body;
	if(!log.username || !log.password){
		body.err = 'Failed to provided username password'
		res.status(401).send(body);
		return;
	}
	var body = {};
	var hashedPass = passwordHash.generate(log.password);
	firebase.database().ref("users/" + log.username).once("value").then((user) => {
		if(user.val() && user.val().password){
			if(passwordHash.verify(log.password, user.val().password)){
				console.log("Login succesful");
				body.hash = hashedPass;
				res.status(200).send(body);	
			}else {
				console.log("Invalid pass");
				body.err = "Invalid username and password combination";
				res.status(200).send(body);
			}
		}else{
			console.log("Invalid pass");
			body.err = "Invalid username and password combination";
			res.status(200).send(body);
		}
	}).catch((err) =>{
		console.log(err);
		res.status(500).send(err);
	});
});

app.post("/signup", (req, res) => {
	console.log(req.body);	
	var userObject = req.body;
	var body = {};
	if(!userObject.username || !userObject.password || !userObject.confpass) {
		body.err = 'Failed to provided username password or password confirmation';
		res.status(200).send(body);
	}else if(userObject.password != userObject.confpass){
		body.err = "Password and Password Confirmation do not match";
		res.status(200).send(body);
	}else {
		var hashedPass = passwordHash.generate(userObject.password);
		console.log(hashedPass);
		var userObj = {
			username: userObject.username,
			password: hashedPass
		}
		firebase.database().ref("users/" + userObject.username).set(userObj).then(() => {
			console.log("all good");
			body.hash = hashedPass;
			res.status(200).send(body);
		}).catch((err) => {
			res.status(400).send(err);
		})
	}	
})

app.get('/getNearbyStores', (req, res) => {
	geocoder.reverse(req.query, (err, location) => {
		var loc = location[0];
		var address = loc.city + ", " + loc.administrativeLevels.level1short + ", " + loc.zipcode;
		console.log(address);
		pizza.Util.findNearbyStores(address, "Delivery", (store) => {
			res.status(200).send(store.result.Stores);

		})
	})
})

app.post('/createParty', (req, res) => {
	obj = req.body;
	console.log(obj);
	var v = firebase.database().ref("parties/").push(obj);
	v.then(() => {
		firebase.database().ref("parties/" + v.key + "/partyID").set(v.key).then((data) => {
			res.status(200).send({Resp: "all good in da hood"});
		})
	})
});

app.get('/getParties', (req, res) => {

	firebase.database().ref("parties/").once("value").then((data) => {
		var p = data.val();
		var parties = [];
		Object.keys(p).map((index) => {
			var party = {
				dist: 20,
				creator: p[index].creator,
				total: p[index].party.Total,
				size: p[index].party.Size
			}
			console.log(party);
			parties.push(party);

		});
		res.status(200).send(parties);
	});
});

app.post('/storeLocation', (req, res) => {
	var obj = req.body;
	console.log("location object", obj);

	firebase.database().ref("loc/" + obj.username).set(obj).then(() => {
		var ret = {
			message: "location stored"
		}

		res.status(200).send(ret);
	});
});

app.get('/getLocation', (req, res) => {
	console.log(req);
	console.log("getLocation: ", obj);
	firebase.database().ref("loc/" + obj.username).once("value").then((locObj)=> {
		if(locObj.val())
			res.status(200).send(locObj.val());
		else{
			var error = {
				message: "user not found"
			}
			res.status(500).send(error);
		}
		return;
	});
});

app.get('/getStoreMenu', (req, res) => {
	var myStore = new pizza.Store(req.query.id);
	myStore.ID=req.query.id;
	myStore.getMenu((storeData) => {
		res.status(200).send(storeData.result);
	});
});

app.get('/*.*', (req, res) => {
	console.log("in here");
	res.sendFile(__dirname + "/assets/res/"+req.url);
})

app.listen(3000, () => {
	console.log("Listening on 3000");
});


	