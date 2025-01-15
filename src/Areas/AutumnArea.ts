import Animal from '../Animals/Animal.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Player from '../Player.js';
import Area from './Area.js';


export default class AutumnArea extends Area {
  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/autumn.png');

    this.animal = new Animal(
      this.canvas.width * 0.65,
      this.canvas.height * 0.7,
      'frog');

    this.animalDialoguePosition = {
      x: this.canvas.width * 0.74,
      y: this.canvas.height * 0.5,
    };

    this.animalDialogueSize = {
      x: this.canvas.width * 0.23,
      y: this.canvas.height * 0.25
    };

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue1.png');
    this.initiateDialogButton();

    this.animalDialogue = [
      [['Hallo kind,'], ['(....klik om door te gaan)']],
      [['je moet mijn geschiedenis'], ['uitdaging voltooien'], ['op medium als je een stuk'], ['van de sleutel wilt hebben.']],
      [[' Veel succes!'], ['(....klik om te spelen)']]
    ];

    this.dialogueTextPosition = {
      x: this.canvas.width * 0.78,
      y: this.canvas.height * 0.57
    };
  }

  public override update(elapsed: number): void {
    super.update(elapsed);
    this.player.setPosX(this.canvas.width * 0.05);
  }

  public override render(): void {
    super.render();
    this.player.getMap().render();
  }
}
