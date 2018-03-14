var Alexa = require('alexa-sdk');

var logger = require('./logger.js');
var constants = require('./constants/constants.js');

var mainHandlers = require('./handlers/mainHandlers');
var registerHandlers = require('./handlers/registerHandlers');
var reportHandlers = require('./handlers/reportHandlers');
var surveyHandlers = require('./handlers/surveyHandlers');


exports.handler = function (event, context, callback) {
    //Log whatever
    logger(event, context);

    //Setup alexa, secure app with appid, setup dynamoDB Table
    var alexa = Alexa.handler(event, context);
    alexa.appId = constants.appId;
    alexa.dynamoDBTableName = constants.dynamoDBTableName;

    //Give it our event handlers and start it up
    alexa.registerHandlers(
      mainHandlers,
      registerHandlers,
      reportHandlers,
      surveyHandlers
    );
    alexa.execute();
};
