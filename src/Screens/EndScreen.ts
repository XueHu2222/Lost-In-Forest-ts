import Animal from '../Animal.js';
import MainArea from '../Areas/MainArea.js';
import CanvasRenderer from '../Base/CanvasRenderer.js';
import MouseListener from '../Base/MouseListener.js';
import Button from '../Button.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Stage from '../Stage.js';

export default class EndScreen extends Stage {
  private endMessage: string[];

  private homeButton: Button;

  private restartButton: Button;

  private isGoHome: boolean;

  private isRestart: boolean;

  private allAnimals: Animal[];

  public constructor(player: Player) {
    super(player);

    //to give everything a standard value
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/StartScreen/start.png');
    this.isGoHome = false;
    this.isRestart = false;
    this.allAnimals = [
      new Animal(LostInTheForest.canvas.width * 0.225, LostInTheForest.canvas.height * 0.73, 'bunny', 4),
      new Animal(LostInTheForest.canvas.width * 0.425, LostInTheForest.canvas.height * 0.78, 'frog', 4),
      new Animal(LostInTheForest.canvas.width * 0.03, LostInTheForest.canvas.height * 0.75, 'owl', 4),
      new Animal(LostInTheForest.canvas.width * 0.75, LostInTheForest.canvas.height * 0.73, 'monkey', 4),
    ];

    this.endMessage = [LostInTheForest.locale.t('GEFELICITEERD!'), LostInTheForest.locale.t('JE BENT UIT HET BOS ONTSNAPT!')];
    const homeButtonImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/home-button.png');
    const restartButtonImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/restart-button.png');

    this.homeButton = new Button(
      LostInTheForest.canvas.width * 0.55, LostInTheForest.canvas.height * 0.5,
      homeButtonImage, null,
      LostInTheForest.canvas.width * 0.1, LostInTheForest.canvas.height * 0.17
    );
    this.restartButton = new Button(
      LostInTheForest.canvas.width * 0.35, LostInTheForest.canvas.height * 0.5,
      restartButtonImage, null,
      LostInTheForest.canvas.width * 0.1, LostInTheForest.canvas.height * 0.17
    );
  }

  /**
     * checks if its started to next stage
     * @returns the stage if it started or nothing if its not started yet
     */
  public override getNextStage(): Stage | null {
    if (this.isGoHome) {
      MainArea.gameHasEnded = false;
      return new MainArea(this.player);
    } if (this.isRestart) {
      window.location.reload();
      this.isRestart = false;
    }
    return null;
  }

  /**
   * To check if the mouse is used
   */
  public override processInput(): void {
    if (LostInTheForest.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      //homebutton
      if (this.homeButton.isCollidingWithMouse()) {
        this.isGoHome = true;
      }

      if (this.restartButton.isCollidingWithMouse()) {
        this.isRestart = true;
      }
    }
  }

  /**
 * Update the animals for animation
 * @param elapsed time in ms elapsed from the GameLoop
 */
  public override update(elapsed: number): void {
    this.allAnimals.forEach((animal: Animal) => animal.update(elapsed));
    this.player.setPosX(LostInTheForest.canvas.width * 0.55);
  }

  /**
   * Render all the elements in the screen.
   */
  public override render(): void {
    super.render();
    this.allAnimals.forEach((animal: Animal) => animal.render());
    this.player.render();
    this.homeButton.render();
    this.restartButton.render();

    this.endMessage.forEach((line: string, index: number) => {
      CanvasRenderer.writeText(
        LostInTheForest.canvas,
        line,
        LostInTheForest.canvas.width * 0.5,
        LostInTheForest.canvas.height * 0.3 + index * 100,
        'center',
        'Comic Sans MS',
        50,
        'black'
      );
    });
  }
}
