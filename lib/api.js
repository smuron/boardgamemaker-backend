

let express = require('express');

let CardAPI = require('./card.js');
let UserAPI = require('./card.js');
let bodyParser = require('body-parser');

let ApiGenerator = require('./apigenerator.js');

function wrapDataFunction(dataFunc) {
	return function(req,res) {
		dataFunc(req, function(err, result) {
			if (err) {
				console.log(err);
				res.send(500);
				return;
			}
			res.send(result);
		});
	};
}

function buildUserRouter() {
	let router = express.Router();

	router.get('/info', NotImplemented);
	router.get('/info/:userid', NotImplemented);
	return router;
}

let BoardAPI = require('./board.js')
function buildBoardRouter() {
	let router = express.Router();

	router.get('/:id', wrapDataFunction(BoardAPI.getBoard));
	router.post('/:id', bodyParser.json(), wrapDataFunction(BoardAPI.updateBoard));
	router.post('/', bodyParser.json(), wrapDataFunction(BoardAPI.insertNewBoard));

	return router;
}

// XXX: do we want socket instead, or just do this?
let GameAPI = require('./gameapi.js');
function buildGameRouter() {
	let router = express.Router();

	router.get('/', wrapDataFunction(GameAPI.getGameData));

	router.post('/create', wrapDataFunction(GameAPI.createGame));
	router.post('/join', wrapDataFunction(GameAPI.joinGame));
	router.post('/action', wrapDataFunction(GameAPI.gameAction));

	return router;
}

function NotImplemented(req,res,next) {
	next(new Error('not implemented'));
}

module.exports = function() {
	let router = express.Router();
	router.use('/user', buildUserRouter());
	
	router.use('/board', buildBoardRouter());
	router.use('/game', buildGameRouter());	
	return router;
}