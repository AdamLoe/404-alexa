var Alexa = require('alexa-sdk');

var constants = require('../constants/constants');

// Main Handlers
var mainStateHandlers = Alexa.CreateStateHandler(constants.states.MAIN, {

});

module.exports = mainStateHandlers;