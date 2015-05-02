const Game = (function() {
	"use strict";

	let lastTick = 0;

	function gameLoop(e) {
		const currentTime = createjs.Ticker.getTime();
		const delta = currentTime - lastTick;
		lastTick = currentTime;

		Model.update(delta);
		Renderer.render(e);
	};

	function run() {
		Input.setUpKeyBindings();
		Renderer.init();
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", gameLoop);
	};

	function directionToInt(direction) {
		switch (direction) {
		case "up"   :
		case "left" : return -1;
		case "down" :
		case "right": return 1;
		}
	};

	return {
		directionToInt,
		run
	};

})();
