var Alexa = require("alexa-sdk");

var logger = require("./helpers/logger");

var foodHandlers = require("./handlers/foodHandlers");
var builtInHandlers = require("./handlers/builtInHandlers");
var sessionHandlers = require("./handlers/sessionHandlers");
var reportHandler = require("./report/reportHandler");
var goalHandlers = require("./handlers/goalHandlers");

exports.handler = function (event, context, callback) {
	console.log("asd", event.session.sessionId);
	logger(event);
	var alexa = Alexa.handler(event, context);
	alexa.appId = "amzn1.ask.skill.dda0a29b-9562-4300-ae05-8f8096d4bac2";
	alexa.dynamoDBTableName = "404alexaUsers";

	console.log("got user", event.session.user.userId);
	console.log("got userState", this.attributes);

	alexa.registerHandlers(
		builtInHandlers,
		sessionHandlers,
		foodHandlers,
		goalHandlers,
		reportHandler
	);
	alexa.execute();
};
