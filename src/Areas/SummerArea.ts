import Animal from '../Animal.js';
import CanvasRenderer from '../Base/CanvasRenderer.js';
import GeographyChallenge from '../Challenges/GeographyChallenge.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Area from './Area.js';

export default class SummerArea extends Area {
  public constructor(player: Player) {
    super(player);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/Areas/summer.png');
    this.nextChallenge = new GeographyChallenge('medium', this.player);

    this.animal = new Animal(
      LostInTheForest.canvas.width * 0.5,
      LostInTheForest.canvas.height * 0.05,
      'owl', 6
    );

    this.animalDialoguePosition = {
      x: LostInTheForest.canvas.width * 0.28,
      y: LostInTheForest.canvas.height * 0.01,
    };

    this.animalDialogueSize = {
      x: LostInTheForest.canvas.width * 0.29,
      y: LostInTheForest.canvas.height * 0.3
    };

    this.playButtonPosition = {
      x: LostInTheForest.canvas.width * 0.4,
      y: LostInTheForest.canvas.height * 0.6
    };

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue2.png');
    this.initiateDialogButton();

    this.dialogueTextPosition = {
      x: LostInTheForest.canvas.width * 0.32,
      y: LostInTheForest.canvas.height * 0.1
    };
  }

  protected override initiateDialog(): void {
    this.animalDialogue = [
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('Hoot hoot, welkom.')), [LostInTheForest.locale.t('(....Klik om door te gaan)')]],
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('Als je een stuk van de sleutel wilt|moet je mijn aardrijkskunde|uitdaging voltooien.')), [LostInTheForest.locale.t('(....Klik om door te gaan)')]],
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('Veel plezier!')), [LostInTheForest.locale.t('(....klik op de knop om door te gaan)')]],
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
