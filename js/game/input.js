function GameInput() {
	this.mouseStates = [false, false, false];

	this.frameMouseStates = this.mouseStates.slice(0);
	this.lastFrameMouseStates = this.mouseStates.slice(0);
}

GameInput.prototype.mouseDown = function(button) {
	this.mouseStates[button] = true;
};

GameInput.prototype.mouseUp = function(button) {
	this.mouseStates[button] = false;
};

GameInput.prototype.update = function() {
	this.lastFrameMouseStates = this.frameMouseStates.slice(0);
	this.frameMouseStates = this.mouseStates.slice(0);
};

GameInput.prototype.wasMousePressed = function(button) {
	return this.frameMouseStates[button] && (this.frameMouseStates[button] !== this.lastFrameMouseStates[button]);
};
