import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';

export default class Button extends CanvasItem {
  private text: string | null;

  protected width: number;

  protected height: number;

  public constructor(text: string | null, posX: number,
    posY: number, image: HTMLImageElement | null = null, width: number,
    height: number) {
    super();
    this.text = text;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    if (image != null) {
      this.image = image;
    }
  }

  /**
   * To check if the mouse is on the button
   * @param mouseListener gives position of the mouse
   * @returns if the mouse is on the button
   */
  public isCollidingWithMouse(mouseListener: MouseListener): boolean {
    if (mouseListener.getMousePosition().y > this.posY
      && mouseListener.getMousePosition().y < this.posY + this.height
      && mouseListener.getMousePosition().x > this.posX
      && mouseListener.getMousePosition().x < this.posX + this.width) {
      return true;
    }
    return false;
  }

  /**
   * Renders the button
   * @param canvas where it renders on
   */
  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas, this.width, this.height); // always renders the parent class (canvasItem)
    if (this.text) {
      CanvasRenderer.writeText(canvas, this.text, this.posX, this.posY);
    }
  }
}
