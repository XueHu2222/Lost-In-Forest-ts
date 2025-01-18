import Animal from '../Animals/Animal.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';

export default class EndScreen extends Stage {
  protected bunny: Animal;

  protected frog: Animal;

  protected owl: Animal;

  protected monkey: Animal;

  private endMessage: string[];

  // private homeButton: HTMLImageElement;

  // private restartButton: HTMLImageElement;

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/start.png');
    this.bunny = new Animal(this.canvas.width * 0.25, this.canvas.height * 0.63, 'bunny', 4);
    this.frog = new Animal(this.canvas.width * 0.5, this.canvas.height * 0.68, 'frog', 4);
    this.owl = new Animal(this.canvas.width * 0.03, this.canvas.height * 0.65, 'owl', 4);
    this.monkey = new Animal(this.canvas.width * 0.75, this.canvas.height * 0.63, 'monkey', 4);
    this.endMessage = ['CONGRATULATIONS!', 'YOU ESCAPED THE FOREST!'];
  }

  public override getNextStage(): Stage | null {
    return null;
  }

  public override processInput(): void {

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
