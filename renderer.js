var Renderer = (function() {
	"use strict";

	var stage,
	background,
	gridOverlay,
	player;

	var squareSize = 50;
	var i= 0;
	var time = 0;

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
		background.graphics.beginFill
		var grid = buildGridOverlay();



		var imgPerso1 = new Image();

		imgPerso1.src = "img/characters/perso1.png";

    // create spritesheet and assign the associated data.
    var spriteSheet = new createjs.SpriteSheet({
    	// image to use
    	images: [imgPerso1], 
    	// width, height & registration point of each sprite
    	frames: {width: 50, height: 85, regX: 0, regY: 0}, 
    	animations: {    
    		up: 	[12, 15, "up", 0.250],
    		down: 	[0, 3, "down", 0.250],
    		right: 	[8,11, "right", 0.250],
    		left: 	[4, 7, "left", 0.250],
    	},
    	framerate: 20


    });

    player = new createjs.Sprite(spriteSheet);
	
	stage.addChild(background, grid, player);
	
	};

	var playerMove = function() {
		var moveX = 0;
		var moveY = 0;

		switch(Model.player.direction){
				case "up":
					moveY = -1;
					break;
				case "down":
					moveY = 1;
					break;
				case "left":
					moveX = -1;
					break;
				case "right":
					moveX = 1;
					break;

		}

		if (i === 0 && Model.player.moving) {
			Model.movable = false;
			Model.player.moving = false;
			player.gotoAndPlay(Model.player.direction);
			++i;
		}
		else if(i === 4) {
			i=0;
			player.stop();
			Model.movable = true;
			player.x += moveX * squareSize/4;
			player.y += moveY * squareSize/4;
		}
		else if (i > 0  && i < 4){
			player.x += moveX * squareSize/4;
			player.y += moveY * squareSize/4;
			i++;
		}
	}

	var render = function() {
		
		if(createjs.Ticker.getTime() - time > 2500/60){
			time = createjs.Ticker.getTime();
			playerMove();
		}
		
		stage.update();
	};
	
	return {
		init  : init,
		render: render
	};

})();