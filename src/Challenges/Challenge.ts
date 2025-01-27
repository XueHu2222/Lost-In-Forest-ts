import Button from '../Button.js';
import CanvasRenderer from '../Base/CanvasRenderer.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../Base/MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Category from './Category.js';
import ChallengeElement from './ChallengeElement.js';
import Animal from '../Animal.js';

export default abstract class Challenge extends Stage {
  private readonly AMOUNT_OF_CATEGORIES: number;

  private readonly AMOUNT_OF_ELEMENTS_PER_CATEGORY: number;

  protected primaryTextColor: string;

  protected secondaryTextColor: string;

  protected textColor: string;

  protected activeTextColor: string | null;

  private backButton: Button;

  private hintButton: Button;

  private theoryButton: Button;

  private closeTheoryButton: Button;

  private difficultyButtons: Button[];

  private finishButton: Button;

  private theoryBackground: HTMLImageElement;

  private buttonImage: HTMLImageElement;

  private buttonSelectImage: HTMLImageElement;

  private categories: Category[];

  private completedCategories: Category[];

  private selectedElements: ChallengeElement[];

  private positions: { posX: number, posY: number, contains: ChallengeElement }[];

  protected nextDifficulty: string | null;

  protected difficultyLevel: string;

  protected challengeScience: string;

  protected exitChallenge: boolean;

  private isCompleted: boolean;

  protected clickedFinished: boolean;

  private hintIsOpen: boolean;

  private theoryIsOpen: boolean;

  protected animal: Animal;

  public constructor(difficultyLevel: string, player: Player) {
    super(player);
    this.AMOUNT_OF_CATEGORIES = 4;
    this.AMOUNT_OF_ELEMENTS_PER_CATEGORY = 4;
    this.difficultyLevel = difficultyLevel;

    this.categories = [];
    this.completedCategories = [];
    this.selectedElements = [];
    this.positions = [];

    this.clickedFinished = false;
    this.isCompleted = false;
    this.nextDifficulty = null;
    this.hintIsOpen = false;
    this.exitChallenge = false;
    this.theoryIsOpen = false;

    this.primaryTextColor = 'blue';
    this.secondaryTextColor = 'yellow';
    this.textColor = 'white';
    this.activeTextColor = null;

    this.buttonImage = new Image;
    this.buttonSelectImage = new Image;
    this.challengeScience = '';
    this.theoryBackground = CanvasRenderer.loadNewImage('./assets/theoryBackground.png');

    this.animal = new Animal(0, 0, 'monkey', 4);

    // Buttons
    this.backButton = new Button(0, 0, null, null, 0, 0);
    this.hintButton = new Button(0, 0, null, null, 0, 0);
    this.theoryButton = new Button(0, 0, null, null, 0, 0);
    this.difficultyButtons = [];
    this.finishButton = new Button(0, 0, null, null, 0, 0);
    const closeImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/closeButton.png');
    this.closeTheoryButton = new Button(LostInTheForest.canvas.width * 0.9,
      LostInTheForest.canvas.height * 0.075,
      closeImage, null, LostInTheForest.canvas.width * 0.03, LostInTheForest.canvas.width * 0.03);
  }

  protected abstract initiateData(): void;

  /**
   * This method initiates the buttons after the class properties have properly been set
   */
  private initiateButtons(): void {
    // Set the correct button properties
    this.backgroundImage = CanvasRenderer.loadNewImage(`./assets/Challenges/${this.challengeScience}/background.png`);
    if (!this.activeTextColor) {
      this.activeTextColor = this.textColor;
    }
    this.buttonImage = CanvasRenderer.loadNewImage(`./assets/Challenges/${this.challengeScience}/button.png`);
    this.buttonSelectImage = CanvasRenderer.loadNewImage(`./assets/Challenges/${this.challengeScience}/buttonSelect.png`);

    // Difficulty Buttons
    const easyButton: Button = new Button(LostInTheForest.canvas.width * 0.02,
      LostInTheForest.canvas.height * 0.25, this.buttonImage, this.buttonSelectImage, 220, 60);
    easyButton.setText('Easy');
    easyButton.setTextColor(this.textColor);

    const mediumButton: Button = new Button(LostInTheForest.canvas.width * 0.02,
      LostInTheForest.canvas.height * 0.35, this.buttonImage, this.buttonSelectImage, 220, 60);
    mediumButton.setText('Medium');
    mediumButton.setTextColor(this.textColor);

    const hardButton: Button = new Button(LostInTheForest.canvas.width * 0.02,
      LostInTheForest.canvas.height * 0.45, this.buttonImage, this.buttonSelectImage, 220, 60);
    hardButton.setText('Hard');
    hardButton.setTextColor(this.textColor);
    this.difficultyButtons = [easyButton, mediumButton, hardButton];

    // Set the correct difficulty button active
    switch (this.difficultyLevel) {
      case 'easy':
        easyButton.setTextColor(this.activeTextColor);
        easyButton.setSelected(true);
        break;
      case 'medium':
        mediumButton.setTextColor(this.activeTextColor);
        mediumButton.setSelected(true);
        break;
      case 'hard':
        hardButton.setTextColor(this.activeTextColor);
        hardButton.setSelected(true);
        break;
    }

    // Other Buttons
    this.backButton = new Button(LostInTheForest.canvas.width * 0.02,
      LostInTheForest.canvas.height * 0.15, this.buttonImage, null, 220, 60);
    this.backButton.setText('↩');
    this.backButton.setTextColor(this.textColor);

    this.hintButton = new Button(LostInTheForest.canvas.width * 0.2,
      LostInTheForest.canvas.height * 0.15, this.buttonImage, null, 220, 60);
    this.hintButton.setText('Hint');
    this.hintButton.setTextColor(this.primaryTextColor);

    const dialogueImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/dialogue2.png');
    this.theoryButton = new Button(LostInTheForest.canvas.width * 0.76,
      LostInTheForest.canvas.height * 0.56,
      dialogueImage, null, LostInTheForest.canvas.width * 0.15,
      LostInTheForest.canvas.height * 0.15);


    this.finishButton = new Button(LostInTheForest.canvas.width * 0.435,
      LostInTheForest.canvas.height * 0.80, this.buttonImage, null, 220, 60);
    this.finishButton.setText('Finish ✓');
    this.finishButton.setTextColor(this.textColor);
  }

