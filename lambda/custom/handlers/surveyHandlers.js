var Alexa = require("alexa-sdk");

var constants = require("../constants/constants");

var surveyHandlers = Alexa.CreateStateHandler(constants.states.survey, {
	"Example_Intent": function() {

	}
});

module.exports = surveyHandlers;
