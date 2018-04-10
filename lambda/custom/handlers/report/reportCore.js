var foodLoop = require('./foodLoop');

var getIntentChanges = (oldIntent, newIntent) => {
  changedIntents = []
  for (var key in oldIntent) {
    if (oldIntent[key].value !== newIntent[key].value) {
      changedIntents.push(newIntent[key])
    }
  }
  return changedIntents;
}

var reportCore = function() {
  var slots = this.event.request.intent.slots;
  //Check if intent slot has changed, see what has changed
  var changedIntents = getIntentChanges(this.attributes.slots, slots);
  console.log('attr', this.attributes);
  console.log('slots', slots);
  if (changedIntents.length === 0) {
      console.log('Report core: Nothing Changed');
      //If nothing changed
       this.emit(":delegate");
  }
  else {
      var name = changedIntents[0].name
      var value = changedIntents[0].value
      console.log('Report core: ', name, ' changed to ', value);
      var updatedIntent = this.event.request.intent;

      switch(name) {
        case "Gender":
          if (value === 'MALE') {
            updatedIntent.slots['PregnantBefore'].value = false;
            updatedIntent.slots['PregnantOrNursing'].value = false;
          }
          this.emit(':delegate', updatedIntent);
          this.attributes.slots = updatedIntent['slots']
          break;

        case 'Height':
          var inches = updatedIntent.slots['HeightInches']

          if (inches.value === null) {
            updatedIntent.slots['HeightInches'].value = 0;
          }
          this.emit(':delegate', updatedIntent);
          this.attributes.slots = updatedIntent['slots']
          break;

        case 'FoodLoop':
          console.log('They ate ', value);
          if (value === 'nothing') {
            this.emit(':delegate');
          }
          else {
            foodLoop.bind(this)(name, value, updatedIntent);
          }
          break;

        default:
          this.emit(':delegate');
      }
  }
}

module.exports = reportCore;



/*
this.emit(':elicitSlotWithCard', 'FoodLoop',
speechOutput, repromptSpeech,
cardTitle, cardContent,
updatedIntent, imageObj)
this.emit(':delegate');
*/
