import Animal from '../Animal.js';
import CanvasRenderer from '../Base/CanvasRenderer.js';
import HistoryChallenge from '../Challenges/HistoryChallenge.js';
import Dialogue from '../Dialogue.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Area from './Area.js';

export default class AutumnArea extends Area {
  public constructor(player: Player) {
    super(player);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/Areas/autumn.png');
    this.nextChallenge = new HistoryChallenge('medium', this.player);

    this.animal = new Animal(
      LostInTheForest.canvas.width * 0.65,
      LostInTheForest.canvas.height * 0.7,
      'frog',
      5);

    this.playButtonPosition = {
      x: LostInTheForest.canvas.width * 0.46,
      y: LostInTheForest.canvas.height * 0.63
    };
  }

  protected override initiateDialog(): void {
    this.animalDialogue = [
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('Hallo kind,')), [LostInTheForest.locale.t('(....Klik om door te gaan)')]],
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('je moet mijn geschiedenis|uitdaging voltooien|als je een stuk|van de sleutel wilt hebben.')), [LostInTheForest.locale.t('(....Klik om door te gaan)')]],
      [...this.separateDialogIntoArrays(LostInTheForest.locale.t('Veel succes!')), [LostInTheForest.locale.t('(....klik op de knop om door te gaan)')]],
    ];

    this.dialogue = new Dialogue({
      dialogueData: this.animalDialogue,
      dialogueImage: CanvasRenderer.loadNewImage('./assets/dialogue1.png'),
      dialoguePosition: {
        x: LostInTheForest.canvas.width * 0.74,
        y: LostInTheForest.canvas.height * 0.5,
      },
      dialogueSize: {
        x: LostInTheForest.canvas.width * 0.23,
        y: LostInTheForest.canvas.height * 0.25
      },
      textPosition: {
        x: LostInTheForest.canvas.width * 0.78,
        y: LostInTheForest.canvas.height * 0.57
      },
      displayTime: 1000
    });
  }

  /**
   * Calls Areas update, sets players position right
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    super.update(elapsed);
    this.player.setPosX(LostInTheForest.canvas.width * 0.05);
  }
}
