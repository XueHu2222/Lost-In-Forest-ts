import CanvasItem from '../CanvasItem.js';
import CanvasRenderer from '../CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';

export default class Animal extends CanvasItem {
  protected frames: HTMLImageElement[];

  protected timeToNextFrame: number;

  protected currentFrameIndex: number;

  public constructor(posX: number, posY: number, animal: string) {
    super();
    // TODO: Set correct values
    this.frames = [];
    this.timeToNextFrame = 1;
    this.currentFrameIndex = 0;
    this.posX = posX;
    this.posY = posY;

    this.setWidth(LostInTheForest.canvas.width * 0.25);
    this.setHeight(LostInTheForest.canvas.height * 0.4);

    this.image = CanvasRenderer.loadNewImage(`./assets/${animal}.gif`);
  }

  public update(elapsed: number): void {

  }
}
