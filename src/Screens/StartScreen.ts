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

  private canvas: HTMLCanvasElement;

  public constructor(setIsDutch: (value: boolean) => void,
    player: Player, canvas: HTMLCanvasElement) {
    super(player, false);
    
    //to give everything a standard value
    this.canvas = canvas;

    this.setIsDutch = setIsDutch;

    this.selectedImage = CanvasRenderer.loadNewImage('./assets/selected.png');

    this.selectedGender= new Button(null, this.canvas.width * 0.3375, this.canvas.height
      * 0.275, this.selectedImage, this.canvas.width * 0.1, this.canvas.height * 0.2);

    this.selectedFlag= new Button(null, this.canvas.width * 0.3375, this.canvas.height
      * 0.525, this.selectedImage, this.canvas.width * 0.175, this.canvas.height * 0.2);

    //to add images for the button
    const girlImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/girlButton.png');
    const boyImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/boyButton.png');
    const nonBinaryImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/nonbinaireButton.png');
    //creating gender buttons
    const boy: Button = new Button(null, canvas.width * 0.35, canvas.height * 0.3,
      boyImageButton, canvas.width * 0.075, canvas.height * 0.15);
    const girl: Button = new Button(null, canvas.width * 0.4625, canvas.height * 0.3,
      girlImageButton, canvas.width * 0.075, canvas.height * 0.15);
    const nonBinary: Button = new Button(null, canvas.width * 0.575, canvas.height * 0.3,
      nonBinaryImageButton, canvas.width * 0.075, canvas.height * 0.15);
    this.genderButtons = [boy, girl, nonBinary];

    //images for flag buttons
    const dutchImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/nlFlagButton.png');
    const englishImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/enFlagButton.png');
    //creating flag buttons
    const dutch: Button = new Button(null, canvas.width * 0.35, canvas.height * 0.55,
      dutchImageButton, canvas.width * 0.15, canvas.height * 0.15);
    const english: Button = new Button(null, canvas.width * 0.5, canvas.height * 0.55,
      englishImageButton, canvas.width * 0.15, canvas.height * 0.15);
    this.languageButtons = [dutch, english];

    //start button
    const startImageButton: HTMLImageElement = CanvasRenderer.loadNewImage('./assets/start-buttonstart.png');
    this.startButton = new Button(null, canvas.width * 0.35, canvas.height * 0.8, startImageButton,
      canvas.width * 0.3, canvas.height * 0.2);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/start.png');
  }

  /**
   * checks if its started to get next stage
   * @returns the stage if it started or nothing if its not started yet
   */
  public override getNextStage(): Stage | null {
    if (this.started) {
      return new BeginCutScene(this.player, this.isDutch);
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
      if (this.genderButtons[0]?.isCollidingWithMouse(mouseListener)){
        this.player.setGender('boy');
        this.selectedGender= new Button(null, this.canvas.width * 0.3375, this.canvas.height
           * 0.275, this.selectedImage, this.canvas.width * 0.1, this.canvas.height * 0.2);
      }else if (this.genderButtons[2]?.isCollidingWithMouse(mouseListener)){
        this.player.setGender('nonBinary');
        this.selectedGender= new Button(null, this.canvas.width * 0.565, this.canvas.height * 0.275,
          this.selectedImage, this.canvas.width * 0.1, this.canvas.height * 0.2);
      }else if (this.genderButtons[1]?.isCollidingWithMouse(mouseListener)){
        this.player.setGender('girl');
        this.selectedGender= new Button(null, this.canvas.width * 0.45, this.canvas.height * 0.275,
          this.selectedImage, this.canvas.width * 0.1, this.canvas.height * 0.2);
      }
      //flag buttons that also give selected and set language
      if (this.languageButtons[0]?.isCollidingWithMouse(mouseListener)){
        this.setIsDutch(true);
        this.selectedFlag= new Button(null, this.canvas.width * 0.3375, this.canvas.height
           * 0.525, this.selectedImage, this.canvas.width * 0.175, this.canvas.height * 0.2);
      }else if (this.languageButtons[1]?.isCollidingWithMouse(mouseListener)){
        this.setIsDutch(false);
        this.selectedFlag= new Button(null, this.canvas.width * 0.4875, this.canvas.height * 0.525,
          this.selectedImage, this.canvas.width * 0.175, this.canvas.height * 0.2);
      }
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
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.backgroundImage, 0, 0, canvas.width, canvas.height);
    //selected
    this.renderBackground(canvas);
    this.selectedGender.render(canvas);
    this.selectedFlag.render(canvas);
    //buttons
    this.startButton.render(canvas);
    this.genderButtons.forEach((gender: Button) => {
      gender.render(canvas);
    });
    this.languageButtons.forEach((language: Button) => {
      language.render(canvas);
    });
  }
}
