const helpStrings = {
	"default": "default help",
	"commands": "Help Menu, You can say help all,  help change weight,  help set goal,  help add food,  help get food info,  and help report",
  "change weight": "To change your weight, simply say, I weigh one hundred fifty pounds",
	"set goal": "To set a goal, say set goal",
	"add food": "To add food, say something like, i ate a taco, a bean burrito, and a dr pepper",
	"nutrition info": "To get nutritional info, say something like, what's in a bean burrito or how many calories are in a dr pepper",
	"report": "Our report is designed to be sent to a nutritionist, says start a report to begin"
}

module.exports = {
	"AMAZON.StopIntent": function() {
		this.emit(":ask", "No you stop bitch");
	},
	"AMAZON.CancelIntent": function() {
		this.emit(":ask", "Cancel cancel cancel");
	},
	"AMAZON.YesIntent": function() {
		this.emit(":ask", "Yes yes yes");
	},
	"AMAZON.NoIntent": function() {
		this.emit(":ask", "No no no");
	},
	"AMAZON.HelpIntent": function() {
		let string = helpStrings.default;
		this.emit(":ask", string, string);
	},
	"Help": function() {
		var command = this.event.request.intent.slots.Command.value;
		console.log('Help called with command value', command);

		let responseString = helpStrings[command]
		if (responseString === undefined) {
			responseString = helpStrings.default;
		}

		let string = "You just called " + command;
		this.emit(":ask", responseString, responseString);

	}
};
