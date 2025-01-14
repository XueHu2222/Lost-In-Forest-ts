import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
import LostInTheForest from './LostInTheForest.js';
import MouseListener from './MouseListener.js';

export default class Button extends CanvasItem {
  private text: string;

  protected textColor: string;

  private textSize: number;

  protected isSelected: boolean;

  protected selectedImage: HTMLImageElement | null;

  public constructor(posX: number, posY: number,
    image: HTMLImageElement | null = null, selectImage:
    HTMLImageElement | null = null, width: number, height: number) {
    super();
    this.text = '';
    this.textColor = 'red';
    this.textSize = 22;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    if (image != null) {
      this.image = image;
    }
    this.isSelected = false;
    this.selectedImage = selectImage;
  }

  /**
   * To check if the mouse is on the button
   * @param mouseListener gives position of the mouse
   * @returns if the mouse is on the button
   */
  public isCollidingWithMouse(): boolean {
    const mouseListener: MouseListener = LostInTheForest.mouseListener;
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
   * @param canvas where it renders onP
   */
  public override render(): void {
    super.render(); // always renders the parent class (canvasItem)
    if(this.isSelected && this.selectedImage){
      CanvasRenderer.drawImage(LostInTheForest.canvas, this.selectedImage,
        this.posX,
        this.posY,
        this.width,
        this.height
      );
    }
    if (this.text != '' && this.text) {
      if (this.image != null) {
        // Calculate the center position
        const centerX: number = this.posX + (this.image.width / 2) - (-50 / 2);
        const centerY: number = this.posY + (this.image.height / 2) - (105 / 2);

        // Write the text at the center position
        CanvasRenderer.writeText(LostInTheForest.canvas, this.text, centerX, centerY, 'center', 'arial', this.textSize, this.textColor);
      } else {
        CanvasRenderer.writeText(LostInTheForest.canvas, this.text, this.posX, this.posY);
      }
    }
    if (this.isCollidingWithMouse()) {
      LostInTheForest.canvas.style.cursor = 'pointer';
    }
  }

  public setText(text: string): void {
    this.text = text;
  }

  public getText(): string {
    return this.text || '';
  }

  public setTextColor(color: string): void {
    this.textColor = color;
  }

  public setTextSize(size: number): void {
    this.textSize = size;
  }

  public setSelected(value: boolean): void{
    this.isSelected = value;
  }

  public getIsSelected(): boolean{
    return this.isSelected;
  }
}

