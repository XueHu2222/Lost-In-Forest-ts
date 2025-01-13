import Animal from '../Animals/Animal.js';
import Owl from '../Animals/Owl.js';
import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Area from './Area.js';
import WinterArea from './WinterArea.js';

export default class SummerArea extends Area {
  private owl: Animal;

  private dialogueAnimalArea: Button;

  private owlDialogue: string[][][];

  private challengeStarted: boolean = false;

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/summer.png');
    this.player.setPosX(LostInTheForest.canvas.width * 0.5);
    this.player.setPosY(LostInTheForest.canvas.height * 0.45);
    this.player.setWidth(LostInTheForest.canvas.width * 0.35);
    this.player.setHeight(LostInTheForest.canvas.height * 0.8);

    this.owl = new Owl(
      LostInTheForest.canvas.width * 0.5,
      LostInTheForest.canvas.height * 0.05
    );

    const dialogueImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/dialogue2.png');
    this.dialogueAnimalArea = new Button(
      this.canvas.width * 0.28,
      this.canvas.height * 0.01,
      dialogueImage,
      this.canvas.width * 0.27,
      this.canvas.height * 0.3);

    this.owlDialogue = [
      [['Hoot hoot, welkom.'], ['(....klik om door te gaan)']],
      [['Als je een stuk van de sleutel wilt'], ['moet je mijn aardrijkskunde'], ['uitdaging voltooien op medium.'], ['(....klik om door te gaan)']],
      [['Veel plezier!'], ['(....klik om te spelen)']]
    ];

    this.animalDialogue = this.owlDialogue;
    this.dialogPosition = {
      x: this.canvas.width * 0.3,
      y: this.canvas.height * 0.1
    };
  }

  public override getNextStage(): Stage | null {
    if (this.challengeStarted) {
      return new WinterArea(this.player, this.isDutch);
    } return null;
  }

  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.dialogueAnimalArea.isCollidingWithMouse(mouseListener)) {
        if (this.animalDialogueIndex < this.owlDialogue.length - 1) {
          this.animalDialogueIndex += 1;
        } else {
          this.challengeStarted = true;
          console.log('game is start');
        }
      }
    }
  }

  public override update(elapsed: number): void {
    super.update(elapsed);
  }

  public override render(): void {
    this.renderBackground();
    this.player.render();
    this.owl.render();

    this.dialogueAnimalArea.render();
    super.render();
  }
}
