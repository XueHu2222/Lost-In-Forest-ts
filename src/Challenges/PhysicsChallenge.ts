import SpringArea from '../Areas/SpringArea.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';

export default class PhysicsChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player, isDutch: boolean) {
    super(difficultyLevel, player, isDutch);
    const categoryData: string[][] = [];
    let categoryNames: string[] = [];

    // Pushes the correct data for each category based on the difficulty
    switch (difficultyLevel) {
      case 'easy':
        categoryData.push(['Steen / Stone', 'Hout / Wood', 'IJzer / Iron', 'Krijt / Chalk']); // Solids
        categoryData.push(['Water / Water', 'Melk / Milk', 'Azijn / Vinegar', 'Olie / Oil']); // Liquids
        categoryData.push(['Lucht / Air', 'Zuurstof / Oxygen', 'Helium / Helium', 'Waterdamp / Water Vapor']); // Gases
        categoryData.push(['Melk / Milk', 'Suiker / Sugar', 'Chocolade / Chocolate', 'Boter / Butter']); // Food Substances

        categoryNames = ['Solids', 'Liquids', 'Gases', 'Food Substances'];
        break;

      case 'medium':
        categoryData.push(['Hout / Wood', 'Zand / Sand', 'Steen / Stone', 'Water / Water']); // Natural Materials
        categoryData.push(['Plastic / Plastic', 'Zeep / Soap', 'Papier / Paper', 'Glas / Glass']); // Man-Made Materials
        categoryData.push(['Bliksem / Lightning', 'Zon / Sun', 'Neonlicht / Neon Light', 'Sterren / Stars']); // Plasma
        categoryData.push(['IJzer / Iron', 'Zilver / Silver', 'Goud / Gold', 'Koper / Copper']); // Metals

        categoryNames = ['Natural Materials', 'Man-Made Materials', 'Plasma', 'Metals'];
        break;

      case 'hard':
        categoryData.push(['Hout / Wood', 'Papier / Paper', 'Plastic / Plastic', 'Kaarsvet / Candle Wax']); // Flammable Substances
        categoryData.push(['Water / Water', 'Zand / Sand', 'Glas / Glass', 'Metaal / Metal']); // Non-Flammable Substances
        categoryData.push(['Hout / Wood', 'Plastic / Plastic', 'Kurken / Cork', 'Olie / Oil']); // Floating Substances
        categoryData.push(['Steen / Stone', 'Klei / Clay', 'Munt / Coin', 'Sleutel / Key']); // Sinking Substances

        categoryNames = ['Flammable Substances', 'Non-Flammable Substances', 'Floating Substances', 'Sinking Substances'];
        break;
    }
    this.challengeScience = 'Physics';
    this.textColor = 'white';
    this.activeTextColor = 'green';
    this.primaryTextColor = 'red';
    this.secondaryTextColor = 'yellow';
    this.initiateCategoryElements(categoryData, categoryNames);
  }

  /**
   * Set the next stage when this challenge is finished
   * @returns New stage when challenge is finished
   */
  public override getNextStage(): Stage | null {
    if (this.clickedFinished || this.goBack) {
      return new SpringArea(this.player, this.isDutch);
    }
    if (this.nextDifficulty) {
      return new PhysicsChallenge(this.nextDifficulty, this.player, this.isDutch);
    }
    return null;
  }
}
