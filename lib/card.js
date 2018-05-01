
let db = require('../db.js');

let CardAPI = {};

CardAPI.getUserCards = function(cb) {
	cb('not implemented', [])
};

CardAPI.insertNewCard = function(data, cb) {
	db('card').insert(data).returning('id').then(function(ids) {
		cb(ids[0]);
	});
}
CardAPI.updateCard = function(data, cb) {
	db('card').update(data).returning('id').then(function(ids) {
		cb(ids[0]);
	});
}

CardAPI.getAllCards = function(cb) {
	db('card').then(function(rows) {
		cb(null, rows);
	}).catch(function(err) {
		console.log(err);
		cb('db error', []);
	});
}

module.exports = CardAPI;