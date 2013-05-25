function game()
{
	this.squareWidth = 50;
	this.squareHeight = 50;
	this.windowWidth = 0;
	this.windowHeight = 0;
	this.grid = new gameGrid(this);
	this.ctx = $('#gameCanvas')[0].getContext('2d');
}

game.prototype.update = function()
{
};

game.prototype.draw = function()
{
	this.grid.draw(this.ctx);
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
