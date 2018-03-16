/**
 * Created by Adam on 3/14/2018.
 */

var logger = function(event, context) {
    // Get intent type/name, so LaunchRequest, NewSession, ChangeWeight, AddFood
    var intentType = event.request.type;
    //If its a intentRequest, we will want to display what type of intent
    if (intentType === 'IntentRequest') {
        intentType = event.request.intent.name;
        console.log('-----------', intentType, '--- ---------');
        console.log('slots', event.request.intent.slots);
        console.log('intent', event.intent);
    }
    else {
        console.log('-----------', intentType, '--- ---------');
    }
    console.log('session', event.session  );
    console.log('event', JSON.stringify(event, null, 2));
    //For full debugging we can just log everything about the requests, but that makes our logs messy
    /*
    console.log('event', event);
    console.log('context', context);
    */
};

module.exports = logger;
