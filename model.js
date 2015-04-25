var Model = (function() {
    "use strict";

    var model = {
	player : { 
	    x: 0,
	    y: 0,
	    speed: 3,
	    destination: null,
	    isMoving: function() { return !!this.destination; },
	    setDestination: function(directions) {
		this.destination = {
		    x: this.x,
		    y: this.y,
		    origX: this.x,
		    origY: this.y,
		    progress: 0,
		    directions: directions
		};
		switch (directions[0]) {
		case "left" : --self.destination.x; break;
		case "right": ++self.destination.x; break;
		case "up"   : --self.destination.y; break;
		case "down" : ++self.destination.y; break;
		}
	    },
	    move: function(delta) {
		if (!model.player.isMoving()) return;

		model.player.destination.progress += delta / 1000 * model.player.speed;
		if (model.player.destination.progress >= 1)
		    model.player.destination.progress = 1; 
		
		var direction = Game.directionToInt(model.player.destination.directions[0]);
		var movingX = model.player.destination.directions[0] === "left" || model.player.destination.directions[0] === "right",
		    movingY = model.player.destination.directions[0] === "up"   || model.player.destination.directions[0] === "down";
		
		if (movingX) model.player.x = model.player.destination.origX + model.player.destination.progress * direction;
		if (movingY) model.player.y = model.player.destination.origY + model.player.destination.progress * direction;

		if (model.player.destination.progress === 1)
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