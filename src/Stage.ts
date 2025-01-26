import CanvasRenderer from './Base/CanvasRenderer.js';
import LostInTheForest from './LostInTheForest.js';
import Player from './Player.js';

export default abstract class Stage {
  protected player: Player;

  protected backgroundImage: HTMLImageElement;

  public constructor(player: Player) {
    this.player = player;
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

  public render(): void{
    CanvasRenderer.drawImage(LostInTheForest.canvas, this.backgroundImage, 0, 0,
      LostInTheForest.canvas.width, LostInTheForest.canvas.height);
  };
}
