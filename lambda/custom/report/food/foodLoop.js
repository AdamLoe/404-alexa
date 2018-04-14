var axios = require("../../helpers/axiosFile");

var { foodStates, foodErrorSpeech } = require('../../helpers/speech');

var getFoodAPI = function(food) { return new Promise((resolve, reject) => {

    axios.post("/", {
        query: food
    })
        .then((res) => {
            resolve(res.data.foods);
        })
        .catch((err) => {
            console.log('getFoodAPI error', err);

            this.emit(":elicitSlot", "FoodLoop", foodErrorSpeech, updatedIntent);
        })

})};

var getServingUnits = require("./getServingUnits");


module.exports = async function(value) {
	let status = this.attributes.slots.FoodLoop.confirmationStatus;
	let foodStrings = foodStates[this.attributes.reportState];

	if (status === "CONFIRMED") {

		this.emit(":elicitSlot", "FoodLoop", foodStrings.confirm);

	} else if (status === "DENIED") {

		this.attributes.reportState += 1;
		if (this.attributes.reportState === foodStates.length) {
			this.emit(":delegate");
		}
		else {
            let foodStrings = foodStates[this.attributes.reportState];
			this.emit(":elicitSlot", "FoodLoop", foodStrings.speech);
		}

	} else {

        var foods = await getFoodAPI.bind(this)(value, state);

        await getServingUnits.bind(this)(foods); // Only returns if no foods have serving units

        this.attributes.foodLog.push(foods);
        this.emit(":confirmSlot", "FoodLoop", foodStrings.reprompt);
	}
};

