var constants = Object.freeze({
    // Null so it works with everything
   appId: '',

    //Stores alexa state here, lambda will need dynamoDB privileges for this
    dynamoDBTableName: '404users',

    //State variable that defines what state we are in
    //As in, if we are in survey state, we can only access handlers in our survey file
    states: {
        SETUP: '_SETUP',
        MAIN: '_MAIN',
        SURVEY: '_SURVEY'
    }

});

module.exports = constants;