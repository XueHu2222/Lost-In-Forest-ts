import CanvasRenderer from './CanvasRenderer.js';

export default abstract class CanvasItem {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  public constructor() {
    this.image = new Image;
    this.posX = 0;
    this.posY = 0;
  }

  /**
   * to render
   * @param canvas where it gets renderd on
   * @param width the widht that needs to be renderd
   * @param height the height that needs to be renderd
   */
  public render(canvas: HTMLCanvasElement, width: number | null = null,
    height: number | null = null): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY, width, height);
  }

  public setPosX(posX: number): void {
    this.posX = posX;
  }

  public setPosY(posY: number): void {
    this.posY = posY;
  }
}
