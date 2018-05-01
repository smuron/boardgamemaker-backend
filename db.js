
let knex = require('knex');
let dbconf = require('./conf/db.js');



module.exports = knex(dbconf);