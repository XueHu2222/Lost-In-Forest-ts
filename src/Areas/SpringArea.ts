import Animal from '../Animals/Animal.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Area from './Area.js';
import SummerArea from './SummerArea.js';

export default class SpringArea extends Area {
  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/spring.png');
    this.player.setPosX(this.canvas.width * 0.5);
    this.player.setPosY(this.canvas.height * 0.45);
    this.player.setWidth(this.canvas.width * 0.35);
    this.player.setHeight(this.canvas.height * 0.8);

    this.animal = new Animal(
      this.canvas.width * 0.1,
      this.canvas.height * 0.5,
      'bunny');

    this.animalDialoguePosition = {
      x: this.canvas.width * 0.28,
      y: this.canvas.height * 0.3,
    };

    this.animalDialogueSize = {
      x: this.canvas.width * 0.3,
      y: this.canvas.height * 0.35
    };

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue1.png');
    this.initiateDialogButton();

    this.animalDialogue = [
      [['He, daar ben je weer.'], ['(....klik om door te gaan)']],
      [['Als jij een stuk'], ['van de sleutel wilt hebben'], ['van mij dan moet je'], ['de scheikunde uitdaging voltooien'], ['op medium.'], ['(....klik om door te gaan)']],
      [['Veel succes,'], [' je zult het nodig hebben.'], ['(....klik om te spelen)']]
    ];

    this.dialogueTextPosition = {
      x: this.canvas.width * 0.34,
      y: this.canvas.height * 0.38
    };
  }

  public override getNextStage(): Stage | null {
    if (this.challengeStarted) {
      return new SummerArea(this.player, this.isDutch);
    } return null;
  }

  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.player.getMap().processInput(mouseListener);
    }
  }

  public override update(elapsed: number): void {
    super.update(elapsed);
  }

  public override render(): void {
    super.render();
    this.player.getMap().render();
  }
}
