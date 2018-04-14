var { help } = require("./helpHandlers");

var handleYesNo = function(bool) {
	let lastQuestion = this.attributes.lastQuestion;
	if (lastQuestion === undefined) {
		this.emit("Unhandled");
	} else {
		switch (lastQuestion.type) {
			case "Help":
				if (bool) {
					help.bind(this)(lastQuestion.command);
				} else {
					this.emit(":ask", "Okay, well what would you like to do?");
				}
				break;
			default:
				this.emit("Unhandled");
		}
	}
};

module.exports = {
	"AMAZON.StopIntent": function() {
		this.emit(":tell", "Hammertime");
	},
	"AMAZON.CancelIntent": function() {
		this.emit(":tell", "Goodbye");
	},
	"AMAZON.YesIntent": function() {
		let bool = true;
		handleYesNo.bind(this)(bool);
	},
	"AMAZON.NoIntent": function() {
		let bool = false;
		handleYesNo.bind(this)(bool);
	}
};
