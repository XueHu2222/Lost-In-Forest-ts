import Animal from '../Animals/Animal.js';
import Bunny from '../Animals/Bunny.js';
import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import Stage from '../Stage.js';

export default abstract class Area extends Stage {
  protected animal: Animal;

  protected animalText: string;

  protected playButton: Button;

  protected animalDialogue: string[][][];

  protected animalDialogueIndex: number;

  private timeToDisplayDialogue: number = 1000;

  protected dialogPosition: { x: number, y: number };

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    // TODO: Set correct values
    this.animal = new Bunny(0, 0);
    this.animalText = '';
    this.playButton = new Button(0, 0, null, 100, 100);
    this.playButton.setText('Play');
    this.animalDialogue = [];
    this.animalDialogueIndex = 0;
    this.dialogPosition = { x: 0, y: 0 };
  }

  public override render(): void {
    const currentDialogue: string[][] = this.animalDialogue[this.animalDialogueIndex] ?? [];
    if (this.timeToDisplayDialogue == 0) {
      currentDialogue.forEach((line: string[], index: number) => {
        CanvasRenderer.writeText(
          this.canvas,
          line.join(' '),
          this.dialogPosition.x,
          this.dialogPosition.y + index * 30,
          'left',
          'Arial',
          20,
          'black'
        );
      });
    }
  }

  public override update(elapsed: number): void {
    this.timeToDisplayDialogue -= elapsed;
    if (this.timeToDisplayDialogue <= 0) {
      this.timeToDisplayDialogue = 0;
    }
  }
}
