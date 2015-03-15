jQuery(function($) {
	var canvasOffset = $("#game-canvas").offset();
	mainGame = new Game();
	mainGame.canvasOffsetX = canvasOffset.left;
	mainGame.canvasOffsetY = canvasOffset.top;

	intializeBlockArray();
	createNextBlock();

	$(window)
		.on("mousedown", function(e) {
			mainGame.input.mouseDown(e.button);
		})
		.on("mousemove", function(e) {
			mainGame.handleMouseInput(e.clientX, e.clientY);
		})
		.on("mouseup", function(e) {
			mainGame.input.mouseUp(e.button);
			mainGame.grid.clearSelected();
			mainGame.updateScore();
		});

	var Keys = {
		"A": 65,
		"D": 68,
		"S": 83,
		"W": 87,
		"Left": 37,
		"Right": 39,
		"Down": 40,
		"Up": 38
	};

	$(window).on("keydown", function(e) {
		switch (e.which) {
			case Keys.A:
			case Keys.Left:
				moveLeft();
				break;

			case Keys.D:
			case Keys.Right:
				moveRight();
				break;

			case Keys.S:
			case Keys.Down:
				naturalFall();
				break;

			case Keys.W:
			case Keys.Up:
				rotateClockwise();
				break;
		}
	});

	mainGame.setUpCanvas();
	setInterval(function() {
		naturalFall();
	}, 3000);
	setInterval(tick, 2);
});
