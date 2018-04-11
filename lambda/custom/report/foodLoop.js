var axios = require("../helpers/axiosFile");

var reprompt = "What else did you eat today?";
var error = "I didn't understand that";

module.exports = function(name, value, updatedIntent) {
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

			this.emit(":elicitSlot", "FoodLoop", reprompt, updatedIntent);
		})
		.catch((err) => {
			console.log('Error at FoodAPI', err);
			this.emit(":elicitSlot", "FoodLoop", error, reprompt, updatedIntent);
		});
};
