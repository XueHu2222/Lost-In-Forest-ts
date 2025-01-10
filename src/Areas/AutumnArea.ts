import MouseListener from '../MouseListener.js';
import Stage from '../Stage.js';
import Area from './Area.js';

export default class AutumnArea extends Area {
  public override getNextStage(): Stage | null {
    return null;
  }

  public override processInput(mouseListener: MouseListener): void {

  }

  public override update(elapsed: number): void {

  }

  public override render(): void {

  }
}
