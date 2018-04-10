module.exports = {
    "AMAZON.StopIntent": function() {
        this.emit(":ask", "No you stop bitch");
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":ask", "Cancel cancel cancel");
    },
    "AMAZON.YesIntent": function() {
        this.emit(":ask", "Yes yes yes");
    },
    "AMAZON.NoIntent": function() {
        this.emit(":ask", "No no no");
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", "You can say start a report, i weigh blank pounds, i ate this today, how many calories are in a jelly bean");
    }
}
