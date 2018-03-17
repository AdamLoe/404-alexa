var Alexa = require("alexa-sdk");

var constants = require("../constants/constants");

var mainHandlers = Alexa.CreateStateHandler(constants.states.MAIN, {
	"ChangeWeight": function() {
		var weight = this.event.request.intent.slots.weight.value;
		this.emit(":ask", "Thanks for telling me you weigh " + weight + " pounds");
	},
	"addFood": function() {
		var food = this.event.request.intent.slots.foodItem;
		this.emit(":ask", "Eating functionality not implemented yet");
	},
	"GetFoodInfo": function() {
		var foodItem = this.event.request.intent.slots.foodItem.value;
		var infoToGet = this.event.request.intent.slots.nutritionInfo.value;
		console.log("GetFoodInfo", foodItem, infoToGet);

		if (infoToGet === "calories") {
			var calories = -1;
			switch(foodItem) {
				case "burger":
					calories = 300;
					break;
				case "burrito":
					calories = 400;
					break;
			}
			if (calories === -1 ) {
				this.emit(":ask", "We dont support that item");
			} else {
				this.emit(":ask", "a " + foodItem + " has " + calories + " calories", "Is there any else you would like to know");
			}
		} else {
			this.emit(":ask", "nutrition info type not supported");
		}
	},

	"NewSession": function () {
		this.emit(":ask", "Welcome user");
	},

	"LaunchRequest": function () {
		this.emit(":ask", "Congrats, you launched the skill", "You gonna do something or did you just open this to hear my shitty intro");
	}

});

module.exports = mainHandlers;
