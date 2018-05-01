let db = require('../db.js');
let bcrypt = require('bcrypt');
const saltRounds = 10;

let UserAPI = {};


UserAPI.verifyLogin = function(user, password, cb) {
	db('gameuser').where({
		login_name: user
	}).first().then(function(data){
		bcrypt.compare(password, data.password, function(err, result) {
			if (err || !result) {
				return cb('password didnt match', null);
			}
			delete data.password;
			return cb(null, data);
		});
	}).catch(function(err) {
		console.log(err);
		cb('user not found', null);
	});
}

UserAPI.createUser = function(user, password, cb) {
	bcrypt.hash(password, saltRounds, function(err, hash) {
		if (err) {
			cb(err);
		}
		db('gameuser').insert({
			login_name: user,
			password: hash  
		}).then(function() {
			cb(null);
		});
	});
}

module.exports = UserAPI;