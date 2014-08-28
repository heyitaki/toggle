function GameGrid(theGame) {
	this.mainGame = theGame;
	this.width = 10;
	this.height = 10;
	this.borderSize = 5;
	this.squares = [];
	this.lastHighestBlock = 0;
	this.nowHighestBlock = 0;

	for (var i = 0; i < this.width; i++) {
		for (var j = 0; j < this.height; j++) {
			this.squares[i + j * this.height] = new GameSquare(i + j * this.height);
		}
	}

	this.generateGrid();
}

GameGrid.prototype.generateGrid = function() {
	var amountOfVowels = 0;
	var amountOfConsonants = 0;
	var percentVowels = 0;
	var nextIsVowel = false;

	for (var i = 0; i < this.squares.length; i++) {
		var newChar = this.randChar();
		if (nextIsVowel) {
			newChar = this.randVowel();
			nextIsVowel = false;
		}

		this.squares[i].letter = newChar;

		if (this.isVowel(newChar)) {
			amountOfVowels++;
		} else {
			amountOfConsonants++;
		}

		percentVowels = amountOfVowels / (amountOfVowels + amountOfConsonants);
		if (percentVowels < 0.4) {
			nextIsVowel = true;
		}
	}

};

GameGrid.prototype.getRandomSquare = function() {
	var rand;
	do {
		rand = Math.random();
		rand = Math.floor(rand * this.squares.length);
	} while (this.isVowel(this.squares[rand].letter));
	return this.squares[rand];
};

GameGrid.vowelArray = ["A", "E", "I", "O", "U"];

GameGrid.prototype.isVowel = function(letter) {
	return $.inArray(letter, GameGrid.vowelArray) !== -1;
};

GameGrid.prototype.randVowel = function() {
	var rand = Math.random();
	rand = Math.floor(rand * 5);
	return GameGrid.vowelArray[rand];
};

GameGrid.prototype.drawTetris = function(ctx) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			ctx.fillStyle = "#0000FF";
			if (subField[i][j].hasTetris) {
				ctx.fillRect((position.x + j) * this.mainGame.squareWidth + this.borderSize,
					(position.y + i) * this.mainGame.squareHeight + this.borderSize,
					this.mainGame.squareWidth - this.borderSize,
					this.mainGame.squareHeight - this.borderSize);
			}
		}
	}
};

GameGrid.prototype.draw = function(ctx) {
	for (var i = 0; i < this.width; i++) {
		for (var j = 0; j < this.height; j++) {
			var coordX = i * this.mainGame.squareWidth;
			var coordY = j * this.mainGame.squareHeight;
			var square = this.squares[i + j * this.height];

			ctx.font = "30px sans-serif";
			ctx.textAllign = "center";

			var special = false;

			if (square.hasTetris) {
				ctx.fillStyle = "#000000";
				special = true;
			}
			if (square.isSelected) {
				ctx.fillStyle = square.selectedColor;
				special = true;
			}
			if (!special) {
				ctx.fillStyle = square.color;
			}

			ctx.fillRect(coordX + this.borderSize, coordY + this.borderSize, this.mainGame.squareWidth - this.borderSize, this.mainGame.squareHeight - this.borderSize);

			ctx.fillStyle = "#4A4849";
			ctx.fillText(square.letter, coordX + 13, coordY + this.mainGame.squareHeight / 2 + 17);
		}
	}
	this.drawTetris(ctx);
};
GameGrid.prototype.numberOfOccurances = function(letter) {
	var counter = 0;
	for (var i = 0; i < this.squares.length; i++) {
		if (this.squares[i].letter === letter) {
			counter++;
		}
	}

	return counter;
};

GameGrid.prototype.randChar = function() {
	return String.fromCharCode(Math.floor((Math.random() * 26) + 1) + 64);
};

GameGrid.prototype.getSquareIndex = function(x, y) {
	if (this.withinBounds(x, y)) {
		x -= this.mainGame.canvasOffsetX;
		y -= this.mainGame.canvasOffsetY;

		x = Math.floor(x);
		y = Math.floor(y);

		x -= x % this.mainGame.squareWidth;
		y -= y % this.mainGame.squareHeight;

		return x / this.mainGame.squareWidth + y / this.mainGame.squareHeight * this.height;
	}
	return -1;
};

GameGrid.prototype.getSquare = function(x, y) {
	var index = this.getSquareIndex(x, y);
	return index === -1 ? new GameSquare(-1) : this.squares[index];
};

GameGrid.prototype.selectSquare = function(x, y) {
	this.getSquare(x, y).isSelected = true;
};

GameGrid.prototype.clearSelected = function() {
	for (var i = 0; i < this.squares.length; i++) {
		this.squares[i].isSelected = false;
	}
};

GameGrid.prototype.withinBounds = function(x, y) {
	return x > this.mainGame.canvasOffsetX &&
		y > this.mainGame.canvasOffsetY &&
		x < this.width * this.mainGame.squareWidth + this.mainGame.canvasOffsetX &&
		y < this.height * this.mainGame.squareHeight + this.mainGame.canvasOffsetY;
};

GameGrid.prototype.checkSquare = function(index) {
	return this.squares[index].hasTetris;
};

GameGrid.prototype.isAdjacent = function(prevSquareIndex, currSquareIndex) {
	var larger;
	if (prevSquareIndex === -1) {
		return true;
	}

	if (currSquareIndex % this.width === 0 && prevSquareIndex % this.width === 9 || currSquareIndex % this.width === 9 && prevSquareIndex % this.width === 0) {
		return false;
	}

	if (Math.abs(currSquareIndex - prevSquareIndex) === 1) {
		return true;
	}

	if (prevSquareIndex < currSquareIndex) {
		larger = currSquareIndex;
		var shiftedIndex = larger - this.width;

		if (Math.abs(shiftedIndex - prevSquareIndex) <= 1) {
			return true;
		}
	} else {
		larger = prevSquareIndex;
		var shiftedIndex = larger - this.width;

		if (Math.abs(shiftedIndex - currSquareIndex) <= 1) {
			return true;
		}
	}
	return false;
};

GameGrid.prototype.compilationUpdate = function(currSquareIndex) {
	if (!this.checkSquare(currSquareIndex)) {
		this.mainGame.updateScore();
		this.mainGame.clearWord();
		return;
	}

	if (this.mainGame.word.indexOf(this.squares[currSquareIndex]) !== -1) {
		return;
	}

	if (this.mainGame.word.length === 0) {
		this.mainGame.addLetter(currSquareIndex);
		return;
	}

	if (this.isAdjacent(this.mainGame.word[this.mainGame.word.length - 1].index, currSquareIndex)) {
		this.mainGame.addLetter(this.mainGame.word[this.mainGame.word.length - 1].index, currSquareIndex);
	} else {
		this.mainGame.updateScore();
		this.mainGame.clearWord();
	}
};
