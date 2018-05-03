
let express = require('express');
let http = require('http');
let app = express();
let jwt = require('jsonwebtoken');
let bodyParser = require('body-parser');

let JWT_SECRET = new Buffer('YOUR-APP-SECRET-79', 'base64');

let UserAPI = require('./lib/user.js');
let CardAPI = require('./lib/card.js');


// TODO: figure this one out dynamically
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/dummy', bodyParser.json(), function(req,res) {
	console.log('dummy post endpoint',req.body);
	res.send({it: "works", ten: 10});
});
app.get('/', function(req,res) {
	res.sendFile(__dirname + '/public/index.html');
});
app.get('/signup', function(req,res) {
	res.sendFile(__dirname + '/public/signup.html');
});
app.get('/login', function(req,res) {
	res.sendFile(__dirname + '/public/login.html');
});
app.get('/apitest', function(req,res) {
	res.sendFile(__dirname + '/public/apitest.html');
});

app.get('/auth', function(req,res) {
	let token = jwt.sign({username: "me"}, JWT_SECRET, {expiresIn: 6000000});
	res.send(token);
});
app.post('/register', bodyParser.urlencoded(), function(req,res) {
	UserAPI.createUser(req.body.username, req.body.password, function(err) {
		res.redirect('/');
	});
});
app.use('/api', function(req,res,next) {
	if (req.method == 'OPTIONS') {
		next();
		return;
	}
	jwt.verify(req.get("Authorization"), JWT_SECRET, {
		algorithms: ["HS256"]
	}, function(err, decoded) {
		console.log('verify!',err,decoded);
		if (err) {
			res.send(err);
			return;
		} else {
			req.tokenData = decoded;
			next();
		}
	})
});
app.use('/api', require('./lib/api.js')());

let SERVER_PORT = 8000;
app.listen(SERVER_PORT, function() { 
	console.log(`pcard running on ${SERVER_PORT}`)
});