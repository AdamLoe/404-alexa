var Alexa = require("alexa-sdk");

module.exports = {
    "NewSession": function () {
        var state = this.event.session.attributes;
        if (state.weight !== undefined) {
            this.emit(":ask", "Welcome User")
        } else {
            this.emit(":ask", "Welcome User that weighs " + state.weight + " pounds")
        }
    },

    "LaunchRequest": function () {
        this.emit(":ask", "Congrats, you launched the skill", "You gonna do something or did you just open this to hear my shitty intro");
    }

};