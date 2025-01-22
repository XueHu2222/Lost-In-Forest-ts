import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
import LostInTheForest from './LostInTheForest.js';

export default class Animal extends CanvasItem {
  private timeToNextFrame: number;

  private animal: string;

  private folderLength: number;

  private frameIndex: number;

  private frames: HTMLImageElement[];

  public constructor(posX: number, posY: number, animal: string, folderLength: number) {
    super();
    // TODO: Set correct values
    this.frames = [];
    this.timeToNextFrame = 500;
    this.posX = posX;
    this.posY = posY;
    this.animal = 'bunny';
    this.animal = animal;
    this.folderLength = 4;
    this.frameIndex = 0;
    this.folderLength= folderLength;
    this.image = CanvasRenderer.loadNewImage(`./assets/Animals/${this.animal}/1.png`);


    this.setWidth(LostInTheForest.canvas.width * 0.25);
    this.setHeight(LostInTheForest.canvas.height * 0.4);
    this.frames = [];
    for(let i: number = 1; i < folderLength; i++){
      this.frames.push(CanvasRenderer.loadNewImage(`./assets/Animals/${this.animal}/${i}.png`));
    }
  }

  /**
   * To make the animals loop
   * @param elapsed time elapsed
   */
  public update (elapsed: number): void{
    this.timeToNextFrame -= elapsed;
    if (this.timeToNextFrame < 0){
      this.image = this.frames[this.frameIndex] as HTMLImageElement;
      this.frameIndex += 1;
      if(this.frameIndex == this.folderLength - 1){
        this.frameIndex = 0;
      }
      this.timeToNextFrame = 500;
    }
  }
}
