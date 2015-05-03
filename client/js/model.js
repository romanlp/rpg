class Model {

	constructor(){

		this.player = new Player();

		this.map = new Map();

		this.world = {
			width : 27,
			height: 12
		}
	}

	update(delta) {
		if (!this.player.isMoving() && Input.arrows().length > 0)
			this.player.setDestination(Input.arrows());

		this.player.move(delta);

		if (this.player.x >= this.world.width ) this.player.x = 0;
		if (this.player.y >= this.world.height) this.player.y = 0;
		if (this.player.x < 0) this.player.x = this.world.width  - 1;
		if (this.player.y < 0) this.player.y = this.world.height - 1;
	}
}