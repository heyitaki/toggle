var subField = new Array();
var savedState = new Array();
var rotation = 0;
var blockType = 0;

var position = {
	x: 0,
	y: 0,
};

function intializeBlockArray()
{
	//4x4 array
	subField = new Array(4);
	for (var i = 0; i < 4; i++)
	{  
		subField[i] = new Array(4);
	}

	for (var j = 0; j < 4; j++)
	{
		for(var k = 0; k < 4; k++)
		{
			subField[j][k] = new gameSquare();
		}
	}

	savedState = subField;
}

function createNextBlock()
{
    //new tetromino
    var i = Math.floor((Math.random() * 7) + 1);
    blockType = i;
    rotation = 0;
    if (i == 1) //O
    {
        subField[1][1].hasTetris = true;
        subField[1][2].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
    }    
    else if (i == 2) //I
    {
        subField[1][0].hasTetris = true;
        subField[1][1].hasTetris = true;
        subField[1][2].hasTetris = true;
        subField[1][3].hasTetris = true;
    }
    else if (i == 3) //T
    {
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
        subField[1][1].hasTetris = true;
    }
    else if (i == 4) //L
    {
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
        subField[1][2].hasTetris = true;
    }
    else if (i == 5) //J
    {
        subField[1][0].hasTetris = true;
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
    }
    else if (i == 6) //S
    {
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[1][1].hasTetris = true;
        subField[1][2].hasTetris = true;
    }
    else if (i == 7) //Z
    {
        subField[1][0].hasTetris = true;
        subField[1][1].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
    }

	//new tetromino
	var i = Math.floor((Math.random() * 7) + 1);
	blockType = i;
	rotation = 0;
	if (i == 1) //O
	{
		subField[1][1].hasTetris = true;
		subField[1][2].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	}    
	else if (i == 2) //I
	{
		subField[1][0].hasTetris = true;
		subField[1][1].hasTetris = true;
		subField[1][2].hasTetris = true;
		subField[1][3].hasTetris = true;
	}
	else if (i == 3) //T
	{
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
		subField[1][1].hasTetris = true;
	}
	else if (i == 4) //L
	{
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
		subField[1][2].hasTetris = true;
	}
	else if (i == 5) //J
	{
		subField[1][0].hasTetris = true;
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	}
	else if (i == 6) //S
	{
		subField[2][0].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[1][1].hasTetris = true;
		subField[1][2].hasTetris = true;
	}
	else if (i == 7) //Z
	{
		subField[1][0].hasTetris = true;
		subField[1][1].hasTetris = true;
		subField[2][1].hasTetris = true;
		subField[2][2].hasTetris = true;
	}
}

function collision(direction)
{
	for (var j = 0; j < 4; j++)
	{
		for(var k = 0; k < 4; k++)
		{
			if (subField[j][k].hasTetris == true)
			{
				if (mainGame.grid.squares[j + position.x + (k + position.y) * mainGame.grid.width].hasTetris && subField[j][k].hasTetris)
					return true;
			}
		}
	}

	return false;
}

function collidesWithWalls(direction)
{
	for (var j = 0; j < 4; j++)
	{
		for(var k = 0; k < 4; k++)
		{
				if (position.x + direction < leftestIndex() - 1|| position.x + direction > mainGame.grid.width - rightestIndex() - 1)
					return true;
		}
	}

	return false;
}

function moveRight()
{
	var validMove = true;
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			if (collidesWithWalls(1))
				validMove = false;
			else if (collision())
				place();
		}
	}

	if (validMove == true)
	{
		position.x = position.x + 1;
		writeState(position.x, position.y);
	}
	else
		revertState();
}

function place()
{
		for (var i = 0; i < 4; i++)
		{
			for (var j = 0; j < 4; j++)
			{
				this.mainGame.grid.squares[(position.y + i) + (position.x + j) * this.mainGame.grid.width].hasTetris = subField.hasTetris;
			}
		}
		intializeBlockArray();
		position.x = 0;
		position.y = 0;
		createNextBlock();
}

function leftestIndex()
{
	var leftest = 4;
	for (var i = 0; i < 4; i++)
	{
		for (var j = 0; j < 4; j++)
		{
			if (subField[i][j].hasTetris && i < leftest)
				leftest = i;
		}
	}
	return leftest;
}

function rightestIndex()
{
	var rightest = 0;
	for (var i = 0; i < 4; i++)
	{
		for (var j = 0; j < 4; j++)
		{
			if (subField[i][j].hasTetris && i > rightest)
				rightest = i;
		}
	}
	return rightest;
}

