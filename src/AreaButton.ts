import Area from './Areas/Area.js';
import MainArea from './Areas/MainArea.js';
import Button from './Button.js';
import CanvasRenderer from './CanvasRenderer.js';
import LostInTheForest from './LostInTheForest.js';

export default class AreaButton extends Button {
  private area: Area;

  private isFinished: boolean;

  public constructor(area: Area, posX: number, posY: number) {
    super(posX, posY, null,
      LostInTheForest.canvas.width * 0.03, LostInTheForest.canvas.height * 0.06);
    this.area = area;
    this.isFinished = false;
  }

  public update(): void {
    if (LostInTheForest.currentStage == this.area) {
      // Current stage is the same as this area
      if (this.area instanceof MainArea) {
        this.image = CanvasRenderer.loadNewImage('./assets/Map/atMain.png');
      } else if (this.area) {
        this.image = CanvasRenderer.loadNewImage('./assets/Map/atArea.png');
      }
    } else {
      // Current stage is not the same as this area
      if (this.area instanceof MainArea) {
        this.image = CanvasRenderer.loadNewImage('./assets/Map/main.png');
      } else if (this.area) {
        if (this.isFinished) {
          this.image = CanvasRenderer.loadNewImage('./assets/Map/finishedArea.png');
        } else {
          this.image = CanvasRenderer.loadNewImage('./assets/Map/unfinishedArea.png');
        }
      }
    }
  }

  public setIsFinished(value: boolean): void {
    this.isFinished = value;
  }

  public getIsFinished(): boolean {
    return this.isFinished;
  }

  public getArea(): Area {
    return this.area;
  }
}
