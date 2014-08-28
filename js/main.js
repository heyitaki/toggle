jQuery(function($)
{
	var canvasOffset = $("#game-canvas").offset();
	mainGame = new Game();
	mainGame.canvasOffsetX = canvasOffset.left;
	mainGame.canvasOffsetY = canvasOffset.top;

	intializeBlockArray();
	createNextBlock();
	$(window).on("mousedown", function(e)
	{
		mainGame.input.mouseDown(e.button);
	});

	$(window).on("mousemove", function(e)
	{
		mainGame.handleMouseInput(e.clientX, e.clientY);
	});

	$(window).on("mouseup", function(e)
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

	$(window).on("keydown", function(e)
	{
		switch (e.which) {
			case Keys.A:
				moveLeft();
				break;

			case Keys.D:
				moveRight();
				break;

			case Keys.S:
				naturalFall();
				break;

			case Keys.W:
				rotateClockwise();
				break;
		}
	});

	mainGame.setUpCanvas();
	setInterval(function()
	{
		naturalFall();
	}, 3000);
	setInterval(tick, 2);
});
