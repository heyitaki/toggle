function game()
{
	this.canvasOffsetX = 0;
	this.canvasOffsetY = 0;
	this.squareWidth = 50;
	this.squareHeight = 50;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.score = 0;
	this.grid = new gameGrid(this);
	this.input = new gameInput();
	this.ctx = $('#gameCanvas')[0].getContext('2d');
	this.previousSquare = 0;
	this.word = [];

	this.currentSquare = 0;
	this.previousSquare = 0;
}

game.prototype.update = function()
{
	this.input.update();
};

game.prototype.draw = function()
{
	this.ctx.fillStyle = '#ADADAD';
	this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.grid.draw(this.ctx);
};

game.prototype.handleMouseInput = function(x, y)
{
	if (this.input.frameMouseStates[0])
	{
		this.grid.compilationUpdate(this.grid.getSquareIndex(x, y));
		console.log(this.word);	
	}
};

game.prototype.setUpCanvas = function()
{
	this.ctx.canvas.width = this.squareWidth * this.grid.width + this.grid.borderSize;
	this.ctx.canvas.height = this.squareHeight * this.grid.height + this.grid.borderSize;
	this.canvasWidth = this.ctx.canvas.width;
	this.canvasHeight = this.ctx.canvas.height;
};

game.prototype.addLetter = function(prevSquareIndex, currSquareIndex)
{
  	if (currSquareIndex == undefined)
	{
		this.word.push(this.grid.squares[prevSquareIndex]);
		this.grid.squares[prevSquareIndex].isSelected = true;
		return;
	}
	if(this.grid.checkSquare(currSquareIndex) && this.grid.isAdjacent(prevSquareIndex, currSquareIndex))
	{
		this.word.push(this.grid.squares[currSquareIndex]);
		this.grid.squares[currSquareIndex].isSelected = true;
	}
}

game.prototype.clearWord = function()
{
 	this.word = [];
	this.grid.clearSelected();
}
function tick()
{
	mainGame.update();
	mainGame.draw();
}
