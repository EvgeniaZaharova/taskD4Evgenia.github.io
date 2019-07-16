function Game()
{
	this.cellSize = 20;
	this.canvasWidth = 500;
	this.canvasHeight = 500;
	this.backgroundColor = '#312';
	this.snakeColor = '#780';
	this.snakeHeadColor = '#600';
	this.score = 0;
	this.status = 1;
	this.STATUS =
	{
		PLAY: 0,
		NONE: 1,
		GAMEOVER: 2,
		GAMEWIN: 3,
		PAUSE: 4
	};
	document.body.style.textAlign = 'center';

	this.canvas = document.createElement('canvas');
	document.body.appendChild(this.canvas);

	this.canvas.width = this.canvasWidth;
	this.canvas.height = this.canvasHeight;
	this.canvas.style.border = '1px solid #444';

	this.context = this.canvas.getContext('2d');
	
	this.sceneWidth = Math.ceil(this.canvasWidth / this.cellSize);
	this.sceneHeight = Math.ceil(this.canvasHeight / this.cellSize);

	this.snake = new Snake(this);
	
	this.apple = new Apple(this);
}

Game.prototype.init = function()
{
	this.reset();
}

Game.prototype.update = function()
{
	if (this.getStatus() == this.STATUS.PLAY) 
	{
		this.snake.update();
	}
	input.isLock = false;
}

Game.prototype.reset = function() 
{
	this.snake = new Snake(this);
	this.apple = new Apple(this);
	this.score = 0;
}

Game.prototype.render = function() 
{
	this.context.fillStyle = this.backgroundColor;
	this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

	this.snake.render();
	this.apple.render();

	switch (this.getStatus()) 
	{
		case this.STATUS.PLAY:
			break;

		case this.STATUS.NONE:
			this.showMsg('SNAKE', 'space');
			break;

		case this.STATUS.GAMEOVER:
			this.showMsg('THE END', 'space', 'Score: ' + this.score);
			break;
		
		case this.STATUS.GAMEWIN:
			this.showMsg('You Win!', 'space', 'Score: ' + this.score);
			break;

		case this.STATUS.PAUSE:
			this.showMsg('PAUSE', 'space');
			break;
	}
}

Game.prototype.showMsg = function(header, action, addition) {
	this.context.beginPath();
	this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
	this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.context.closePath();

	this.context.beginPath();
	this.context.font = "normal normal 32px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText(header, this.canvasWidth / 2, this.canvasHeight / 2);
	this.context.closePath();

	this.context.beginPath();
	this.context.font = "normal normal 14px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText(action, this.canvasWidth / 2, this.canvasHeight / 2 + 32);
	this.context.closePath();

	if (addition !== undefined) {
		this.context.beginPath();
		this.context.font = "normal normal 14px monospace";
		this.context.fillStyle = '#aa0000';
		this.context.textAlign = "center";
		this.context.fillText(addition, this.canvasWidth / 2, this.canvasHeight - 32);
		this.context.closePath();
	}
}

Game.prototype.setStatus = function(value) 
{
	this.onStatusChange(value, this.status);
	this.status = value;
}

Game.prototype.getStatus = function() 
{
	return this.status;
}

Game.prototype.onStatusChange = function(newstatus, oldstatus) 
{
	if (newstatus == this.STATUS.PLAY && oldstatus != this.STATUS.PAUSE) 
	{
		this.apple.create();
	}
}

Game.prototype.handleInput = function(event) 
{
	if (input.isKey('SPACE')) 
	{
		if (this.getStatus() == this.STATUS.GAMEOVER || this.getStatus() == this.STATUS.GAMEWIN) 
		{
			this.reset();
			this.setStatus(this.STATUS.PLAY);
		}
		else if (this.getStatus() == this.STATUS.PAUSE) 
		{
			this.setStatus(this.STATUS.PLAY);
		}
		else if (this.getStatus() == this.STATUS.PLAY) 
		{
			this.setStatus(this.STATUS.PAUSE);
		}
		else if (this.getStatus() == this.STATUS.NONE) 
		{
			this.setStatus(this.STATUS.PLAY);
		}
	}

	if (this.getStatus() == this.STATUS.PLAY && !input.isLock) {
		input.isLock = true;

		if (input.isKey('w') && !this.snake.isRoute('DOWN')) 
		{
			this.snake.setRoute('UP');
		}
		else if (input.isKey('s') && !this.snake.isRoute('UP')) 
		{
			this.snake.setRoute('DOWN');
		}
		else if (input.isKey('a') && !this.snake.isRoute('RIGHT')) 
		{
			this.snake.setRoute('LEFT');
		}
		else if (input.isKey('d') && !this.snake.isRoute('LEFT')) 
		{
			this.snake.setRoute('RIGHT');
		}
	}
}
