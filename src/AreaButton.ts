import Area from './Areas/Area.js';
import Button from './Button.js';

export default class Map extends Button {
  private area: Area;

  private isUnlocked: boolean;

  public constructor(area: Area, areaImage: HTMLImageElement, posX: number, posY: number) {
    super(null, posX, posY, null, 0, 0);
    this.area = area;
    this.isUnlocked = false;
  }

  public setIsUnlocked(value: boolean): void {
    this.isUnlocked = value;
  }

  public getIsUnlocked(): boolean {
    return this.isUnlocked;
  }

  public getArea(): Area {
    return this.area;
  }
}
