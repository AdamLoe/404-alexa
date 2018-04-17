module.exports = function() {
	console.log("Report start called");
	//If we just started, check if we have a version saved
	var updatedIntent = this.event.request.intent;
	console.log("With slots", updatedIntent.slots);


	if (this.attributes.slots !== null) {
		console.log("Found slots from dynamoDB");
		updatedIntent.slots= this.attributes.slots;
	} else {
		this.attributes.reportState = 0;
		this.attributes.foodLog = [];
		this.attributes.servingFoods = [];
		this.attributes.slots = updatedIntent.slots;
		this.attributes.slots["FoodLoop"].value = "AHHH";
		this.attributes.slots["FoodAllergyTwo"].value = "AHHH";
		this.attributes.slots["MedicalConditionTwo"].value = "AHHH";
		this.attributes.slots["MentalConditionTwo"].value = "AHHH";
		this.attributes.slots["DietTwo"].value = "AHHH";
	}
	console.log('Finished Request Start');
	this.emit(":delegate", updatedIntent);
	console.log('Finished Request Start');
};
