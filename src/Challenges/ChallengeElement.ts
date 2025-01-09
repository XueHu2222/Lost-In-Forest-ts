import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class ChallengeElement extends Button {
  private isSelected: boolean;

  private isHint: boolean;

  public constructor(text: string) {
    const image: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/selected.png');
    super(0, 0, image, 300, 100);
    this.setText(text);
    this.setTextColor('white');
    this.isSelected = false;
    this.isHint = false;
  }

  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas);
    // CanvasRenderer.fillRectangle(canvas, this.posX, this.posY, 80, 50, 'blue');
    if (this.isSelected) {
      this.textColor = 'blue';
    }else if(this.textColor != 'yellow'){
      this.textColor = 'white';
    }
    if (this.isHint) {
      // Add border
    }
  }

  public setSelected(value: boolean): void{
    this.isSelected = value;
  }

  public getIsSelected(): boolean{
    return this.isSelected;
  }
}
