import Animal from '../Animals/Animal.js';
import Bunny from '../Animals/Bunny.js';
import Button from '../Button.js';
import Player from '../Player.js';
import Stage from '../Stage.js';

export default abstract class Area extends Stage {
  protected animal: Animal;

  protected animalText: string;

  protected playButton: Button;

  public constructor(player: Player, isDutch: boolean) {
    super(player, isDutch);
    // TODO: Set correct values
    this.animal = new Bunny(0, 0);
    this.animalText = '';
    this.playButton = new Button(0, 0, null, 100, 100);
    this.playButton.setText('Play');
  }

  public update(): void {
    this.player.getMap().update();
  }

  public override getNextStage(): Stage | null {
    if (this.player.getMap().getNextArea()) {
      return this.player.getMap().getNextArea();
    }
    return null;
  }
}

