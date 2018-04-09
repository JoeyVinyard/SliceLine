const express = require('express')
const app = express()

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/assets/index.html");
})

app.get('/*.*', (req, res) => {
	res.sendFile(__dirname + "/assets/res/"+req.url);
})

app.listen(3000, () => {

});