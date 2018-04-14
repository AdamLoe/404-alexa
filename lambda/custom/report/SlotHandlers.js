var checkFormat = (date) => {
	var dateFormat = new RegExp("[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]");
	return dateFormat.test(date);
};

var checkYear = (date) => {
	return date.slice(0,4) < "2015";
};


exports.Birthday = function (value) {
	if (checkFormat(value)) {
		if (checkYear(value)) {
			this.emit(":delegate");
		}
		else {
			let speech = "Please include the year in your birthday";
			let reprompt = "What is your birthday?";
			this.emit(":elicitSlot", "Birthday", speech, reprompt);
		}
	}
	else {
		let speech = "Sorry I didn't get that, What is your birthday?";
		this.emit(":elicitSlot", "Birthday", speech);
	}
};

exports.Gender = function (value) {
	let updatedIntent = this.event.request.intent;

	if (value === "male") {
		updatedIntent.slots["PregnantBefore"].value = false;
		updatedIntent.slots["PregnantOrNursing"].value = false;
		this.attributes.slots = updatedIntent["slots"];
	}

	this.emit(":delegate", updatedIntent);
};

exports.Height = function(value) {
	let updatedIntent = this.event.request.intent;

	let inches = updatedIntent.slots["HeightInches"];
	if (inches.value === null) {
		updatedIntent.slots["HeightInches"].value = 0;
		this.attributes.slots = updatedIntent["slots"];
	}

	this.emit(":delegate", updatedIntent);
};