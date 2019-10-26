import * as constants from "./constants";
import Board from "./Board";

export default class Canvas {
  /**
   * Create a new instance of Canvas.
   */
  constructor() {
    // Draw canvas
    const canvas = Canvas.getCanvas();
    canvas.width = constants.NUM_TILES_WIDTH * constants.TILE_SIZE 
      + (constants.NUM_TILES_WIDTH + 1) * constants.BORDER_WIDTH;
    canvas.height = constants.NUM_TILES_HEIGHT * constants.TILE_SIZE 
      + (constants.NUM_TILES_HEIGHT + 1) * constants.BORDER_WIDTH;
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = constants.BORDER_COLOR;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Setup canvas
    this.ctx.font = `${constants.FONT_SIZE}px Verdana`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
  }

  /**
   * Get canvas element.
   * @returns {HTMLElement}
   */
  static getCanvas() {
    return document.getElementById('game-canvas');
  }
}
