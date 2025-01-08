import Game from './Game.js';

import MouseListener from './MouseListener.js';
import Stage from './Stage.js';
import StartScreen from './Screens/StartScreen.js';
import Player from './Player.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class LostInTheForest extends Game {
  private canvas: HTMLCanvasElement;

  private mouseListener: MouseListener;

  private player: Player;

  private currentStage: Stage;

  private isDutch: boolean;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.mouseListener = new MouseListener(canvas);
    this.player = new Player;
    this.currentStage = new StartScreen(this.setIsDutch.bind(this), this.player, canvas);
    this.isDutch = true;

  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    this.currentStage.processInput(this.mouseListener);
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time in ms elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    this.currentStage = this.currentStage.getNextStage() || this.currentStage;
    this.currentStage.update(elapsed);
    return true;
  }

  /**
   * Render all the elements in the screen.
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    this.currentStage.render(this.canvas);
  }

  public setIsDutch(value: boolean): void{
    this.isDutch = value;
  }
}
