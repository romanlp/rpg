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
    				.moveTo(0                             , j*squareSize)
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

		background = new createjs.Shape();
		background.graphics.beginFill("#9cf292").drawRect(0, 0,
								  squareSize * Model.world.width,
								  squareSize * Model.world.height);

		var grid = buildGridOverlay();

		var imgPerso1 = new Image();
		imgPerso1.src = "img/characters/perso1.png";

		var spriteSheet = new createjs.SpriteSheet({
    			images: [imgPerso1],
    			frames: {width: 50, height: 85, regX: 0, regY: 0},
    			animations: {
				standUp   : [12, 12],
				standDown : [ 0,  0],
				standLeft : [ 4,  4],
				standRight: [ 8,  8],
				up: 	[13, 15, "standUp"   , 0.20 * Model.player.speed],
    				down: 	[1 , 3 , "standDown" , 0.20 * Model.player.speed],
    				right: 	[9 , 11, "standRight", 0.20 * Model.player.speed],
    				left: 	[5 , 7 , "standLeft" , 0.20 * Model.player.speed]
    			},
    			framerate: 20
		});

		player = new createjs.Sprite(spriteSheet);
		player.isMoving = false;
		player.third = 0;

		stage.addChild(background, grid, player);

	};

	var movePlayer = function() {
		if (!player.isMoving && Model.player.isMoving()) {
			player.isMoving = true;
			player.origX = player.x;
			player.origY = player.y;
			player.gotoAndPlay(Model.player.destination.directions[0]);
		}
		else if (player.isMoving && !Model.player.isMoving()) {
			player.isMoving = false;
			player.third  = 0;
		}

		if (player.isMoving) {
			player.x = Model.player.x * squareSize;
			player.y = Model.player.y * squareSize;
		}

	};

	var render = function(e) {
		movePlayer();
		stage.update(e);
	};

	return {
		init  : init,
		render: render
	};

})();
