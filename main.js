jQuery(function($)
{
		document.mainGame = new game();

		$(window).resize(function(e)
		{
	    	document.mainGame.windowResize($(window).width(), $(window).height());
		});

		document.mainGame.windowResize($(window).width(), $(window).height());

		setInterval(tick, 2);
});
