import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
import MouseListener from './MouseListener.js';

export default class Button extends CanvasItem {
  private text: string | null;

  public constructor(text: string | null, posX: number, posY: number) {
    super();
    this.text = text;
    this.posX = posX;
    this.posY = posY;
  }

  public isCollidingWithMouse(mouseListener: MouseListener): boolean {
    return true;
  }

  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas);
    if (this.text) {
      CanvasRenderer.writeText(canvas, this.text, this.posX, this.posY);
    }
  }
}
