var Model = (function() {
	"use strict";

	var model = {
		player : { 
			x: null,
			y: null,
			direction: null,
			moving: false 
		},
		world : { 
			width : 27,
			height: 12 
		},
		movable: true
	};

	model.update = function() {
		if (Input.left && model.movable)  {
			model.player.x -= 1;
			model.player.direction = "left";
			model.player.moving = true;
			
		}
		if (Input.right && model.movable) {
			model.player.x += 1;
			model.player.direction = "right";
			model.player.moving = true;
		} 
		if (Input.up && model.movable)    {
			model.player.y -= 1;
			model.player.direction = "up";
			model.player.moving = true;
		} 
		if (Input.down && model.movable)  {
			model.player.y += 1; 
			model.player.direction = "down";
			model.player.moving = true;
			
		}

		if (model.player.x >= model.world.width ) {
			model.player.x = 0;
		}
		if (model.player.y >= model.world.height) {
			model.player.y = 0;
		}
		if (model.player.x < 0) model.player.x = model.world.width  - 1;
		if (model.player.y < 0) model.player.y = model.world.height - 1;
	};

	return model;

}());