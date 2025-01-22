import Animal from '../Animals/Animal.js';
import Button from '../Button.js';
import LostInTheForest from '../LostInTheForest.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Challenge from '../Challenges/Challenge.js';
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

  protected gameStarts: boolean;

  protected nextChallenge: Challenge | null;

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);

    this.gameStarts = false;
    this.animal = new Animal(0, 0, 'bunny', 4);
    this.animalText = '';
    this.playButton = new Button(0, 0, null, null, 100, 100);
    this.playButton.setText('Play');
    this.animalDialogue = [];
    this.animalDialogueIndex = 0;
    this.dialogueTextPosition = { x: 0, y: 0 };

    this.animalDialogueSize = { x: 0, y: 0 };
    this.animalDialoguePosition = { x: 0, y: 0 };
    this.dialogueAnimalArea = new Button(0, 0, null, null, 0, 0);

    this.playButtonPosition = { x: 0, y: 0 };
    this.playButtonImage = CanvasRenderer.loadNewImage('./assets/play-button.png');
    this.nextChallenge = null;
  }

  protected initiateDialogButton(): void {
    this.dialogueAnimalArea = new Button(
      this.animalDialoguePosition.x,
      this.animalDialoguePosition.y,
      this.dialogueAnimalImage, null,
      this.animalDialogueSize.x,
      this.animalDialogueSize.y
    );
  }


  protected playButtonToChallenge(): void {
    this.playButton = new Button(
      this.playButtonPosition.x,
      this.playButtonPosition.y,
      this.playButtonImage,
      null,
      LostInTheForest.canvas.width * 0.1,
      LostInTheForest.canvas.height * 0.17
    );
  }


  /**
   * 
   */
  public override processInput(): void {
    if (LostInTheForest.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.processAreaInput();
    }
  }

  protected processAreaInput(): void{
    if (this.dialogueAnimalArea.isCollidingWithMouse()) {
      if (this.animalDialogueIndex < this.animalDialogue.length - 1) {
        this.animalDialogueIndex += 1;
        if (this.animalDialogueIndex === this.animalDialogue.length - 1) {
          this.challengeCouldStarted = true;
        }
      }
    }

    if (this.challengeCouldStarted &&
      this.animalDialogueIndex === this.animalDialogue.length - 1 &&
      this.playButton.isCollidingWithMouse()) {
      this.gameStarts = true;
    }
    this.player.getMap().processInput();
  }

  /**
   * updates all elements of the map
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    //made animal move
    this.animal.update(elapsed);
    //makes dialogue update
    this.timeToDisplayDialogue -= elapsed;
    if (this.timeToDisplayDialogue <= 0) {
      this.timeToDisplayDialogue = 0;
    }
    if (this.animalDialogueIndex >= this.animalDialogue.length - 1) {
      this.playButtonToChallenge();
    }
    //updates the map icons
    this.player.getMap().update();
    this.gameStarts = false;
  }

  /**
   * Renders the bg, animal, dialogue, player, button and gives settings for dialogue.
   */
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
          LostInTheForest.canvas,
          line.join(' '),
          this.dialogueTextPosition.x,
          this.dialogueTextPosition.y + index * 30,
          'left',
          'Comic Sans MS',
          20,
          'black'
        );
      });
    }
  }

  public override getNextStage(): Stage | null {
    if (this.gameStarts) {
      this.nextChallenge?.setNextDifficulty(null);
      return this.nextChallenge;
    }
    if (this.player.getMap().getNextArea()) {
      return this.player.getMap().getNextArea();
    }
    return null;
  }
}

