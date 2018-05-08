

let debugGameData = {};
let Game = require('./game.js');

let GameAPI = {
	createGame: function(req, cb) {

		let gameId = Date.now();
		let opts = {};

		let g = new Game(gameid, opts);
		debugGameData[gameId] = g;
		cb(null, g.getOutput());
	},
	joinGame: function(req, cb) {
		let g = debugGameData[gameId];

		cb(null, g.getOutput());
	},
	gameAction: function(req, cb) {
		// let userId = req.query.userid
		let userId = 0;
		let gameId = 0;
		let action = 'rollDice';

		debugGameData[gameId].handleAction(userId, action, cb);
	},
	getGameData: function(req, cb) {
		let result = {};
		for (let x in Object.keys(debugGameData)) {
			let g = debugGameData[x];

			if (g.status == "lobby") {
				result[x] = {
					id: x,
					status: "lobby",
					lastUpdated: Date.now()
				}
			}
		}

		cb(null, result);
	}
}


module.exports = GameAPI;