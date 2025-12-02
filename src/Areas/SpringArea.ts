import Animal from '../Animal.js';
import CanvasRenderer from '../Base/CanvasRenderer.js';
import PhysicsChallenge from '../Challenges/PhysicsChallenge.js';
import Dialogue from '../Dialogue.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Area from './Area.js';

export default class SpringArea extends Area {
  public constructor(player: Player) {
    super(player);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/Areas/spring.png');
    this.nextChallenge = new PhysicsChallenge('medium', this.player);

    this.animal = new Animal(
      LostInTheForest.canvas.width * 0.1,
      LostInTheForest.canvas.height * 0.5,
      'bunny',
      4
    );

    this.playButtonPosition = {
      x: LostInTheForest.canvas.width * 0.4,
      y: LostInTheForest.canvas.height * 0.65
    };
  }

  protected override initiateDialog(): void {
    this.animalDialogue = [
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('He, daar ben je weer.')),
      [LostInTheForest.locale.t('(....Klik om door te gaan)')]],

      [...this.separateDialogIntoArrays(
        LostInTheForest.locale.t('Als jij een stuk|van de sleutel wilt hebben|van mij dan moet je|de scheikunde uitdaging voltooien.')
      ), [LostInTheForest.locale.t('(....Klik om door te gaan)')]],

      [...this.separateDialogIntoArrays(
        LostInTheForest.locale.t('Veel succes!|Je zult het nodig hebben.')
      ), [LostInTheForest.locale.t('(....klik op de knop om door te gaan)')]],
    ];

    this.dialogue = new Dialogue({
      dialogueData: this.animalDialogue,
      dialogueImage: CanvasRenderer.loadNewImage('./assets/dialogue1.png'),
      dialoguePosition: {
        x: LostInTheForest.canvas.width * 0.28,
        y: LostInTheForest.canvas.height * 0.3
      },
      dialogueSize: {
        x: LostInTheForest.canvas.width * 0.3,
        y: LostInTheForest.canvas.height * 0.35
      },
      textPosition: {
        x: LostInTheForest.canvas.width * 0.34,
        y: LostInTheForest.canvas.height * 0.38
      },
      displayTime: 1000
    });
  }

  public override update(elapsed: number): void {
    super.update(elapsed);
    this.player.setPosX(LostInTheForest.canvas.width * 0.5);
  }
}
