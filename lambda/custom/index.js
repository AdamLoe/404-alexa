var Alexa = require("alexa-sdk");

var logger = require("./helpers/logger");

var foodHandlers = require("./handlers/foodHandlers");
var builtInHandlers = require("./handlers/builtInHandlers");
var sessionHandlers = require("./handlers/sessionHandlers");
var reportHandler = require("./report/reportHandler");
var goalHandlers = require("./handlers/goalHandlers");
var helpHandlers = require("./handlers/helpHandlers");
var alexaSkillEvents = require('./handlers/alexaSkillEvents');

exports.handler = function (event, context, callback) {

	var alexa = Alexa.handler(event, context);
	alexa.appId = "amzn1.ask.skill.dda0a29b-9562-4300-ae05-8f8096d4bac2";
	alexa.dynamoDBTableName = "404alexaUsers";

	logger(event);

	alexa.registerHandlers(
		builtInHandlers,
		sessionHandlers,
		foodHandlers,
		goalHandlers,
		reportHandler,
		helpHandlers,
		alexaSkillEvents
	);
	alexa.execute();
};
