function Apple(game)
{
	this.game = game;

	this.pos = {
		x: -1,
		y: -1
	};
}

Apple.prototype.render = function ()
{
	if (this.pos.x != -1 && this.pos.y != -1) {
		this.game.context.beginPath();
		this.game.context.fillStyle = '#00aa00';
		this.game.context.arc(this.pos.x * this.game.cellSize + this.game.cellSize / 2, this.pos.y * this.game.cellSize + this.game.cellSize / 2, this.game.cellSize / 2 - 2, 0, Math.PI * 2);
		this.game.context.fill();
		this.game.context.closePath();
	}
}

Apple.prototype.create = function ()
{
	var newPos =
	{
		x: Math.floor(Math.random() * this.game.sceneWidth),
		y: Math.floor(Math.random() * this.game.sceneHeight)
	};
	
	if (newPos.x == this.pos.x && newPos.y == this.pos.y)
	{
		this.create();
		return;
	}
	
	for (var i = 0; i < this.game.snake.getSize(); i++)
	{
		if (newPos.x == this.game.snake.body[i].x && newPos.y == this.game.snake.body[i].y)
		{
			this.create();
			return;
		}
	}
	
	this.pos.x = newPos.x;
	this.pos.y = newPos.y;
}

Apple.prototype.remove = function ()
{
	this.pos.x = -1;
	this.pos.y = -1;
}