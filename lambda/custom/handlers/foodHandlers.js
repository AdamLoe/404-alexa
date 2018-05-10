let knex = require("../helpers/knexfile");
let axios = require("../helpers/axiosFile");

let getFoodAPI = function(food) { return new Promise((resolve, reject) => {

    axios.post("/", {
        query: food
    })
        .then((res) => {
            resolve(res.data.foods);
        })
        .catch((err) => {
            console.log('getFoodAPI error', err);
            this.emit(":ask", "I've never heard of that food before");
        })
    /*
     .catch(err => reject("I've never heard of that food before"))
     */
})}

let logFood = function(food, userID) { return new Promise((resolve) => {

    console.log('Log food called', food);

    knex("wp_nutrition_log")
        .insert({
            userID: 1,
            log_file_input: JSON.stringify({ food: food})
        })
        .then((data) => {
            resolve();
        })
        .catch((err) => {
            console.log('logFood Error', err);
            this.emit(':ask', 'Saving failed, please try again');
        })
        /*
        .catch(err => reject("Saving failed, please try again"))
        */
})};

let foodTypes = {
    'nf_calories': [
        'Calories', 'Cals'
    ],
    'nf_total_fat': [
		'total fat', 'fat'
	],
    'nf_sodium': [
		'Sodium', 'Salt'
    ],
    'nf_cholestorol': [
        'cholesterol'
    ],
    'nf_saturated_fat': [
		'Saturated Fat'
	],
    'nf_total_carbohydrates': [
        'total carbohydrates', 'carbohydrates', 'carbs'
    ],
    'nf_protein': [
        'protein'
    ]
};

let foodInfoResponse = (food, infoToGet) => {
	let res = 'A ' + food['food_name'] + ' has ';

    switch (infoToGet) {
        case 'calories':
			return res + food['nf_calories'] + ' calories';

        case 'fat':
			return res + food['nf_total_fat'] + ' total fat';

        case 'sodium':
			return res + food['nf_sodium'] + ' sodium ';

        case 'saturated fat':
			return res + food['nf_saturated_fat'] + ' saturated fat ';

        case 'sugar':
            return res + food['nf_sugar'];

        default:
            res += food['nf_calories'] + ' calories ';
            res += food['nf_total_fat'] + ' total fat ';
            res += food['nf_sodium'] + ' sodium ';
            return res;
    }
};


module.exports = {
    'addFood': async function() {
  		const alexaId      = this.event.context.System.user.userId;
  		const accessToken = this.event.context.System.user.accessToken;
  		console.log(`LINKED: ${alexaId} : ${accessToken}`);
        console.log('got attributes', this.attributes);
        console.log('logging food for user', this.attributes.userId);
        let foodItems = this.event.request.intent.slots.foodItems.value;

        let food = await getFoodAPI.bind(this)(foodItems);
        await logFood.bind(this)(food, this.attributes.userId);
        this.emit(':ask', "I've recorded what you ate");
    },
    "GetFoodInfo": async function() {
        let foodItem = this.event.request.intent.slots.foodItem.value;
        let infoToGet = this.event.request.intent.slots.nutritionInfo.value;

        let foods = await getFoodAPI.bind(this)(foodItem);
        let response = foodInfoResponse(foods[0], infoToGet);
        this.emit(':ask', response);
    }
};

/*
 goalsJSON = {
 "Goal": "lose weight",
 "PoundsPerWeek":
 "Weight": 180,
 "WeightHistory": [
 [ "Weight": 179, "Date", DateTime]
 [ "Weight": 178, "Date", DateTime]
 ]
 }
 */
