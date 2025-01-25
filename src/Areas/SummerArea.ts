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
      [...this.makeDialogArray(LostInTheForest.locale.t('Summer: Dialog 1')), [LostInTheForest.locale.t('Continue Dialog')]],
      [...this.makeDialogArray(LostInTheForest.locale.t('Summer: Dialog 2')), [LostInTheForest.locale.t('Continue Dialog')]],
      [...this.makeDialogArray(LostInTheForest.locale.t('Summer: Dialog 3')), [LostInTheForest.locale.t('Click Play')]],
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
