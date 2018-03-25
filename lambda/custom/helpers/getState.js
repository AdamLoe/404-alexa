var knex = require('./knexfile');
const defaultState = require('../constants/defaultState');

const createState = require('./createState');

module.exports = function (event, next) {
    console.log("Getting User State");
    if (
        (typeof event.session.attributes === "undefined")||
        (Object.keys(event.session.attributes).length === 0)
    ) {
        knex('alexa_state')
            .select('state')
            .where({
                userID: event.session.user.userId
            })
            .then(function(data) {
                if (data.length < 1) {
                    event.session.attributes = defaultState;
                    createState(event);
                }
                else {
                    console.log('Got session state from server', data);
                    event.session.attributes = JSON.parse(data[0].state);
                }
                next()
            })
            .catch(function(err) {
                console.log('Error getting state' ,err);
                next()
            })
    }
    else {
        console.log("User state already in session")
        next()
    }
};


