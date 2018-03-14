var Alexa = require('alexa-sdk');

var constants = require('../constants/constants');

var mainHandlers = Alexa.CreateStateHandler(constants.states.MAIN, {
    'ChangeWeight': function() {
        var weight = this.event.request.intent.slots.weight.value;
        var weightRemark = 'average user';
        if (weight > 500) {
          weightRemark = 'chubby boi';
        }
        if (weight < 100) {
          weightRemark = 'skinny boi';
        }
        this.emit(':tell', 'alexa thanks you for the free information,' + weightRemark);
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
    'addFood': function() {
      var food = this.event.request.intent.slots.foodItem;
      this.emit('Eating functionally not implemented yet');
    },
    'FoodHistory': function() {
      /*
        U: Open Food History
        A: What about your eating history would you like to know
        U: What did I eat yesterday
        A: You had a hamburger and a large dr pepper for lunch, a salad and a medium for sweet tea for lunch.
              What else would you like to know?
        U: How many calories did I eat yesterday?   You had 2300 Calories yesterday.
        U: How much sodium did I have yesterday?    You had 200mg, 20% more than the reccomended amount
        U: How much sodium have I had this week?    You have average 350mg a day, 200% of the reccomended amount
        U: How many calories have I had this week?  You averaged 400 calories a day, only 20% of the reccomended amount

       U: Change food
       A: What day would you like to change
       U: Yesterday
       A: What would you like to change from yesterday? You had
              1. A hamburger  2. A Dr Pepper  3. A salad  and 4. A sweet tea?
       U: Delete 1, 2, and 4
       U: Change 1 to a double cheeseburger
       U:
       */
    },



  'NewSession': function () {
      this.emit(':ask', 'Waaaoooww, a new session', 'You gonna do something or did you just open this to hear my shitty intro');
  },

  'LaunchRequest': function () {
      this.emit(':ask', 'Congrats, you launched the skill', 'You gonna do something or did you just open this to hear my shitty intro');
  }

});

module.exports = mainHandlers;