function bottomIndex()
{
	var bottomest = 4;
	for (var i = 0; i < 4; i++)
	{
		for (var j = 0; j < 4; j++)
		{
			if (subField[i][j].hasTetris && j > bottomest)
				bottomest = j;
		}
	}
	return bottomest + position.y - 1;
}

function moveLeft()
{
	var validMove = true;
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			if (collidesWithWalls(-1))
				validMove = false;
			else if (collision())
				place();
		}
	}

	if (validMove == true)
	{
		position.x = position.x - 1;
		writeState(position.x, position.y);
	}
	else
		revertState();
}

function naturalFall()
{
	var validMove = true;
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			
		}
	}
    if (validMove == true)
    {
        writeState(position.x, position.y + 1);
    }
    else
        revertState();

	if (validMove == true)
	{
		position.y = position.y + 1;
		if (bottomIndex() > mainGame.grid.height - 1)
			place();
		writeState(position.x, position.y);
	}
	else
		revertState();
}

function writeState()
{
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			mainGame.grid[i + position.x  + (j + position.y) * mainGame.grid.width] = subField[i][j];
			[position.x + (j + position.y) * mainGame.grid.width].hasTetris = false;
			saveState();
		}
	}
}

function saveState()
{
	savedState = subField.slice(0);
}

function revertState()
{
	subField = savedState.slice(0);
}

function rotateClockwise()
{
	subField.clearField();

    if (rotation % 360 == 0)
    {
        if (blockType == 1)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if (blockType == 2)
        {
            subField[0][2].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if (blockType == 3)
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 4)
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if (blockType == 5)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 6)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
        }
        else if (blockType == 7)
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
    }
    else if (rotation % 360 == 90)
    {
        if (blockType ==  1)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if (blockType == 2)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[2][3].hasTetris = true;
        }
        else if (blockType == 3)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 4)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][0].hasTetris = true;
        }
        else if (blockType == 5)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if (blockType == 6)
        {
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 7)
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
    }
    else if (rotation % 360 == 180)
    {
        if (blockType ==  1)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if (blockType == 2)
        {
            subField[0][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 3)
        {
            subField[1][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 4)
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 5)
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if (blockType == 6)
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if (blockType == 7)
        {
            subField[1][1].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][0].hasTetris = true;
        }
    }
    else if (rotation % 360 == 270)
    {
        if (blockType == 1)
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if (blockType == 2)
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[1][3].hasTetris = true;
        }
        else if (blockType == 3)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[1][1].hasTetris = true;
        }
        else if (blockType == 4)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[1][2].hasTetris = true;
        }
        else if (blockType == 5)
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if (blockType == 6)
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
        }
        else if (blockType == 7)
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
    }
    rotation = rotation + 90;

	if (rotation % 360 == 0)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[0][2].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
	}
	else if (rotation % 360 == 90)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[2][3].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][0].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
	}
	else if (rotation % 360 == 180)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[0][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[1][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][1].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][0].hasTetris = true;
		}
	}
	else if (rotation % 360 == 270)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[1][3].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[1][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[1][2].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
	}
	rotation = rotation + 90;
}

function rotateCounterClockwise()
{
	clearField();
	if (rotation % 360 == 0)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[1][3].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[1][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[1][2].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
	}
	else if (rotation % 360 == 90)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[2][3].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][0].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
	}
	else if (rotation % 360 == 180)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[0][1].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[1][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][0].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[1][0].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][1].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][0].hasTetris = true;
		}
	}
	else if (rotation % 360 == 270)
	{
		if (blockType == 1)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
		else if (blockType == 2)
		{
			subField[0][2].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 3)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 4)
		{
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
			subField[3][2].hasTetris = true;
		}
		else if (blockType == 5)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[3][1].hasTetris = true;
		}
		else if (blockType == 6)
		{
			subField[1][1].hasTetris = true;
			subField[1][2].hasTetris = true;
			subField[2][0].hasTetris = true;
			subField[2][1].hasTetris = true;
		}
		else if (blockType == 7)
		{
			subField[1][0].hasTetris = true;
			subField[1][1].hasTetris = true;
			subField[2][1].hasTetris = true;
			subField[2][2].hasTetris = true;
		}
	}
	rotation = rotation - 90;
}


function clearField()
{
	for (var j = 0; j < 4; j++)
	{
		for(var k = 0; k < 4; k++)
		{
			subField[j][k].hasTetris = false;
		}
	}
}
