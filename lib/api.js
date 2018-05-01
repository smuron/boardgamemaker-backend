

let express = require('express');

let CardAPI = require('./card.js');
let UserAPI = require('./card.js');

let ApiGenerator = require('./apigenerator.js');

function buildUserRouter() {
	let router = express.Router();

	router.get('/info', NotImplemented);
	router.get('/info/:userid', NotImplemented);
	return router;
}

function buildCardRouter() {
	let router = express.Router();

	router.get('/collection', NotImplemented);
	return router;
}

function buildGeneratedRouter(tableName) {
	let router = express.Router();
	let API = ApiGenerator(tableName)
	router.get('/', express.json(), function(req,res) {
		if (req.body && req.body.q) {
			API.query(req.body.q, function(results) {
				res.send(results);
			});
		} else {
			// todo: limit cap etc
			API.getAll(function(results) {
				res.send(results);
			});
		}
	});
	router.post('/', function(req,res) {
		API.insert(req.body.data, function(results) {
			res.send(results);
		});
	});
	router.get('/:id', function(req,res) {
		API.getOne(req.params.id, function(results) {
			res.send(results);
		});
	});
	router.post('/:id', function(req,res) {
		API.update({id: req.params.id}, req.body.data, function(results) {
			res.send(results);
		});
	});
	router.delete('/:id', function(req,res) {
		API.update({id: req.params.id}, req.body.data, function(results) {
			res.send(results);
		});
	});
	return router;
}

function NotImplemented(req,res,next) {
	next(new Error('not implemented'));
}

module.exports = function() {
	let router = express.Router();
	router.use('/user', buildUserRouter());
	router.use('/card', buildCardRouter());

	router.use('/gen/user', buildGeneratedRouter('user'));	
	router.use('/gen/card', buildGeneratedRouter('card'));	
	return router;
}