import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Category from './Category.js';
import ChallengeElement from './ChallengeElement.js';

export default abstract class Challenge extends Stage {
  protected difficultyLevel: string;

  private backButton: Button;

  private hintIndex: number;

  private hintButton: Button;

  private theoryButton: Button;

  private theoryIsOpen: boolean;

  private difficultyButtons: Button[];

  private categories: Category[];

  private completedCategories: Category[];

  private selectedElements: ChallengeElement[];

  private positions: { posX: number, posY: number, contains: ChallengeElement }[];

  private finishButton: Button;

  protected isFinished: boolean;

  private readonly AMOUNT_OF_CATEGORIES: number = 4;

  private readonly AMOUNT_OF_ELEMENTS_PER_CATEGORY: number = 4;

  public constructor(difficultyLevel: string, player: Player, isDutch: boolean) {
    super(player, isDutch);
    const backgroundImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/selected.png');

    this.difficultyLevel = difficultyLevel;
    // TODO: Set correct values for the buttons
    this.backButton = new Button(20, 50, null, 100, 100);
    this.backButton.setText('Back');

    this.hintIndex = 0;
    this.hintButton = new Button(620, 650, backgroundImage, 220, 60);
    this.hintButton.setText('Finish');
    this.hintButton.setTextColor('yellow');

    this.theoryButton = new Button(220, 50, null, 100, 100);
    this.theoryButton.setText('Theory');
    this.theoryIsOpen = false;

    const easyButton: Button = new Button(20, 100, null, 100, 100);
    easyButton.setText('Easy');
    const mediumButton: Button = new Button(120, 100, null, 100, 100);
    mediumButton.setText('Medium');
    const hardButton: Button = new Button(220, 100, null, 100, 100);
    hardButton.setText('Hard');
    this.difficultyButtons = [easyButton, mediumButton, hardButton];

    this.categories = [];
    this.completedCategories = [];
    this.selectedElements = [];
    this.positions = [];

    this.finishButton = new Button(620, 650, backgroundImage, 220, 60);
    this.finishButton.setText('Finish');
    this.finishButton.setTextColor('yellow');

    this.isFinished = false;
  }

  /**
   * Initiates the values of categories
   * @param categoryData An array of an array of the challengeElement names
   * @param categoryNames The names of each category
   */
  protected initiateCategoryElements(categoryData: string[][], categoryNames: string[]): void {
    categoryNames.forEach((categoryName: string, index: number) => {
      const challengeELements: ChallengeElement[] = [];
      for (const challengeElementText of categoryData[index] as string[]) {
        const newChallengeElement: ChallengeElement = new ChallengeElement(challengeElementText);
        newChallengeElement.setTextSize(13);
        challengeELements.push(newChallengeElement);
      }
      this.categories.push(new Category(categoryName, challengeELements));
    });
    this.initiateElementPositions();
  }

  /**
   * Give every challenge element a random position
   */
  protected initiateElementPositions(): void {
    const challengeElements: ChallengeElement[] = this.getAllChallengeElements();

    /**
     * Randomize to put the elements in a random order
     * Math.random is used because it is either between 0 to 1.
     * Now the result will end up being -0.5 or 0.5
    */
    challengeElements.sort(() => Math.random() - 0.5);

    let yPos: number = 200;
    // Each row of the elements
    for (let i: number = 0; i < this.AMOUNT_OF_CATEGORIES; i++) {
      let xPos: number = 300;
      // Each column of an element row
      for (let j: number = 0; j < this.AMOUNT_OF_ELEMENTS_PER_CATEGORY; j++) {
        // Give the first element of the array a position
        challengeElements[0]?.setPosX(xPos);
        challengeElements[0]?.setPosY(yPos);
        this.positions.push({
          posX: xPos, posY: yPos,
          contains: challengeElements[0] as ChallengeElement
        });
        // Remove this element from the array
        challengeElements.shift();
        xPos += 220;
      }
      yPos += 120;
    }
  }

  /**
   * Selects or deselects the clicked element
   * @returns When clicked on a completed element
   */
  private checkElementsClicked(): void {
    for (const element of this.getAllChallengeElements()) {
      if (element.isCollidingWithMouse()) {
        // Cannot select an element form a completed category
        if (this.checkIfElementCategoryIsCompleted(element)) {
          return;
        }

        if (element.getIsSelected()) {
          // Deselect
          element.setSelected(false);
          // selectedElements = selectedElements, but with the deselected element removed
          this.selectedElements = this.selectedElements.
            filter((challengeElement: ChallengeElement) => challengeElement != element);
        } else {
          // Select
          element.setSelected(true);
          this.selectedElements.push(element);
        }

        if (this.selectedElements.length === this.AMOUNT_OF_ELEMENTS_PER_CATEGORY) {
          this.checkIfSelectedIsCorrect();
        }
      }
    }
  }

