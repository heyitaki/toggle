function gameGrid(theGame)
{
	this.mainGame = theGame;
	this.width = 10;
	this.height = 10;
	this.borderSize = 5;
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
			ctx.textAllign = "center";
			
			if (!square.isSelected)
			{	
				ctx.fillStyle = square.color;
			}
			else 
			{
				ctx.fillStyle = square.selectedColor;
			}

			ctx.fillRect(coordX + this.borderSize, coordY + this.borderSize, this.mainGame.squareWidth - this.borderSize, this.mainGame.squareHeight - this.borderSize);

			ctx.fillStyle = "#4A4849";
			ctx.fillText(square.letter, coordX + 13, coordY + this.mainGame.squareHeight / 2 + 17);
		}
	}
};

gameGrid.prototype.getSquare = function(x, y)
{
	if (this.withinBounds(x, y))
	{
		x -= this.mainGame.canvasOffsetX;
		y -= this.mainGame.canvasOffsetY;

		x = Math.floor(x);
		y = Math.floor(y);
		
		x -= x % this.mainGame.squareWidth;
		y -= y % this.mainGame.squareHeight;
		
		return this.squares[x / this.mainGame.squareWidth + y / this.mainGame.squareHeight * this.height];
	}
	return new gameSquare();
}

gameGrid.prototype.selectSquare = function(x, y)
{
	this.getSquare(x, y).isSelected = true;
	this.getSquare(x, y).letter = 'Z';
}

gameGrid.prototype.clearSelected = function()
{
	for (var i = 0; i < this.squares.length; i++)
	{
		this.squares[i].isSelected = false;
		this.squares[i].letter = 'A';
	}
}

gameGrid.prototype.withinBounds = function(x, y)
{
	return x > this.mainGame.canvasOffsetX &&
		   	y > this.mainGame.canvasOffsetY &&
		   	x < this.width * this.mainGame.squareWidth + this.mainGame.canvasOffsetX &&
		   	y < this.height * this.mainGame.squareHeight + this.mainGame.canvasOffsetY; 
}

gameGrid.prototype.checkSquare = function(i, j)
{
	return this.squares[i + j * this.height].hasTetris;
}

gameGrid.prototype.isAdjacent = function(prevSquareIndex, currSquareIndex)
{
	var larger;
	if(Math.abs(currSquareIndex - prevSquareIndex) == 1)
	{
		return true;
	}

	if(prevSquareIndex < currSquareIndex)
	{
		larger = currSquareIndex;
		var shiftedIndex = larger - this.width
	
	 	  if(Math.abs(shiftedIndex - prevSquareIndex) <= 1)
		{
			return true;
		}
	}
	else
	{
		larger = prevSquareIndex;
		var shiftedIndex = larger - this.width
		if(Math.abs(shiftedIndex - currSquareIndex) <= 1)
		{
			return true;
		}
	}
	return false;
}

gameGrid.prototype.compilationUpdate(currSqiareIndex)
{
	if(!checkSquare(gameGrid, currSquareIndex))
	{
		return;
	}
	if(isAdjacent(gameGrid, word[word.length], currSquareIndex))	
	{
		if(word.length = 0)
		{
			word.addLetter(gameGrid, currSquareIndex);
		}
		else
		{
			word.addLetter(gameGrid, word[word.length], currSquareIndex);
		}
	}
	else
	{
		clearWord();
	}	
}
