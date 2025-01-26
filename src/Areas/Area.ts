import Animal from '../Animal.js';
import Button from '../Button.js';
import LostInTheForest from '../LostInTheForest.js';
import CanvasRenderer from '../Base/CanvasRenderer.js';
import Challenge from '../Challenges/Challenge.js';
import MouseListener from '../Base/MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import { Vector2 } from '../Types.js';

export default abstract class Area extends Stage {
  protected animal: Animal;

  protected animalText: string;

  protected playButton: Button;

  protected animalDialogue: string[][][];

  protected animalDialogueIndex: number;

  protected dialogueAnimalArea: Button;

  protected timeToDisplayDialogue: number;

  protected dialogueTextPosition: Vector2;

  protected challengeCanStart: boolean;

  protected animalDialogueSize: Vector2;

  protected animalDialoguePosition: Vector2;

  protected dialogueAnimalImage: HTMLImageElement;

  protected playButtonPosition: Vector2;

  protected playButtonImage: HTMLImageElement;

  protected challengeStarts: boolean;

  protected nextChallenge: Challenge | null;

  public constructor(player: Player) {
    super(player);

    this.challengeStarts = false;
    this.animal = new Animal(0, 0, 'bunny', 4);
    this.animalText = '';
    this.playButton = new Button(0, 0, null, null, 100, 100);
    this.playButton.setText('Play');
    this.animalDialogue = [];
    this.animalDialogueIndex = 0;
    this.dialogueTextPosition = { x: 0, y: 0 };
    this.timeToDisplayDialogue = 1000;
    this.dialogueAnimalImage = new Image();

    this.animalDialogueSize = { x: 0, y: 0 };
    this.animalDialoguePosition = { x: 0, y: 0 };
    this.dialogueAnimalArea = new Button(0, 0, null, null, 0, 0);

    this.playButtonPosition = { x: 0, y: 0 };
    this.playButtonImage = CanvasRenderer.loadNewImage('./assets/Challenges/play-button.png');
    this.nextChallenge = null;
    this.challengeCanStart = false;
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
 * Splits the string into array's using the separator
 * @param string Dialog sentence
 * @returns a string[][] were each array element was a part of a sentence
 */
  protected separateDialogIntoArrays(string: string): string[][] {
    return string.split('|').map(((line: string) => [line]));
  }


  /**
   * Initiates the dialog
   */
  protected abstract initiateDialog(): void;

  public override getNextStage(): Stage | null {
    if (this.challengeStarts) {
      this.nextChallenge?.setNextDifficulty(null);
      return this.nextChallenge;
    }
    if (this.player.getMap().getNextArea()) {
      return this.player.getMap().getNextArea();
    }
    return null;
  }

  /**
   * checks if something is clicked in the area
   */
  public override processInput(): void {
    if (LostInTheForest.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.processAreaInput();
    }
  }

  // Checks for button clicks
  protected processAreaInput(): void {
    if (this.dialogueAnimalArea.isCollidingWithMouse()) {
      if (this.animalDialogueIndex < this.animalDialogue.length - 1) {
        this.animalDialogueIndex += 1;
        if (this.animalDialogueIndex === this.animalDialogue.length - 1) {
          this.challengeCanStart = true;
        }
      }
    }

    if (this.challengeCanStart && this.playButton.isCollidingWithMouse()) {
      this.challengeStarts = true;
    }
    this.player.getMap().processInput();
  }

  /**
   * updates all elements of the map
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    if (this.animalDialogue.length === 0) {
      this.initiateDialog();
    }
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
    this.challengeStarts = false;
  }

  /**
   * Renders the bg, animal, dialogue, player, button and gives settings for dialogue.
   */
  public override render(): void {
    super.render();
    this.animal.render();
    this.dialogueAnimalArea.render();
    this.player.render();
    this.playButton.render();
    this.player.getMap().render();

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
}

