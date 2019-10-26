import * as constants from './constants';
import * as utils from "./utils";
import Board from "./Board";
import Trie from "./Trie";
import Dictionary from './Dictionary';
import Canvas from './Canvas';

export default class Boggle {
  /**
   * Create new instance of Boggle.
   * @param {Board} board 
   */
  constructor(board, draw) {
    this.board = board;
    this.update = draw;
    this.tickCount = 0;
    this.numVowels = 0;
    this.numConsonants = 0;
    this.letterGenerator = this.yieldLetter();
    this.gameOverIdx = -1;
    this.mouseDown = false;
    this.swipe = [];

    // Load dictionary
    const words = Dictionary.getWords();
    this.dictionary = new Trie(words);
    console.log(this.dictionary)
    console.log(this.dictionary.find('hello'))

    // Setup game
    this.addHandlers();
  }

  /**
   * Handles changes in game state that occur during each tick of Boggle.
   */
  tick() {
    if (this.gameOverIdx != -1) return;

    // All falling letters advance one space per tick
    let currTile, southNeighbor, tempLetter;
    for (let i = this.board.width-1; i >= 0; i--) {
      for (let j = this.board.height-1; j >= 0; j--) {
        currTile = this.board.getTileByPosition(i, j);
        if (currTile && currTile.hasLetter() && !currTile.isSelected) {
          southNeighbor = this.board.getTileBelow(currTile);
          if (southNeighbor && !southNeighbor.hasLetter()) {
            tempLetter = currTile.letter;
            currTile.letter = '';
            southNeighbor.letter = tempLetter;
          }
        }
      }
    }

    // Every three ticks, a new letter falls
    if (this.tickCount === 0) {
      const randIndex = utils.getRandomNumber(0, this.board.width);
      const randTile = this.board.getTileByPosition(randIndex, 0);
      if (randTile.hasLetter()) {
        this.gameOverIdx = randIndex;
        return;
      } else {
        const newLetter = this.letterGenerator.next().value;
        randTile.letter = newLetter;
      }
    }

    this.tickCount = (this.tickCount + 1) % constants.NUM_TICKS_PER_ACTION;
  }

  /**
   * Generator used to populate board with letters. Balances number of vowels 
   * and consonants to increase probability of legitimate words.
   * @yields {string} Next letter to drop into board
   */
  *yieldLetter() {
    const vowels = 'AEIOU';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let percentVowels = Math.random(), nextLetter;
    while (true) {
      if (percentVowels < 0.55) {
        nextLetter = vowels[utils.getRandomNumber(0, vowels.length)];
        this.numVowels++;
      } else {
        nextLetter = letters[utils.getRandomNumber(0, letters.length)];
        if (vowels.indexOf(nextLetter) >= 0) this.numVowels++;
        else this.numConsonants++;
      }

      percentVowels = this.numVowels / (this.numVowels + this.numConsonants);
      yield nextLetter; 
    }
  }

  /**
   * Add all handlers that enable mouse interaction with board.
   */
  addHandlers() {
    const that = this;
    const canvas = Canvas.getCanvas();
    
    this.onMouseMove = function(e) {
      let updated = false;
      const pos = utils.getMousePosition(e, canvas, true);
      updated |= that.board.changeAllTiles('isHovered', false);
      if (pos) {
        updated |= that.board.changeTileByPosition(pos.x, pos.y, 'isHovered', true);
        const tile = that.board.getTileByPosition(pos.x, pos.y);
        if (that.swipe.length > 1 && tile === that.swipe[that.swipe.length-2]) {
          const unselectTile = that.swipe.pop();
          updated |= that.board.changeTile(unselectTile, 'isSelected', false);
        } else if (that.mouseDown && tile.hasLetter() 
            && (that.swipe.indexOf(tile) < 0)
            && Board.areNeighbors(tile, that.swipe[that.swipe.length-1])) {
          that.swipe.push(tile);
          updated |= that.board.changeTileByPosition(
            pos.x, 
            pos.y, 
            'isSelected', 
            true
          );
        }
      }

      if (updated) that.update();
    };

    this.onMouseDown = function(e) {
      const pos = utils.getMousePosition(e, canvas);
      if (!pos) return;

      let updated = false;
      that.mouseDown = true;
      const tile = that.board.getTileByPosition(pos.x, pos.y);
      if (tile.hasLetter()) {
        that.swipe.push(tile);
        updated |= that.board.changeTileByPosition(
          pos.x, 
          pos.y, 
          'isSelected', 
          true
        );
      }

      if (updated) that.update();
    };

    this.onMouseUp = function(e) {
      that.board.changeAllTiles('isSelected', false);
      const isValid = that.validateSwipe();
      if (that.swipe.length > 1 && isValid) {
        for (let i = 0; i < that.swipe.length; i++) {
          that.swipe[i].isCorrect = true;
          setTimeout(that.resetTile.bind(that), constants.SWIPE_COLOR_CHANGE_TIME, 
            that.swipe[i], 'isCorrect', true);
        }
      } else if (!isValid) {
        for (let i = 0; i < that.swipe.length; i++) {
          that.swipe[i].isIncorrect = true;
          setTimeout(that.resetTile.bind(that), constants.SWIPE_COLOR_CHANGE_TIME, 
            that.swipe[i], 'isIncorrect');
        }
      }

      that.swipe = [];
      that.update();
      that.mouseDown = false;
    };

    document.addEventListener('mousemove', this.onMouseMove, false);
    document.addEventListener('mousedown', this.onMouseDown, false);
    document.addEventListener('mouseup', this.onMouseUp, false);
  }

  /**
   * Remove all handlers associated with Boggle.
   */
  removeHandlers() {
    document.removeEventListener('mousemove', this.onMouseMove, false);
    document.removeEventListener('mousedown', this.onMouseDown, false);
    document.removeEventListener('mouseup', this.onMouseUp, false);
  }

  /**
   * Determine whether or not current swipe is a legitimate word.
   */
  validateSwipe() {
    let word = '';
    for (let i = 0; i < this.swipe.length; i++) {
      word += this.swipe[i].letter;
    }

    return this.dictionary.find(word);
  }

  /**
   * Reset tile to default color and remove letter if needed.
   * @param {Tile} tile 
   * @param {string} prop - Property to reset
   * @param {boolean} removeLetter - Whether or not to remove tile's letter
   */
  resetTile(tile, prop, removeLetter=false) {
    this.board.changeTile(tile, prop, false);
    if (removeLetter) tile.letter = '';
    this.update();
  }
}