import MainArea from '../Areas/MainArea.js';
import Button from '../Button.js';
import CanvasRenderer from '../Base/CanvasRenderer.js';
import CutScene from '../CutScene.js';
import LostInTheForest from '../LostInTheForest.js';
import MouseListener from '../Base/MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Locale from '../Base/Locale.js';

export default class StartScreen extends Stage {
  private genderButtons: Button[];

  private languageButtons: Button[];

  private startButton: Button;

  private clickedStart: boolean;

  private selectedImage: HTMLImageElement;

  private selectedGender: Button;

  private selectedFlag: Button;

  public constructor(player: Player) {
    super(player);

    //to give everything a standard value
    this.selectedImage = CanvasRenderer.loadNewImage('./assets/selected.png');

    this.selectedGender = new Button(LostInTheForest.canvas.width * 0.3375,
      LostInTheForest.canvas.height
      * 0.275, this.selectedImage, null, LostInTheForest.canvas.width * 0.1,
      LostInTheForest.canvas.height * 0.2);

    this.selectedFlag = new Button(LostInTheForest.canvas.width * 0.3375,
      LostInTheForest.canvas.height
      * 0.525, this.selectedImage, null, LostInTheForest.canvas.width * 0.175,
      LostInTheForest.canvas.height * 0.2);

    //to add images for the button
    const girlImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/StartScreen/girlButton.png');
    const boyImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/StartScreen/boyButton.png');
    const nonBinaryImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/StartScreen/nonbinaireButton.png');
    //creating gender buttons
    const boy: Button = new Button(LostInTheForest.canvas.width * 0.35,
      LostInTheForest.canvas.height * 0.3,
      boyImageButton, null, LostInTheForest.canvas.width * 0.075,
      LostInTheForest.canvas.height * 0.15);
    const girl: Button = new Button(LostInTheForest.canvas.width * 0.4625,
      LostInTheForest.canvas.height * 0.3,
      girlImageButton, null, LostInTheForest.canvas.width * 0.075,
      LostInTheForest.canvas.height * 0.15);
    const nonBinary: Button = new Button(LostInTheForest.canvas.width * 0.575,
      LostInTheForest.canvas.height * 0.3,
      nonBinaryImageButton, null, LostInTheForest.canvas.width * 0.075,
      LostInTheForest.canvas.height * 0.15);
    this.genderButtons = [boy, girl, nonBinary];

    //images for flag buttons
    const dutchImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/StartScreen/nlFlagButton.png');
    const englishImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/StartScreen/enFlagButton.png');
    //creating flag buttons
    const dutch: Button = new Button(LostInTheForest.canvas.width * 0.35,
      LostInTheForest.canvas.height * 0.55,
      dutchImageButton, null, LostInTheForest.canvas.width * 0.15,
      LostInTheForest.canvas.height * 0.15);
    const english: Button = new Button(LostInTheForest.canvas.width * 0.5,
      LostInTheForest.canvas.height * 0.55,
      englishImageButton, null, LostInTheForest.canvas.width * 0.15,
      LostInTheForest.canvas.height * 0.15);
    this.languageButtons = [dutch, english];

    //start button
    const startImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/StartScreen/start-buttonstart.png');
    this.startButton = new Button(LostInTheForest.canvas.width * 0.35,
      LostInTheForest.canvas.height * 0.8,
      startImageButton, null, LostInTheForest.canvas.width * 0.3,
      LostInTheForest.canvas.height * 0.2);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/StartScreen/start.png');
    this.clickedStart = false;
  }

  /**
   * checks if its started to get next stage
   * @returns the stage if it started or nothing if its not started yet
   */
  public override getNextStage(): Stage | null {
    if (this.clickedStart) {
      return new CutScene(this.player, 'BeginCutscenes', 7, new MainArea(this.player));
    }
    return null;
  }

  /**
   * To check if the mouse is used
   * @param mouseListener gives the mouse as an object
   */
  public override processInput(): void {
    if (LostInTheForest.mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      //startbutton
      if (this.startButton.isCollidingWithMouse()) {
        this.clickedStart = true;
      }

      //gender buttons that also give selected and set gender
      this.genderButtons.forEach((genderButton: Button, index: number) => {
        if (genderButton.isCollidingWithMouse()) {
          // Set the gender
          const genders: string[] = ['boy', 'girl', 'nonBinary'];
          if (genders[index]) {
            this.player.setGender(genders[index]);
          }

          // Make the selected Gender button active
          this.selectedGender = new Button(
            genderButton.getPosX() - LostInTheForest.canvas.width * 0.0125,
            genderButton.getPosY() - LostInTheForest.canvas.height * 0.025,
            this.selectedImage, null, LostInTheForest.canvas.width * 0.1,
            LostInTheForest.canvas.height * 0.2);
        }
      });

      //flag buttons that also give selected and set language
      this.languageButtons.forEach((languageButton: Button, index: number) => {
        if (languageButton.isCollidingWithMouse()) {
          LostInTheForest.locale = new Locale(index === 0 ? 'nl' : 'en');

          // Make the selected language button active
          this.selectedFlag = new Button(
            languageButton.getPosX() - LostInTheForest.canvas.width * 0.0125,
            languageButton.getPosY() - LostInTheForest.canvas.height * 0.025,
            this.selectedImage, null, LostInTheForest.canvas.width * 0.175,
            LostInTheForest.canvas.height * 0.2);
        }
      });
    }
  }

  /**
   * what to render to render
   * @param canvas where it renders
   */
  public override render(): void {
    super.render();
    //selected
    this.selectedGender.render();
    this.selectedFlag.render();
    //buttons
    this.startButton.render();
    this.genderButtons.forEach((gender: Button) => {
      gender.render();
    });
    this.languageButtons.forEach((language: Button) => {
      language.render();
    });
  }
}
