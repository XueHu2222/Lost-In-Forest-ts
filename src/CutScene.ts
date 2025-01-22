import Area from './Areas/Area.js';
import CanvasRenderer from './CanvasRenderer.js';
import Player from './Player.js';
import Stage from './Stage.js';

export default class CutScene extends Stage {
  private frames: HTMLImageElement[];

  private nextArea: Area;

  private folderLength: number;

  private imageFolder: string;

  private timeToNextFrame: number;

  public constructor(player: Player, isDutch: boolean, imageFolder: string,
    folderLength: number, nextArea: Area) {
    super(player, isDutch);
    this.nextArea = nextArea;
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

  /**
   * Render the background
   * @param canvas The canvas used to change the background
   */
  public override render(): void {
    this.renderBackground();
  }

  public override getNextStage(): Stage | null {
    if (!this.frames[0]) {
      return this.nextArea;
    }
    return null;
  }
}
