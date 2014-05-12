jQuery(function($)
{
	var canvasOffset = $('#game-canvas').offset();
	mainGame = new Game();
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

	var Keys = {
		"A": 65,
		"D": 68,
		"S": 83,
		"W": 87
	};

	$(window).keydown(function(e)
	{
		if (e.which === Keys.A)
		{
			moveLeft();
		}
		if (e.which === Keys.D)
		{
			moveRight();
		}
		if (e.which === Keys.S)
		{
			naturalFall();
		}
		if (e.which === Keys.W)
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
