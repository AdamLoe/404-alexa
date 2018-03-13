var Alexa = require('alexa-sdk');
var handlers = require('./handlers/handlers');

var constants = require('constants/constants');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);

    alexa.appId = constants.appId;
    alexa.dynamoDBTableName = constants.dynamoDBTableName;

    alexa.registerHandlers(
        handlers
    );

    alexa.execute();
};
