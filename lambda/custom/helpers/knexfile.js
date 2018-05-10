var config = {
client: 'mysql',
connection: {
host: '159.65.165.35',
database: 'wordpress',
user: 'wordpress',
password: '4e0fb3ac044c490258357959a72980b2b5da6f339218daf9',
port: '3306'
},
pool: {
min: 0,
max: 2
},
acquireConnectionTimeout: 3000
};

var knex = require('knex')(config);

module.exports = knex;
