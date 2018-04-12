module.exports = function() {
	console.log("Report start called");
	//If we just started, check if we have a version saved
	var updatedIntent = this.event.request.intent;
	console.log("With slots", updatedIntent.slots);

	if (this.attributes.slots !== null) {
		console.log("Found slots from dynamoDB");
		updatedIntent["slots"] = this.attributes.slots;
	}
	else {
		this.attributes.reportState = 0;
	}
	this.attributes.slots = updatedIntent["slots"];
	this.emit(":delegate", updatedIntent);
};
