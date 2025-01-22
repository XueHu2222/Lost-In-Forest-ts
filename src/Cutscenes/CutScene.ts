import Area from '../Areas/Area.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import Stage from '../Stage.js';

export default class CutScene extends Stage {
  private frames: HTMLImageElement[];

  private nextArea: Area;

  private folderLength: number;

  private imageFolder: string;

  public constructor(player: Player, isDutch: boolean, imageFolder: string,
    folderLength: number, nextArea: Area) {
    super(player, isDutch);
    this.nextArea = nextArea;
    this.folderLength = folderLength;
    this.imageFolder = imageFolder;
    this.frames = [];
    this.loadCutsceneImages();
  }

  /**
   * Add all the frames to an array
   * Use the interval to keep changing the current frame
   * @param imageFolder Folder name of the frames
   * @param folderLength Amount of frames in the folder
   */
  protected loadCutsceneImages(): void {
    // Push all the images into the frames array
    for (let i: number = 1; i <= this.folderLength; i++) {
      const imagePath: string = `./assets/${this.imageFolder}/${i}.png`;
      this.frames.push(CanvasRenderer.loadNewImage(imagePath));
    }

    // Interval to change the current (first of the array) frame
    const intervalId: number = setInterval((): void => {
      this.frames.shift();
      if (!this.frames[0]) {
        clearInterval(intervalId); // Stop the interval when frames are empty
      }
    }, 500);
  }

  /**
   * 
   */
  public override processInput(): void {
    //none needed in this Stage
  }

  /**
   * Render the background
   * @param canvas The canvas used to change the background
   */
  public override render(): void {
    if (this.frames[0]) {
      this.backgroundImage = this.frames[0];
      this.renderBackground();
    }
  }

  public override getNextStage(): Stage | null {
    if (!this.frames[0]) {
      return this.nextArea;
    }
    return null;
  }
}
