var Alexa = require("alexa-sdk");
var constants = require("./constants/constants.js");
var mainHandlers = require("./handlers/mainHandlers");

var logger = require("./logger.js");
var getState = require('./helpers/getState');
var setState = require('./helpers/setState');


var app = function (event, context, callback) {

	var oldAttr = JSON.stringify(event.session.attributes);

    logger(event, context);
    //Setup alexa, secure app with appid, setup dynamoDB Table
	var alexa = Alexa.handler(event, context);
    alexa.appId = constants.appId;
    alexa.dynamoDBTableName = constants.dynamoDBTableName;
    alexa.registerHandlers(
        mainHandlers
    );
    alexa.execute();

    var newAttr = JSON.stringify(event.session.attributes);
    if (newAttr !== oldAttr) {
    	console.log('states not equal', newAttr, oldAttr);
        setState(event)
	}
};

//Got to wait for getState to finish before using app
//Couldnt figure out a way to do this without installing
//Big ass libraries for a small feature
var next = function() {
    return this.func(...this.params)
};

exports.handler = function(event, context, callback) {
    getState(event, next.bind({
		func: app,
		params: [
			event,
			context,
			callback
		]
	}));
}