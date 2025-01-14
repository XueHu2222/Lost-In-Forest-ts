import Button from '../Button.js';

export default class ChallengeElement extends Button {
  public constructor(text: string, image: HTMLImageElement, selectImage: HTMLImageElement) {
    super(0, 0, image, selectImage, 220, 60);
    this.setText(text);
    this.setTextColor('white');
  }

  public override render(): void {
    super.render();
  }
}
