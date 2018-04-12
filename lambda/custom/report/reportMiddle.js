var foodLoop = require("./foodLoop");

var getIntentChanges = (oldIntent, newIntent) => {
	console.log('oldintent', oldIntent);
	console.log('newIntent', newIntent);
	changedIntents = [];
	for (let key in oldIntent) {
		if (oldIntent[key].value !== newIntent[key].value) {
			changedIntents.push(newIntent[key]);
		}
	}
	return changedIntents;
};

var checkDate = (str) => {
	var dateCheck = new RegExp("[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]");
	return dateCheck.test(str) && str.slice(0,4) < "2015";
};

var reportMiddle = function() {
	var slots = this.event.request.intent.slots;

	//Check if intent slot has changed, see what has changed
	var changedIntents = getIntentChanges(this.attributes.slots, slots);

	this.attributes.slots = slots;
	var updatedIntent = this.event.request.intent;

	console.log('Report middle called', changedIntents.length, changedIntents);
	if (changedIntents.length === 0) {
		this.emit(":delegate");
	}
	else {
		let name = changedIntents[0].name;
		let value = changedIntents[0].value;
		console.log("Report core: ", name, " changed to ", value);

		switch(name) {
			case "Birthday":
				if (checkFormat(value)) {
					if (checkYear(value)) {
						this.emit(":delegate");
					}
					else {
						updatedIntent.slots["Birthday"] = {name: "Birthday", confirmationStatus: "NONE"};
						let speech = "Please include the year in your birthday";
						let reprompt = "What is your birthday?";
						this.emit(":elicitSlot", "Birthday", speech, reprompt, updatedIntent);
					}
				}
				else {
					updatedIntent.slots["Birthday"] = {name: "Birthday", confirmationStatus: "NONE"};
					let speech = "Sorry I didn't get that, What is your birthday?";
					this.emit(":elicitSlot", "Birthday", speech, updatedIntent);
				}
				break;

			case "Gender":
				if (value === "male") {
					updatedIntent.slots["PregnantBefore"].value = false;
					updatedIntent.slots["PregnantOrNursing"].value = false;
					this.attributes.slots = updatedIntent["slots"];
				}

				this.emit(":delegate", updatedIntent);
				break;

			case "Height":
				var inches = updatedIntent.slots["HeightInches"];
				if (inches.value === null) {
					updatedIntent.slots["HeightInches"].value = 0;
					this.attributes.slots = updatedIntent["slots"];
				}

				this.emit(":delegate", updatedIntent);
				break;

			case "FoodLoop":
				console.log('FoodLoop called');
				foodLoop.bind(this)(name, value, updatedIntent);
				break;

			default:
				this.emit(":delegate");
		}
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
