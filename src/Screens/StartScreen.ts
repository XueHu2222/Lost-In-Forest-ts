import MainArea from '../Areas/MainArea.js';
import Button from '../Button.js';
import CanvasRenderer from '../CanvasRenderer.js';
import BeginCutScene from '../Cutscenes/BeginCutScene.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';

export default class StartScreen extends Stage {
  private setIsDutch: (value: boolean) => void;

  private genderButtons: Button[];

  private languageButtons: Button[];

  private startButton: Button;

  private started: boolean = false;

  private selectedImage: HTMLImageElement;

  private selectedGender: Button;

  private selectedFlag: Button;

  public constructor(setIsDutch: (value: boolean) => void,
    player: Player) {
    super(player, false);

    //to give everything a standard value
    this.setIsDutch = setIsDutch;
    this.selectedImage = CanvasRenderer.loadNewImage('./assets/selected.png');

    this.selectedGender = new Button(this.canvas.width * 0.3375, this.canvas.height
      * 0.275, this.selectedImage, this.canvas.width * 0.1, this.canvas.height * 0.2);

    this.selectedFlag = new Button(this.canvas.width * 0.3375, this.canvas.height
      * 0.525, this.selectedImage, this.canvas.width * 0.175, this.canvas.height * 0.2);

    //to add images for the button
    const girlImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/girlButton.png');
    const boyImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/boyButton.png');
    const nonBinaryImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/nonbinaireButton.png');
    //creating gender buttons
    const boy: Button = new Button(this.canvas.width * 0.35, this.canvas.height * 0.3,
      boyImageButton, this.canvas.width * 0.075, this.canvas.height * 0.15);
    const girl: Button = new Button(this.canvas.width * 0.4625, this.canvas.height * 0.3,
      girlImageButton, this.canvas.width * 0.075, this.canvas.height * 0.15);
    const nonBinary: Button = new Button(this.canvas.width * 0.575, this.canvas.height * 0.3,
      nonBinaryImageButton, this.canvas.width * 0.075, this.canvas.height * 0.15);
    this.genderButtons = [boy, girl, nonBinary];

    //images for flag buttons
    const dutchImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/nlFlagButton.png');
    const englishImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/enFlagButton.png');
    //creating flag buttons
    const dutch: Button = new Button(this.canvas.width * 0.35, this.canvas.height * 0.55,
      dutchImageButton, this.canvas.width * 0.15, this.canvas.height * 0.15);
    const english: Button = new Button(this.canvas.width * 0.5, this.canvas.height * 0.55,
      englishImageButton, this.canvas.width * 0.15, this.canvas.height * 0.15);
    this.languageButtons = [dutch, english];

    //start button
    const startImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/start-buttonstart.png');
    this.startButton = new Button(this.canvas.width * 0.35, this.canvas.height * 0.8, startImageButton,
      this.canvas.width * 0.3, this.canvas.height * 0.2);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/start.png');
  }

  /**
   * checks if its started to get next stage
   * @returns the stage if it started or nothing if its not started yet
   */
  public override getNextStage(): Stage | null {
    if (this.started) {
      return new MainArea(this.player, this.isDutch);
    }
    return null;
  }

  /**
   * To check if the mouse is used
   * @param mouseListener gives the mouse as an object
   */
  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      //startbutton
      if (this.startButton.isCollidingWithMouse(mouseListener)) {
        this.started = true;
      }

      //gender buttons that also give selected and set gender
      this.genderButtons.forEach((genderButton: Button, index: number) => {
        if (genderButton.isCollidingWithMouse(mouseListener)) {
          // Set the gender
          const genders: string[] = ['boy', 'girl', 'nonBinary'];
          if(genders[index]){
            this.player.setGender(genders[index]);
          }

          // Make the selected Gender button active
          this.selectedGender = new Button(
            genderButton.getPosX() - this.canvas.width * 0.0125,
            genderButton.getPosY() - this.canvas.height * 0.025,
            this.selectedImage, this.canvas.width * 0.1, this.canvas.height * 0.2);
        }
      });

      //flag buttons that also give selected and set language
      this.languageButtons.forEach((languageButton: Button, index: number) => {
        if (languageButton.isCollidingWithMouse(mouseListener)) {
          this.setIsDutch(index == 0 ? true : false);

          // Make the selected language button active
          this.selectedFlag = new Button(
            languageButton.getPosX() - this.canvas.width * 0.0125,
            languageButton.getPosY() - this.canvas.height * 0.025,
            this.selectedImage, this.canvas.width * 0.175, this.canvas.height * 0.2);
        }
      });
    }
  }

  /**
   *
   * @param elapsed
   */
  public override update(elapsed: number): void {

  }

  /**
   * what to render to render
   * @param canvas where it renders
   */
  public override render(): void {
    CanvasRenderer.drawImage(this.canvas, this.backgroundImage,
      0, 0, this.canvas.width, this.canvas.height);
    //selected
    this.renderBackground();
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
