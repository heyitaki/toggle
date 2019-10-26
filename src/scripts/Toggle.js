import * as constants from './constants';
import Board from "./Board";
import Boggle from "./Boggle";
import Canvas from './Canvas';
import Tetris from './Tetris';

export default class Toggle {
  /**
   * Create new instance of Toggle.
   */
  constructor() {
    this.board = new Board(constants.NUM_TILES_WIDTH, 
      constants.NUM_TILES_HEIGHT);
    this.canvas = new Canvas(this.board);
    this.boggle = new Boggle(this.board, this.draw.bind(this));
    this.tetris = new Tetris(this.board, this.draw.bind(this));
    this.tickTimer = setInterval(this.tick.bind(this), 
      constants.TOGGLE_TICK_TIME);
    this.tickCount = 0;
  }

  /**
   * Handles changes in game state that occur during each tick of Toggle.
   */
  tick() {
    this.draw();
    if (this.getGameOverIdx() != -1) this.endGame();
    if (this.tickCount % constants.BOGGLE_NUM_TICKS == 0) this.boggle.tick();
    if (this.tickCount % constants.TETRIS_NUM_TICKS == 0) this.tetris.tick()
    this.tickCount = ++this.tickCount 
      % (constants.BOGGLE_NUM_TICKS * constants.TETRIS_NUM_TICKS);
  }

  /**
   * Draw board, should be called for each update.
   */
  draw() {
    let currTile, x, y, offset;
    for (let i = 0; i < this.board.width; i++) {
      for (let j = 0; j < this.board.height; j++) {
        currTile = this.board.getTileByPosition(i, j);
        x = (constants.TILE_SIZE + constants.BORDER_WIDTH) * i;
        y = (constants.TILE_SIZE + constants.BORDER_WIDTH) * j;
        if (this.getGameOverIdx() === i) currTile.isEnded = true;
        this.canvas.ctx.fillStyle = currTile.getColor();
        
        // Draw tile
        offset = constants.BORDER_WIDTH;
        this.canvas.ctx.fillRect(
          x + offset, 
          y + offset, 
          constants.TILE_SIZE, 
          constants.TILE_SIZE
        );

        // Draw letter
        if (currTile.hasLetter()) {
          this.canvas.ctx.fillStyle = currTile.getLetterColor();
          offset += (constants.TILE_SIZE)/2;
          this.canvas.ctx.fillText(currTile.letter, x + offset, y + offset);
        }
      }
    }
  }

  /**
   * Get index of column through which game ended.
   * @returns {number} - Index of game-ending column, or -1 otherwise
   */
  getGameOverIdx() {
    this.boggle.gameOverIdx = this.tetris.gameOverIdx = 
      Math.max(this.boggle.gameOverIdx, this.tetris.gameOverIdx);
    return this.boggle.gameOverIdx;
  }

  /**
   * We're in the endgame now...
   */
  endGame() {
    clearInterval(this.tickTimer);
    this.boggle.removeHandlers();
    this.tetris.removeHandlers();
    this.board.resetTiles();
    this.draw();
  }
}
