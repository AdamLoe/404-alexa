var Alexa = require('alexa-sdk');

var constants = require('../constants/constants');

var mainHandlers = Alexa.CreateStateHandler(constants.states.MAIN, {
  'ChangeWeight': function() {
      this.emit(':tell', 'alexa thanks you for the free information');
  },
  'ChangeNutritionist': function() {
    var question = 'what shitty doc you want?';
    var cardContent = {
      type: "Simple",
      title: "Card Title",
      content: "Card Contents"
    };
    this.emit(':askWithCard', question, question, cardContent);
  },


  'NewSession': function () {
      this.emit(':ask', 'Waaaoooww, a new session');
  },

  'LaunchRequest': function () {
      this.emit(':tell', 'Congrats, you launched the skill');
  },

});

module.exports = mainHandlers;
