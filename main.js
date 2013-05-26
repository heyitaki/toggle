jQuery(function($)
{
		document.mainGame = new game();

		$(window).resize(function(e)
		{
	    	document.mainGame.windowResize($(window).width(), $(window).height());
		});
		
		$(window).mousedown(function(e)
		{
			//document.mainGame.handleMouseInput(e.clientX, e.clientY);
			document.mainGame.input.mouseDown(e.button);	
		});
		
		$(window).mousemove(function(e)
		{
			document.mainGame.handleMouseInput(e.clientX, e.clientY);	
		});

		$(window).mouseup(function(e)
		{
			document.mainGame.input.mouseUp(e.button);
			document.mainGame.grid.clearSelected();
		});

		document.mainGame.windowResize($(window).width(), $(window).height());
		
		setInterval(tick, 2);
});
