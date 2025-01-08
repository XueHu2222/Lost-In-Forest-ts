import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';
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

  public abstract processInput(mouseListener: MouseListener): void;

  public abstract update(elapsed: number): void;

  public abstract render(canvas: HTMLCanvasElement): void;

  protected renderBackground(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.backgroundImage, 0, 0, canvas.width, canvas.height);
  }
}
