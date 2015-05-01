var Model = (function() {
	"use strict";

	var model = {
		player : {
			x: 0,
			y: 0,
			speed: 5,
			destination: null,
			isMoving: function() { return !!this.destination; },
			setDestination: function(directions) {
				this.destination = {
					x: this.x,
					y: this.y,
					origX: this.x,
					origY: this.y,
					progress: 0,
					directions: directions,
					movingX: directions[0] === "left" || directions[0] === "right",
					movingY: directions[0] === "up"   || directions[0] === "down" ,
					direction: Game.directionToInt(directions[0])
				};
				switch (directions[0]) {
				case "left" : --this.destination.x; break;
				case "right": ++this.destination.x; break;
				case "up"   : --this.destination.y; break;
				case "down" : ++this.destination.y; break;
				}
			},
			move: function(delta) {
				if (!model.player.isMoving()) return;
				var destination = model.player.destination;

				destination.progress += delta / 1000 * model.player.speed;
				if (destination.progress >= 1)
					destination.progress = 1;

				if (destination.movingX)
					model.player.x = destination.origX + destination.progress * destination.direction;
				if (destination.movingY)
					model.player.y = destination.origY + destination.progress * destination.direction;

				if (destination.progress === 1)
					model.player.destination = null;
			}
		},
		world : {
			width : 27,
			height: 12
		}
	};

	model.update = function(delta) {
		if (!model.player.isMoving() && Input.arrows().length > 0)
			model.player.setDestination(Input.arrows());

		model.player.move(delta);

		if (model.player.x >= model.world.width ) model.player.x = 0;
		if (model.player.y >= model.world.height) model.player.y = 0;
		if (model.player.x < 0) model.player.x = model.world.width  - 1;
		if (model.player.y < 0) model.player.y = model.world.height - 1;
	};

	return model;

}());
