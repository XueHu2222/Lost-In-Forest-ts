import MouseListener from '../MouseListener.js';
import Stage from '../Stage.js';
import CutScene from './CutScene.js';

export default class BeginCutScene extends CutScene {
  public override getNextStage(): Stage | null {
    return null;
  }

  public override processInput(mouseListener: MouseListener): void {

  }

  public override update(elapsed: number): void {

  }

  public override render(canvas: HTMLCanvasElement): void {

  }
}
