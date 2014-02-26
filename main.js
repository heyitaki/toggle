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
	});
	
	$(window).mousemove(function(e)
	{
		mainGame.handleMouseInput(e.clientX, e.clientY);
		console.log(mainGame.word);
	});

	$(window).mouseup(function(e)
	{
		mainGame.input.mouseUp(e.button);
		mainGame.grid.clearSelected();
		mainGame.updateScore();
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
		if (e.which == 87)
		{
			rotateClockwise();
		}
	});

	mainGame.setUpCanvas();
	setInterval(function()
	{
		naturalFall();
	}, 3000);
	setInterval(tick, 2);
});
