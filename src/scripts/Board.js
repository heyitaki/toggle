import Tile from "./Tile";

export default class Board {

  /**
   * Create a new instance of Board.
   * @param {number} width 
   * @param {number} height 
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = [];

    // Fill board with empty tiles
    for (let i = 0; i < this.width; i++) {
      this.tiles.push(Array(this.height).fill(null));
      for (let j = 0; j < this.height; j++) {
        this.tiles[i][j] = new Tile(i, j);
      }
    }
  }

  /**
   * Return corresponding tile to given coordinate or null if coordinate is 
   * invalid.
   * @param {number} x 
   * @param {number} y 
   * @returns {Tile}
   */
  getTileByPosition(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null;
    return this.tiles[x][y];
  }

  /**
   * Get tile below given tile.
   * @param {Tile} tile
   * @returns {Tile}
   */
  getTileBelow(tile) {
    return this.getTileByPosition(tile.x, tile.y+1);
  }

  /**
   * Change same prop for all tiles to same value. Used to reset board from 
   * effects caused by mouse input.
   * @returns {boolean} - Whether or not any tiles were updated.
   */
  resetTiles() {
    let updated = false;
    const props = ['isHovered', 'isSelected', 'isCorrect', 'isIncorrect'];
    for (let i = 0; i < props.length; i++) {
      updated |= this.changeAllTiles(props[i], false);
    }

    return updated;
  }

  /**
   * Change same prop for all tiles to same value. Useful for resetting board.
   * @param {string} prop 
   * @param {*} value 
   * @returns {boolean} - Whether or not any tiles were updated.
   */
  changeAllTiles(prop, value) {
    let updated = false;
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        updated |= this.changeTileByPosition(i, j, prop, value);
      }
    }

    return updated;
  }

  /**
   * Change prop of tile at given position to given value.
   * @param {number} x 
   * @param {number} y 
   * @param {string} prop 
   * @param {*} value
   * @returns {boolean} - Whether or not given tile was updated.
   */
  changeTileByPosition(x, y, prop, value) {
    const tile = this.getTileByPosition(x, y);
    return this.changeTile(tile, prop, value);
  }

  /**
   * Change prop of tile at given position to given value.
   * @param {Tile} tile
   * @param {string} prop 
   * @param {*} value
   * @returns {boolean} - Whether or not given tile was updated.
   */
  changeTile(tile, prop, value) {
    if (!tile) return false;
    const updated = (tile[prop] != value);
    tile[prop] = value;
    return updated;
  }

  /**
   * Determine whether the given tiles are adjacent.
   * @param {Tile} tile1 
   * @param {Tile} tile2 
   */
  static areNeighbors(tile1, tile2) {
    if (!tile1 || !tile2) return false;
    return Math.abs(tile1.x-tile2.x) <= 1 && Math.abs(tile1.y-tile2.y) <= 1;
  }
}
