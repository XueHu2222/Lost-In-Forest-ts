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

  public override render(): void {
    super.render();
    if (this.isSelected) {
      this.textColor = 'darkgreen';
      this.selectedButton.setPosX(this.posX - 20);
      this.selectedButton.setPosY(this.posY - 10);
      this.selectedButton.render();
    }else if(this.textColor != 'yellow'){
      this.textColor = 'white';
      if (this.isHint) {
        this.textColor = 'blue';
      }
    }
    super.render();
  }

  public setSelected(value: boolean): void{
    this.isSelected = value;
  }

  public getIsSelected(): boolean{
    return this.isSelected;
  }

  public setIsHint(value: boolean): void{
    this.isHint = value;
  }
}
