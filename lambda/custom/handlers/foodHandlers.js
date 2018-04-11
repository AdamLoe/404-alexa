var knex = require("../helpers/knexfile");
var axios = require("../helpers/axiosFile");


var getFoodAPI = function(food) { return new Promise((resolve, reject) => {

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

var logFood = function(food, userID) { return new Promise((resolve) => {

    console.log('Log food called', food, userID);

    knex("alexa_nutrition_log")
        .insert({
            userID: userID,
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
})}

var foodInfoResponse = (food, infoToGet) => {
    var res = 'A ' + food['food_name'] + ' has ';
    switch (infoToGet) {
        case 'calories':
            res += food['nf_calories'] + ' calories';
            break;
        case 'fat':
            res += food['nf_total_fat'] + ' total fat';
            break;
        case 'sodium':
            res += food['nf_sodium'] + ' sodium ';
            break;
        default:
            res += food['nf_calories'] + ' calories ';
            res += food['nf_total_fat'] + ' total fat ';
            res += food['nf_sodium'] + ' sodium ';
    }
    return res;
}


module.exports = {
    'addFood': async function() {
        let foodItems = this.event.request.intent.slots.foodItems.value;

        let food = await getFoodAPI.bind(this)(foodItems);
        await logFood.bind(this)(food, this.event.session.user.userId);
        this.emit(':ask', 'Ok, you ate those things');
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

