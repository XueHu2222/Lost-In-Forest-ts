import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class ChallengeElement extends Button {
  private isSelected: boolean;

  private isHint: boolean;

  public constructor(text: string) {
    super(text, 0, 0);
    this.isSelected = false;
    this.isHint = false;
  }

  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas);
    CanvasRenderer.fillRectangle(canvas, this.posX, this.posY, 80, 50, 'blue');
    if (this.isSelected) {
      CanvasRenderer.fillRectangle(canvas, this.posX, this.posY, 80, 50, 'blue');
    }
    if (this.isHint) {
      // Add border
    }
  }

  public setSelected(value: boolean): void{
    this.isSelected = value;
  }
}
