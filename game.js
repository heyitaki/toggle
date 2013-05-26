function game()
{
	this.squareWidth = 50;
	this.squareHeight = 50;
	this.windowWidth = 0;
	this.windowHeight = 0;
	this.score = 0;
	this.grid = new gameGrid(this);
	this.input = new gameInput();
	this.ctx = $('#gameCanvas')[0].getContext('2d');
	this.previousSquare = 0;
}

game.prototype.update = function()
{
	this.input.update();
};

game.prototype.draw = function()
{
	this.grid.draw(this.ctx);
};

game.prototype.handleMouseInput = function(x, y)
{
	if (this.input.frameMouseStates[0])
	{
		this.grid.selectSquare(x, y);	
	}
};

game.prototype.windowResize = function(x, y)
{
	this.windowWidth = x;
	this.windowHeight = y;
	this.ctx.canvas.width = x;
	this.ctx.canvas.height = y;
};

function tick()
{
	document.mainGame.update();
	document.mainGame.draw();
}
