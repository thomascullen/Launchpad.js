#Launchpad.js
###### A node module for interacting with the Noviation Launchpad
---
###Setup
the launchpad method takes an optional port number. It defaults to port 0 if none is given.
```javascript
var express = require('express');
var app = express();
var launchpad = require("./launchpad").create;
var launchpadColours = require("./launchpad").colours;
app.listen(3000);
console.log('Listening on port 3000');
var pad = new launchpad();
```
---
###Button Press
```javascript
pad.events.on("press", function(button) {
	console.log(button+" was pressed");
    pad.light(button,launchpadColours.red);
});
```
---
###Button Release
```javascript
pad.events.on("release", function(button) {
    console.log(button+" was released");
    pad.light(button,launchpadColours.none);
});
```
