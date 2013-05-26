jQuery(function($)
{
	var canvasOffset = $('#gameCanvas').offset();
	mainGame = new game();
	
	mainGame.canvasOffsetX = canvasOffset.left;
	mainGame.canvasOffsetY = canvasOffset.top;

	intializeBlockArray();	
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
	mainGame.setUpCanvas();	
	
	setInterval(tick, 2);
});
