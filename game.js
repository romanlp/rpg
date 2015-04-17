var Game = (function() {
    "use strict";
    
    var stage  = null;
    var player = null;
    var direction = [];
    var input = { "up": false, "down": false, "left": false, "right": false };
    var background  = null;
    var gridOverlay = null;

    var width  = 27;
    var height = 12;
    var squareSize = 50;

    var updateModel = function() {
	if (input.left)  player.x -= squareSize;
	if (input.right) player.x += squareSize; 
	if (input.up)    player.y -= squareSize; 
	if (input.down)  player.y += squareSize; 
		
	if (player.x >= width  * squareSize) player.x = 0;
	if (player.y >= height * squareSize) player.y = 0;
	if (player.x < 0) player.x = (width-1) * squareSize;
	if (player.y < 0) player.y = (height-1) * squareSize;
    };
    
    var render = function() {
	stage.update();
    };

    var gameLoop = function() {
	updateModel();
	render();
    };
    
    var buildGridOverlay = function() {
	var grid = new createjs.Shape();
	grid.graphics.beginStroke("white"); 
	for (var i = 0 ; i < width ; ++i) {
	    grid.graphics
		.moveTo(i*squareSize, 0)
		.lineTo(i*squareSize, height*squareSize-1);
	}
	for (var j = 0 ; j < height ; ++j) {
	    grid.graphics
		.moveTo(0                 , j*squareSize)
		.lineTo(width*squareSize-1, j*squareSize);
	}
	grid.graphics.endStroke();
	return grid;
    };
    
    var run = function() {
	var canvas = document.getElementById("gameCanvas");
	canvas.width  = width  * squareSize;
	canvas.height = height * squareSize;
	
	stage  = new createjs.Stage("gameCanvas");
	
	player = new createjs.Shape();
	player.graphics.beginFill("black").drawRect(1, 1, squareSize-2, squareSize-2);

	background = new createjs.Shape();
	background.graphics.beginFill("#9cf292").drawRect(0, 0, squareSize * width, squareSize * height);
	
	var grid = buildGridOverlay();
	
	stage.addChild(background, grid, player);
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", gameLoop);

	Mousetrap.bind("up"   , function() { input.up    = true; });
	Mousetrap.bind("down" , function() { input.down  = true; });
	Mousetrap.bind("left" , function() { input.left  = true; });
	Mousetrap.bind("right", function() { input.right = true; });

	Mousetrap.bind("up"   , function() { input.up    = false; }, "keyup");
	Mousetrap.bind("down" , function() { input.down  = false; }, "keyup");
	Mousetrap.bind("left" , function() { input.left  = false; }, "keyup");
	Mousetrap.bind("right", function() { input.right = false; }, "keyup");
    };
    
    return {
	run: run
    };
    
})();
