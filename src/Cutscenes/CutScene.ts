import Player from '../Player.js';
import EndScreen from '../Screens/EndScreen.js';
import Stage from '../Stage.js';

export default abstract class CutScene extends Stage {
  protected frames: HTMLImageElement[];

  protected timeToNextFrame: number;

  protected nextStage: Stage;

  public constructor(player: Player, isDutch: boolean){
    super(player, isDutch);
    // TODO: Set correct values
    this.frames = [];
    this.timeToNextFrame = 1;
    this.nextStage = new EndScreen(player, isDutch);
  }
}
