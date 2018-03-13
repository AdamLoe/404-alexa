var Alexa = require('alexa-sdk');
var handlers = require('./handlers');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = 'Users';
    alexa.registerHandlers(handlers);
    alexa.execute();
};
