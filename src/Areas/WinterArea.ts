import Monkey from '../Animals/Monkey.js';
import CanvasRenderer from '../CanvasRenderer.js';
import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Area from './Area.js';
import MainArea from './MainArea.js';

export default class WinterArea extends Area {
  private monkeyDialogue: string[][][];

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/winter.png');
    this.player.setPosX(this.canvas.width * 0.15);
    this.player.setPosY(this.canvas.height * 0.45);
    this.player.setWidth(this.canvas.width * 0.35);
    this.player.setHeight(this.canvas.height * 0.8);

    this.animal = new Monkey(
      this.canvas.width * 0.55,
      this.canvas.height * 0.67
    );

    this.animalDialoguePosition = {
      x: this.canvas.width * 0.7,
      y: this.canvas.height * 0.4,
    };

    this.animalDialogueSize = {
      x: this.canvas.width * 0.29,
      y: this.canvas.height * 0.3
    };

    this.dialogueAnimalImage = CanvasRenderer.loadNewImage('./assets/dialogue1.png');
    this.initiateDialogButton();

    this.monkeyDialogue = [
      [['Hihi, hallo.'], ['(....klik om door te gaan)']],
      [['Als je een stuk van de sleutel wilt'], ['hebben van mij dan moet je'], ['mijn biologie uitdaging'], ['voltooien op medium.'], ['(....klik om door te gaan)']],
      [['Je kan het!'], ['(....klik om te spelen)']]
    ];

    this.animalDialogue = this.monkeyDialogue;
    this.dialogueTextPosition = {
      x: this.canvas.width * 0.75,
      y: this.canvas.height * 0.48
    };
  }


  public override getNextStage(): Stage | null {
    if (this.challengeStarted) {
      return new MainArea(this.player, this.isDutch);
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
