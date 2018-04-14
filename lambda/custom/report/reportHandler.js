var reportStart = require("./reportStart");
var reportMiddle = require("./reportMiddle");
var reportEnd = require("./reportEnd");

module.exports = {
	"Report": function() {
		let dialogState = this.event.request.dialogState;
		console.log("Report called: ", dialogState);
		console.log('');

		if (dialogState === "STARTED") {
			//Load old report from user State
			reportStart.bind(this)();
		}
		else if (dialogState === "COMPLETED") {
			//Send it to the DB
			reportEnd.bind(this)();
		} else {
			//Everything else
			reportMiddle.bind(this)();
		}
	},
	"DeleteReport": function() {
		this.attributes.slots = null;
		this.emit(":ask", "You deleted your report");
	}
};