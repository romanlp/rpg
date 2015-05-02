const Renderer = (function() {
	"use strict";

	let stage,
	    background,
	    gridOverlay,
	    player;

	const squareSize = 50,
		  tileScale  = 1.57;

	function buildGridOverlay() {
		const grid = new createjs.Shape();
		grid.graphics.beginStroke("white");
		for (let i = 0 ; i < Model.world.width ; ++i) {
			grid.graphics
				.moveTo(i*squareSize, 0)
				.lineTo(i*squareSize, Model.world.height*squareSize-1);
		}
		for (let j = 0 ; j < Model.world.height ; ++j) {
			grid.graphics
				.moveTo(0                             , j*squareSize)
				.lineTo(Model.world.width*squareSize-1, j*squareSize);
		}
		grid.graphics.endStroke();
		return grid;
	};

	function init() {
		const canvas = document.getElementById("gameCanvas");
		canvas.width  = Model.world.width  * squareSize;
		canvas.height = Model.world.height * squareSize;

		stage = new createjs.Stage("gameCanvas");

		background = new createjs.Shape();
		background.graphics.beginFill("#9cf292")
			               .drawRect(0, 0,
									 squareSize * Model.world.width,
									 squareSize * Model.world.height);

		const grid = buildGridOverlay();

		stage.addChild(background, grid);

		const imgPerso1 = new Image();
		imgPerso1.src = "img/characters/perso1.png";

		const spriteSheet = new createjs.SpriteSheet({
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

		const imgMap = new Image();
		imgMap.src = "img/tilesets/" + Map.tileset;

		const mapSheet = new createjs.SpriteSheet({
			images: [imgMap],
			frames: {width: 32, height: 32, regX: 0, regY: 0}
		});

		Map.layer1.forEach((element, index) => {
    		const tileSprite = new createjs.Sprite(mapSheet);
    		tileSprite.gotoAndStop(element);

    		tileSprite.scaleX = tileScale;
    		tileSprite.scaleY = tileScale;
    		tileSprite.x = index % Model.world.width * squareSize;
    		tileSprite.y = Math.floor(index / Model.world.width) * squareSize;
    		stage.addChild(tileSprite);
		});

		Map.layer2.forEach((element, index) => {
    		const tileSprite = new createjs.Sprite(mapSheet);
    		tileSprite.gotoAndStop(element);

    		tileSprite.scaleX = tileScale;
    		tileSprite.scaleY = tileScale;
    		tileSprite.x = index % Model.world.width * squareSize;
    		tileSprite.y = Math.floor(index / Model.world.width) * squareSize;
    		stage.addChild(tileSprite);
		});

		player = new createjs.Sprite(spriteSheet);
		player.isMoving = false;
		stage.addChild(player);
	};

	function movePlayer() {
		if (!player.isMoving && Model.player.isMoving()) {
			player.isMoving = true;
			player.origX = player.x;
			player.origY = player.y;
			player.gotoAndPlay(Model.player.destination.directions[0]);
		}
		else if (player.isMoving && !Model.player.isMoving()) {
			player.isMoving = false;
		}

		if (player.isMoving) {
			player.x = Model.player.x * squareSize;
			player.y = Model.player.y * squareSize;
		}

	};

	function render(e) {
		movePlayer();
		stage.update(e);
	};

	return {
		init  ,
		render
	};

})();
