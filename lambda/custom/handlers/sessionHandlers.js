var defaultState = {

}

module.exports = {
	"SessionEndedRequest": function() {
		this.emit(":tell", "Goodbye");
	},
	"NewSession": function () {
		this.attributes = this.attributes || defaultState;

		this.emit(
			":ask",
			"Welcome to four oh four nutrition"
		);
	},
	"LaunchRequest": function () {
		this.emit("NewSession");
	}
};