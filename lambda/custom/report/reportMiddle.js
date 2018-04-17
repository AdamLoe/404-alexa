let foodLoop = require("./food/foodLoop");
let { Birthday, Gender, Height } = require("./SlotHandlers");

let getIntentChanges = (oldIntent, newIntent) => {
	let changedIntents = [];
	for (let key in newIntent) {
		if (
			newIntent[key].value !== oldIntent[key].value ||
			newIntent[key].name !== oldIntent[key].name ||
			newIntent[key].confirmationStatus !== oldIntent[key].confirmationStatus
		) {
			console.log(oldIntent[key].value, newIntent[key].value);
			console.log(oldIntent[key].name, newIntent[key].name);
			console.log(oldIntent[key].confirmationStatus, newIntent[key].confirmationStatus);

			changedIntents.push(newIntent[key]);
		}
	}
	return changedIntents;
};

let reportMiddle = function() {

	let slots = this.event.request.intent.slots;
	let changedIntents = getIntentChanges(this.attributes.slots, slots);

	let { name, value, confirmationStatus } = changedIntents[0] || {};
	console.log(name, ":", value, ":", confirmationStatus);
	console.log("changedIntents", changedIntents);

	console.log("oldslots", slots);
	console.log("newslots", slots);

	switch(name) {
		case "Birthday":
			Birthday.bind(this)(value, slots);
			break;

		case "Gender":
			Gender.bind(this)(value, slots);
			break;

		case "HeightFoot":
			Height.bind(this)(value, slots);
			break;

		case "FoodLoop":
			foodLoop.bind(this)(value, slots);
			break;

		default:
			console.log("Running default report");
			this.attributes.slots = slots;
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
