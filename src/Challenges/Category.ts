import ChallengeElement from './ChallengeElement.js';

export default class Category {
  private name: string;

  private challengeElements: ChallengeElement[];

  public constructor(name: string, challengeElements: ChallengeElement[]) {
    this.name = name;
    this.challengeElements = challengeElements;
  }

  public getName(): string {
    return this.name;
  }

  public getChallengeElements(): ChallengeElement[] {
    return this.challengeElements;
  }
}
