import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Area from './Area.js';

export default class MainArea extends Area {
  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/main.png');
  }

  public override getNextStage(): Stage | null {
    return null;
  }

  public override processInput(mouseListener: MouseListener): void {

  }

  public override update(elapsed: number): void {

  }

  public override render(canvas: HTMLCanvasElement): void {
    this.renderBackground(canvas);
  }
}
