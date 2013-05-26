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
			this.squares[i + j * this.height] = new gameSquare(i + j * this.height);
		}
	}
}

gameGrid.prototype.generateGrid = function()
{
	for (var i = 0; i < this.squares.length; i++)
	{
		this.squares[i].letter = this.randChar();
	}

	do
	{
		var numberOfVowels = this.numberOfOccurances('A') + this.numberOfOccurances('E') + this.numberOfOccurances('I') + this.numberOfOccurances('O') + this.numberOfOccurances('U');
		var fractionOfVowels = numberOfVowels / (this.width * this.height);
		this.getRandomSquare().letter = this.randVowel();
	} while(fractionOfVowels < 0.5)
	
};

gameGrid.prototype.getRandomSquare = function()
{
	var rand;
	do
	{
		rand = Math.random();
		rand = Math.floor(rand * this.squares.length);
	}while(this.isVowel(this.squares[rand].letter))
	return this.squares[rand];
}

gameGrid.prototype.isVowel = function(letter)
{
	if(letter == 'A' || letter == 'E' || letter == 'I' || letter == 'O' || letter == 'U')
	{
		return true;
	}
	return false;
}

gameGrid.prototype.randVowel = function()
{
	var rand = Math.random();
	rand = Math.floor(rand * 5);
	if(rand == 0)
	{
		return 'A';
	}
	else if(rand == 1)
	{
		return 'E';
	}
	else if(rand == 2)
	{
		return 'I';
	}
	else if(rand == 3)
	{
		return 'O';
	}
	else if(rand == 4)
	{
		return 'U';
	}
};

gameGrid.prototype.drawTetris = function(ctx)
{
	for (var i = 0; i < 4; i++)
	{
		for (var j = 0; j < 4; j++)
		{
			ctx.fillStyle = '#0000FF';
			if (subField[i][j].hasTetris)
			ctx.fillRect( (position.x + j)* this.mainGame.squareWidth + this.borderSize, (position.y + i) * this.mainGame.squareHeight + this.borderSize, this.mainGame.squareWidth - this.borderSize, this.mainGame.squareHeight - this.borderSize);
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

			ctx.font="30px sans-serif";
			ctx.textAllign = "center";
			
			if (!square.isSelected)
			{	
				ctx.fillStyle = square.color;
			}
			else if (!square.hasTetris)
			{
				ctx.fillStyle = '#000000';
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
	this.drawTetris(ctx);
};
gameGrid.prototype.numberOfOccurances = function(let)
{
	var counter = 0;
	for(var i = 0; i < this.squares.length; i++)
	{
		if(this.squares[i].letter = let)
		{
			counter++;
		}
	}
};

gameGrid.prototype.randChar = function()
{
	String.fromCharCode(Math.floor((Math.random() * 26) + 1) + 64);
};

gameGrid.prototype.getSquareIndex = function(x, y)
{
 	if (this.withinBounds(x, y))
	{
		x -= this.mainGame.canvasOffsetX;
		y -= this.mainGame.canvasOffsetY;

		x = Math.floor(x);
		y = Math.floor(y);
		
		x -= x % this.mainGame.squareWidth;
		y -= y % this.mainGame.squareHeight;
		
		return x / this.mainGame.squareWidth + y / this.mainGame.squareHeight * this.height;
	}
	return -1;
}

gameGrid.prototype.getSquare = function(x, y)
{
	var index = this.getSquareIndex(x, y);
	return index == -1 ? new gameSquare(-1) : this.squares[index];
}

gameGrid.prototype.selectSquare = function(x, y)
{
	this.getSquare(x, y).isSelected = true;
}

gameGrid.prototype.clearSelected = function()
{
	for (var i = 0; i < this.squares.length; i++)
	{
		this.squares[i].isSelected = false;
	}
}

gameGrid.prototype.withinBounds = function(x, y)
{
	return x > this.mainGame.canvasOffsetX &&
		   	y > this.mainGame.canvasOffsetY &&
		   	x < this.width * this.mainGame.squareWidth + this.mainGame.canvasOffsetX &&
		   	y < this.height * this.mainGame.squareHeight + this.mainGame.canvasOffsetY; 
}

gameGrid.prototype.checkSquare = function(index)
{
	return true;//this.squares[index].hasTetris;
}

gameGrid.prototype.isAdjacent = function(prevSquareIndex, currSquareIndex)
{
	var larger;
	if (prevSquareIndex == -1)
	  return true;
	if(currSquareIndex % this.width == 0 && prevSquareIndex % this.width == 9 || currSquareIndex % this.width == 9 && prevSquareIndex % this.width == 0)
	{
		return false;
	}
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

gameGrid.prototype.compilationUpdate = function(currSquareIndex)
{
	if(!this.checkSquare(currSquareIndex))
	{
		this.mainGame.updateScore();
	  	this.mainGame.clearWord();
		return;
	}
	if (this.mainGame.word.indexOf(this.squares[currSquareIndex]) > -1)
	{
	  	return;
	}
	if (this.mainGame.word.length == 0)
	{
		this.mainGame.addLetter(currSquareIndex);
		return;
	}
	if(this.isAdjacent(this.mainGame.word[this.mainGame.word.length - 1].index, currSquareIndex))	
	{
		this.mainGame.addLetter(this.mainGame.word[this.mainGame.word.length - 1].index, currSquareIndex);
	}
	else
	{
		this.mainGame.updateScore();
		this.mainGame.clearWord();
	}	
}
