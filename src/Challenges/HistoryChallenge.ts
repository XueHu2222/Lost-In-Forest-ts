import MainArea from '../Areas/MainArea.js';
import CanvasRenderer from '../CanvasRenderer.js';
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
        categoryData.push(['D-Day', 'Holocaust', 'Atoombom / Atomic Bomb', '1939']); // World War 2
        categoryData.push(['Kruistochten / Crusades', 'Monniken / Monks', 'Adel / Nobility', 'De Pest / The Plague']); // The Dark Ages
        categoryData.push(['Olympische Spelen / Olympic Games', 'Mythologie / Mythology', 'Julius Caesar', 'Filosofie / Philosophy']); // Antiquity
        categoryData.push(['Homo Sapiens', 'Jagers / Hunters', 'Boeren / Farmers', 'Verzamelaars / Gatherers']); // Prehistory
        break;
      case 'hard':
        categoryData.push(['Blitzkrieg', 'Kristallnacht', 'Geallieerden / Allies', 'Pearl Harbor']); // World War 2
        categoryData.push(['Karel de Grote / Charlemagne', 'Horigen / Serfs', 'Leenstelsel / Loan System', 'Vikingen / Vikings']); // The Dark Ages
        categoryData.push(['Alexander de Grote / Alexander the Great', 'Democratie / Democracy', 'Akropolis / Acropolis', 'Cleopatra']); // Antiquity
        categoryData.push(['Neanderthaler', 'Grotschilderingen / Cave Paintings', 'Nomaden / Nomads', 'Stenen Werktuigen / Stone Tools']); // Prehistory
        break;
    }
    const categoryNames: string[] = ['World War 2', 'The Dark Ages', 'Antiquity', 'Prehistory'];
    this.backgroundImage = CanvasRenderer.loadNewImage('./assets/Challenges/historyBackground.png');
    this.initiateCategoryElements(categoryData, categoryNames);
  }

  /**
   * Set the next stage when this challenge is finished
   * @returns New stage when challenge is finished
   */
  public override getNextStage(): Stage | null {
    if(this.clickedFinished){
      return new MainArea(this.player, this.isDutch);
    }
    return null;
  }

  public override update(elapsed: number): void {

  }
}
