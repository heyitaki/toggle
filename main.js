jQuery(function($)
{
	var canvasOffset = $('#gameCanvas').offset();
	mainGame = new game();
	
	mainGame.canvasOffsetX = canvasOffset.left;
	mainGame.canvasOffsetY = canvasOffset.top;

	intializeBlockArray();
	createNextBlock();	
	$(window).mousedown(function(e)
	{
		mainGame.input.mouseDown(e.button);
		moveRight();
	});
	
	$(window).mousemove(function(e)
	{
		mainGame.handleMouseInput(e.clientX, e.clientY);	
	});

	$(window).mouseup(function(e)
	{
		mainGame.input.mouseUp(e.button);
		mainGame.grid.clearSelected();
		mainGame.updateScore();
		mainGame.clearWord();
	});

	$(window).keydown(function(e)
	{
		if (e.which == 65)
		{
			moveLeft();
		}
		if (e.which == 68)
		{
			moveRight();
		}
		if (e.which == 83)
		{
			naturalFall();
		}
	});

	mainGame.setUpCanvas();	
	setInterval(function()
	{
		naturalFall();
	}, 1000);	
	setInterval(tick, 2);
});
