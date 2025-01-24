import Animal from '../Animals/Animal.js';
import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import BeginCutScene from '../Cutscenes/BeginCutScene.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import StartScreen from './StartScreen.js';

export default class EndScreen extends Stage {
  private endMessage: string[];

  private homeButton: Button;

  private restartButton: Button;

  private isGoHome: boolean;

  private isRestart: boolean;

  private allAnimals: Animal[] = [];

  public constructor(player: Player) {
    super(player, LostInTheForest.isDutch);

    //to give everything a standard value
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/start.png');
    this.isGoHome = false;
    this.isRestart = false;
    this.allAnimals = [
      new Animal(this.canvas.width * 0.25, this.canvas.height * 0.63, 'bunny', 4),
      new Animal(this.canvas.width * 0.5, this.canvas.height * 0.68, 'frog', 4),
      new Animal(this.canvas.width * 0.03, this.canvas.height * 0.65, 'owl', 4),
      new Animal(this.canvas.width * 0.75, this.canvas.height * 0.63, 'monkey', 4),
    ];

    if (this.isDutch) {
      this.endMessage = ['GEFELICITEERD!', 'JE BENT UIT HET BOS ONTSNAPT!'];
    } else {
      this.endMessage = ['CONGRATULATIONS!', 'YOU ESCAPED THE FOREST!'];
    }
    const homeButtonImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/home-button.png');
    const restartButtonImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/restart-button.png');

    this.homeButton = new Button(
      this.canvas.width * 0.55, this.canvas.height * 0.5,
      homeButtonImage, null,
      this.canvas.width * 0.1, this.canvas.height * 0.17
    );
    this.restartButton = new Button(
      this.canvas.width * 0.35, this.canvas.height * 0.5,
      restartButtonImage, null,
      this.canvas.width * 0.1, this.canvas.height * 0.17
    );
  }

  /**
     * checks if its started to next stage
     * @returns the stage if it started or nothing if its not started yet
     */
  public override getNextStage(): Stage | null {
    if (this.isGoHome) {
      return new StartScreen(this.player);
    } if (this.isRestart) {
      return new BeginCutScene(this.player, this.isDutch);
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
  }

  /**
   * Render all the elements in the screen.
   */
  public override render(): void {
    CanvasRenderer.drawImage(this.canvas, this.backgroundImage,
      0, 0, this.canvas.width, this.canvas.height);
    this.allAnimals.forEach((animal: Animal) => animal.render());
    this.homeButton.render();
    this.restartButton.render();

    this.endMessage.forEach((line: string, index: number) => {
      CanvasRenderer.writeText(
        this.canvas,
        line,
        this.canvas.width * 0.5,
        this.canvas.height * 0.3 + index * 100,
        'center',
        'Comic Sans MS',
        50,
        'black'
      );
    });
  }
}
