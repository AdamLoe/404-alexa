var reportStart = require("./reportStart");
var reportMiddle = require("./reportMiddle");
var reportEnd = require("./reportEnd");

module.exports = {
	"Report": function() {
		let dialogState = this.event.request.dialogState;
		console.log("Report called: ", dialogState);

		if (dialogState === "STARTED") {
			//Load old report from user State
			reportStart.bind(this)();
		}
		else if (dialogState === "COMPLETED") {
			//Send it to the DB
			reportEnd.bind(this)();
		} else {
			//Everything else
			try {
				reportMiddle.bind(this)();
			}
			catch(err) {
				console.log('ERR', err);
			}
		}
	},
	"DeleteReport": function() {
		this.attributes.slots = null;
		this.emit(":ask", "You deleted your report");
	}
};