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
    this.backButton = new Button('Back', 20, 20, null, 100, 100);
    this.hintIndex = 0;
    this.hintButton = new Button('Hint', 120, 20, null, 100, 100);
    this.theoryButton = new Button('Theory', 220, 20, null, 100, 100);
    this.theoryIsOpen = false;
    this.difficultyButtons = [new Button('Easy', 20, 50, null, 100, 100), new Button('Medium', 120, 50, null, 100, 100), new Button('Hard', 220, 50, null, 100, 100)];
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
