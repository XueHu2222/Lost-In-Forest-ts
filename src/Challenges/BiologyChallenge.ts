import WinterArea from '../Areas/WinterArea.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';

export default class BiologyChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player, isDutch: boolean) {
    super(difficultyLevel, player, isDutch);
    const categoryData: string[][] = [];
    let categoryNames: string[] = [];

    // Pushes the correct data for each category based on the difficulty
    switch (difficultyLevel) {
      case 'easy':
        categoryData.push(['Koe / Cow', 'Schaap / Sheep', 'Varken / Pig', 'Paard / Horse']); // Farm Animals
        categoryData.push(['Kat / Cat', 'Hond / Dog', 'Hamster', 'Konijn / Rabbit']); // Pets
        categoryData.push(['Arend / Eagle', 'Mus / Sparrow', 'Meeuw / Seagull', 'Flamingo']); // Birds
        categoryData.push(['Haai / Shark', 'Dolfijn / Dolphin', 'Walvis / Whale', 'Octopus']); // Ocean Animals

        categoryNames = ['Farm Animals', 'Pets', 'Birds', 'Ocean Animals'];
        break;

      case 'medium':
        categoryData.push(['Leeuw / Lion', 'Dolfijn / Dolphin', 'Vleermuis / Bat', 'Olifant / Elephant']); // Mammals
        categoryData.push(['Krokodil / Crocodile', 'Hagedis / Lizard', 'Slang / Snake', 'Schildpad / Turtle']); // Reptiles
        categoryData.push(['Lieveheersbeestje / Ladybug', 'Rups / Caterpillar', 'Mier / Ant', 'Bij / Bee']); // Insects
        categoryData.push(['Frog', 'Toad', 'Salamander', 'Newt']); // Amphibians

        categoryNames = ['Mammals', 'Reptiles', 'Insects', 'Amphibians'];
        break;

      case 'hard':
        categoryData.push(['Paard / Horse', 'Koe / Cow', 'Giraf / Giraffe', 'Konijn / Rabbit']); // Herbivores
        categoryData.push(['Tijger / Tiger', 'Wolf / Wolf', 'Haai / Shark', 'Leeuw / Lion']); // Carnivores
        categoryData.push(['Beer / Bear', 'Beer / Bear', 'Mens / Human', 'Wasbeer / Raccoon']); // Omnivores
        categoryData.push(['Mier / Ant', 'Egel / Hedgehog', 'Vogel / Bird', 'Kameleon / Chameleon']); // Insectivores

        categoryNames = ['Herbivores', 'Carnivores', 'Omnivores', 'Insectivores'];
        break;
    }
    this.challengeScience = 'Biology';
    this.textColor = 'black';
    this.activeTextColor = 'orange';
    this.primaryTextColor = 'blue';
    this.secondaryTextColor = 'purple';
    this.initiateCategoryElements(categoryData, categoryNames);
  }

  /**
 * Set the next stage when this challenge is finished
 * @returns New stage when challenge is finished
 */
  public override getNextStage(): Stage | null {
    if (this.clickedFinished || this.goBack) {
      return new WinterArea(this.player, this.isDutch);
    }
    if (this.nextDifficulty) {
      return new BiologyChallenge(this.nextDifficulty, this.player, this.isDutch);
    }
    return null;
  }
}
