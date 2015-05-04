const Game = (function() {
	"use strict";

	let lastTick = 0;
	let model = new Model();
	let renderer = new Renderer(model);

	function gameLoop(e) {
		const currentTime = createjs.Ticker.getTime();
		const delta = currentTime - lastTick;
		lastTick = currentTime;

		model.update(delta);
		renderer.render(e);
	};

	function run() {
		Input.setUpKeyBindings();
		renderer.init();
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
