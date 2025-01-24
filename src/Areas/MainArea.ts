import Button from '../Button.js';
import CanvasRenderer from '../Base/CanvasRenderer.js';
import Player from '../Player.js';
import Area from './Area.js';
import Animal from '../Animal.js';
import LostInTheForest from '../LostInTheForest.js';
import Stage from '../Stage.js';
import MouseListener from '../Base/MouseListener.js';
import CutScene from '../CutScene.js';
import EndScreen from '../Screens/EndScreen.js';

export default class MainArea extends Area {
  private dialoguePlayerArea: Button;

  private dialoguePlayerImage: HTMLImageElement;

  private endButton: Button;

  public static gameHasEnded: boolean;

  private backgroundFinished: HTMLImageElement;

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/Areas/main.png');
    this.backgroundFinished = CanvasRenderer.loadNewImage('./assets/Areas/mainEnd.png');
    this.player.setPosY(LostInTheForest.canvas.height * 0.35);
    this.player.setWidth(LostInTheForest.canvas.width * 0.35);
    this.player.setHeight(LostInTheForest.canvas.height * 0.8);

    MainArea.gameHasEnded = false;
    const exitImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/exit-button.png');
    this.endButton = new Button(LostInTheForest.canvas.width * 0.5,
      LostInTheForest.canvas.height * 0.7, exitImage, null,
      LostInTheForest.canvas.width * 0.1, LostInTheForest.canvas.width * 0.1);

    this.animal = new Animal(
      LostInTheForest.canvas.width * 0.025,
      LostInTheForest.canvas.height * 0.67,
      'bunny', 4);

    this.animalDialoguePosition = {
      x: LostInTheForest.canvas.width * 0.14,
      y: LostInTheForest.canvas.height * 0.42
    };

    this.animalDialogueSize = {
      x: LostInTheForest.canvas.width * 0.31,
      y: LostInTheForest.canvas.height * 0.3
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
      x: LostInTheForest.canvas.width * 0.2,
      y: LostInTheForest.canvas.height * 0.5
    };

    this.dialoguePlayerArea = new Button(
      LostInTheForest.canvas.width * 0.45,
      LostInTheForest.canvas.height * 0.27,
      this.dialoguePlayerImage, null,
      LostInTheForest.canvas.width * 0.23,
      LostInTheForest.canvas.height * 0.25
    );
  }

  /**
   * Calls Areas update, sets players position right, check which background
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    super.update(elapsed);
    this.player.setPosX(LostInTheForest.canvas.width * 0.5);
    if (LostInTheForest.keyBiology && LostInTheForest.keyGeography &&
      LostInTheForest.keyHistory && LostInTheForest.keyPhysics) {
      this.backgroundImage = this.backgroundFinished;
    }
  }

  /**
   * calls Areas render, renders dialogue, map and button
   */
  public override render(): void {
    super.render();
    this.dialoguePlayerArea.render();
    CanvasRenderer.writeText(LostInTheForest.canvas, 'Help waar ben ik?', LostInTheForest.canvas.width * 0.48, LostInTheForest.canvas.height * 0.36, 'left', 'Comic Sans MS', 25, 'black');
    CanvasRenderer.writeText(LostInTheForest.canvas, 'Ik wil terug naar huis!', LostInTheForest.canvas.width * 0.48, LostInTheForest.canvas.height * 0.43, 'left', 'Comic Sans MS', 25, 'black');
    this.player.getMap().render();
    if (LostInTheForest.keyBiology && LostInTheForest.keyGeography &&
      LostInTheForest.keyHistory && LostInTheForest.keyPhysics) {
      this.endButton.render();
    }
  }

  public override getNextStage(): Stage | null {
    if (MainArea.gameHasEnded) {
      return new CutScene(this.player, this.isDutch, 'EndCutscenes', 5, new EndScreen(this.player));
    }
    return super.getNextStage();
  }

  /**
   * Uses MouseListener to check if buttons are pressed.
   */
  public override processInput(): void {
    if (LostInTheForest.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.processAreaInput();
      if (this.endButton.isCollidingWithMouse()) {
        MainArea.gameHasEnded = true;
      }
    }
  }
}
