var Model = (function() {
    "use strict";

    var model = {
	player : { x: null,
		   y: null },
	world : { width : 27,
		  height: 12 }
    };
    
    model.update = function() {
	if (Input.left)  model.player.x -= 1;
	if (Input.right) model.player.x += 1; 
	if (Input.up)    model.player.y -= 1; 
	if (Input.down)  model.player.y += 1; 
		
	if (model.player.x >= model.world.width ) model.player.x = 0;
	if (model.player.y >= model.world.height) model.player.y = 0;
	if (model.player.x < 0) model.player.x = model.world.width  - 1;
	if (model.player.y < 0) model.player.y = model.world.height - 1;
    };

    return model;
    
}());