import Animal from './Animal.js';

export default class Frog extends Animal {
  public constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
  }
}
