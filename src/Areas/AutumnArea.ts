import Animal from '../Animals/Animal.js';
import Frog from '../Animals/Frog.js';
import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Area from './Area.js';
import SpringArea from './SpringArea.js';

export default class AutumnArea extends Area {
  private frog: Animal;

  private dialogueAnimalArea: Button;

  private frogDialogue: string[][][];

  private challengeStarted: boolean = false;

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/autumn.png');
    this.player.setPosX(LostInTheForest.canvas.width * 0.15);
    this.player.setPosY(LostInTheForest.canvas.height * 0.35);
    this.player.setWidth(LostInTheForest.canvas.width * 0.35);
    this.player.setHeight(LostInTheForest.canvas.height * 0.8);

    this.frog = new Frog(
      LostInTheForest.canvas.width * 0.65,
      LostInTheForest.canvas.height * 0.7);


    const dialogueImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/dialogue.png');
    this.dialogueAnimalArea = new Button(
      this.canvas.width * 0.74,
      this.canvas.height * 0.5,
      dialogueImage,
      LostInTheForest.canvas.width * 0.23,
      LostInTheForest.canvas.height * 0.25);

    this.frogDialogue = [
      [['Hallo kind,'], ['(....klik om door te gaan)']],
      [['je moet mijn geschiedenis'], ['uitdaging voltooien'], ['op medium als je een stuk'], ['van de sleutel wilt hebben.']],
      [[' Veel succes!'], ['(....klik om te spelen)']]
    ];

    this.animalDialogue = this.frogDialogue;
    this.dialogPosition = {
      x: this.canvas.width * 0.78,
      y: this.canvas.height * 0.57
    };
  }

  public override getNextStage(): Stage | null {
    if (this.challengeStarted) {
      return new SpringArea(this.player, this.isDutch);
    } return null;
    // if (this.switchToSpring) {
    //   return new SpringArea(this.player, this.isDutch);
    // }
    // return null;
  }

  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.dialogueAnimalArea.isCollidingWithMouse(mouseListener)) {
        if (this.animalDialogueIndex < this.frogDialogue.length - 1) {
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
    this.frog.render();

    this.dialogueAnimalArea.render();
    super.render();
  }
}
