var midi = require("midi");
var eventEmitter = require('events');
var input = new midi.input();
var output = new midi.output();

var create = function(port){
	inputPort = port || 0;
	outputPort = port || 0;

	var pad = this;

	pad.events = new eventEmitter.EventEmitter();
	
	console.log('Searching for input device on port ' +inputPort);
	if (input.getPortName(inputPort)){
		console.log('Found devise - '+input.getPortName(inputPort));
	}else{
		console.log('Could not find devise!')
	}

	console.log('Searching for output device on port ' +outputPort);
	if (output.getPortName(outputPort)){
		console.log('Found devise - '+output.getPortName(outputPort));
	}else{
		console.log('Could not find devise!')
	}

	output.openPort(outputPort);
	input.openPort(inputPort);

	// Show tick

	output.sendMessage([144,18,60]);
	output.sendMessage([144,34,60]);
	output.sendMessage([144,50,60]);
	output.sendMessage([144,21,60]);
	output.sendMessage([144,37,60]);
	output.sendMessage([144,53,60]);
	output.sendMessage([144,81,60]);
	output.sendMessage([144,97,60]);
	output.sendMessage([144,98,60]);
	output.sendMessage([144,99,60]);
	output.sendMessage([144,100,60]);
	output.sendMessage([144,101,60]);
	output.sendMessage([144,102,60]);
	output.sendMessage([144,86,60]);

	var tick = setInterval(function(){
		pad.clearAll();
		clearTimeout(tick);
	},2000);


	// Button Press
	input.on('message', function(deltaTime, message) {
  		var button = message[1];
  		if ( message[2] == 127 ){
			pad.events.emit('press', button);
  		}else{
  			pad.events.emit('release', button);
  		}
	});

	this.light = function(button, colour){
		output.sendMessage([144,button,colour]);
	}

	this.flash = function(colour, clearTime){
		for ( var i = 0; i < 120; i++ ){
			if ( i != 104 && i != 88 && i != 72 && i != 56 && i != 40 && i != 24 && i !=8 ){
				pad.light(i,colour);
			}
		}

		var clearFlash = setInterval(function(){
			pad.clearAll();
			clearTimeout(clearFlash);
		},clearTime);
	}

	this.clearAll = function(){
		for ( var i = 0; i < 120; i++ ){
			pad.light(i,0);
		}
	}


}

var colours = {
	none:0,
	green:60,
	red:15,
	orange:63
}

exports.colours = colours;
exports.create = create;