
var knex = require('./knexfile');

knex('alexa_assessment_log')
      .then(function(data) {
          console.log('data', data);
      })
      .catch(function(err) {
          console.log('err', err.code);
          console.log('err', err);
          console.log('err', err.code);
      })

knex('alexa_assessment_log')
    .insert({
        userId: 6,
        updateDateTime: '9999-12-31 23:59:59',
        assesment_log_file: JSON.stringify(
            {
                hmm: null,
                what: 5
            }
        )
    })
        .then(function(data) {
            console.log('data', data);
        })

knex('alexa_assessment_log')
    .then(function(data) {
        console.log('data', data);
    })
    .catch(function(err) {
        console.log('err', err.code);
        console.log('err', err);
        console.log('err', err.code);
    })
/*

var mysql = require('mysql');
var connection = mysql.createConnection({
        host     : '159.65.165.35',
        user     : 'wordpress',
        password : '4e0fb3ac044c490258357959a72980b2b5da6f339218daf9',
        database : 'wordpress',
        debug    : true
});

connection.connect(function(err) {
        if (err) {
                console.error('error connecting: ' + err.stack);
                return;
        }
        console.log('connected as id ' + connection.threadId);
});

var query = "SELECT * FROM users";

connection.query(query, function(err, rows) {
        if (err) throw err;
        console.log(rows);
});

*/