var Game = (function() {
    "use strict";
    
    var gameLoop = function() {
	Model.update();
	Renderer.render();
    };
        
    var run = function() {
	Input.setUpKeyBindings();
	Renderer.init();
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", gameLoop);
    };
    
    return {
	run: run
    };
    
})();
