var word = [];

function checkSquare(gameGrid, squareIndex)
{
	return gameGrid[squareIndex].hasTetris;
}

function addLetter(gameGrid, currSquareIndex)
{
	word.push(gameGrid[currSquareIndex]);
}

function addLetter(gameGrid, prevSquareIndex, currSquareIndex)
{
	if(checkSquare(gameGrid[currSquareIndex]) && isAdjacent(gameGrid, prevSquareIndex, currSquareIndex))
	{
		word.push(gameGrid[currSquareIndex]);
	}
}

function isAdjacent(gameGrid, prevSquareIndex, currSquareIndex)
{
	var larger;
	if(Math.abs(currSquareIndex - prevSquareIndex) == 1)
	{
		return true;
	}

	if(prevSquareIndex < currSquareIndex)
	{
		larger = currSquareIndex;
		var shiftedIndex = larger - gameGrid.width
	
	 	  if(Math.abs(shiftedIndex - prevSquareIndex) <= 1)
		{
			return true;
		}
	}
	else
	{
		larger = prevSquareIndex;
		var shiftedIndex = larger - gameGrid.width
		if(Math.abs(shiftedIndex - currSquareIndex) <= 1)
		{
			return true;
		}
	}
	return false;
}
function clearWord()
{
	word = [];
}

function compilationUpdate(gameGrid, currSquareIndex)
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

