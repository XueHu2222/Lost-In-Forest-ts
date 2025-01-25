import Game from './Base/Game.js';
import MouseListener from './Base/MouseListener.js';
import Stage from './Stage.js';
import StartScreen from './Screens/StartScreen.js';
import Player from './Player.js';
import CanvasRenderer from './Base/CanvasRenderer.js';
import Locale from './Base/Locale.js';

export default class LostInTheForest extends Game {
  public static canvas: HTMLCanvasElement;

  public static mouseListener: MouseListener;

  private player: Player;

  public static currentStage: Stage;

  public static keyHistory: boolean;

  public static keyBiology: boolean;

  public static keyGeography: boolean;

  public static keyPhysics: boolean;

  public static locale: Locale;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    LostInTheForest.canvas = canvas;
    LostInTheForest.canvas.height = window.innerHeight;
    LostInTheForest.canvas.width = window.innerWidth;
    LostInTheForest.mouseListener = new MouseListener(canvas);
    this.player = new Player;
    LostInTheForest.currentStage = new StartScreen(this.player);
    LostInTheForest.keyBiology = false;
    LostInTheForest.keyGeography = false;
    LostInTheForest.keyPhysics = false;
    LostInTheForest.keyHistory = false;
    LostInTheForest.locale = new Locale('nl');
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public override processInput(): void {
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
}
