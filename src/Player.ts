import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './Base/CanvasRenderer.js';
import Map from './Map.js';

export default class Player extends CanvasItem {
  private map: Map;

  private gender: string;

  public constructor() {
    super();
    this.map = new Map(this);
    this.gender = 'boy';
    this.image = CanvasRenderer.loadNewImage(`./assets/Player/${this.gender}.png`);
  }

  public setGender(gender: string): void{
    this.gender = gender;
    this.image = CanvasRenderer.loadNewImage(`./assets/Player/${this.gender}.png`);
  }

  public getGender(): string{
    return this.gender;
  }

  public getMap(): Map{
    return this.map;
  }
}
