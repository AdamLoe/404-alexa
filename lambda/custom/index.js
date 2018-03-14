var Alexa = require('alexa-sdk');
var handlers = require('./handlers');

var constants = require('./constants/constants.js');

var mainHandlers = require('./handlers/mainHandlers');
var registerHandlers = require('./handlers/registerHandlers');
var reportHandlers = require('./handlers/reportHandlers');
var surveyHandlers = require('./handlers/surveyHandlers');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    console.log('-------------NEW REQUEST-------------');
    console.log('event', event);
    console.log('context', context);

    alexa.appId = constants.appId;
    alexa.dynamoDBTableName = constants.dynamoDBTableName;

    alexa.dynamoDBTableName = 'Users';
    alexa.registerHandlers(
      mainHandlers,
      registerHandlers,
      reportHandlers,
      surveyHandlers
    );
    alexa.execute();
};
