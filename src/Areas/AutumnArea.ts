import CanvasRenderer from '../CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Area from './Area.js';

export default class AutumnArea extends Area {
  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/autumn.png');
  }

  public override render(): void {
    this.renderBackground();
    this.player.setPosX(LostInTheForest.canvas.width * 0.05);
    this.player.setPosY(LostInTheForest.canvas.height * 0.35);
    this.player.render();
    this.player.getMap().render();
  }
}
