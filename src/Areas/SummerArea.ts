import Owl from '../Animals/Owl.js';
import CanvasRenderer from '../CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Area from './Area.js';
import WinterArea from './WinterArea.js';

export default class SummerArea extends Area {
  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/summer.png');
    this.player.setPosX(this.canvas.width * 0.5);
    this.player.setPosY(this.canvas.height * 0.45);
    this.player.setWidth(this.canvas.width * 0.35);
    this.player.setHeight(this.canvas.height * 0.8);

    this.animal = new Owl(
      this.canvas.width * 0.5,
      this.canvas.height * 0.05
    );

    this.animalDialoguePosition = {
      x: this.canvas.width * 0.28,
      y: this.canvas.height * 0.01,
    };

    this.animalDialogueSize = {
      x: this.canvas.width * 0.29,
      y: this.canvas.height * 0.3
    };

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue2.png');
    this.initiateDialogButton();

    this.animalDialogue = [
      [['Hoot hoot, welkom.'], ['(....klik om door te gaan)']],
      [['Als je een stuk van de sleutel wilt'], ['moet je mijn aardrijkskunde'], ['uitdaging voltooien op medium.'], ['(....klik om door te gaan)']],
      [['Veel plezier!'], ['(....klik om te spelen)']]
    ];

    this.dialogueTextPosition = {
      x: this.canvas.width * 0.32,
      y: this.canvas.height * 0.1
    };
  }

  public override getNextStage(): Stage | null {
    if (this.challengeStarted) {
      return new WinterArea(this.player, this.isDutch);
    } return null;
  }

  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.player.getMap().processInput(mouseListener);
    }
  }

  public override update(elapsed: number): void {
    super.update(elapsed);
  }

  public override render(): void {
    super.render();
    this.renderBackground();
    this.player.setPosX(LostInTheForest.canvas.width * 0.5);
    this.player.setPosY(LostInTheForest.canvas.height * 0.35);
    this.player.render();
    this.player.getMap().render();
  }
}
