import Animal from '../Animals/Animal.js';
import Monkey from '../Animals/Monkey.js';
import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Area from './Area.js';
import MainArea from './MainArea.js';

export default class WinterArea extends Area {
  private monkey: Animal;

  private dialogueAnimalArea: Button;

  private monkeyDialogue: string[][][];

  private challengeStarted: boolean = false;

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/winter.png');
    this.player.setPosX(LostInTheForest.canvas.width * 0.15);
    this.player.setPosY(LostInTheForest.canvas.height * 0.45);
    this.player.setWidth(LostInTheForest.canvas.width * 0.35);
    this.player.setHeight(LostInTheForest.canvas.height * 0.8);

    this.monkey = new Monkey(
      LostInTheForest.canvas.width * 0.55,
      LostInTheForest.canvas.height * 0.67
    );

    const dialogueImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/dialogue.png');
    this.dialogueAnimalArea = new Button(
      this.canvas.width * 0.7,
      this.canvas.height * 0.4,
      dialogueImage,
      this.canvas.width * 0.27,
      this.canvas.height * 0.3);

    this.monkeyDialogue = [
      [['Hihi, hallo.'], ['(....klik om door te gaan)']],
      [['Als je een stuk van de sleutel wilt'], ['hebben van mij dan moet je'], ['mijn biologie uitdaging'], ['voltooien op medium.'], ['(....klik om door te gaan)']],
      [['Je kan het!'], ['(....klik om te spelen)']]
    ];

    this.animalDialogue = this.monkeyDialogue;
    this.dialogPosition = {
      x: this.canvas.width * 0.74,
      y: this.canvas.height * 0.48
    };
  }


  public override getNextStage(): Stage | null {
    if (this.challengeStarted) {
      return new MainArea(this.player, this.isDutch);
    } return null;
  }

  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.dialogueAnimalArea.isCollidingWithMouse(mouseListener)) {
        if (this.animalDialogueIndex < this.monkeyDialogue.length - 1) {
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
    this.monkey.render();

    this.dialogueAnimalArea.render();
    super.render();
  }
}
