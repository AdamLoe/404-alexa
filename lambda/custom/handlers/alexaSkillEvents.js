let knex = require('../helpers/knexfile');


let getUserID = (accessToken) => {
	return new Promise((resolve, reject) => {
		knex("wp_oauth_tokens")
			.select("userid")
			.where("token", accessToken)
			.first()
			.then(function(data) {
				console.log("Got user ID: ", data);
				resolve(data.userid);
			})
			.catch(err => console.log(err));
	})
}
/**
 * Created by Adam on 4/13/2018.
 */
module.exports = {
	"AlexaSkillEvent.SkillAccountLinked": async function() {
		const alexaId      = this.event.context.System.user.userId;
		const accessToken = this.event.context.System.user.accessToken;
		console.log(`LINKED: ${alexaId} : ${accessToken}`);

		let userId = await getUserID(accessToken);
		console.log("got userId", userId);
		this.attributes = { 'userId': userId }
		console.log('got attrbiutes', this.attributes);
	},
	"AlexaSkillEvent.SkillEnabled" : function() {
		const userId = this.event.context.System.user.userId;
		console.log(`ENSABLED: ${userId}`);
	},
	"AlexaSkillEvent.SkillDisabled": function() {
		const userId = this.event.context.System.user.userId;
		console.log(`DISABLED: ${userId}`);
		console.log("event", this.event);
	}
};
