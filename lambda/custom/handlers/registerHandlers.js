var Alexa = require('alexa-sdk');

var constants = require('../constants/constants');

var registerHandlers = Alexa.CreateStateHandler(constants.states.register, {
  'Example_Intent': function() {

  }
});

module.exports = registerHandlers;
