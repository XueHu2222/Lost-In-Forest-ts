import Animal from '../Animals/Animal.js';
import CanvasRenderer from '../CanvasRenderer.js';
import HistoryChallenge from '../Challenges/HistoryChallenge.js';
import Player from '../Player.js';
import Area from './Area.js';

export default class AutumnArea extends Area {
  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/autumn.png');
    this.nextChallenge = new HistoryChallenge('medium', this.player, this.isDutch);

    this.animal = new Animal(
      LostInTheForest.canvas.width * 0.65,
      LostInTheForest.canvas.height * 0.7,
      'frog', 5);

    this.animalDialoguePosition = {
      x: LostInTheForest.canvas.width * 0.74,
      y: LostInTheForest.canvas.height * 0.5,
    };

    this.animalDialogueSize = {
      x: LostInTheForest.canvas.width * 0.23,
      y: LostInTheForest.canvas.height * 0.25
    };

    this.playButtonPosition = {
      x: LostInTheForest.canvas.width * 0.46,
      y: LostInTheForest.canvas.height * 0.63};

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue1.png');
    this.initiateDialogButton();

    this.animalDialogue = [
      [['Hallo kind,'], ['(....klik om door te gaan)']],
      [['je moet mijn geschiedenis'], ['uitdaging voltooien'], ['op medium als je een stuk'], ['van de sleutel wilt hebben.'], ['(....klik om door te gaan)']],
      [[' Veel succes!'], ['(..klik op de knop om door te gaan)']]
    ];

    this.dialogueTextPosition = {
      x: LostInTheForest.canvas.width * 0.78,
      y: LostInTheForest.canvas.height * 0.57
    };
  }


  public override update(elapsed: number): void {
    super.update(elapsed);
    this.player.setPosX(LostInTheForest.canvas.width * 0.05);
  }

  public override render(): void {
    super.render();
    this.player.getMap().render();
  }
}
