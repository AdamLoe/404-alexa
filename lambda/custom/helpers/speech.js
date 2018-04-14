exports.foodStates =  [
	{
		name: "breakfast",
		confirm: "Did you eat anything for breakfast",
		speech: "What did you eat?",
		reprompt: "Anything else for breakfast?"
	},
	{
		name: "lunch",
		confirm: "What about before lunch?",
		speech: "and you had?",
		reprompt: "Forgetting anything?"
	},
	{
		name: "lunch",
		confirm: "Did you have anything for lunch?",
		speech: "What did you have",
		reprompt: ""
	},
	{
		name: "after lunch",
		confirm: "Any mid day snacks?",
		speech: "What did you eat for dinner?",
		reprompt: "What else did you have for dinner?"
	},
	{
		name: "dinner",
		speech: "",
	},
	{
		name: "late night snack"
	}
];

exports.foodErrorSpeech = "I didn't understand that, maybe try saying it differently";