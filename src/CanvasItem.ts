import CanvasRenderer from './Base/CanvasRenderer.js';
import LostInTheForest from './LostInTheForest.js';
import { Vector2 } from './Types.js';

export default abstract class CanvasItem {
  protected image: HTMLImageElement;

  protected position: Vector2;

  protected size: Vector2;

  public constructor() {
    this.image = new Image;
    this.position = {x: 0, y: 0};
    this.size = {x: 0, y: 0};
  }

  /**
   * to render
   * @param canvas where it gets renderd on
   * @param width the widht that needs to be renderd
   * @param height the height that needs to be renderd
   */
  public render(): void {
    CanvasRenderer.drawImage(LostInTheForest.canvas, this.image,
      this.position.x, this.position.y, this.size.x, this.size.y);
  }

  public setPosX(posX: number): void {
    this.position.x = posX;
  }

  public setPosY(posY: number): void {
    this.position.y = posY;
  }

  public setWidth(width: number): void {
    this.size.x = width;
  }

  public setHeight(height: number): void {
    this.size.y = height;
  }

  public getPosX(): number{
    return this.position.x;
  }

  public getPosY(): number{
    return this.position.y;
  }

  public getWidth(): number {
    return this.size.x;
  }

  public getHeight(): number {
    return this.size.y;
  }
}
