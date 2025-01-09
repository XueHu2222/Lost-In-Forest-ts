import CanvasRenderer from './CanvasRenderer.js';

export default abstract class CanvasItem {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  protected width: number;

  protected height: number;

  public constructor() {
    this.image = new Image;
    this.posX = 0;
    this.posY = 0;
    this.width = 0;
    this.height = 0;
  }

  /**
   * to render
   * @param canvas where it gets renderd on
   * @param width the widht that needs to be renderd
   * @param height the height that needs to be renderd
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY, this.width, this.height);
  }

  public setPosX(posX: number): void {
    this.posX = posX;
  }

  public setPosY(posY: number): void {
    this.posY = posY;
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public setHeight(height: number): void {
    this.height = height;
  }

  public getPosX(): number{
    return this.posX;
  }

  public getPosY(): number{
    return this.posY;
  }
}
