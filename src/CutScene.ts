import CanvasRenderer from './Base/CanvasRenderer.js';
import Player from './Player.js';
import Stage from './Stage.js';

export default class CutScene extends Stage {
  private frames: HTMLImageElement[];

  private nextStage: Stage;

  private folderLength: number;

  private imageFolder: string;

  private timeToNextFrame: number;

  public constructor(player: Player, imageFolder: string,
    folderLength: number, nextArea: Stage) {
    super(player);
    this.nextStage = nextArea;
    this.folderLength = folderLength;
    this.imageFolder = imageFolder;
    this.frames = [];
    this.timeToNextFrame = 500;

    // Push all the images into the frames array
    for (let i: number = 1; i <= this.folderLength; i++) {
      const imagePath: string = `./assets/${this.imageFolder}/${i}.png`;
      this.frames.push(CanvasRenderer.loadNewImage(imagePath));
    }
    this.backgroundImage = this.frames[0] as HTMLImageElement;
  }

  public override getNextStage(): Stage | null {
    if (!this.frames[0]) {
      return this.nextStage;
    }
    return null;
  }

  /**
   *
   */
  public override processInput(): void {
    //none needed in this Stage
  }

  /**
   * To change the cutscene frames
   * Use the update to keep changing the current frame
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    this.timeToNextFrame -= elapsed;
    if (this.timeToNextFrame < 0) {
      this.frames.shift();
      if (this.frames[0]) {
        this.backgroundImage = this.frames[0];
      }
      this.timeToNextFrame = 500;
    }
  }
}
