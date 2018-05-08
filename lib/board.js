
let db = require('../db.js');

let BoardAPI = {};

BoardAPI.getBoard = function(req, cb) {
	if (req.params.id) {
		let result = BoardData[req.params.id];
		if (!result) {
			result = {};
		}
		return cb(null, result);
	}
}

let BoardData = {}; // temp in-memory until db structure developed

BoardAPI.insertNewBoard = function(req, cb) {
	let data = req.body;
	console.log('insertNewBoard',data);
	if (!data.id) {
		data.id = Date.now();
	}
	BoardData[data.id] = data;
	cb(null, data);
	/*
	db('board').insert(data).returning('id').then(function(ids) {
		cb(null, ids[0]);
	}).catch(function(err) {
		cb(err, null);
	});
	*/
}
BoardAPI.updateBoard = function(req, cb) {
	let data = req.body;
	console.log('updateBoard',data);
	BoardData[data.id] = data;
	cb(null, data.id);

	/*
	db('board').update(data).returning('id').then(function(ids) {
		cb(null, ids[0]);
	}).catch(function(err) {
		cb(err, null);
	});
	*/
}


module.exports = BoardAPI;