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

  protected challengeCouldStarted: boolean = false;

  protected animalDialogueSize: { x: number, y: number };

  protected animalDialoguePosition: { x: number, y: number };

  protected dialogueAnimalImage: HTMLImageElement = new Image;

  protected playButtonPosition: { x: number, y: number };

  protected playButtonImage: HTMLImageElement = new Image;

  protected gameStarts: boolean = false;

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

    this.playButtonPosition = { x: 0, y: 0 };
    this.playButtonImage = CanvasRenderer.loadNewImage('./assets/play-button.png');
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

  protected playButtonToChallenge(): void {
    this.playButton = new Button(
      this.playButtonPosition.x,
      this.playButtonPosition.y,
      this.playButtonImage,
      this.canvas.width * 0.1,
      this.canvas.height * 0.17
    );
  }

  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.dialogueAnimalArea.isCollidingWithMouse(mouseListener)) {
        if (this.animalDialogueIndex < this.animalDialogue.length - 1) {
          this.animalDialogueIndex += 1;
        } else {
          this.challengeCouldStarted = true;
        }
      }
      if (this.animalDialogueIndex ===
        this.animalDialogue.length - 1 && this.playButton.isCollidingWithMouse(mouseListener)) {
        console.log('game can start');
        this.gameStarts = true;
        console.log(this.gameStarts);
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
    this.playButton.render();

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
    console.log(this.gameStarts);
    if (this.gameStarts) {
      //TODO CHALLENGE
      console.log('challenge started');
      this.gameStarts = false;
      return null;
    }
    return null;
  }
}

