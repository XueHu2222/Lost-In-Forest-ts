import CanvasItem from '../CanvasItem.js';

export default abstract class Animal extends CanvasItem {
  protected frames: HTMLImageElement[];

  protected timeToNextFrame: number;

  protected currentFrameIndex: number;

  public constructor(){
    super();
    // TODO: Set correct values
    this.frames = [];
    this.timeToNextFrame = 1;
    this.currentFrameIndex = 0;
  }

  public update(elapsed: number): void{

  }
}
