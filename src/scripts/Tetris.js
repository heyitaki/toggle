import Point from "./Point";
import Tile from "./Tile";
import Tetromino from "./tetrominos/Tetromino";

export default class Tetris {
  constructor(board, draw) {
    this.board = board;
    this.update = draw;
    this.topLeft = null;
    this.tetromino = null;
    this.gameOverIdx = -1;

    // Setup game
    this.reset();
    this.addHandlers();
  }

  tick() {
    
    if (this.gameOverIdx != -1) return;
    if (!this.tetromino) this.reset();

    // Falling tetronimo advances one space each tick
    this.moveDown();
  }

  /**
   * Add all handlers that enable keyboard interaction with board.
   */
  addHandlers() {
    this.onKeyDown = (e) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') this.rotate();
      else if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.moveLeft();
      else if (e.code === 'KeyS' || e.code === 'ArrowDown') this.moveDown();
      else if (e.code === 'KeyD' || e.code === 'ArrowRight') this.moveRight();
      else if (e.code === 'Space') this.instantFall();
    };

    document.addEventListener('keydown', this.onKeyDown, false);
  }

  /**
   * Remove all handlers associated with Boggle.
   */
  removeHandlers() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  /**
   * Move falling tetromino left. Leave it in place if there was a collision.
   * @returns {boolean} - Whether or not there was a collision
   */
  moveLeft() {
    return this.move(new Point(this.topLeft.x-1, this.topLeft.y));
  }

  /**
   * Move falling tetromino right. Leave it in place if there was a collision.
   * @returns {boolean} - Whether or not there was a collision
   */
  moveRight() {
    return this.move(new Point(this.topLeft.x+1, this.topLeft.y));
  }

  /**
   * Move falling tetromino down. Leave it in place if there was a collision.
   * @returns {boolean} - Whether or not there was a collision
   */
  moveDown() {
    return this.move(new Point(this.topLeft.x, this.topLeft.y+1), this.place.bind(this));
  }

  /**
   * Keep lowering tetromino until it hits boundary or another fixed piece.
   */
  instantFall() {
    while (!this.moveDown()) {}
  }

  /**
   * Move falling tetromino.
   * @param {Point} newPosition - Where to move falling tetronimo to
   * @param {function} callback - Method to execute if there is a collision
   * @returns {boolean} - Whether or not there was a collision
   */
  move(newPosition, callback) {
    const undo = this.topLeft,
          prevTiles = this.map();
    this.topLeft = newPosition;
    const currTiles = this.map();
    let hasCollision;
    if (hasCollision = this.hasCollision(currTiles)) {
      this.topLeft = undo;
      if (callback) callback();
    } else {
      for (let i = 0; i < prevTiles.length; i++)
        prevTiles[i].isFalling = false;
      for (let i = 0; i < currTiles.length; i++)
        currTiles[i].isFalling = true;
    }

    this.update();
    return hasCollision;
  }

  /**
   * Rotate falling tetromino.
   * @returns {boolean} - Whether or not there was a collision
   */
  rotate() {
    const undo = this.tetromino.orientation,
          prevTiles = this.map();
    this.tetromino.rotate();
    const currTiles = this.map();
    let hasCollision;
    if (hasCollision = this.hasCollision(currTiles)) {
      Tetromino.setRotation(this.tetromino, undo);
    } else {  
      for (let i = 0; i < prevTiles.length; i++)
        prevTiles[i].isFalling = false;
      for (let i = 0; i < currTiles.length; i++)
        currTiles[i].isFalling = true;
    }

    this.update();
    return hasCollision;
  }

  /**
   * Return tiles on board which are covered by the current falling tetromino.
   * @returns {Tile[]}
   */
  map() {
    const tiles = [];
    if (this.tetromino) {
      let x, y;
      const points = this.tetromino.tiles;
      for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[0].length; j++) {
          x = this.topLeft.x + j;
          y = this.topLeft.y + i;
          if (y < 0 && points[i][j]) 
            tiles.push(new Tile(x, y));
          else if (points[i][j]) tiles.push(this.board.getTileByPosition(x, y));
        }
      }
    }

    return tiles;
  }

  /**
   * Determine if falling tetromino is colliding with fixed pieces.
   * @param {Tile[]} tiles - Tiles part of falling tetromino
   * @returns {boolean}
   */
  hasCollision(tiles) {
    let hasCollision = false;
    for (let i = 0; i < tiles.length; i++) 
      hasCollision |= (!tiles[i] || tiles[i].isFixed || tiles[i].x < 0
        || tiles[i].x >= this.board.width || tiles[i].y >= this.board.height);
    return hasCollision;
  }

  /** Place falling tetromino and reset mapper. */
  place() {  
    const tiles = this.map();
    for (let i = 0 ; i < tiles.length; i++) {
      if (tiles[i].y < 0) {
        this.gameOverIdx = tiles[i].x;
        return;
      }

      tiles[i].isFalling = false;
      tiles[i].isFixed = true;
    }

    this.removeLines(tiles);
    this.reset();
  }

  /**
   * Reset mapper to top with new tetromino.
   */
  reset() {
    this.topLeft = new Point(3, -3);
    this.tetromino = Tetromino.getNewTetromino();
  }

  /**
   * Remove full rows from Tetris.
   * @param {Tile[]} tiles - Tiles from placed tetromino
   */
  removeLines(tiles) {
    const linesToCheck = [];
    for (let i = 0; i < tiles.length; i++) {
      if (linesToCheck.indexOf(tiles[i].y) === -1)
        linesToCheck.push(tiles[i].y);
    }

    let isFullLine;
    for (let i = 0; i < linesToCheck.length; i++) {
      isFullLine = true;
      for (let j = 0; j < this.board.width; j++) {
        isFullLine &= this.board.getTileByPosition(j, linesToCheck[i]).isFixed;
      }

      // Reset full line
      if (isFullLine) {
        for (let j = 0; j < this.board.width; j++) {
          this.board.getTileByPosition(j, linesToCheck[i]).isFixed = false;
        }

        // Remove line, move tiles aboves down 1 space
        let currTile;
        for (let j = linesToCheck[i]-1; j >= 0; j--) {
          for (let k = 0; k < this.board.width; k++) {
            currTile = this.board.getTileByPosition(k, j);
            if (currTile.isFixed) {
              this.board.getTileBelow(currTile).isFixed = true;
              currTile.isFixed = false;
            }
          }
        }
      }
    }

    this.update(); 
  }
}
