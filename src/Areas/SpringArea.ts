import Animal from '../Animals/Animal.js';
import Bunny from '../Animals/Bunny.js';
import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Area from './Area.js';
import SummerArea from './SummerArea.js';

export default class SpringArea extends Area {
  private bunny: Animal;

  private dialogueAnimalArea: Button;

  private bunnyDialogue: string[][][];

  private challengeStarted: boolean = false;

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/spring.png');
    this.player.setPosX(LostInTheForest.canvas.width * 0.5);
    this.player.setPosY(LostInTheForest.canvas.height * 0.45);
    this.player.setWidth(LostInTheForest.canvas.width * 0.35);
    this.player.setHeight(LostInTheForest.canvas.height * 0.8);

    this.bunny = new Bunny(
      LostInTheForest.canvas.width * 0.1,
      LostInTheForest.canvas.height * 0.5
    );

    const dialogueImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/dialogue.png');
    this.dialogueAnimalArea = new Button(
      this.canvas.width * 0.28,
      this.canvas.height * 0.3,
      dialogueImage,
      this.canvas.width * 0.26,
      this.canvas.height * 0.35);

    this.bunnyDialogue = [
      [['He, daar ben je weer.'], ['(....klik om door te gaan)']],
      [['Als jij een stuk'], ['van de sleutel wilt hebben'], ['van mij dan moet je'], ['de scheikunde uitdaging voltooien'], ['op medium.'], ['(....klik om door te gaan)']],
      [['Veel succes,'], [' je zult het nodig hebben.'], ['(....klik om te spelen)']]
    ];

    this.animalDialogue = this.bunnyDialogue;
    this.dialogPosition = {
      x: this.canvas.width * 0.32,
      y: this.canvas.height * 0.37};
  }

  public override getNextStage(): Stage | null {
    if (this.challengeStarted) {
      return new SummerArea(this.player, this.isDutch);
    } return null;
    // if (this.switchToSpring) {
    //   return new SpringArea(this.player, this.isDutch);
    // }
    // return null;
  }

  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      if (this.dialogueAnimalArea.isCollidingWithMouse(mouseListener)) {
        if (this.animalDialogueIndex < this.bunnyDialogue.length - 1) {
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
    this.bunny.render();

    this.dialogueAnimalArea.render();

    super.render();
  }
}
