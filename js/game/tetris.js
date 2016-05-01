var subField = [];
var rotation = 0;
var blockType = 0;

var position = {
	x: 3,
	y: -2
};

function intializeBlockArray() {
	// 4x4 array
	for (var i = 0; i < 4; i++) {
		subField[i] = [];
		for (var j = 0; j < 4; j++) {
			subField[i][j] = new GameSquare();
		}
	}
}

function highestBlock() {
	for (var i = 0; i < mainGame.grid.width; i++) {
		for (var j = 0; j < mainGame.grid.height; j++) {
			if (mainGame.grid.squares[i + j * mainGame.grid.width].hasTetris) {
				return i + j * mainGame.grid.width;
			}
		}
	}
	return -1;
}

function createNextBlock() {
	//new tetromino
	var i = Math.floor((Math.random() * 7) + 1);
	blockType = i;
	rotation = 0;
	if (i === 1) { // O
		subField[1][1].hasTetris = true;
		subField[1][2].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	} else if (i === 2) { // I
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
		subField[2][3].hasTetris = true;
	} else if (i === 3) { // T
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
		subField[1][1].hasTetris = true;
	} else if (i === 4) { // L
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
		subField[1][2].hasTetris = true;
	} else if (i === 5) { // J
		subField[1][0].hasTetris = true;
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	} else if (i === 6) { // S
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[1][1].hasTetris = true;
		subField[1][2].hasTetris = true;
	} else if (i === 7) { // Z
		subField[1][0].hasTetris = true;
		subField[1][1].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	}
}

function collision(direction) {
	for (var j = 0; j < 4; j++) {
		for (var k = 0; k < 4; k++) {
			if (subField[k][j].hasTetris) {
				var index = j + position.x + (k + position.y + 1) * mainGame.grid.width + direction;
				if (index < mainGame.grid.width * mainGame.grid.height && mainGame.grid.squares[index].hasTetris) {
					return true; //collision with wall
				} else if (position.x + leftMostIndex() + direction < 0 || position.x + rightMostIndex() + direction >= this.mainGame.grid.width) {
					return true; //collision with tile(s)
				}
			}
		}
	}
	return false;
}

function place() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var index = (position.x + i) + (position.y + j) * this.mainGame.grid.width;
			if (index < mainGame.grid.width * mainGame.grid.height) {
				this.mainGame.grid.squares[index].hasTetris = subField[j][i].hasTetris || this.mainGame.grid.squares[index].hasTetris;
			}
		}
	}
	clearField();
	position.x = 3;
	position.y = -2;
	createNextBlock();
}

function leftMostIndex() {
	var index = 4;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (subField[j][i].hasTetris && i < index) {
				index = i;
			}
		}
	}
	return index;
}

function rightMostIndex() {
	var index = -1;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (subField[j][i].hasTetris && i > index) {
				index = i;
			}
		}
	}
	return index;
}

function bottomIndex() {
	var index = 1;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (subField[j][i].hasTetris && j > index) {
				index = j;
			}
		}
	}
	return index + position.y;
}

function moveRight() {
	var validMove = true;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (collision(1)) {
				validMove = false;
			}
		}
	}
	if (validMove) {
		position.x = position.x + 1;
	}
}

function moveLeft() {
	var validMove = true;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (collision(-1)) {
				validMove = false;
			}
		}
	}
	if (validMove) {
		position.x = position.x - 1;
	}
}

function naturalFall() {
	var validMove = true;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (collision(0)) {
				validMove = false;
				place();
			}
		}
	}
	if (validMove) {
		if (bottomIndex() > mainGame.grid.height - 2) {
			place();
		}
		this.position.y++;
	}
}

