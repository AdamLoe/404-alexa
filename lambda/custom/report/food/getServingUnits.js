var getAltMeasurements = (food) => {
	for (var obj in food) {
		switch(obj.measure) {
			case unitTypes[0]:
				break;
			case unitTypes[1]:
				break;
			case unitTypes[2]:
				break;
			default:
		}
	}
};

var drinkSizes = ["serving (16.9 fl oz)", "serving (8 fl oz)", "serving (12 fl oz)"];
var generalSizes = ["serving small", "serving medium", "serving large"];

var checkAltServUnits = (food) => {
	var altSizes = getAltMeasurements(food, drinkSizes) || getAltMeasurements(food, generalSizes);
	if (altSizes === null) { return null; }

	food.smallFactor  = altSizes[0] / food.serving_weight_grams;
	food.mediumFactor = altSizes[1] / food.serving_weight_grams;
	food.largeFactor  = altSizes[2] / food.serving_weight_grams;
	food.type = "Drink";
	return food;
};

var checkServingUnit = (food) => {
	let servUnit = food.serving_unit;

	switch (servUnit) {
		case "tbsp":
			break;

		case "cup":
			break;

		case "slice":
			break;

		case "can":
			break;

		default:
			return null;

	}
};

var getServingFoods = (foods) => {
	let servFood = [];
	for (let key in foods) {
		let food = foods[key];
		food = checkServingUnit(food) || checkAltServUnits(food);
		if (food !== null) {
			servFood += [food];
		}
	}
};

module.exports = function(foods) { return new Promise((resolve) => {

	let servFoods = getServingFoods(foods);
	this.attributes.servingFoods.concat(servFoods);

	if (servFoods.length === 0) {
		resolve(); //If no foods have serving units, just ask next question
	} else {
		askServing(servFoods[0]);
	}

});};