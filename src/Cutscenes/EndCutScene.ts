import MainArea from '../Areas/MainArea.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import EndScreen from '../Screens/EndScreen.js';
import Stage from '../Stage.js';
import CutScene from './CutScene.js';

export default class EndCutScene extends CutScene {
  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.loadCutsceneImages('EndCutscenes', 5);
  }

  public override getNextStage(): Stage | null {
    if(!this.frames[0]){
      return new EndScreen(this.player);
    }
    return null;
  }

  public override processInput(): void {

  }

  public override update(elapsed: number): void {

  }
}
