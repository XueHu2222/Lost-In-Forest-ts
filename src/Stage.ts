import CanvasRenderer from './Base/CanvasRenderer.js';
import LostInTheForest from './LostInTheForest.js';
import Player from './Player.js';

export default abstract class Stage {
  protected player: Player;

  protected isDutch: boolean;

  protected backgroundImage: HTMLImageElement;

  public constructor(player: Player, isDutch: boolean) {
    this.player = player;
    this.isDutch = isDutch;
    this.backgroundImage = new Image;
  }

  public abstract getNextStage(): Stage | null;

  public abstract processInput(): void;


  /**
   * Is used for changes during a stage
   * @param elapsed Time between frames in miliseconds
   */
  public update(elapsed: number): void{

  };

  public abstract render(): void;

  protected renderBackground(): void {
    CanvasRenderer.drawImage(LostInTheForest.canvas, this.backgroundImage, 0, 0,
      LostInTheForest.canvas.width, LostInTheForest.canvas.height);
  }
}
