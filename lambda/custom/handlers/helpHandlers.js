let helpSpeech = {
	"default": "Help Menu, This skill is meant for tracking what you eat and your weight as well retrieving " +
				"Nutritional info about food, to learn more about the commands available say help commands",
	"commands": "Help Menu, You can say help all,  help change weight,  help set goal,  help add food,  help get food info,  and help report",
	"change weight": "To change your weight, simply say, I weigh one hundred fifty pounds",
	"set goal": "To set a goal, say set goal",
	"add food": "To add food, say something like, i ate a taco, a bean burrito, and a dr pepper",
	"nutrition info": "To get nutritional info, say something like, what's in a bean burrito or how many calories are in a dr pepper",
	"report": "Our report is designed to be sent to a nutritionist, say start a report to begin"
};
exports.helpSpeech =  helpSpeech;

const helpReprompt = {
	"default": "Would you like to learn about the commands available?"
};

exports.help = function(command) {
	if (!(command in helpSpeech)) {
		command = "commands";
	}

	if (command in helpReprompt) {
		this.attributes.lastQuestion = {
			type: "Help",
			command: "commands"
		};
		this.emit(":ask", helpSpeech[command], helpReprompt[command]);
	} else {
		this.emit(":ask", helpSpeech[command]);
	}
};


module.exports = {
	"AMAZON.HelpIntent": function() {
		help.bind(this)("default");
	},
	"Help": function() {
		//If we're getting to Help from a Yes function
		let command = this.event.request.intent.slots.Command.value;

		help.bind(this)(command);
	}
};
