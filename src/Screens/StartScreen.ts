import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import BeginCutScene from '../Cutscenes/BeginCutScene.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';

export default class StartScreen extends Stage{
  private setIsDutch: (value: boolean) => void;

  private genderButtons: Button[];

  private languageButtons: Button[];

  private startButton: Button;

  private started: boolean = false;

  private canvas: HTMLCanvasElement;

  public constructor(setIsDutch: (value: boolean) => void,
    player: Player, canvas: HTMLCanvasElement){
    super(player, false);

    this.canvas = canvas;

    this.setIsDutch = setIsDutch;

    // TODO: Set the correct button positions
    const boy: Button = new Button(null, 0, 0, null, 100, 100);
    const girl: Button = new Button(null, 0, 0, null, 100, 100);
    const nonBinary: Button = new Button(null, 0, 0, null, 100, 100);
    this.genderButtons = [boy, girl, nonBinary];

    const dutch: Button = new Button(null, 0, 0, null, 100, 100);
    const english: Button = new Button(null, 0, 0, null, 100, 100);
    this.languageButtons = [dutch, english];

    const startImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/start-buttonstart.png');
    this.startButton = new Button(null, canvas.width *0.35, canvas.height * 0.8, startImageButton,
      canvas.width * 0.3, canvas.height * 0.2);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/start.png');
  }

  public override getNextStage(): Stage | null {
    if (this.started){
      return new BeginCutScene(this.player, this.isDutch);
    }
    return null;
  }

  /**
   * To check if the mouse is used
   * @param mouseListener gives the mouse as an object
   */
  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)){
      if(this.startButton.isCollidingWithMouse(mouseListener)){
        this.started = true;
      }
    }
  }

  /**
   * 
   * @param elapsed 
   */
  public override update(elapsed: number): void {

  }

  /**
   * what to render to render
   * @param canvas where it renders
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.backgroundImage, 0, 0, canvas.width, canvas.height);
    this.startButton.render(canvas);
  }
}