function tetris() {
	var startSquares = [];
	var isTetris;
	var rowTetris;

	for (var i = 0; i < mainGame.grid.squares.length; i++) {
		if (i % mainGame.grid.width === 0) {
			startSquares.push(mainGame.grid.squares[i]);
		}
	}

	for (var i = 0; i < startSquares.length; i++) {
		isTetris = true;
		for (var j = 0; j < mainGame.grid.width; j++) {
			if (!mainGame.grid.squares[i * mainGame.grid.width + j].hasTetris) {
				isTetris = false;
			}
			if (isTetris) {
				rowTetris = i;
			}
			
		}
		if (isTetris) {
			for (var j = 0; j < mainGame.grid.width; j++) {
				mainGame.grid.squares[rowTetris * mainGame.grid.width + j].hasTetris = false;
			}

			for (var i = rowTetris - 1; i >= 0; i--) {
				for (var j = 0; j < mainGame.grid.width; j++) {
					if (mainGame.grid.squares[i * mainGame.grid.width + j].hasTetris) {
						mainGame.grid.squares[i * mainGame.grid.width + j].hasTetris = false;
						mainGame.grid.squares[(i + 1) * mainGame.grid.width + j].hasTetris = true;
					}
				}
			}
			mainGame.score += 133;
			updateScore(mainGame.score);
		}
		isTetris = false;
	}
}

function rotateClockwise() {
	clearField();
	if (rotation % 360 === 0) {
		if (blockType === 1) { //O
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		} else if (blockType === 2) { //I
			subField[0][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		} else if (blockType === 3) { //T
			subField[0][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
		} else if (blockType === 4) { //L
			subField[0][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		} else if (blockType === 5) { //J
			subField[0][1].hasTetris = true;
			subField[0][2].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
		} else if (blockType === 6) { //S
			subField[0][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][2].hasTetris = true;
		} else if (blockType === 7) { //Z
			subField[0][2].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
		}
	} else if (rotation % 360 === 90) {
		if (blockType ===  1) { //O
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		} else if (blockType === 2) { //I
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[2][3].hasTetris = true;
		} else if (blockType === 3) { //T
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
		} else if (blockType === 4) { //L
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][0].hasTetris = true;
		} else if (blockType === 5) { //J
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][2].hasTetris = true;
		} else if (blockType === 6) { //S
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
		} else if (blockType === 7) { //Z
			subField[2][2].hasTetris = true;
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
		}
	} else if (rotation % 360 === 180) {
		if (blockType ===  1) { //O
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		} else if (blockType === 2) { //I
			subField[0][2].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][2].hasTetris = true;
		} else if (blockType === 3) { //T
			subField[0][1].hasTetris = true;
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
		} else if (blockType === 4) { //L
			subField[0][0].hasTetris = true;
			subField[0][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
		} else if (blockType === 5) { //J
			subField[0][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
		} else if (blockType === 6) { //S
			subField[0][0].hasTetris = true;
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
		} else if (blockType === 7) { //Z
			subField[0][1].hasTetris = true;
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][0].hasTetris = true;
		}
	} else if (rotation % 360 === 270) {
		if (blockType === 1) { //O
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		} else if (blockType === 2) { //I
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[2][3].hasTetris = true;
		} else if (blockType === 3) { //T
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[1][1].hasTetris = true;
		} else if (blockType === 4) { //L
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[1][2].hasTetris = true;
		} else if (blockType === 5) { //J
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		} else if (blockType === 6) { //S
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
		} else if (blockType === 7) { //Z
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
	}
	rotation = rotation + 90;
}

function clearField() {
	for (var j = 0; j < 4; j++) {
		for (var k = 0; k < 4; k++) {
			subField[j][k].hasTetris = false;
		}
	}
}

function isGameOver() {
	var highest = highestBlock();
	if (0 <= highest && highest < this.mainGame.grid.width) {
		return true;
	}
	return false;
}

function formatScore(score) {
	if (score < 10000) {
		score = ("00000" + score).slice(-5);
	}
	return score;
}

function updateScore(score) {
	$("#score").html(formatScore(score));
}