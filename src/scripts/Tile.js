import * as constants from './constants';

export default class Tile {
  /**
   * Create a new instance of Tile.
   * @param {number} x 
   * @param {number} y 
   * @param {string} letter 
   */
  constructor(x, y, letter='') {
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.isEnded = false;
    this.isSelected = false;
    this.isHovered = false;
    this.isCorrect = false;
    this.isIncorrect = false;
    this.isFalling = false;
    this.isFixed = false;
  }

  /**
   * Returns whether or not this tile has a letter assigned to it.
   * @returns {boolean}
   */
  hasLetter() {
    return this.letter != '';
  }
  
  /**
   * Returns color of tile.
   * @returns {string} - Hexcode of color
   */
  getColor() {
    let color;
    if (this.isEnded) color = constants.TILE_END_COLOR;
    else if (this.isSelected) color = constants.TILE_SELECT_COLOR;
    else if (this.isCorrect) color = constants.TILE_CORRECT_COLOR;
    else if (this.isIncorrect) color = constants.TILE_INCORRECT_COLOR;
    else if (this.isFixed) color = constants.TILE_FIXED_COLOR;
    else if (this.isFalling) color = constants.TILE_FALL_COLOR;
    else if (this.isHovered) color = constants.TILE_HOVER_COLOR;
    else color = constants.TILE_COLOR;
    return color;
  }

  /**
   * Returns color of letter within tile.
   * @returns {string} - Hexcode of color
   */
  getLetterColor() {
    return (this.isEnded || this.isSelected || this.isCovered || 
        this.isCorrect || this.isIncorrect || this.isFixed)
      ? constants.LETTER_COLOR_LIGHT
      : constants.LETTER_COLOR_DARK;
  }
}
