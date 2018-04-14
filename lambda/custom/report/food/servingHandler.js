var { servSizeErrorSpeech, servNumErrorSpeech, foodState } = require("../../helpers/speech");

exports.askServing = function(food) {
	let foodStrings = foodState[this.attributes.reportState];

	if (food === undefined) {
	}
	else {

	}
};

var setNum = (value, food) => {

};

var checkValid = (value, type) => {
	if (type === typeof value) {

	} else if (value in ["small", "medium", "large"]) {

	}
};

var setValues = (value, food, type) => {

};

module.exports = function(value, type) {

	let servFoods = this.attributes.servingFoods;
	let food = servFoods[0];

	if (checkValid(value, type)) {

		food = setValues(value, food, type);
		this.attributes.servingFoods = servFoods.slice(1);
		this.attributes.foodLog.concat(food);

		if (servFoods.length > 1) {
			// If there are serving Questions we need to ask
			askServing.bind(this)(this.attributes.servingFoods[0]);

		} else {
			//Other wise return to food loop
			this.emit(":confirmSlot", "FoodLoop", foodStates[this.attributes.reportState].reprompt);
		}


	} else {
		this.emit("elicitSlot", "ServingNumber", servNumErrorSpeech);
	}
};
