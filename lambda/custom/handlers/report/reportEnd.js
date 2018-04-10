var fixSlots = (slots) => {
    var response = {}
    for (var key in slots) {
        response[key]
    }
}

var makeArr = (...slots) => {
    var arr = []
    for (i in slots) {
        if (i !== null || i==='no') {
            arr.push(i)
        }
    }
}

module.exports = function() {
    //fix/validate slots
    //Rearrange slots

    var slots = fixSlots(this.attributes.slots);
  /*
   response.name = slots.name
   response.weight = slots.Weight
   response.height = slots.heightFeet + "'" + slots.heightInches + '"';
   response.mentalConditions = []
   response.mentalConditions = makeArr(
   mentalConditionsOne,
   mentalConditionsTwo
   )
   arr = [mentalCondition]
   for (i in [slots.mental])



   */
    //Here we manually have to set our return VALUES { mentalConditions.append(slots.mentalCodntions)}
    var response = {
        foodlog: this.attributes.reportFood,
    }
    response['foodlog'] = this.attributes.reportFood;
    this.attributes.reportFood;

    response['foodlog'] = this.attributes.reportFood;
    var response = {}
    this.emit(":ask", "We did it?");
}


/*
 INSERT INTO wordpress.wp_assessment_log (userID, assessment_log_file) VALUES ( 7, '{"heightft": "6", "heightin": "0", "weight": "200","birthday": "05/05/2005","gender": "Male","activity_level": "Moderate Activity (sports 3-5 days per week)","allergies": ["Gluten", "Soy", "Eggs"],"diets": ["Paleo", "Low-Sodium"],"smoker": "No","drinker": "No","injured": "No","sleep": "No","nutritionapiinfo": "blah","extras": "Sweets or gum","conditions": ["Acid Reflux", "Sleep apnea"],"water": "2 Cups","supplements": "No","stress": "Low (never stressed)","mentalconditions": ["ADD/ADHD", "Depression"],"howmanyvisits": "Less than 6 times a year","stresseat": "Yes","foodcomfort": "Yes","troubleweightloss": "Not applicable","occupation": "Programmer","exercisetime": "6 hours","caffeine": "5 cups of coffee","everpregnant": "No","nursing": "No"}');


 */
