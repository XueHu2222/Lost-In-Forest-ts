import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
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

  protected selectedElements: ChallengeElement[];

  protected positions: { posX: number, posY: number, contains: ChallengeElement }[];

  protected finishButton: Button;

  protected isFinished: boolean;

  public constructor(difficultyLevel: string, player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.difficultyLevel = difficultyLevel;
    // TODO: Set correct values for the buttons
    this.backButton = new Button(20, 50, null, 100, 100);
    this.backButton.setText('Back');

    this.hintIndex = 0;
    this.hintButton = new Button(120, 50, null, 100, 100);
    this.hintButton.setText('Hint');

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

    const backgroundImage: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/selected.png');
    this.finishButton = new Button(620, 650, backgroundImage, 220, 60);
    this.finishButton.setText('Finish');
    this.finishButton.setTextColor('yellow');

    this.isFinished = false;
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
          const newChallengeElement: ChallengeElement = new ChallengeElement(challengeElementText);
          newChallengeElement.setTextSize(13);
          challengeELements.push(newChallengeElement);
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
    let yPos: number = 200;
    for (let i: number = 0; i < this.categories.length; i++) {
      let xPos: number = 300;
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
        xPos += 220;
      }
      yPos += 120;
    }
  }

  protected checkElementsClicked(mouseListener: MouseListener): void {
    for (const position of this.positions) {
      if (position.contains.isCollidingWithMouse(mouseListener)) {
        // Check if element is part of completed category
        for (const category of this.completedCategories) {
          for (const element of category.getChallengeElements()) {
            if (element === position.contains) {
              return;
            }
          }
        }
        // Deselect
        if (position.contains.getIsSelected()) {
          position.contains.setSelected(false);
          // selectedElements = selectedElements, but with the deselected element removed
          this.selectedElements = this.selectedElements.
            filter((value: ChallengeElement) => value != position.contains);
        } else {
          position.contains.setSelected(true);
          this.selectedElements.push(position.contains);
        }

        if (this.selectedElements.length == 4) {
          this.checkIfSelectedIsCorrect();
        }
      }
    }
    if (this.finishButton.isCollidingWithMouse(mouseListener)) {
      this.isFinished = true;
    }
  }

  private checkIfSelectedIsCorrect(): void {
    for (const category of this.categories) {
      // Create a list for the category elements text and selected elements text
      const categoriesList: string[] = [];
      category.getChallengeElements().
        forEach((element: ChallengeElement) => {
          categoriesList.push(element.getText());
        });

      const selectedList: string[] = [];
      this.selectedElements.
        forEach((element: ChallengeElement) => {
          selectedList.push(element.getText());
        });
      // Sort those lists and join them into a string to compare if they are the same
      if (categoriesList.sort().join() == selectedList.sort().join()) {
        this.completedCategories.push(category);
        this.completeCategory();
      }
    }
    if (this.completedCategories.length === 3) {
      for (const category of this.categories) {
        if (!this.completedCategories.includes(category)) {
          this.completedCategories.push(category);
          this.completeCategory();
        }
      }
    }
    this.deselectAllElements();
  }

  // TODO: Refactor without the for each, but with category as argument
  private completeCategory(): void {
    this.completedCategories.forEach((category: Category, index: number) => {
      let currentElementIndex: number = 0;
      for (let i: number = index * 4; i < (index + 1) * 4; i++) {
        const position: { posX: number, posY: number, contains: ChallengeElement }
          | undefined = this.positions[i];
        if (position) {
          const tempContains: ChallengeElement = position.contains;
          // Remove from previous position
          for (const pos of this.positions) {
            if (pos.contains == category.getChallengeElements()[currentElementIndex]) {
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
    });
  }

  private deselectAllElements(): void {
    for (const element of this.selectedElements) {
      element.setSelected(false);
    }
    this.selectedElements = [];
  }

  private renderTheory(canvas: HTMLCanvasElement): void {

  }

  private renderHint(canvas: HTMLCanvasElement): void {

  }

  public render(): void {
    this.renderBackground();
    this.backButton.render();
    this.hintButton.render();
    this.theoryButton.render();
    if (this.completedCategories.length >= 3) {
      this.finishButton.render();
    }
    for (const button of this.difficultyButtons) {
      button.render();
    }
    for (const category of this.categories) {
      for (const challengeElement of category.getChallengeElements()) {
        challengeElement.render();
      }
    }
    // Render category names when completed
    for (const category of this.completedCategories) {
      const challengeElements: ChallengeElement[] = category.getChallengeElements();
      if (challengeElements && challengeElements.length > 0) {
        const firstElement: ChallengeElement | undefined = challengeElements[0];
        if (firstElement) {
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
  }
}
