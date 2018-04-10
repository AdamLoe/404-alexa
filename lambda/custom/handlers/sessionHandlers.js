var defaultState = require('../constants/defaultState');

module.exports = {

    "SessionEndedRequest": function() {
        this.emit(":tell", "Goodbye");
    },
    "NewSession": function () {
        if (this.attributes == null) {
            this.attributes = defaultState;
        }

        this.emit(":ask",
            !this.attributes.weight?
                "Welcome User":
                "Welcome User that weighs " + state.weight + " pounds"
        );
        if (!this.attributes.weight) {
            this.emit(":ask", "Welcome User")
        } else {
            this.emit(":ask", "Welcome User that weighs " + state.weight + " pounds")
        }
    },

    "LaunchRequest": function () {
        this.emit(":ask", "Congrats, you launched the skill", "You gonna do something or did you just open this to hear my shitty intro");
    }
};