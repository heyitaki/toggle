function gameGrid(theGame)
{
	this.mainGame = theGame;
	this.width = 10;
	this.height = 10;
	this.squares = new Array(this.width * this.height);

	for	(var i = 0; i < this.width; i++)
	{
		for (var j = 0; j < this.height; j++)
		{
			this.squares[i + j * this.height] = new gameSquare();
		}
	}
}

gameGrid.prototype.draw = function(ctx)
{
	for (var i = 0; i < this.width; i++)
	{
		for (var j = 0; j < this.height; j++)
		{
			var coordX = i * this.mainGame.squareWidth;
			var coordY = j * this.mainGame.squareHeight;
			var square = this.squares[i + j * this.height];

			ctx.font="40px sans-serif";
			ctx.fillStyle = square.color;
			ctx.fillRect(coordX, coordY, this.mainGame.squareWidth, this.mainGame.squareHeight);
			ctx.fillStyle = "#FF0000";
			ctx.fillText(square.letter, coordX + 10, coordY + this.mainGame.squareHeight / 2 + 10);
		}
	}
};
