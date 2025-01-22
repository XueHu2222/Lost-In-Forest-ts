import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import Area from './Area.js';
import Animal from '../Animals/Animal.js';
import LostInTheForest from '../LostInTheForest.js';
import Stage from '../Stage.js';
import MouseListener from '../MouseListener.js';
import CutScene from '../Cutscenes/CutScene.js';

export default class MainArea extends Area {
  private dialoguePlayerArea: Button;

  private dialoguePlayerImage: HTMLImageElement = new Image();

  private endButton: Button;

  private ended: boolean;

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/main.png');
    this.player.setPosY(this.canvas.height * 0.35);
    this.player.setWidth(this.canvas.width * 0.35);
    this.player.setHeight(this.canvas.height * 0.8);

    this.ended = false;
    const exitImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/exit-button.png');
    this.endButton = new Button(this.canvas.width * 0.5, this.canvas.height * 0.7, exitImage, null,
      this.canvas.width * 0.1, this.canvas.width * 0.1);

    this.animal = new Animal(
      this.canvas.width * 0.025,
      this.canvas.height * 0.67,
      'bunny', 4);

    this.animalDialoguePosition = {
      x: this.canvas.width * 0.14,
      y: this.canvas.height * 0.42
    };

    this.animalDialogueSize = {
      x: this.canvas.width * 0.31,
      y: this.canvas.height * 0.3
    };

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue1.png');
    this.dialoguePlayerImage = CanvasRenderer.loadNewImage('./assets/dialogue2.png');

    this.initiateDialogButton();
    this.playButtonImage = new Image();

    this.animalDialogue = [
      [['Geen zorgen, ik kan je helpen!'], ['Om hieruit te komen,'], ['moet je 4 stukken'], ['van de sleutel verzamelen.'], ['(....klik om door te gaan)']],
      [['Ga naar de 4'], ['verschillende gebieden'], ['om een stuk van'], ['de sleutel te krijgen'], ['(....klik om door te gaan)']],
      [['Jij mag kiezen'], ['waar je wilt beginnen,'], ['veel succes!'], ['(....klik op de map om door te gaan)']]
    ];
    this.dialogueTextPosition = {
      x: this.canvas.width * 0.2,
      y: this.canvas.height * 0.5
    };

    this.dialoguePlayerArea = new Button(
      this.canvas.width * 0.45,
      this.canvas.height * 0.27,
      this.dialoguePlayerImage, null,
      this.canvas.width * 0.23,
      this.canvas.height * 0.25
    );
  }

  /**
   * Calls Areas update, sets players position right, check which background
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    super.update(elapsed);
    this.player.setPosX(this.canvas.width * 0.5);
    if (LostInTheForest.keyBiology && LostInTheForest.keyGeography &&
      LostInTheForest.keyHistory && LostInTheForest.keyPhysics) {
      this.backgroundImage = CanvasRenderer.loadNewImage('./assets/mainEnd.png');
    }
  }

  /**
   * calls Areas render, renders dialogue, map and button
   */
  public override render(): void {
    super.render();
    this.dialoguePlayerArea.render();
    CanvasRenderer.writeText(this.canvas, 'Help waar ben ik?', this.canvas.width * 0.48, this.canvas.height * 0.36, 'left', 'Arial', 25, 'black');
    CanvasRenderer.writeText(this.canvas, 'Ik wil terug naar huis!', this.canvas.width * 0.48, this.canvas.height * 0.43, 'left', 'Arial', 25, 'black');
    if (LostInTheForest.keyBiology && LostInTheForest.keyGeography &&
      LostInTheForest.keyHistory && LostInTheForest.keyPhysics) {
      this.endButton.render();
    }
  }

  public override getNextStage(): Stage | null {
    if (this.ended) {
      return new CutScene(this.player, this.isDutch, 'EndCutscenes', 5, new MainArea(this.player, this.isDutch));
    }
    return super.getNextStage();;
  }

  /**
   * Uses MouseListener to check if buttons are pressed.
   */
  public override processInput(): void {
    if (LostInTheForest.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.processAreaInput();
      if (this.endButton.isCollidingWithMouse()) {
        this.ended = true;
      }
    }
  }
}
