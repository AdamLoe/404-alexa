var knex = require('./knexfile');

module.exports = function (event) {
    console.log('UpdateState called', JSON.stringify(event.session.attributes));
    knex('alexa_state')
        .update({
            state: JSON.stringify(event.session.attributes)
        })
        .where({
            userID: event.session.user.userId
        })
        .then(function(data) {
            console.log("Update state worked", data)
        })
        .catch(function(err) {
            console.log("Update state failed", err);
        })
};