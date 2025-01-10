import MainArea from '../Areas/MainArea.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import CutScene from './CutScene.js';

export default class BeginCutScene extends CutScene {
  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.loadCutsceneImages('BeginCutscenes', 7);
  }

  public override getNextStage(): Stage | null {
    if(!this.frames[0]){
      return new MainArea(this.player, this.isDutch);
    }
    return null;
  }

  public override processInput(mouseListener: MouseListener): void {

  }

  public override update(elapsed: number): void {

  }
}
