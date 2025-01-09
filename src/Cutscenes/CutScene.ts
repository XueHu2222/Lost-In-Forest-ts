import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import Stage from '../Stage.js';

export default abstract class CutScene extends Stage {
  protected frames: HTMLImageElement[];

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.frames = [];
  }

  /**
   * Add all the frames to an array
   * Use the interval to keep changing the current frame
   * @param imageFolder Folder name of the frames
   * @param folderLength Amount of frames in the folder
   */
  protected loadCutsceneImages(imageFolder: string, folderLength: number): void {
    // Push all the images into the frames array
    for (let i: number = 1; i <= folderLength; i++) {
      const imagePath: string = `./assets/${imageFolder}/${i}.png`;
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
   * Render the background
   * @param canvas The canvas used to change the background
   */
  public override render(canvas: HTMLCanvasElement): void {
    if (this.frames[0]) {
      this.backgroundImage = this.frames[0];
      this.renderBackground(canvas);
    }
  }
}
