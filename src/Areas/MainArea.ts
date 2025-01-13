import Animal from '../Animals/Animal.js';
import Bunny from '../Animals/Bunny.js';
import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Area from './Area.js';
import AutumnArea from './AutumnArea.js';

export default class MainArea extends Area {
  private switchToIsland: boolean = false;

  private bunny: Animal;

  private dialogueAnimalArea: Button;

  private dialoguePlayerArea: Button;

  private bunnyDialogue: string[][][];

  private challengeStarted: boolean = false;

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/main.png');
    this.player.setPosX(LostInTheForest.canvas.width * 0.5);
    this.player.setPosY(LostInTheForest.canvas.height * 0.35);
    this.player.setWidth(LostInTheForest.canvas.width * 0.35);
    this.player.setHeight(LostInTheForest.canvas.height * 0.8);
    this.bunny = new Bunny(
      LostInTheForest.canvas.width * 0.025,
      LostInTheForest.canvas.height * 0.67
    );
    const dialogueAnimalImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/dialogue.png');
    const dialoguePlayerImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/dialogue2.png');

    this.dialogueAnimalArea = new Button(
      LostInTheForest.canvas.width * 0.18,
      LostInTheForest.canvas.height * 0.44,
      dialogueAnimalImage,
      LostInTheForest.canvas.width * 0.28,
      LostInTheForest.canvas.height * 0.29
    );
    this.dialoguePlayerArea = new Button(
      LostInTheForest.canvas.width * 0.45,
      LostInTheForest.canvas.height * 0.27,
      dialoguePlayerImage,
      LostInTheForest.canvas.width * 0.23,
      LostInTheForest.canvas.height * 0.25
    );

    this.bunnyDialogue = [
      [['Geen zorgen, ik kan je helpen!'], ['Om hieruit te komen,'], ['moet je 4 stukken'], ['van de sleutel verzamelen.'], ['(....klik om door te gaan)']],
      [['Ga naar de 4'], ['verschillende gebieden'], ['om een stuk van'], ['de sleutel te krijgen'], ['(....klik op de map om door te gaan)']],
      [['Jij mag kiezen'], ['waar je wilt beginnen,'], ['veel succes!'], ['(....klik om te spelen)']]
    ];
    this.animalDialogue = this.bunnyDialogue;
    this.dialogPosition = {
      x:this.canvas.width * 0.225,
      y:this.canvas.height * 0.5};
  }

  public override getNextStage(): Stage | null {
    if (this.challengeStarted) {
      return new AutumnArea (this.player, this.isDutch);
    } return null;
    // if (this.switchToIsland) {
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
    this.dialoguePlayerArea.render();
    super.render();

    CanvasRenderer.writeText(this.canvas, 'Help waar ben ik?', this.canvas.width * 0.48, this.canvas.height * 0.36, 'left', 'Arial', 25, 'black');
    CanvasRenderer.writeText(this.canvas, 'Ik wil terug naar huis!', this.canvas.width * 0.48, this.canvas.height * 0.43, 'left', 'Arial', 25, 'black');
  }
}
