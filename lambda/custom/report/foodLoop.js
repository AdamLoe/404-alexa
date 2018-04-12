var axios = require("../helpers/axiosFile");

var reprompt = "Did you eat anything else";
var errorSpeech = "I didn't understand that";

var states = [
	'What did you eat for breakfast',
	'What did you eat for lunch',
	'What did you eat for dinner'
]
module.exports = function(name, value, updatedIntent) {
	var status = updatedIntent.slots.FoodLoop.confirmationStatus;
	var state = this.attributes.reportState;
	console.log(status);

	if (status === "CONFIRMED") {
		var response = states[state];
		this.emit(":elicitSlot", "FoodLoop", response, updatedIntent);
	}
	else if (status === "DENIED") {
			this.attributes.reportState += 1
			var state = this.attributes.reportState;
			if (state === states.length) {
				this.emit(":delegate");
			}
			else {
				var response = states[state];
				this.emit(":elicitSlot", "FoodLoop", response, updatedIntent);
			}
	}
	else {
		updatedIntent.slots["FoodLoop"] = {
			name: "FoodLoop",
			confirmationStatus: "NONE"
		};
		this.attributes.slots = updatedIntent["slots"];

		axios.post("/", {
			query: value
		})
			.then((res) => {
				this.attributes.foodlog = this.attributes.foodlog || [];
				this.attributes.foodlog.concat(res.data.foods);

				console.log('confirming slot');
				this.emit(":confirmSlot", "FoodLoop", reprompt, updatedIntent);
			})
			.catch((err) => {
				console.log('Error at FoodAPI', err);
				this.emit(":elicitSlot", "FoodLoop", errorSpeech, updatedIntent);
			});
	}
};
