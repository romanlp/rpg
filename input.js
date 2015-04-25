var Input = (function() {
    "use strict";
    
    var input = {
	up   : false,
	down : false,
	left : false,
	right: false
    };
    
    input.setUpKeyBindings = function() {
	Mousetrap.bind("up"   , function() { input.up    = true; });
	Mousetrap.bind("down" , function() { input.down  = true; });
	Mousetrap.bind("left" , function() { input.left  = true; });
	Mousetrap.bind("right", function() { input.right = true; });

	Mousetrap.bind("up"   , function() { input.up    = false; }, "keyup");
	Mousetrap.bind("down" , function() { input.down  = false; }, "keyup");
	Mousetrap.bind("left" , function() { input.left  = false; }, "keyup");
	Mousetrap.bind("right", function() { input.right = false; }, "keyup");	
    };

    input.arrows = function() {
	var res = [];
	if (this.up)    res.push("up");
	if (this.down)  res.push("down");
	if (this.left)  res.push("left");
	if (this.right) res.push("right");
	return res;
    };
    
    return input;
    
})();
