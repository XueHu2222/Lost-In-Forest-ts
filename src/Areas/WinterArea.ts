import Animal from '../Animal.js';
import CanvasRenderer from '../Base/CanvasRenderer.js';
import BiologyChallenge from '../Challenges/BiologyChallenge.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Area from './Area.js';

export default class WinterArea extends Area {
  public constructor(player: Player) {
    super(player);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/Areas/winter.png');
    this.nextChallenge = new BiologyChallenge('medium', this.player);

    this.animal = new Animal(
      LostInTheForest.canvas.width * 0.55,
      LostInTheForest.canvas.height * 0.67,
      'monkey', 4
    );

    this.animalDialoguePosition = {
      x: LostInTheForest.canvas.width * 0.7,
      y: LostInTheForest.canvas.height * 0.4,
    };

    this.animalDialogueSize = {
      x: LostInTheForest.canvas.width * 0.29,
      y: LostInTheForest.canvas.height * 0.3
    };

    this.playButtonPosition = {
      x: LostInTheForest.canvas.width * 0.46,
      y: LostInTheForest.canvas.height * 0.789
    };

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue1.png');
    this.initiateDialogButton();

    this.dialogueTextPosition = {
      x: LostInTheForest.canvas.width * 0.75,
      y: LostInTheForest.canvas.height * 0.48
    };
  }

  protected override initiateDialog(): void {
    this.animalDialogue = [
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('Hihi, hallo.')), [LostInTheForest.locale.t('(....Klik om door te gaan)')]],
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('Als je een stuk van de sleutel wilt|hebben van mij dan moet je|mijn biologie uitdaging|voltooien.')), [LostInTheForest.locale.t('(....Klik om door te gaan)')]],
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('Je kan het!')), [LostInTheForest.locale.t('(....klik op de knop om door te gaan)')]],
    ];
  }

  /**
   * Calls Areas update, sets players position right
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    super.update(elapsed);
    this.player.setPosX(LostInTheForest.canvas.width * 0.15);
  }
}
