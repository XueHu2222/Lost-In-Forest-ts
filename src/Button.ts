import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './Base/CanvasRenderer.js';
import LostInTheForest from './LostInTheForest.js';
import MouseListener from './Base/MouseListener.js';

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
    this.position = {x: posX, y: posY};
    this.size = {x: width, y: height};
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
    if (mouseListener.getMousePosition().y > this.getPosY()
      && mouseListener.getMousePosition().y < this.getPosY() + this.getHeight()
      && mouseListener.getMousePosition().x > this.getPosX()
      && mouseListener.getMousePosition().x < this.getPosX() + this.getWidth()) {
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
        this.getPosX(),
        this.getPosY(),
        this.size.x,
        this.size.y
      );
    }
    if (this.text != '' && this.text) {
      if (this.image != null) {
        // Calculate the center position
        const centerX: number = this.getPosX() + (this.image.width / 2) - (-50 / 2);
        const centerY: number = this.getPosY() + (this.image.height / 2) - (105 / 2);

        // Write the text at the center position
        CanvasRenderer.writeText(LostInTheForest.canvas, this.text, centerX, centerY, 'center', 'Comic Sans MS', this.textSize, this.textColor);
      } else {
        CanvasRenderer.writeText(LostInTheForest.canvas, this.text, this.getPosX(), this.getPosY());
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

