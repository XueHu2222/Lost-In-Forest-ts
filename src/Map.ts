import AreaButton from './AreaButton.js';
import AutumnArea from './Areas/AutumnArea.js';
import MainArea from './Areas/MainArea.js';
import SpringArea from './Areas/SpringArea.js';
import SummerArea from './Areas/SummerArea.js';
import WinterArea from './Areas/WinterArea.js';
import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './Base/CanvasRenderer.js';
import LostInTheForest from './LostInTheForest.js';
import Player from './Player.js';
import Stage from './Stage.js';

export default class Map extends CanvasItem {
  private areaButtons: AreaButton[];

  private nextArea: Stage | null;

  public constructor(player: Player) {
    super();
    this.nextArea = null;
    // TODO: Add the area buttons to the array
    this.image = CanvasRenderer.loadNewImage('./assets/Map/map.png');
    this.position.x = LostInTheForest.canvas.width * 0.8;
    this.position.y = 0;
    this.size.x = LostInTheForest.canvas.width * 0.2;
    this.size.y = LostInTheForest.canvas.width * 0.2;
    this.areaButtons = [];
    this.areaButtons.push(new AreaButton(new MainArea(player),
      this.getPosX() + LostInTheForest.canvas.width * 0.04,
      this.getPosY() + LostInTheForest.canvas.width * 0.05));
    this.areaButtons.push(new AreaButton(new SpringArea(player),
      this.getPosX() + LostInTheForest.canvas.width * 0.09,
      this.getPosY() + LostInTheForest.canvas.width * 0.12));
    this.areaButtons.push(new AreaButton(new SummerArea(player),
      this.getPosX() + LostInTheForest.canvas.width * 0.08,
      this.getPosY() + LostInTheForest.canvas.width * 0.06));
    this.areaButtons.push(new AreaButton(new WinterArea(player),
      this.getPosX() + LostInTheForest.canvas.width * 0.11,
      this.getPosY() + LostInTheForest.canvas.width * 0.09));
    this.areaButtons.push(new AreaButton(new AutumnArea(player),
      this.getPosX() + LostInTheForest.canvas.width * 0.06,
      this.getPosY() + LostInTheForest.canvas.width * 0.1));
  }

  /**
   * If there gets gets clicked on the map icons
   * @param mouseListener used to check if something is clicked
   */
  public processInput(): void {
    this.areaButtons.forEach((areaButton: AreaButton) => {
      if (areaButton.isCollidingWithMouse()) {
        this.nextArea = areaButton.getArea();
      }
    });
  }

  /**
   * updates maps icons
   */
  public update(): void {
    this.areaButtons.forEach((areaButton: AreaButton) => {
      areaButton.update();
    });
  }

  /**
   * renders the map
   */
  public override render(): void {
    super.render();
    this.areaButtons.forEach((areaButton: AreaButton) => {
      areaButton.render();
    });
  }

  public getAreaButtons(): AreaButton[] {
    return this.areaButtons;
  }

  public getNextArea(): Stage | null {
    return this.nextArea;
  }
}
