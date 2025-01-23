import Button from '../Button.js';

export default class ChallengeElement extends Button {
  private theory: string;

  public constructor(text: string, theory: string,
    image: HTMLImageElement, selectImage: HTMLImageElement) {
    super(0, 0, image, selectImage, 220, 60);
    this.theory = theory;
    this.setText(text);
    this.setTextColor('white');
  }

  public getTheory(): string {
    return this.theory;
  }
}
