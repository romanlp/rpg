var Game = (function() {
	"use strict";

	var lastTick = 0;
	var model = new Model();
	var renderer = new Renderer(model);

	var gameLoop = function(e) {
		var currentTime = createjs.Ticker.getTime();
		var delta = currentTime - lastTick;
		lastTick = currentTime;

		model.update(delta);
		renderer.render(e);
	};

	var run = function() {
		Input.setUpKeyBindings();
		renderer.init();
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
