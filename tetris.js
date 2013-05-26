var subField = new Array();
var savedState = new Array();
var rotation = 0;
var blockType = 0;

var position = {
	x: Math.floor((gameGrid.width / gameGrid.squareWidth) / 2 - 1),
	y: 0,
};

//MY STUFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
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
			//gameGrid.squares[(gameGrid.width / 2) - 2 + j][gameGrid.squares[0]] = subField[j][k];
		}
	}

	savedState = subField;
}

function createNextBlock()
{
<<<<<<< HEAD
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
=======
	//new tetromino
	int i = Math.floor((Math.random() * 7) + 1);
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
>>>>>>> fixed tetris errors kind of
}

function collision()
{
	for (var j = 0; j < 4; j++)
	{
		for(var k = 0; k < 4; k++)
		{
			if (subField[j][k].hasTetris == true)
			{
				if (gameGrid[j + position.x + (k + position.y) * gameGrid.width].hasTetris && subField[j][k].hasTetris)
					return true;
				else
					return false;
			}
		}
	}
}

function moveRight()
{
	var validMove = true;
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			if (subField.collision(position.x, position.y) == true || ((position.x + i) + (position.y + j) * gameGrid.width) >= (gameGrid.width / gameGrid.squareWidth))
				validMove = false;
		}
	}

	if (validMove == true)
	{
		position.x = position.x + 1;
		subField.writeState(position.x, position.y);
	}
	else
		subField.revertState();
}

function moveLeft()
{
	var validMove = true;
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			if (subField.collision() == true || ((position.x + i) + (position.y + j) * gameGrid.width) > 0)
				validMove = false;
		}
	}

	if (validMove == true)
	{
		position.x = position.x - 1;
		subField.writeState(position.x, position.y);
	}
	else
		subField.revertState();
}

function naturalFall()
{
	var validMove = true;
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			if (subField.collision() == true)
				validMove = false;
		}
	}

<<<<<<< HEAD
    if (validMove == true)
    {
        subField.writeState(x, y + 1);
    }
    else
        subField.revertState();
=======
	if (validMove == true)
	{
		position.y = position.y + 1;
		subField.writeState(position.x, position.y);
	}
	else
		subField.revertState();
>>>>>>> fixed tetris errors kind of
}

function writeState()
{
	for (var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			gameGrid[i + position.x  + (j + position.y) * gameGrid.width] = subField[i][j];
			[position.x + (j + position.y) * gameGrid.width].hasTetris = false;
			subField.saveState();
		}
	}
}

function saveState()
{
	savedState = subField;
}

function revertState()
{
	subField = savedState;
}

function rotateClockwise()
{
	subField.clearField();

<<<<<<< HEAD
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
=======
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
>>>>>>> fixed tetris errors kind of
}

function rotateCounterClockwise()
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
