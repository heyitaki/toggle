export default class O {
  constructor() {
    this.orientation = 0;
    this.tiles = [[0, 1, 1, 0],
                  [0, 1, 1, 0],
                  [0, 0, 0, 0]];
  }

  rotate() {
    // Do nothing because O tetronimos are rotund bois
    this.orientation = (this.orientation + 90) % 360;
  }
}
