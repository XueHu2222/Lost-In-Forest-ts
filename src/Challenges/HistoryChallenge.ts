import MouseListener from '../MouseListener.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';

export default class HistoryChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player, isDutch: boolean) {
    super(difficultyLevel, player, isDutch);
    const categoryData: string[][] = [];

    // Pushes the correct data for each category based on the difficulty
    switch (difficultyLevel) {
      case 'easy':
        categoryData.push(['Hitler', 'Anne Frank', 'Duitsland / Germany', 'Soldaten / Soldiers']); // World War 2
        categoryData.push(['Kastelen / Castles', 'Ridders / Knights', 'Koning / Kings', 'Koningin / Queen']); // The Dark Ages
        categoryData.push(['Romeinen / The Romans', 'Grieken / The Greeks', 'Gladiatoren / Gladiators', 'Colosseum']); // Antiquity
        categoryData.push(['Mammoet / Mammoth', 'Vuur / Fire', 'Grotten / Caves', 'Steen / Stone']); // Prehistory
        break;
      case 'medium':
        break;
      case 'hard':
        break;
    }
    const categoryNames: string[] = ['World War 2', 'The Dark Ages', 'Antiquity', 'Prehistory'];
    this.initiateCategories(categoryData, categoryNames);
    this.initiatePositions();
  }

  public override getNextStage(): Stage | null {
    return null;
  }
  public override processInput(mouseListener: MouseListener): void {

  }
  public override update(elapsed: number): void {

  }
}
