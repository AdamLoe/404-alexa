var axios = require('./axiosFile');

module.exports = function(name, value, updatedIntent) {
  axios.post('/', {
    query: value
  })
    .then((res) => {
      console.log('Got data from nutrix', res.data);
      //
      if (this.attributes.reportFood === null) {
        this.attributes.reportFood = []
      }
      this.attributes.reportFood.concat(res.data.foods)
      updatedIntent.slots['FoodLoop'] = {
        name: 'FoodLoop',
        confirmationStatus: 'NONE'
      }

      var speechOutput = 'What else did you eat today?';
      var repromptSpeech = speechOutput;
      this.attributes.slots = updatedIntent['slots']
      this.emit(':elicitSlot', 'FoodLoop',
                speechOutput, repromptSpeech,
                updatedIntent)
    })
    .catch((err) => {
      console.log('FoodLoop err hit', err);
      this.attributes.slots = updatedIntent['slots']
      this.emit(':delegate');
    })
}