  /**
   * Initiates the values of categories
   * @param categoryData An array of an array of the challengeElement names
   * @param categoryNames The names of each category
   */
  protected initiateCategoryElements(categoryData: string[][][], categoryNames: string[]): void {
    this.initiateButtons();
    categoryNames.forEach((categoryName: string, index: number) => {
      const challengeELements: ChallengeElement[] = [];
      if (!categoryData[index]) {
        return;
      }
      for (const elementTerm of categoryData[index] as string[][]) {
        const newChallengeElement: ChallengeElement =
          new ChallengeElement(elementTerm[0] as string, elementTerm[1] as string,
            this.buttonImage, this.buttonSelectImage);
        newChallengeElement.setTextSize(18);
        newChallengeElement.setTextColor(this.textColor);
        challengeELements.push(newChallengeElement);
      }
      this.categories.push(new Category(categoryName, challengeELements));
    });
    this.initiateElementPositions();
  }

  /**
   * Give every challenge element a random position
   */
  private initiateElementPositions(): void {
    const challengeElements: ChallengeElement[] = this.getAllChallengeElements();

    /**
     * Randomize to put the elements in a random order
     * Math.random is used because it is either between 0 to 1.
     * Now the result will end up being -0.5 or 0.5
    */
    challengeElements.sort(() => Math.random() - 0.5);

    let yPos: number = LostInTheForest.canvas.height * 0.28;
    // Each row of the elements
    for (let i: number = 0; i < this.AMOUNT_OF_CATEGORIES; i++) {
      let xPos: number = LostInTheForest.canvas.width * 0.2;
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
        xPos += LostInTheForest.canvas.width * 0.15;
      }
      yPos += LostInTheForest.canvas.height * 0.125;
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
          element.setTextColor(this.textColor);
          // selectedElements = selectedElements, but with the deselected element removed
          this.selectedElements = this.selectedElements.
            filter((challengeElement: ChallengeElement) => challengeElement != element);
        } else {
          // Select
          element.setSelected(true);
          element.setTextColor(this.activeTextColor || '');
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
        position.contains.setTextColor('pink');
      }
      currentElementIndex += 1;
      if (this.completedCategories.length === this.AMOUNT_OF_CATEGORIES) {
        this.isCompleted = true;
      }
    }
  }

  /**
   * Deselect all selected elements
   */
  private deselectAllElements(): void {
    for (const element of this.selectedElements) {
      element.setSelected(false);
      element.setTextColor(this.textColor);
    }
    this.selectedElements = [];
    this.selectCompletedElements();
  }

  /**
   * Sets the color of the completed elements
   */
  private selectCompletedElements(): void {
    for (const category of this.completedCategories) {
      for (const element of category.getChallengeElements()) {
        element.setTextColor(this.secondaryTextColor);
      }
    }
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

  /**
* Check if the player is exiting the challenge
* @returns True when exiting the challenge
*/
  protected leavingChallenge(): boolean {
    if (this.clickedFinished || this.exitChallenge) {
      this.clickedFinished = false;
      this.exitChallenge = false;
      return true;
    }
    return false;
  }

  /**
   * Process all the button clicks
   */
  public processInput(): void {
    if (LostInTheForest.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.checkElementsClicked();
      if (this.finishButton.isCollidingWithMouse() && this.isCompleted) {
        this.clickedFinished = true;
      }
      for (const button of this.difficultyButtons) {
        if (button.isCollidingWithMouse()) {
          this.nextDifficulty = button.getText().toLowerCase();
        }
      }
      if (this.hintButton.isCollidingWithMouse()) {
        this.hintIsOpen = !this.hintIsOpen;
      }
      if (this.backButton.isCollidingWithMouse()) {
        this.exitChallenge = true;
      }
      if (this.theoryButton.isCollidingWithMouse()) {
        this.theoryIsOpen = true;
      }
      if (this.closeTheoryButton.isCollidingWithMouse()) {
        this.theoryIsOpen = false;
      }
    }
  }

  /**
   * update animal and initaites the data
   @param elapsed time
   */
  public override update(elapsed: number): void {
    this.animal.update(elapsed);
    if (this.categories.length === 0) {
      this.initiateData();
    }
  }

  /**
  * render the content for theory
  */
  private renderTheory(): void {
    CanvasRenderer.drawImage(LostInTheForest.canvas, this.theoryBackground,
      LostInTheForest.canvas.width * 0.05,
      LostInTheForest.canvas.height * 0.05,
      LostInTheForest.canvas.width * 0.9, LostInTheForest.canvas.height * 0.9
    );

    const title: string = `${this.challengeScience} Theory (${this.difficultyLevel})`;
    CanvasRenderer.writeText(LostInTheForest.canvas, title, LostInTheForest.canvas.width * 0.075, LostInTheForest.canvas.height * 0.125, 'start', 'Comic Sans MS', 32, 'black', 'bold');

    // Render text
    let categoryXPos: number = LostInTheForest.canvas.width * 0.075;
    let categoryYPos: number = LostInTheForest.canvas.height * 0.2;
    this.categories.forEach((category: Category, index: number) => {
      if (index % 2 != 0) {
        categoryYPos = LostInTheForest.canvas.height * 0.2;
      } else {
        categoryYPos = LostInTheForest.canvas.height * 0.6;
      }
      if (index == 0 || index == 1) {
        categoryXPos = LostInTheForest.canvas.width * 0.075;
      } else {
        categoryXPos = LostInTheForest.canvas.width * 0.5;
      }
      // Category text
      CanvasRenderer.writeText(LostInTheForest.canvas, category.getName(), categoryXPos, categoryYPos, 'start', 'Comic Sans MS', 20, 'black', 'bold');

      const elementXPos: number = categoryXPos;
      let elementYPos: number = categoryYPos + LostInTheForest.canvas.height * 0.03;
      // Element text
      for (const element of category.getChallengeElements()) {
        let theoryString: string = element.getTheory();
        let theoryYPos: number = elementYPos;

        // Write the element text label
        CanvasRenderer.writeText(
          LostInTheForest.canvas,
          element.getText() + ':',
          elementXPos,
          elementYPos,
          'start',
          'Comic Sans MS',
          16,
          'black',
          'bold'
        );

        // Adjust position for theory text starting point
        theoryYPos += 20;

        // Break the theoryString into lines of 75 characters
        while (theoryString.length > 0) {
          // Extract up to 75 characters from the start of the string
          const line: string = theoryString.slice(0, 75);

          // Write the current line
          CanvasRenderer.writeText(
            LostInTheForest.canvas,
            line,
            elementXPos,
            theoryYPos,
            'start',
            'Comic Sans MS',
            16,
            'black'
          );

          // Remove the written part from the string
          theoryString = theoryString.slice(75);

          // Increment Y position for the next line
          theoryYPos += 20;
        }
        elementYPos += LostInTheForest.canvas.height * 0.08;
      }
    });
    this.closeTheoryButton.render();
  }

  /**
   * Render all the buttons and text
   */
  public override render(): void {
    super.render();
    CanvasRenderer.writeText(LostInTheForest.canvas, LostInTheForest.locale.t('Maak 4 groepen van 4 die bij elkaar passen'), LostInTheForest.canvas.width * 0.5, LostInTheForest.canvas.height * 0.07, 'center', 'Comic Sans MS', 50, 'white');
    this.backButton.render();
    this.theoryButton.render();
    this.hintButton.render();
    this.animal.render();
    CanvasRenderer.writeText(LostInTheForest.canvas, LostInTheForest.locale.t('Klik als je het niet snapt!'), LostInTheForest.canvas.width * 0.83, LostInTheForest.canvas.height * 0.64, 'center', 'Comic Sans MS', 20, 'black');

    const hintCategoryText: string = this.categories.reduce((acc: string, cur: Category) => acc += cur.getName() + ' - ', ' - ');
    if (this.hintIsOpen) {
      this.hintButton.setTextColor('black');
      CanvasRenderer.writeText(
        LostInTheForest.canvas,
        'Categories: ' + hintCategoryText,
        LostInTheForest.canvas.width * 0.35,
        LostInTheForest.canvas.height * 0.2,
        'left',
        'Comic Sans MS',
        20,
        'black'
      );
    } else {
      this.hintButton.setTextColor(this.primaryTextColor);
    }

    if (this.isCompleted) {
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
        LostInTheForest.canvas,
        category.getName() + '!',
        firstElement.getPosX() + 450,
        firstElement.getPosY() - 15,
        'center',
        'Comic Sans MS',
        20,
        this.secondaryTextColor
      );
    }

    if (this.theoryIsOpen) {
      this.renderTheory();
    }
  }

  public setNextDifficulty(value: string | null): void {
    this.nextDifficulty = value;
  }
}

