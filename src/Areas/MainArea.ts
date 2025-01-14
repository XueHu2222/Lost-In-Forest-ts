import CanvasRenderer from '../CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Area from './Area.js';

export default class MainArea extends Area {
  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/main.png');
    this.player.setWidth(LostInTheForest.canvas.width * 0.35);
    this.player.setHeight(LostInTheForest.canvas.height * 0.8);
  }

  public override render(): void {
    this.renderBackground();
    this.player.setPosX(LostInTheForest.canvas.width * 0.5);
    this.player.setPosY(LostInTheForest.canvas.height * 0.35);
    this.player.render();
    this.player.getMap().render();
  }
}
