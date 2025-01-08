import Button from '../Button.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Category from './Category.js';
import ChallengeElement from './ChallengeElement.js';

export default abstract class Challenge extends Stage {
  protected difficultyLevel: string;

  protected backButton: Button;

  protected hintIndex: number;

  protected hintButton: Button;

  protected theoryButton: Button;

  protected theoryIsOpen: boolean;

  protected difficultyButtons: Button[];

  protected categories: Category[];

  protected completedCategories: Category[];

  protected selectedCategories: ChallengeElement[];

  protected positions: { posX: number, posY: number, contains: ChallengeElement }[];

  public constructor(difficultyLevel: string, player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.difficultyLevel = difficultyLevel;
    this.backButton = new Button('Back', 20, 20);
    this.hintIndex = 0;
    this.hintButton = new Button('Hint', 120, 20);
    this.theoryButton = new Button('Theory', 220, 20);
    this.theoryIsOpen = false;
    this.difficultyButtons = [new Button('Easy', 20, 50), new Button('Medium', 120, 50), new Button('Hard', 220, 50)];
    this.categories = [];
    this.completedCategories = [];
    this.selectedCategories = [];
    this.positions = [];
  }

  /**
   * Initiates the values of categories
   * @param categoryData An array of an array of the challengeElement names
   * @param categoryNames The names of each category
   * @returns
   */
  protected initiateCategories(categoryData: string[][], categoryNames: string[]): void {
    if (categoryData.length != categoryNames.length) {
      console.error('categoryData or categoryNames is not properly initialized');
      return;
    }

    categoryNames.forEach((categoryName: string, index: number) => {
      const challengeELements: ChallengeElement[] = [];
      if (categoryData[index]) {
        for (const challengeElementText of categoryData[index]) {
          challengeELements.push(new ChallengeElement(challengeElementText));
        }
      }
      this.categories.push(new Category(categoryName, challengeELements));
    });
  }

  protected initiatePositions(): void {
    // Create a randomized array of challengeElements
    const randomizedChallengeElements: ChallengeElement[] = [];
    for (const category of this.categories) {
      for (const challengeElement of category.getChallengeElements()) {
        randomizedChallengeElements.push(challengeElement);
      }
    }
    randomizedChallengeElements.sort(() => Math.random() - 0.5);

    // Assign each challengeElement a position
    let yPos: number = 300;
    for (let i: number = 0; i < this.categories.length; i++) {
      let xPos: number = 500;
      for (let j: number = 0; j < (this.categories[i]?.getChallengeElements().length ?? 0); j++) {
        if (randomizedChallengeElements[0]) {
          randomizedChallengeElements[0]?.setPosX(xPos);
          randomizedChallengeElements[0]?.setPosY(yPos);
          this.positions.push({
            posX: xPos, posY: yPos,
            contains: randomizedChallengeElements[0]
          });
          randomizedChallengeElements.shift();
        }
        xPos += 300;
      }
      yPos += 200;
    }
  }

  protected completeCategory(): void {

  }

  protected deselectAllElements(): void {

  }

  protected renderTheory(canvas: HTMLCanvasElement): void {

  }

  protected renderHint(canvas: HTMLCanvasElement): void {

  }

  public render(canvas: HTMLCanvasElement): void {
    this.backButton.render(canvas);
    this.hintButton.render(canvas);
    this.theoryButton.render(canvas);
    for (const button of this.difficultyButtons) {
      button.render(canvas);
    }
    for (const category of this.categories) {
      for (const challengeElement of category.getChallengeElements()) {
        challengeElement.render(canvas);
      }
    }
  }
}
