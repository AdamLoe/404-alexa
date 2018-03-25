var knex = require('./knexfile');

module.exports = function(event) {
    console.log('Create state called');
    knex('alexa_state')
        .insert({
            userID: event.session.user.userId,
            state:  JSON.stringify(event.session.attributes)
        })
        .then(function(data) {
            console.log('createState worked', data);
        })
        .catch(function(err) {
            console.log('Err creating state', err)
        })
};