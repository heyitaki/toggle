jQuery(function($)
{
		document.mainGame = new game();

		$(window).resize(function(e)
		{
	    	document.mainGame.windowResize($(window).width(), $(window).height());
		});
		
		$(window).mousedown(function(e)
		{
			document.mainGame.handleMouseInput(e.clientX, e.clientY);
		});
		document.mainGame.windowResize($(window).width(), $(window).height());

		setInterval(tick, 2);
});
