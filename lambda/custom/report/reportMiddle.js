var foodLoop = require("./food/foodLoop");
var { Birthday, Gender, Height } = require("./SlotHandlers");
var servingHandler = require("./food/servingHandler");

var getIntentChanges = (oldIntent, newIntent) => {
	var changedIntents = [];
	for (let key in oldIntent) {
		if (oldIntent[key].value !== newIntent[key].value) {
			changedIntents.push(newIntent[key]);
		}
	}
	return changedIntents;
};

var reportMiddle = function() {

	let slots = this.event.request.intent.slots;
	let changedIntents = getIntentChanges(this.attributes.slots, slots);
	this.attributes.slots = slots;


	let { name, value } = changedIntents[0] || {};

	switch(name) {
		case "Birthday":
			Birthday.bind(this)(value);
			break;

		case "Gender":
			Gender.bind(this)(value);
			break;

		case "HeightFoot":
			Height.bind(this)(value);
			break;

		case "FoodLoop":
			foodLoop.bind(this)(value);
			break;

		case "ServingNumber":
			servingHandler.bind(this)(value, "number");
			break;

		case "ServingSize":
			servingHandler.bind(this)(value, "size");
			break;

		default:
			this.emit(":delegate");
	}
};

module.exports = reportMiddle;



/*
this.emit(':elicitSlotWithCard', 'FoodLoop',
speechOutput, repromptSpeech,
cardTitle, cardContent,
updatedIntent, imageObj)
this.emit(':delegate');
*/
