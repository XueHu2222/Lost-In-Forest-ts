import MouseListener from '../MouseListener.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';

export default class HistoryChallenge extends Challenge {
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
