import Animal from '../Animals/Animal.js';
import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';

export default abstract class Area extends Stage {
  protected animal: Animal;

  protected animalText: string;

  protected playButton: Button;

  protected animalDialogue: string[][][];

  protected animalDialogueIndex: number;

  protected dialogueAnimalArea: Button;

  protected timeToDisplayDialogue: number = 1000;

  protected dialogueTextPosition: { x: number, y: number };

  protected challengeStarted: boolean = false;

  protected animalDialogueSize: { x: number, y: number };

  protected animalDialoguePosition: { x: number, y: number };

  protected dialogueAnimalImage: HTMLImageElement = new Image;

  protected switchToIsland: boolean = false;

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);

    this.animal = new Animal(0, 0, 'bunny');
    this.animalText = '';
    this.playButton = new Button(0, 0, null, 100, 100);
    this.playButton.setText('Play');
    this.animalDialogue = [];
    this.animalDialogueIndex = 0;
    this.dialogueTextPosition = { x: 0, y: 0 };
    this.animalDialogueSize = { x: 0, y: 0 };
    this.animalDialoguePosition = { x: 0, y: 0 };
    this.dialogueAnimalArea = new Button(0, 0, null, 0, 0);
  }

  protected initiateDialogButton(): void {
    this.dialogueAnimalArea = new Button(
      this.animalDialoguePosition.x,
      this.animalDialoguePosition.y,
      this.dialogueAnimalImage,
      this.animalDialogueSize.x,
      this.animalDialogueSize.y
    );
  }

  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.dialogueAnimalArea.isCollidingWithMouse(mouseListener)) {
        if (this.animalDialogueIndex < this.animalDialogue.length - 1) {
          this.animalDialogueIndex += 1;
        } else {
          this.challengeStarted = true;
        }
      }
      this.player.getMap().processInput(mouseListener);
    }
  }

  public override update(elapsed: number): void {
    this.timeToDisplayDialogue -= elapsed;
    if (this.timeToDisplayDialogue <= 0) {
      this.timeToDisplayDialogue = 0;
    }
    this.player.getMap().update();
  }

  public override render(): void {
    this.renderBackground();
    this.animal.render();
    this.dialogueAnimalArea.render();
    this.player.render();

    const currentDialogue: string[][] = this.animalDialogue[this.animalDialogueIndex] ?? [];
    if (this.timeToDisplayDialogue == 0) {
      currentDialogue.forEach((line: string[], index: number) => {
        CanvasRenderer.writeText(
          this.canvas,
          line.join(' '),
          this.dialogueTextPosition.x,
          this.dialogueTextPosition.y + index * 30,
          'left',
          'Arial',
          20,
          'black'
        );
      });
    }
  }

  public override getNextStage(): Stage | null {
    if (this.player.getMap().getNextArea()) {
      return this.player.getMap().getNextArea();
    }
    return null;
  }
}

