function gameInput()
{
	this.mouseStates = new Array(3);
	this.mouseStates[0] = false;
	this.mouseStates[1] = false;
	this.mouseStates[2] = false;

	this.frameMouseStates = this.mouseStates.slice(0);
	this.lastFrameMouseStates = this.mouseStates.slice(0);	
}

gameInput.prototype.mouseDown = function(button)
{
	this.mouseStates[button] = true;
	console.log('down');
}

gameInput.prototype.mouseUp = function(button)
{
	this.mouseStates[button] = false;
	console.log('up');
}

gameInput.prototype.update = function()
{
	this.lastFrameMouseStates = this.frameMouseStates.slice(0);
	this.frameMouseStates = this.mouseStates.slice(0);

}

gameInput.prototype.wasMousePressed = function(button)
{
	return this.frameMouseStates[button] && (this.frameMouseStates[button] != this.lastFrameMouseStates[button]);
}
