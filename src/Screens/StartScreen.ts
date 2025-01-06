import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';

export default class StartScreen extends Stage{
  private setIsDutch: (value: boolean) => void;

  private genderButtons: Button[];

  private languageButtons: Button[];

  private startButton: Button;

  public constructor(setIsDutch: (value: boolean) => void, player: Player){
    super(player, false);

    this.setIsDutch = setIsDutch;

    // TODO: Set the correct button positions
    const boy: Button = new Button(null, 0, 0);
    const girl: Button = new Button(null, 0, 0);
    const nonBinary: Button = new Button(null, 0, 0);
    this.genderButtons = [boy, girl, nonBinary];

    const dutch: Button = new Button(null, 0, 0);
    const english: Button = new Button(null, 0, 0);
    this.languageButtons = [dutch, english];

    this.startButton = new Button('Start', 0, 0);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/start.png');
  }

  public override getNextStage(): Stage | null {
    return null;
  }

  public override processInput(mouseListener: MouseListener): void {

  }

  public override update(elapsed: number): void {

  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.backgroundImage, 0, 0, canvas.width, canvas.height);
  }
}
