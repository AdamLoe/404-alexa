var knex = require('../knexfile');

module.exports = {
	"ChangeWeight": function() {
		var weight = this.event.request.intent.slots.weight.value;
		this.emit(":ask", "Thanks for telling me you weigh " + weight + " pounds");
        this.attributes.weight = weight;
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
	"SetGoal": function() {
		var dialogState = this.event.request.dialogState;
		console.log('Set Goal slots', this.event.request.intent.slots);
		if (dialogState !== 'COMPLETED') {
			console.log('Delegate slots');
			this.emit(':delegate');
		} else {
			var goalToGet = this.event.request.intent.slots.goalToGet.id;
			goalToGet = int(goalToGet);
			knex('alexa_goal_log')
					.insert({
						"userID": 1,
						"goalID": goalToGet
					})
					.then(function(data){
							console.log('Server Responded')
							this.emit(':ask', 'Thanks for setting a goal')
					})
					.catch(function(err){
						console.log('err setting goal', err)
						this.emit(':ask', 'error setting a goal')
					})
		}
	},
	"Unhandled": function() {
			this.emit(':ask', 'I have no clue what the fuck you just did');
	}
};

/*
goalsJSON = {
	"Goal": "lose weight",
	"PoundsPerWeek":
	"Weight": 180,
	"WeightHistory": [
		[ "Weight": 179, "Date", DateTime]
		[ "Weight": 178, "Date", DateTime]
	]
}
*/
