import CanvasRenderer from './Base/CanvasRenderer.js';
import Button from './Button.js';
import LostInTheForest from './LostInTheForest.js';
import { Vector2 } from './Types.js';

export interface DialogueConfig {
  dialogueData: string[][][];
  dialogueImage: HTMLImageElement;
  dialoguePosition: Vector2;
  dialogueSize: Vector2;
  textPosition: Vector2;
  displayTime: number;
}

export default class Dialogue {
  private dialogueData: string[][][];

  private index: number = 0;

  private dialogueImage: HTMLImageElement;

  private dialoguePosition: Vector2;

  private dialogueSize: Vector2;

  private textPosition: Vector2;

  private displayTime: number;

  private dialogueButton: Button;

  public constructor(config: DialogueConfig) {
    this.dialogueData = config.dialogueData;
    this.dialogueImage = config.dialogueImage;
    this.dialoguePosition = config.dialoguePosition;
    this.dialogueSize = config.dialogueSize;

    this.textPosition = config.textPosition;
    this.displayTime = config.displayTime;

    this.dialogueButton = new Button(
      this.dialoguePosition.x,
      this.dialoguePosition.y,
      this.dialogueImage,
      null,
      this.dialogueSize.x,
      this.dialogueSize.y
    );
  }

  public handleClick(): void {
    if (this.index < this.dialogueData.length - 1) {
      this.index += 1;
    }
  }

  public canStartChallenge(): boolean {
    return this.index >= this.dialogueData.length - 1;
  }

  public update(elapsed: number): void {
    if (this.displayTime > 0) {
      this.displayTime -= elapsed;
      if (this.displayTime < 0) {
        this.displayTime = 0;
      }
    }
  }

  public render(): void {
    this.dialogueButton.render();

    const currentDialogue: string[][] = this.dialogueData[this.index] ?? [];

    if (this.displayTime === 0) {
      currentDialogue.forEach((line: string[], i: number) => {
        CanvasRenderer.writeText(
          LostInTheForest.canvas,
          line.join(' '),
          this.textPosition.x,
          this.textPosition.y + i * 30,
          'left',
          'Comic Sans MS',
          20,
          'black'
        );
      });
    }
  }

  public isClicked(): boolean {
    return this.dialogueButton.isCollidingWithMouse();
  }

  public getIndex(): number {
    return this.index;
  }
}
