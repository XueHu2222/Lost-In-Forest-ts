import AreaButton from './AreaButton.js';

export default class Map {
  private areaButtons: AreaButton[];

  public constructor() {
    // TODO: Add the area buttons to the array
    this.areaButtons = [];
  }

  public render(canvas: HTMLCanvasElement): void{
    // TODO: Render the area buttons
  }

  public getAreaButtons(): AreaButton[] {
    return this.areaButtons;
  }
}
