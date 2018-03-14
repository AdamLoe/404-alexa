/**
 * Created by Adam on 3/14/2018.
 */

var logger = function(event, context) {
    // Get intent type/name, so LaunchRequest, NewSession, ChangeWeight, AddFood
    var intentType = event.request.type;
    //If its a intentRequest, we will want to display what type of intent
    if (intentType === 'IntentRequest') {
        intentType = event.request.intent.name;
        console.log('-----------', intentType, '------------');
        console.log('slots', event.request.intent.slots);
    }
    else {
        console.log('-----------', intentType, '------------');
    }

    //For full debugging we can just log everything about the requests, but that makes our logs messy
    /*
    console.log('event', event);
    console.log('context', context);
    */
};

module.exports = logger;