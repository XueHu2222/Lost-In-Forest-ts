import Animal from '../Animal.js';
import CanvasRenderer from '../Base/CanvasRenderer.js';
import PhysicsChallenge from '../Challenges/PhysicsChallenge.js';
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
      'bunny', 4);

    this.animalDialoguePosition = {
      x: LostInTheForest.canvas.width * 0.28,
      y: LostInTheForest.canvas.height * 0.3,
    };

    this.animalDialogueSize = {
      x: LostInTheForest.canvas.width * 0.3,
      y: LostInTheForest.canvas.height * 0.35
    };

    this.playButtonPosition = {
      x: LostInTheForest.canvas.width * 0.4,
      y: LostInTheForest.canvas.height * 0.65
    };

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue1.png');
    this.initiateDialogButton();

    this.dialogueTextPosition = {
      x: LostInTheForest.canvas.width * 0.34,
      y: LostInTheForest.canvas.height * 0.38
    };
  }

  protected override initiateDialog(): void {
    this.animalDialogue = [
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('He, daar ben je weer.')), [LostInTheForest.locale.t('(....Klik om door te gaan)')]],
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('Als jij een stuk|van de sleutel wilt hebben|van mij dan moet je|de scheikunde uitdaging voltooien.')), [LostInTheForest.locale.t('(....Klik om door te gaan)')]],
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('Veel succes!|Je zult het nodig hebben.')), [LostInTheForest.locale.t('(....klik op de knop om door te gaan)')]],
    ];
  }

  /**
   * Calls Areas update, sets players position right
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    super.update(elapsed);
    this.player.setPosX(LostInTheForest.canvas.width * 0.5);
  }
}
