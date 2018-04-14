var defaultState = {
	isNew: true
};

module.exports = {
	"SessionEndedRequest": function() {
		this.emit(":tell", "Goodbye");
	},
	"NewSession": function () {
		this.attributes = this.attributes || defaultState;


		this.attributes.lastQuestion = {
			type: "Help",
			command: "default"
		};
		if (this.attributes.isNew) {
			this.emit(
				":ask",
				"Welcome to four oh four nutrition, a skill designed to log your daily food intake and weight, " +
				"make sure to login into our website to see graph of your progress and share your data with your" +
				"nutritionist,",
				"would you like some help?"
			);
		}
		else {
			this.emit(
				":ask",
				"Welcome to four oh four nutrition",
				"would you like some help?"
			);
		}
	},
	"LaunchRequest": function () {
		this.emit("NewSession");
	}
};