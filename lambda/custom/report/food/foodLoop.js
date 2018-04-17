let axios = require("../../helpers/axiosFile");

let { foodStates, foodErrorSpeech } = require('../../helpers/speech');

let getFoodAPI = function(food) { return new Promise((resolve, reject) => {

    axios.post("/", {
        query: food
    })
        .then((res) => {
            resolve(res.data.foods);
        })
        .catch((err) => {
            console.log('getFoodAPI error', err);

			this.attributes.slots = slots;
            this.emit(":elicitSlot", "FoodLoop", foodErrorSpeech);
        })

})};

let getServingUnits = require("./getServingUnits");


module.exports = async function(value, slots) {
	let status = slots.FoodLoop.confirmationStatus;
	let foodStrings = foodStates[this.attributes.reportState];
	console.log('food loop called', status);

	if (status === "CONFIRMED") {

		this.attributes.slots = slots;
		this.emit(":elicitSlot", "FoodLoop", foodStrings.speech);

	} else if (status === "DENIED") {
		let state = this.attributes.reportState + 1;
		this.attributes.reportState = state;
		let updatedIntent = this.event.request.intent;

		if (this.attributes.reportState === foodStates.length) {

			slots.FoodLoop.confirmationStatus = 'CONFIRMED';
			this.attributes.slots = slots;
			updatedIntent.slots = slots;
			this.emit(":delegate", updatedIntent);

		}
		else {

			slots.FoodLoop.confirmationStatus = 'NONE';
			this.attributes.slots = slots;
			updatedIntent.slots = slots;
			this.emit(":confirmSlot", "FoodLoop", foodStates[state].confirm, updatedIntent);

		}

	} else {

        let foods = await getFoodAPI.bind(this)(value);
		console.log('got foods', foods);
        //await getServingUnits.bind(this)(foods); // Only returns if no foods have serving units

		this.attributes.slots = slots;
        this.attributes.foodLog.push(foods);
        this.emit(":confirmSlot", "FoodLoop", foodStrings.reconfirm);
	}
};

