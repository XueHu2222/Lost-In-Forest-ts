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
  protected bunny: Animal;

  protected frog: Animal;

  protected owl: Animal;

  protected monkey: Animal;

  protected endMessage: string[];

  protected homeButton: Button;

  protected restartButton: Button;

  protected isGoHome: boolean = false;

  protected isRestart: boolean = false;

  protected setIsDutch: (value: boolean) => void;

  public constructor(player: Player, isDutch: boolean, setIsDutch: (value: boolean) => void) {
    super(player, isDutch);
    this.setIsDutch = setIsDutch;
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/start.png');
    this.bunny = new Animal(this.canvas.width * 0.25, this.canvas.height * 0.63, 'bunny', 4);
    this.frog = new Animal(this.canvas.width * 0.5, this.canvas.height * 0.68, 'frog', 4);
    this.owl = new Animal(this.canvas.width * 0.03, this.canvas.height * 0.65, 'owl', 4);
    this.monkey = new Animal(this.canvas.width * 0.75, this.canvas.height * 0.63, 'monkey', 4);
    this.endMessage = ['CONGRATULATIONS!', 'YOU ESCAPED THE FOREST!'];
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

  public override getNextStage(): Stage | null {
    if (this.isGoHome) {
      return new StartScreen(this.setIsDutch, this.player);
    } if (this.isRestart) {
      return new BeginCutScene(this.player, this.isDutch);
    }
    return null;
  }

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

  public override update(elapsed: number): void {
    this.bunny.update(elapsed);
    this.frog.update(elapsed);
    this.owl.update(elapsed);
    this.monkey.update(elapsed);
  }

  public override render(): void {
    CanvasRenderer.drawImage(this.canvas, this.backgroundImage,
      0, 0, this.canvas.width, this.canvas.height);
    this.bunny.render();
    this.frog.render();
    this.owl.render();
    this.monkey.render();
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
