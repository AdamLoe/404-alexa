var reportStart = require('./reportStart');
var reportCore = require("./reportCore");
var reportEnd = require('./reportEnd');

module.exports = {
	"Report": function() {
    var dialogState = this.event.request.dialogState;
    console.log('Report called: ', dialogState);

    if (dialogState === 'STARTED') {
      //Load old report from user State
      reportStart.bind(this)()
    }
    else if (dialogState === 'COMPLETED') {
      //Send it to the DB
      reportEnd.bind(this)()
    } else {
      //Everything else
      reportCore.bind(this)()
    }
	},
  "DeleteReport": function() {
    this.attributes.slots = null;
    this.emit(':ask', 'You deleted your report');
  }
};
