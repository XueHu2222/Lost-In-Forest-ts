import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';

export default class ChallengeElement extends Button {
  private isSelected: boolean;

  private isHint: boolean;

  private selectedButton: Button;

  public constructor(text: string) {
    const image: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/selected.png');
    super(0, 0, image, 220, 60);
    this.setText(text);
    this.setTextColor('white');
    this.isSelected = false;
    this.isHint = false;
    this.selectedButton = new Button(0, 0, image, 255, 80);
  }

  public override render(canvas: HTMLCanvasElement): void {
    // CanvasRenderer.fillRectangle(canvas, this.posX, this.posY, 80, 50, 'blue');
    if (this.isSelected) {
      this.textColor = 'darkgreen';
      this.selectedButton.setPosX(this.posX - 20);
      this.selectedButton.setPosY(this.posY - 10);
      this.selectedButton.render(canvas);
    }else if(this.textColor != 'yellow'){
      this.textColor = 'white';
    }
    if (this.isHint) {
      // Add border
    }
    super.render(canvas);
  }

  public setSelected(value: boolean): void{
    this.isSelected = value;
  }

  public getIsSelected(): boolean{
    return this.isSelected;
  }
}