  /**
   * Check if all the selected elements belong to a category
   */
  private checkIfSelectedIsCorrect(): void {
    // Check if selected elements belong to a category
    for (const category of this.categories) {
      let catagoryIsCompleted: boolean = true;
      // Check if each selected element is part of this category
      for (const element of this.selectedElements) {
        if (!category.getChallengeElements().includes(element)) {
          catagoryIsCompleted = false;
        }
      }
      if (catagoryIsCompleted) {
        this.completeCategory(category);
      }
    }

    // Complete the last category when you have done the third
    if (this.completedCategories.length === 3) {
      for (const category of this.categories) {
        // Complete the category that has not been completed yet
        if (!this.completedCategories.includes(category)) {
          this.completeCategory(category);
        }
      }
    }
    this.deselectAllElements();
  }

  /**
   * Put the completed categoryElements in its own row
   * @param category Completed category
   */
  private completeCategory(category: Category): void {
    this.completedCategories.push(category);

    const rowNumber: number = this.completedCategories.length - 1;
    const startingIndex: number = rowNumber * this.AMOUNT_OF_ELEMENTS_PER_CATEGORY;
    const endIndex: number = startingIndex + this.AMOUNT_OF_ELEMENTS_PER_CATEGORY;

    let currentElementIndex: number = 0;
    for (let i: number = startingIndex; i < endIndex; i++) {
      const position: { posX: number, posY: number, contains: ChallengeElement }
        | undefined = this.positions[i];
      if (position) {
        const tempContains: ChallengeElement = position.contains;
        // Remove from previous position
        for (const pos of this.positions) {
          if (pos.contains === category.getChallengeElements()[currentElementIndex]) {
            pos.contains = tempContains;
            pos.contains.setPosX(pos.posX);
            pos.contains.setPosY(pos.posY);
          }
        }

        // Give first row position a new element
        position.contains =
          category.getChallengeElements()[currentElementIndex] as ChallengeElement;
        position.contains.setPosX(position.posX);
        position.contains.setPosY(position.posY);
        position.contains.setTextColor('yellow');
      }
      currentElementIndex += 1;
    }
  }

  /**
   * Deselect all selected elements
   */
  private deselectAllElements(): void {
    for (const element of this.selectedElements) {
      element.setSelected(false);
    }
    this.selectedElements = [];
  }

  /**
   * Get all challengeElements from all the catagories
   * @returns All challenge elements
   */
  private getAllChallengeElements(): ChallengeElement[] {
    const challengeElements: ChallengeElement[] = [];

    // Find all challengeElements via all the categories
    for (const category of this.categories) {
      for (const challengeElement of category.getChallengeElements()) {
        challengeElements.push(challengeElement);
      }
    }
    // Randomize the array
    return challengeElements;
  }

  /**
   * Check if element belongs to a completed category
   * @param element Element to check
   * @returns true if element is from a completed category
   */
  private checkIfElementCategoryIsCompleted(element: ChallengeElement): boolean {
    for (const category of this.completedCategories) {
      for (const completedElement of category.getChallengeElements()) {
        if (completedElement === element) {
          return true;
        }
      }
    }
    return false;
  }

  private renderTheory(canvas: HTMLCanvasElement): void {

  }

  private renderHint(canvas: HTMLCanvasElement): void {

  }

  /**
   * Process all the button clicks
   */
  public processInput(): void {
    if (LostInTheForest.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.checkElementsClicked();
      if (this.finishButton.isCollidingWithMouse()) {
        this.isFinished = true;
      }
    }
  }

  /**
   * Render all the buttons and text
   */
  public render(): void {
    this.renderBackground();
    this.backButton.render();
    this.hintButton.render();
    this.theoryButton.render();

    if (this.completedCategories.length === this.AMOUNT_OF_CATEGORIES) {
      this.finishButton.render();
    }

    for (const button of this.difficultyButtons) {
      button.render();
    }

    for (const element of this.getAllChallengeElements()) {
      element.render();
    }

    // Render category names when completed
    for (const category of this.completedCategories) {
      const firstElement: ChallengeElement = category.getChallengeElements()[0] as ChallengeElement;
      CanvasRenderer.writeText(
        this.canvas,
        category.getName() + '!',
        firstElement.getPosX() + 450,
        firstElement.getPosY() - 15,
        'center',
        'arial',
        20,
        'yellow'
      );
    }
  }
}
