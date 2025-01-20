import Game from './Game.js';

import MouseListener from './MouseListener.js';
import Stage from './Stage.js';
import StartScreen from './Screens/StartScreen.js';
import Player from './Player.js';
import CanvasRenderer from './CanvasRenderer.js';
import HistoryChallenge from './Challenges/HistoryChallenge.js';
import BiologyChallenge from './Challenges/BiologyChallenge.js';
import GeographyChallenge from './Challenges/GeographyChallenge.js';
import SpringArea from './Areas/SpringArea.js';
import PhysicsChallenge from './Challenges/PhysicsChallenge.js';

export default class LostInTheForest extends Game {
  public static canvas: HTMLCanvasElement;

  public static mouseListener: MouseListener;

  private player: Player;

  public static currentStage: Stage;

  private isDutch: boolean;

  public static keyHistory: boolean;

  public static keyBiology: boolean;

  public static keyGeography: boolean;

  public static keyPhysics: boolean;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    LostInTheForest.canvas = canvas;
    LostInTheForest.canvas.height = window.innerHeight;
    LostInTheForest.canvas.width = window.innerWidth;
    LostInTheForest.mouseListener = new MouseListener(canvas);
    this.player = new Player;
    this.isDutch = true;
    LostInTheForest.currentStage = new StartScreen(this.setIsDutch.bind(this), this.player);
    LostInTheForest.keyBiology = false;
    LostInTheForest.keyGeography = false;
    LostInTheForest.keyPhysics = false;
    LostInTheForest.keyHistory = false;
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    LostInTheForest.currentStage.processInput();
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
    LostInTheForest.canvas.style.cursor = 'default';
    LostInTheForest.currentStage.render();
  }

  public setIsDutch(value: boolean): void{
    this.isDutch = value;
  }
}
