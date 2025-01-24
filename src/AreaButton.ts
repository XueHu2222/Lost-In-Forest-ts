import Area from './Areas/Area.js';
import AutumnArea from './Areas/AutumnArea.js';
import MainArea from './Areas/MainArea.js';
import SpringArea from './Areas/SpringArea.js';
import SummerArea from './Areas/SummerArea.js';
import WinterArea from './Areas/WinterArea.js';
import Button from './Button.js';
import CanvasRenderer from './Base/CanvasRenderer.js';
import LostInTheForest from './LostInTheForest.js';

export default class AreaButton extends Button {
  private area: Area;

  public constructor(area: Area, posX: number, posY: number) {
    super(posX, posY, null, null,
      LostInTheForest.canvas.width * 0.03, LostInTheForest.canvas.height * 0.06);
    this.area = area;
  }

  /**
   * Gives the right map icon depending on if its on the area and if the area is finished
   */
  public update(): void {
    // Area is a main area
    if (this.area instanceof MainArea) {
      this.image = CanvasRenderer.loadNewImage('./assets/Map/main.png');
      // Current stage is Main
      if (LostInTheForest.currentStage instanceof MainArea) {
        this.image = CanvasRenderer.loadNewImage('./assets/Map/atMain.png');
      }
      // Current stage
    } else if (LostInTheForest.currentStage === this.area) {
      this.image = CanvasRenderer.loadNewImage('./assets/Map/atArea.png');
      // Stage is finished or not
    } else if (this.area instanceof AutumnArea && LostInTheForest.keyHistory ||
      this.area instanceof WinterArea && LostInTheForest.keyBiology ||
      this.area instanceof SpringArea && LostInTheForest.keyPhysics ||
      this.area instanceof SummerArea && LostInTheForest.keyGeography
    ) {
      this.image = CanvasRenderer.loadNewImage('./assets/Map/finishedArea.png');
    } else {
      this.image = CanvasRenderer.loadNewImage('./assets/Map/unfinishedArea.png');
    }
  }

  public getArea(): Area {
    return this.area;
  }
}
