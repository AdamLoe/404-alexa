var knex = require("../helpers/knexfile");

var setGoalLog = (goalID, userID) => {  return new Promise((resolve, reject) => {
    console.log('setGoalLogcalled', goalID, userID);

		knex("wp_goal_log")
			.insert({
				userID: userID,
				goalID: goalID
			})
			.then(function(data) {
				console.log("Set new goal", data);
				resolve("Created");
			})
			.catch(err => reject(err));

})};

var getGoalLogID = (goalID, userID) => {  return new Promise((resolve, reject) => {
    console.log('getGoalLogID called', goalID, userID);

		knex("wp_goal_log")
			.select("goal_logID")
			.where("userID", userID)
			.where("goalID", goalID)
			.first()
			.then(function(data) {
				console.log("Goal log got: ", data);
				if (data === undefined) {
					resolve("Not Set");
				}
				else {
					resolve(data.goal_logID);
				}
			})
			.catch(err => reject(err));

})};

var updateGoalLog = (goalLogID, goalValue) => {  return new Promise((resolve, reject) => {
    console.log('updateGoalLog', goalLogID, goalValue);

        knex("wp_goal_archive")
            .insert({
                goal_logID: goalLogID,
                goal_value: goalValue
            })
            .then(function(data) {
                console.log('Updating goal log worked ', data);
                resolve(data);
            })
            .catch(err => reject(err))

})};

module.exports = {
    "ChangeWeight": async function() {

        let weight = this.event.request.intent.slots.weight.value;
        this.attributes.weight = weight;

        let goalID = 1;
        let userID = 1;

        try {
            let logID = await getGoalLogID(goalID, userID);

            if (logID === 'Not Set') {
                await setGoalLog(goalID, userID);
                logID = await getGoalLogID(goalID, userID);
            }

            await updateGoalLog(logID, weight);
            this.emit(":ask", "Thanks for telling me you weigh " + weight + " pounds");

        }
        catch (err) {

            console.log('Error updating weight', err);
            this.emit(":ask", "Error updating weight, please try again");

        }


    },
    "SetGoal": async function() {

        var dialogState = this.event.request.dialogState;
        var goalToGet = this.event.request.intent.slots.goalToGet;
        if (dialogState !== "COMPLETED") {
            console.log("Delegate slots");
            this.emit(":delegate");
        } else {

        }
    },
}
