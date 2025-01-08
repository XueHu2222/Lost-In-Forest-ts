import CanvasItem from './CanvasItem.js';
import Map from './Map.js';

export default class Player extends CanvasItem {
  private map: Map;

  private gender: string;

  public constructor() {
    super();
    this.map = new Map;
    this.gender = 'boy';
  }

  public setGender(gender: string): void{
    this.gender = gender;
  }

  public getGender(): string{
    return this.gender;
  }

  public getMap(): Map{
    return this.map;
  }
}
