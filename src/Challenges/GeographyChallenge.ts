import SummerArea from '../Areas/SummerArea.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';

export default class GeographyChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player, isDutch: boolean) {
    super(difficultyLevel, player, isDutch);
    const categoryData: string[][] = [];
    let categoryNames: string[] = [];

    // Pushes the correct data for each category based on the difficulty
    switch (difficultyLevel) {
      case 'easy':
        categoryData.push(['Chocolade / Chocolate', 'Brussel / Brussels', 'Friet / Fries', 'Wafels / Waffles']); // Belgium
        categoryData.push(['Windmolen / Windmill', 'Kanaal / Canal', 'Fietsen / Bicycles', 'Tulpen / Tulips']); // Netherlands
        categoryData.push(['Bratwurst', 'Schnitzel', 'Oktoberfest', 'Berlijn / Berlin']); // Germany
        categoryData.push(['Big Ben', 'Royalty', 'Thee / Tea', 'Rode Telefooncellen / Red Telephone Boxes']); // England

        categoryNames = ['Belgium', 'Netherlands', 'Germany', 'England'];
        break;
      case 'medium':
        categoryData.push(['Frankrijk / France', 'Italië / Italy', 'Spanje / Spain', 'Zweden / Sweden']); // Europe
        categoryData.push(['Japan', 'India', 'Thailand', 'Korea']); // Asia
        categoryData.push(['Egypte / Egypt', 'Zuid-Afrika / South Africa', 'Kenia / Kenya', 'Nigeria']); // Africa
        categoryData.push(['Verenigde Staten / United States', 'Brazilië / Brazil', 'Canada', 'Argentinië / Argentina']); // Americas

        categoryNames = ['Europe', 'Asia', 'Africa', 'Americas'];
        break;
      case 'hard':
        categoryData.push(['Japan', 'IJsland / Iceland', 'Madagaskar / Madagascar', 'Verenigd Koninkrijk / United Kingdom']); // Island Nations
        categoryData.push(['Zwitserland / Switzerland', 'Oostenrijk / Austria', 'Hongarije / Hungary', 'Tsjechië / Czech Republic']); // Landlocked Countries
        categoryData.push(['Noorwegen / Norway', 'Spanje / Spain', 'Griekenland / Greece', 'Frankrijk / France']); // Coastal Nations
        categoryData.push(['Egypte / Egypt', 'Saoedi-Arabië / Saudi Arabia', 'Australië / Australia', 'Namibië']); // Countries with Deserts

        categoryNames = ['Island Nations', 'Landlocked Countries', 'Coastal Nations', 'Countries with Deserts'];
        break;
    }
    this.challengeScience = 'Geography';
    this.textColor = 'black';
    this.activeTextColor = 'green';
    this.primaryTextColor = 'blue';
    this.secondaryTextColor = 'red';
    this.initiateCategoryElements(categoryData, categoryNames);
  }

  /**
   * Set the next stage when this challenge is finished
   * @returns New stage when challenge is finished
   */
  public override getNextStage(): Stage | null {
    if (this.clickedFinished || this.goBack) {
      if (this.clickedFinished) {
        LostInTheForest.keyGeography = true;
      }
      this.clickedFinished = false;
      this.goBack = false;
      return new SummerArea(this.player, this.isDutch);
    }
    if (this.nextDifficulty) {
      return new GeographyChallenge(this.nextDifficulty, this.player, this.isDutch);
    }
    return null;
  }
}
