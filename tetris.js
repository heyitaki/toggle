var subField;
var savedState;
var rotation;
var blockType;

function gameSquare()
{
    this.hasTetris = false;
    this.letter = 'A';
    this.borderColor = '1DAEEF';
    this.color = '#ADBEFF';
}

function gameGrid(theGame)
{
    this.mainGame = theGame;
    this.width = 10;
    this.height = 10;
    this.borderSize = 5;
    this.squares = new Array(this.width * this.height);

    for (var i = 0; i < this.width; i++)
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
            
            ctx.fillStyle = square.borderColor;
            ctx.fillRect(coordX, coordY, this.mainGame.squareWidth, this.mainGame.squareHeight);
            
            ctx.fillStyle = square.color;
            ctx.fillRect(coordX + this.borderSize / 2, coordY + this.borderSize / 2, this.mainGame.squareWidth - 1 - this.borderSize, this.mainGame.squareHeight - 1 - this.borderSize);

            ctx.fillStyle = "#FF0000";
            ctx.fillText(square.letter, coordX + 10, coordY + this.mainGame.squareHeight / 2 + 10);
        }
    }
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
    //new tetromino
    int i = Math.floor((Math.random() * 7) + 1);
    blockType = i;
    rotation = 0;
    if i = 1 //O
    {
        subField[1][1].hasTetris = true;
        subField[1][2].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
    }    
    else if (i = 2) //I
    {
        subField[1][0].hasTetris = true;
        subField[1][1].hasTetris = true;
        subField[1][2].hasTetris = true;
        subField[1][3].hasTetris = true;
    }
    else if (i = 3) //T
    {
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
        subField[1][1].hasTetris = true;
    }
    else if (i = 4) //L
    {
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
        subField[1][2].hasTetris = true;
    }
    else if (i = 5) //J
    {
        subField[1][0].hasTetris = true;
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
    }
    else if (i = 6) //S
    {
        subField[2][0].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[1][1].hasTetris = true;
        subField[1][2].hasTetris = true;
    }
    else if (i = 7) //Z
    {
        subField[1][0].hasTetris = true;
        subField[1][1].hasTetris = true;
        subField[2][1].hasTetris = true;
        subField[2][2].hasTetris = true;
    }
}

function collision(x, y)
{
    for (var j = 0; j < 4; j++)
    {
        for(var k = 0; k < 4; k++)
        {
            if subField[j][k].hasTetris = true
            {
                if (gameGrid[j + x + (k + y) * gameGrid.width].hasTetris && subField[j][k].hasTetris)
                    return true;
                else
                    return false;
            }
        }
    }
}

function moveRight(x, y)
{
    var validMove = true;
    for (var i = 0; i < 4; i++)
    {
        for(var j = 0; j < 4; j++)
        {
            if (subField.collision(x, y) = true || ((x + i) + (y + j) * gameGrid.width) >= (gameGrid.width / gameGrid.squareWidth))
                validMove = false;
        }
    }

    if validMove = true
    {
        subField.writeState(x + 1, y);
    }
    else
        subField.revertState();
}

function moveLeft(x, y)
{
    var validMove = true;
    for (var i = 0; i < 4; i++)
    {
        for(var j = 0; j < 4; j++)
        {
            if (subField.collision() = true || ((x + i) + (y + j) * gameGrid.width) > 0)
                validMove = false;
        }
    }

    if validMove = true
    {
        subField.writeState(x - 1, y);
    }
    else
        subField.revertState();
}

function naturalFall(x, y)
{
    var validMove = true;
    for (var i = 0; i < 4; i++)
    {
        for(var j = 0; j < 4; j++)
        {
            if subField.collision() = true
                validMove = false;
        }
    }

    if validMove = true
    {
        subField.writeState(x, y + 1);
    }
    else
        subField.revertState();
}

function writeState(x, y)
{
    for (var i = 0; i < 4; i++)
    {
        for(var j = 0; j < 4; j++)
        {
            gameGrid[i + x  + (j + y) * gameGrid.width] = subField[i][j];
            [x + (j + y) * gameGrid.width].hasTetris = false;
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

    if rotation % 360 = 0
    {
        if blockType =  1
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if blockType = 2
        {
            subField[0][2].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if blockType = 3
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 4
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if blockType = 5
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 6
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
        }
        else if blockType = 7
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
    }
    else if rotation % 360 = 90
    {
        if blockType =  1
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if blockType = 2
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[2][3].hasTetris = true;
        }
        else if blockType = 3
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 4
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][0].hasTetris = true;
        }
        else if blockType = 5
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if blockType = 6
        {
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 7
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
    }
    else if rotation % 360 = 180
    {
        if blockType =  1
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if blockType = 2
        {
            subField[0][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 3
        {
            subField[1][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 4
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 5
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 6
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if blockType = 7
        {
            subField[1][1].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][0].hasTetris = true;
        }
    }
    else if rotation % 360 = 270
    {
        if blockType =  1
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if blockType = 2
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[1][3].hasTetris = true;
        }
        else if blockType = 3
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[1][1].hasTetris = true;
        }
        else if blockType = 4
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[1][2].hasTetris = true;
        }
        else if blockType = 5
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if blockType = 6
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
        }
        else if blockType = 7
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
    subField.clearField();
    if rotation % 360 = 0
    {
        if blockType =  1
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if blockType = 2
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[1][3].hasTetris = true;
        }
        else if blockType = 3
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[1][1].hasTetris = true;
        }
        else if blockType = 4
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[1][2].hasTetris = true;
        }
        else if blockType = 5
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if blockType = 6
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
        }
        else if blockType = 7
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
    }
    else if rotation % 360 = 90
    {
        if blockType =  1
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if blockType = 2
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[2][3].hasTetris = true;
        }
        else if blockType = 3
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 4
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][0].hasTetris = true;
        }
        else if blockType = 5
        {
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if blockType = 6
        {
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 7
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
    }
    else if rotation % 360 = 180
    {
        if blockType =  1
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if blockType = 2
        {
            subField[0][1].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 3
        {
            subField[1][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 4
        {
            subField[1][0].hasTetris = true;
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 5
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][0].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 6
        {
            subField[1][0].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if blockType = 7
        {
            subField[1][1].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][0].hasTetris = true;
        }
    }
    else if rotation % 360 = 270
    {
        if blockType =  1
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
        }
        else if blockType = 2
        {
            subField[0][2].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if blockType = 3
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[2][2].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 4
        {
            subField[1][1].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
            subField[3][2].hasTetris = true;
        }
        else if blockType = 5
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][1].hasTetris = true;
            subField[3][1].hasTetris = true;
        }
        else if blockType = 6
        {
            subField[1][1].hasTetris = true;
            subField[1][2].hasTetris = true;
            subField[2][0].hasTetris = true;
            subField[2][1].hasTetris = true;
        }
        else if blockType = 7
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
