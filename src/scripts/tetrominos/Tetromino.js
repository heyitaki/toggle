import * as utils from '../utils';
import I from "./I";
import J from "./J";
import L from "./L";
import O from "./O";
import S from "./S";
import T from "./T";
import Z from "./Z";

export default class Tetromino {
  static setRotation(tetromino, orientation) {
    if (orientation % 90 != 0) return;
    tetromino.orientation = orientation - 90;
    tetromino.rotate();
  }

  /**
   * Get new random tetromino.
   * @returns {Object} - Random tetromino
   */
  static getNewTetromino() {
    const getI = () => new I();
    const getJ = () => new J();
    const getL = () => new L();
    const getO = () => new O();
    const getS = () => new S();
    const getT = () => new T();
    const getZ = () => new Z(); 
    const generators = [getI, getJ, getL, getO, getS, getT, getZ];
    return generators[utils.getRandomNumber(0, generators.length)]();
  }
}
