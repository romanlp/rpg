var Renderer = (function() {
    "use strict";

    var stage,
	background,
	gridOverlay,
	player;

    var squareSize = 50;
    
    var buildGridOverlay = function() {
	var grid = new createjs.Shape();
	grid.graphics.beginStroke("white"); 
	for (var i = 0 ; i < Model.world.width ; ++i) {
	    grid.graphics
		.moveTo(i*squareSize, 0)
		.lineTo(i*squareSize, Model.world.height*squareSize-1);
	}
	for (var j = 0 ; j < Model.world.height ; ++j) {
	    grid.graphics
		.moveTo(0                 , j*squareSize)
		.lineTo(Model.world.width*squareSize-1, j*squareSize);
	}
	grid.graphics.endStroke();
	return grid;
    };

    var init = function() {
	var canvas = document.getElementById("gameCanvas");
	canvas.width  = Model.world.width  * squareSize;
	canvas.height = Model.world.height * squareSize;

	stage = new createjs.Stage("gameCanvas");
	
	player = new createjs.Shape();
	player.graphics.beginFill("black").drawRect(1, 1, squareSize-2, squareSize-2);

	background = new createjs.Shape();
	background.graphics.beginFill("#9cf292").drawRect(0, 0,
							  squareSize * Model.world.width,
							  squareSize * Model.world.height);
	
	var grid = buildGridOverlay();
	
	stage.addChild(background, grid, player);
    };
    
    var render = function() {
	player.x = Model.player.x * squareSize;
	player.y = Model.player.y * squareSize;
	
	stage.update();
    };

    return {
	init  : init,
	render: render
    };
    
})();