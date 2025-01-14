import Frog from '../Animals/Frog.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Area from './Area.js';
import SpringArea from './SpringArea.js';

export default class AutumnArea extends Area {
  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/autumn.png');
    this.player.setPosX(this.canvas.width * 0.15);
    this.player.setPosY(this.canvas.height * 0.35);
    this.player.setWidth(this.canvas.width * 0.35);
    this.player.setHeight(this.canvas.height * 0.8);

    this.animal = new Frog(
      this.canvas.width * 0.65,
      this.canvas.height * 0.7);

    this.animalDialoguePosition = {
      x: this.canvas.width * 0.74,
      y: this.canvas.height * 0.5,
    };

    this.animalDialogueSize = {
      x: this.canvas.width * 0.23,
      y: this.canvas.height * 0.25
    };

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue1.png');
    this.initiateDialogButton();

    this.animalDialogue = [
      [['Hallo kind,'], ['(....klik om door te gaan)']],
      [['je moet mijn geschiedenis'], ['uitdaging voltooien'], ['op medium als je een stuk'], ['van de sleutel wilt hebben.']],
      [[' Veel succes!'], ['(....klik om te spelen)']]
    ];

    this.dialogueTextPosition = {
      x: this.canvas.width * 0.78,
      y: this.canvas.height * 0.57
    };
  }

  public override getNextStage(): Stage | null {
    if (this.challengeStarted) {
      return new SpringArea(this.player, this.isDutch);
    } return null;
  }

  public override processInput(mouseListener: MouseListener): void {
    super.processInput(mouseListener);
  }

  public override update(elapsed: number): void {
    super.update(elapsed);
  }

  public override render(): void {
    super.render();
  }
}
