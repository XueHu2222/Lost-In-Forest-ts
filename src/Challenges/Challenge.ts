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
    // TODO: Set correct values for the buttons
    this.backButton = new Button(20, 20, null, 100, 100);
    this.backButton.setText('Back');
    this.hintIndex = 0;
    this.hintButton = new Button(120, 20, null, 100, 100);
    this.hintButton.setText('Hint');
    this.theoryButton = new Button(220, 20, null, 100, 100);
    this.theoryButton.setText('Theory');
    this.theoryIsOpen = false;
    const easyButton: Button = new Button(20, 50, null, 100, 100);
    easyButton.setText('Easy');
    const mediumButton: Button = new Button(20, 50, null, 100, 100);
    mediumButton.setText('Medium');
    const hardButton: Button = new Button(20, 50, null, 100, 100);
    hardButton.setText('Hard');
    this.difficultyButtons = [easyButton, mediumButton, hardButton];
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

  }

  protected initiatePositions(): void{

  }

  protected completeCategory(): void{

  }

  protected deselectAllElements(): void{

  }

  protected renderTheory(canvas: HTMLCanvasElement): void {

  }

  protected renderHint(canvas: HTMLCanvasElement): void {

  }

  public render(canvas: HTMLCanvasElement): void {

  }
}
