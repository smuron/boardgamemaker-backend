
let db = require('../db.js');

module.exports = function(tableName) {
	// build a standard API based on the postgres table specified by `tableName`

	let BuiltAPI = {
		tableName: tableName
	}

	BuiltAPI.getOne = function(id, cb) {
		db(this.tableName).where({"id": id}).then(function(rows) {
			cb(rows);
		}).catch(function(err) {
			console.log(err);
			cb('db error', []);
		});
	};
	BuiltAPI.query = function(q, cb) {
		console.log(this.tableName, 'query');
		db(this.tableName).where(q).then(function(rows) {
			cb(rows);
		}).catch(function(err) {
			console.log(err);
			cb('db error', []);
		});
	};
	BuiltAPI.getAll = function(cb) {
		console.log(this.tableName, 'getAll');
		db(this.tableName).then(function(rows) {
			cb(rows);
		}).catch(function(err) {
			console.log(err);
			cb('db error', []);
		});
	};
	BuiltAPI.insert = function(data, cb) {
		db(this.tableName).insert(data).returning('id').then(function(ids) {
			cb(ids);
		}).catch(function(err) {
			console.log(err);
			cb('db error', []);
		});
	};
	BuiltAPI.update = function(q, data, cb) {
		db(this.tableName).where(q).update(data).returning('id').then(function(ids) {
			cb(ids);
		}).catch(function(err) {
			console.log(err);
			cb('db error', []);
		});
	};
	BuiltAPI.remove = function(q, cb) {
		db(this.tableName).where(q).del().then(function() {
			cb(null);
		}).catch(function(err) {
			console.log(err);
			cb('db error', []);
		});
	};

	return BuiltAPI;
};

/*

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
*/