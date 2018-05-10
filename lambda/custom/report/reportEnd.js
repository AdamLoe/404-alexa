var fixSlots = (slots) => {
	var response = {};
	for (var key in slots) {
		response[key];
	}
};

var makeArr = (...slots) => {
	var arr = [];
	for (i in slots) {
		if (i !== null || i==="no") {
			arr.push(i);
		}
	}
};

var getBirthday = (birthday) => {

};

var getGender = (gender) => {

};

var getActLvl = (actlvl) => {

};

var getExerciseTime = (number, unit) => {

};

module.exports = function() {
	//fix/validate slots
	//Rearrange slots

	var slots = fixSlots(this.attributes.slots);
	var report = {
		//Adding foodlog,
		userid: this.event.session.user.userId,
		foodlog: this.attributes.foodLog,
		heightft: slots.HeightFood,
		heightin: slots.HeightInches,
		weight: slots.Weight,
		birthday: getBirthday(slots.Birthday), // 05/05/2005
		gender: getGender(slots.Gender), //Male
		activity_level: getActLvl(slots.ActivityLevel), //'Moderate Activity (sports 3-5 days per week)',
		allergies: makeArr(slots.FoodAllergyOne, slots.FoodAllergyTwo), //[ 'Gluten', 'Soy', 'Eggs' ],
		diets: makeArr(slots.DietOne, slots.DietTwo), //[ 'Paleo', 'Low-Sodium' ],
		smoker: slots.Smoker, //'No', 'Yes'
		drinker: slots.Alcoholic,
		injured: slots.Injury,
		sleep: slots.SleepEight,

		/*
         Tell them we are getting ridding of these two
         and adding foodlog
         nutritionapiinfo: 'blah',
         extras: 'Sweets or gum',
         */

		conditions: makeArr(slots.MedicalConditionOne, slots.MedicalConditionTwo), //[ 'Acid Reflux', 'Sleep apnea' ],
		water: slots.CupsOfWater,
		supplements: slots.VitaminTaker, // 'No'
		stress: slots.StressLevel, //'Low (never stressed)',
		mentalconditions: makeArr(slots.MentalConditionOne, slots.MentalConditionTwo), //[ 'ADD/ADHD', 'Depression' ],
		howmanyvisits: slots.HowOftenVisit, //'Less than 6 times a year',
		stresseat: slots.StressLevel,
		foodcomfort: slots.FoodIsComfort, //'Yes',
		troubleweightloss: slots.WeightTrouble, //'Not applicable',
		occupation: slots.Occupation, //'Programmer',
		exercisetime: getExerciseTime(slots.ExerciseNumber, slots.ExerciseUnit),
		caffeine: "5 cups of coffee",
		everpregnant: slots.PregnantBefore,
		nursing: slots.PregnantOrNursing
	};
	console.log("Attempting to send report ", report);
	knex("wp_assessment_log")
		.insert({
			userID: this.event.session.user.userId,
			assessment_log_file: report
		})
		.then(function(data) {
			console.log("Upload report worked", data);
			this.emit(":ask", "Report successfully finished and uploaded");
		})
		.catch(function(err) {
			console.log("Failed: Upload Report", err);
			this.emit(":ask", "Error uploading report, try again");
		});


};
