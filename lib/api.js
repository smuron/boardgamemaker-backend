

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

function NotImplemented(req,res,next) {
	next(new Error('not implemented'));
}

module.exports = function() {
	let router = express.Router();
	router.use('/user', buildUserRouter());
	
	router.use('/board', buildBoardRouter());	
	return router;
}