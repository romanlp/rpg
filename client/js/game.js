var Game = (function() {
	"use strict";

	var lastTick = 0;

	var gameLoop = function(e) {
		var currentTime = createjs.Ticker.getTime();
		var delta = currentTime - lastTick;
		lastTick = currentTime;

		Model.update(delta);
		Renderer.render(e);
	};

	var run = function() {
		Input.setUpKeyBindings();
		Renderer.init();
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", gameLoop);
	};

	var directionToInt = function(direction) {
		switch (direction) {
		case "up"   :
		case "left" : return -1;
		case "down" :
		case "right": return 1;
		}
	};

	return {
		directionToInt: directionToInt,
		run: run
	};

})();
