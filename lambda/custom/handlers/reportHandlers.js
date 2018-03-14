var Alexa = require('alexa-sdk');

var constants = require('../constants/constants');

var reportHandlers = Alexa.CreateStateHandler(constants.states.report, {
  'Example_Intent': function() {

  }
});

module.exports = reportHandlers;
