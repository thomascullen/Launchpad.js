var express = require('express');
var app = express();
var launchpad = require("./launchpad").create;
var launchpadColours = require("./launchpad").colours;
app.listen(3000);
console.log('Listening on port 3000');

var pad = new launchpad();


pad.events.on("press", function(button) {
    console.log(button+" was pressed");
    pad.light(button,launchpadColours.red);
});

pad.events.on("release", function(button) {
    console.log(button+" was released");
    pad.light(button,launchpadColours.none);
});