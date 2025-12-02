import Animal from '../Animal.js';
import Button from '../Button.js';
import LostInTheForest from '../LostInTheForest.js';
import CanvasRenderer from '../Base/CanvasRenderer.js';
import Challenge from '../Challenges/Challenge.js';
import MouseListener from '../Base/MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import { Vector2 } from '../Types.js';
import Dialogue from '../Dialogue.js';

export default abstract class Area extends Stage {
  protected animal: Animal;

  protected playButton: Button;

  protected animalDialogue: string[][][] = [];

  protected dialogue!: Dialogue;

  protected playButtonPosition: Vector2;

  protected playButtonImage: HTMLImageElement;

  protected nextChallenge: Challenge | null;

  protected challengeStarts: boolean = false;
  
  protected challengeCanStart: boolean = false;

  public constructor(player: Player) {
    super(player);

    this.animal = new Animal(0, 0, 'bunny', 4);

    this.playButton = new Button(0, 0, null, null, 100, 100);
    this.playButton.setText('Play');

    this.playButtonPosition = { x: 0, y: 0 };
    this.playButtonImage = CanvasRenderer.loadNewImage('./assets/Challenges/play-button.png');

    this.nextChallenge = null;
  }

  protected separateDialogIntoArrays(str: string): string[][] {
    return str.split('|').map((line: string) => [line]);
  }

  protected abstract initiateDialog(): void;

  public override processInput(): void {
    if (LostInTheForest.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.processAreaInput();
    }
  }

  protected processAreaInput(): void {
    if (this.dialogue.isClicked()) {
      this.dialogue.handleClick();
      if (this.dialogue.canStartChallenge()) {
        this.challengeCanStart = true;
      }
    }

    if (this.challengeCanStart && this.playButton.isCollidingWithMouse()) {
      this.challengeStarts = true;
    }

    this.player.getMap().processInput();
  }

  public override update(elapsed: number): void {
    if (!this.dialogue) {
      this.initiateDialog();
    }

    this.animal.update(elapsed);

    this.dialogue.update(elapsed);

    if (this.dialogue.canStartChallenge()) {
      this.playButton = new Button(
        this.playButtonPosition.x,
        this.playButtonPosition.y,
        this.playButtonImage,
        null,
        LostInTheForest.canvas.width * 0.1,
        LostInTheForest.canvas.height * 0.17
      );
    }

    this.player.getMap().update();

    this.challengeStarts = false;
  }

  public override render(): void {
    super.render();

    this.animal.render();
    this.dialogue.render();
    this.player.render();
    this.playButton.render();
    this.player.getMap().render();
  }

  public override getNextStage(): Stage | null {
    if (this.challengeStarts) {
      this.nextChallenge?.setNextDifficulty(null);
      return this.nextChallenge;
    }

    return this.player.getMap().getNextArea() ?? null;
  }
}