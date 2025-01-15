import Animal from '../Animals/Animal.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Area from './Area.js';


export default class WinterArea extends Area {
  private monkeyDialogue: string[][][];

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/winter.png');

    this.animal = new Animal(
      this.canvas.width * 0.55,
      this.canvas.height * 0.67,
      'monkey', 4
    );

    this.animalDialoguePosition = {
      x: this.canvas.width * 0.7,
      y: this.canvas.height * 0.4,
    };

    this.animalDialogueSize = {
      x: this.canvas.width * 0.29,
      y: this.canvas.height * 0.3
    };

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue1.png');
    this.initiateDialogButton();

    this.monkeyDialogue = [
      [['Hihi, hallo.'], ['(....klik om door te gaan)']],
      [['Als je een stuk van de sleutel wilt'], ['hebben van mij dan moet je'], ['mijn biologie uitdaging'], ['voltooien op medium.'], ['(....klik om door te gaan)']],
      [['Je kan het!'], ['(....klik op de knop om door te gaan)']]
    ];

    this.animalDialogue = this.monkeyDialogue;
    this.dialogueTextPosition = {
      x: this.canvas.width * 0.75,
      y: this.canvas.height * 0.48
    };
  }

  public override update(elapsed: number): void {
    super.update(elapsed);
    this.player.setPosX(this.canvas.width * 0.15);
  }

  public override render(): void {
    super.render();
    this.player.getMap().render();
  }
}
