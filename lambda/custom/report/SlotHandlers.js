let checkFormat = (date) => {
	let dateFormat = new RegExp("[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]");
	return dateFormat.test(date);
};

let checkYear = (date) => {
	return date.slice(0,4) < "2015";
};

let getYearSpeech = "Please include the year in your birthday";
let getYearReprompt = "What is your birthday?";

let wrongBirthday = "Sorry I didn't get that, What is your birthday?";
exports.Birthday = function (value, slots) {
	console.log('Birthday hit', value, slots);

	if (checkFormat(value) && checkYear(value)) {
		this.attributes.slots.Birthday.value = slots.Birthday.value;
		this.emit(":delegate");

	} else if (checkFormat(value)) {
		slots.Birthday.value = "null";
		this.attributes.slots.Birthday.value = slots.Birthday.value;
		this.emit(":elicitSlot", "Birthday", getYearSpeech, getYearReprompt);
		
	} else {
		slots.Birthday.value = "null";
		this.attributes.slots.Birthday.value = slots.Birthday.value;
		this.emit(":elicitSlot", "Birthday", wrongBirthday, wrongBirthday);
	}
};

exports.Gender = function (value, slots) {
	if (value === 'male') {
		slots.PregnantBefore.value = "false";
		slots.PregnantOrNursing.value = "false";
	}

	this.attributes.slots = slots;
	let updatedIntent = this.event.request.intent;
	updatedIntent.slots = slots;
	this.emit(":delegate", updatedIntent);
};

exports.Height = function(value, slots) {
	slots.HeightInches.value = slots.HeightInches.value || 0;

	this.attributes.slots = slots;
	let updatedIntent = this.event.request.intent;
	updatedIntent.slots = slots;
	this.emit(":delegate", updatedIntent);
};