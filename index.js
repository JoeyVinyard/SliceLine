const express = require('express')
const app = express()
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
	console.log(req.body);
})

app.get('/*.*', (req, res) => {
	res.sendFile(__dirname + "/assets/res/"+req.url);
})

app.listen(3000, () => {

});