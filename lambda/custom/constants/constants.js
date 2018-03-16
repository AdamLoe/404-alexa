var constants = {
	//Null so it works with all app id, change on production for security
	appId: "",

	dynamoDBTableName: "404alexaUsers",

	states: {
		main: "",
		register: "_REGISTER",
		report: "_REPORT",
		survey: "_SURVEY"
	}
};

module.exports = constants;
