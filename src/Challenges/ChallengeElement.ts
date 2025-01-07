import Button from '../Button.js';

export default class ChallengeElement extends Button {
  private isSelected: boolean;

  private isHint: boolean;

  public constructor(text: string) {
    super(text, 0, 0, null, 100, 100);
    this.isSelected = false;
    this.isHint = false;
  }

  public override render(canvas: HTMLCanvasElement): void {
    super.render(canvas);
    if (this.isSelected) {
      // Add color
    }
    if (this.isHint) {
      // Add border
    }
  }

  public setSelected(value: boolean): void{
    this.isSelected = value;
  }
}
