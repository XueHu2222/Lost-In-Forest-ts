import Game from './Game.js';

import MouseListener from './MouseListener.js';
import Stage from './Stage.js';
import StartScreen from './Screens/StartScreen.js';
import Player from './Player.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class LostInTheForest extends Game {
  public static canvas: HTMLCanvasElement;

  private mouseListener: MouseListener;

  private player: Player;

  public static currentStage: Stage;

  private isDutch: boolean;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    LostInTheForest.canvas = canvas;
    LostInTheForest.canvas.height = window.innerHeight;
    LostInTheForest.canvas.width = window.innerWidth;
    this.mouseListener = new MouseListener(canvas);
    this.player = new Player;
    LostInTheForest.currentStage = new StartScreen(this.setIsDutch.bind(this), this.player);
    this.isDutch = true;
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    LostInTheForest.currentStage.processInput(this.mouseListener);
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time in ms elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    LostInTheForest.currentStage = LostInTheForest.currentStage.getNextStage()
     || LostInTheForest.currentStage;
    LostInTheForest.currentStage.update(elapsed);
    return true;
  }

  /**
   * Render all the elements in the screen.
   */
  public render(): void {
    CanvasRenderer.clearCanvas(LostInTheForest.canvas);
    LostInTheForest.currentStage.render();
  }

  public setIsDutch(value: boolean): void{
    this.isDutch = value;
  }
}
