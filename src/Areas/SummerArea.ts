import Animal from '../Animals/Animal.js';
import CanvasRenderer from '../CanvasRenderer.js';
import Challenge from '../Challenges/Challenge.js';
import GeographyChallenge from '../Challenges/GeographyChallenge.js';
import Player from '../Player.js';
import Area from './Area.js';

export default class SummerArea extends Area {
  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/summer.png');
    this.nextChallenge = new GeographyChallenge('medium', this.player, this.isDutch);

    this.animal = new Animal(
      this.canvas.width * 0.5,
      this.canvas.height * 0.05,
      'owl', 6
    );

    this.animalDialoguePosition = {
      x: this.canvas.width * 0.28,
      y: this.canvas.height * 0.01,
    };

    this.animalDialogueSize = {
      x: this.canvas.width * 0.29,
      y: this.canvas.height * 0.3
    };

    this.playButtonPosition = {
      x: this.canvas.width * 0.4,
      y: this.canvas.height * 0.6
    };

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue2.png');
    this.initiateDialogButton();

    this.animalDialogue = [
      [['Hoot hoot, welkom.'], ['(....klik om door te gaan)']],
      [['Als je een stuk van de sleutel wilt'], ['moet je mijn aardrijkskunde'], ['uitdaging voltooien op medium.'], ['(....klik om door te gaan)']],
      [['Veel plezier!'], ['(....klik op de knop om door te gaan)']]
    ];

    this.dialogueTextPosition = {
      x: this.canvas.width * 0.32,
      y: this.canvas.height * 0.1
    };
  }

  public override update(elapsed: number): void {
    super.update(elapsed);
    this.player.setPosX(this.canvas.width * 0.5);
  }
}
