import CanvasRenderer from '../CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';
import Animal from './Animal.js';

export default class Owl extends Animal {
  public constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;

    this.setWidth(LostInTheForest.canvas.width * 0.25);
    this.setHeight(LostInTheForest.canvas.height * 0.4);

    this.image = CanvasRenderer.loadNewImage('./assets/owl.gif');
  }
}
