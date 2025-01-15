import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Area from './Area.js';
import Animal from '../Animals/Animal.js';

export default class MainArea extends Area {
  private dialoguePlayerArea: Button;

  private dialoguePlayerImage: HTMLImageElement = new Image();

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/main.png');
    this.player.setPosY(this.canvas.height * 0.35);
    this.player.setWidth(this.canvas.width * 0.35);
    this.player.setHeight(this.canvas.height * 0.8);
    this.animal = new Animal(
      this.canvas.width * 0.025,
      this.canvas.height * 0.67,
      'bunny');

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


    this.animalDialogue = [
      [['Geen zorgen, ik kan je helpen!'], ['Om hieruit te komen,'], ['moet je 4 stukken'], ['van de sleutel verzamelen.'], ['(....klik om door te gaan)']],
      [['Ga naar de 4'], ['verschillende gebieden'], ['om een stuk van'], ['de sleutel te krijgen'], ['(....klik op de map om door te gaan)']],
      [['Jij mag kiezen'], ['waar je wilt beginnen,'], ['veel succes!'], ['(....klik om te spelen)']]
    ];
    this.dialogueTextPosition = {
      x: this.canvas.width * 0.2,
      y: this.canvas.height * 0.5
    };

    this.dialoguePlayerArea = new Button(
      this.canvas.width * 0.45,
      this.canvas.height * 0.27,
      this.dialoguePlayerImage,
      this.canvas.width * 0.23,
      this.canvas.height * 0.25
    );
  }

  public override update(elapsed: number): void {
    super.update(elapsed);
    this.player.setPosX(this.canvas.width * 0.5);
  }

  public override render(): void {
    super.render();
    this.dialoguePlayerArea.render();
    CanvasRenderer.writeText(this.canvas, 'Help waar ben ik?', this.canvas.width * 0.48, this.canvas.height * 0.36, 'left', 'Arial', 25, 'black');
    CanvasRenderer.writeText(this.canvas, 'Ik wil terug naar huis!', this.canvas.width * 0.48, this.canvas.height * 0.43, 'left', 'Arial', 25, 'black');
    this.player.getMap().render();
  }
}
