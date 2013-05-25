jQuery(function($)
{
		function game()
		{
			this.boardWidth = 10;
			this.boardHeight = 10;
			this.squareWidth = 40;
			this.squareHeight = 40;
			this.windowWidth = 0;
			this.windowHeight = 0;
			this.ctx = $('#gameCanvas')[0].getContext('2d');
			this.counter = 0;
		}

		game.prototype.update = function()
		{
			this.counter++;
		};

		game.prototype.draw = function()
		{
			console.log('drawing');
			this.ctx.fillStyle = "#000000";
			this.ctx.fillRect(10, 10, 100, 100);
		};

		game.prototype.windowResize = function(x, y)
		{
			this.windowWidth = x;
			this.windowHeight = y;
			this.ctx.canvas.width = x;
			this.ctx.canvas.height = y;
			console.log('asdf');
		}

		document.mainGame = new game();

		$(window).resize(function(e)
			{
		    	document.mainGame.windowResize($(window).width(), $(window).height());
			});
		document.mainGame.windowResize($(window).width(), $(window).height());
		setInterval(function()
				{
					document.mainGame.update();
					document.mainGame.draw();
				},
				2);
});
