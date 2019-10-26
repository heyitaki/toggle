export default class L {
  constructor() {
    this.orientation = 0;
    this.tiles = [[1, 0, 0],
                  [1, 1, 1],
                  [0, 0, 0]];
  }

  rotate() {
    this.orientation = (this.orientation + 90) % 360;
    switch (this.orientation) {
      case 0:
        this.tiles = [[1, 0, 0],
                      [1, 1, 1],
                      [0, 0, 0]];
        break;
      case 90:
        this.tiles = [[0, 1, 1],
                      [0, 1, 0],
                      [0, 1, 0]];
        break;
      case 180:
        this.tiles = [[0, 0, 0],
                      [1, 1, 1],
                      [0, 0, 1]];
        break;
      case 270:
        this.tiles = [[0, 1, 0],
                      [0, 1, 0],
                      [1, 1, 0]];           
    }
  }
}
