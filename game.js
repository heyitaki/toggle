function game()
{
	this.squareWidth = 40;
	this.squareHeight = 40;
	this.windowWidth = 0;
	this.windowHeight = 0;
	this.grid = new gameGrid();
	this.ctx = $('#gameCanvas')[0].getContext('2d');
}

game.prototype.update = function()
{
	this.counter++;
};

game.prototype.drawGridSquare = function(i, j)
{
	this.ctx.fillRect(i * this.squareWidth, j * this.squareHeight, this.squareWidth - 1, this.squareHeight - 1);
}

game.prototype.drawGrid = function()
{
	for(var i = 0; i < this.grid.width; i++)
	{
		for (var j = 0; j < this.grid.height; j++)
		{
			this.drawGridSquare(i, j);
		}
	}
};

game.prototype.draw = function()
{
	this.drawGrid();
};

game.prototype.windowResize = function(x, y)
{
	this.windowWidth = x;
	this.windowHeight = y;
	this.ctx.canvas.width = x;
	this.ctx.canvas.height = y;
}

tick = function()
{
	document.mainGame.update();
	document.mainGame.draw();
	console.log('tick');
}
