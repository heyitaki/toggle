import Point from "./Point";
import * as constants from "./constants";

/**
 * Get a random number within given range.
 * @param {number} start - Inclusive
 * @param {number} end - Exclusive
 * @returns {number}
 */
export function getRandomNumber(start, end) {
  return Math.floor(Math.random()*(end-start)) + start;
}

/**
 * Get current tile under cursor, or null if no tile is under cursor.
 * @param {Object} e - Mouse event
 * @param {Object} canvas - Canvas object
 * @returns {Point}
 */
export function getMousePosition(e, canvas, swiping=false) {
  const rect = canvas.getBoundingClientRect(),
        xCoor = e.clientX - rect.left,
        yCoor = e.clientY - rect.top,
        tileWithBorder = constants.TILE_SIZE + constants.BORDER_WIDTH,
        x = Math.floor(xCoor/tileWithBorder),
        y = Math.floor(yCoor/tileWithBorder);
  if (((xCoor % tileWithBorder) < constants.BORDER_WIDTH) || 
      ((yCoor % tileWithBorder) < constants.BORDER_WIDTH) ||
      x < 0 || x >= constants.NUM_TILES_WIDTH ||
      y < 0 || y >= constants.NUM_TILES_HEIGHT) {
    return null;    
  } else if (swiping) {
    // Slanted corners so swiping diagonally is easier
    const xMod = (xCoor % tileWithBorder) - constants.BORDER_WIDTH,
          yMod = (yCoor % tileWithBorder) - constants.BORDER_WIDTH;
    if (xMod + yMod < constants.SWIPE_OFFSET
      || xMod + yMod > (2 * constants.TILE_SIZE - constants.SWIPE_OFFSET)
      || Math.abs(xMod - yMod) >= (constants.TILE_SIZE - constants.SWIPE_OFFSET)) {
        return null;
    }
  }

  return new Point(x, y);
}
