import CanvasRenderer from './CanvasRenderer.js';
import LostInTheForest from './LostInTheForest.js';
import MouseListener from './MouseListener.js';
import Player from './Player.js';

export default abstract class Stage {
  protected player: Player;

  protected isDutch: boolean;

  protected backgroundImage: HTMLImageElement;

  protected canvas: HTMLCanvasElement;

  public constructor(player: Player, isDutch: boolean) {
    this.player = player;
    this.isDutch = isDutch;
    this.backgroundImage = new Image;
    this.canvas = LostInTheForest.canvas;
  }

  public abstract getNextStage(): Stage | null;

  public abstract processInput(): void;

  public abstract update(elapsed: number): void;

  public abstract render(): void;

  protected renderBackground(): void {
    CanvasRenderer.drawImage(this.canvas, this.backgroundImage, 0, 0,
      this.canvas.width, this.canvas.height);
  }
}
