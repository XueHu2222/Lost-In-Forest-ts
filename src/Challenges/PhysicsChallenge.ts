import SpringArea from '../Areas/SpringArea.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';
import Animal from '../Animal.js';

export default class PhysicsChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player) {
    super(difficultyLevel, player);
    this.animal = new Animal(LostInTheForest.canvas.width * 0.8, LostInTheForest.canvas.height * 0.66, 'bunny', 4);
    this.challengeScience = 'Physics';
    this.textColor = 'white';
    this.activeTextColor = 'green';
    this.primaryTextColor = 'red';
    this.secondaryTextColor = 'yellow';
  }

  protected initiateData(): void {
    const categoryData: string[][][] = [];
    let categoryNames: string[] = [];

    // Pushes the correct data for each category based on the difficulty
    switch (this.difficultyLevel) {
      case 'easy':
        categoryData.push([
          [LostInTheForest.locale.t('Steen'), LostInTheForest.locale.t('Een steen is een hard materiaal dat in de natuur voorkomt. Het verandert niet gemakkelijk van vorm en blijft in de loop van de tijd vast.')],
          [LostInTheForest.locale.t('Hout'), LostInTheForest.locale.t('Hout is een materiaal dat afkomstig is van bomen en veel wordt gebruikt. Het is vast en behoudt zijn vorm, tenzij het wordt veranderd.')],
          [LostInTheForest.locale.t('IJzer'), LostInTheForest.locale.t('IJzer is een sterk metaal. Het is vast, duurzaam en bestand tegen buigen, waardoor het essentieel is voor veel industrieën.')],
          [LostInTheForest.locale.t('Krijt'), LostInTheForest.locale.t('Krijt is een zacht, wit materiaal dat wordt gebruikt om te schrijven. Krijt blijft in één vorm en stroomt niet zoals een vloeistof of gas.')]
        ]); // Solids

        categoryData.push([
          [LostInTheForest.locale.t('Water'), LostInTheForest.locale.t('Water is een heldere vloeistof die essentieel is voor het leven. Het stroomt gemakkelijk en wordt voor veel gebruikt.')],
          [LostInTheForest.locale.t('Lichaamsvloeistoffen'), LostInTheForest.locale.t('Lichaamsvloeistoffen zijn vloeistoffen zoals bloed, speeksel en urine die door het lichaam worden geproduceerd. Ze stromen gemakkelijk.')],
          [LostInTheForest.locale.t('Azijn'), LostInTheForest.locale.t('Azijn is een zure vloeistof die wordt gebruikt in koken, schoonmaken en als conserveermiddel. Het stroomt zoals andere vloeistoffen.')],
          [LostInTheForest.locale.t('Olie'), LostInTheForest.locale.t('Olie is een gladde vloeistof die zich niet mengt met water. Het stroomt gemakkelijk, en wordt voor veel gebruikt.')]
        ]); // Liquids

        categoryData.push([
          [LostInTheForest.locale.t('Lucht'), LostInTheForest.locale.t('Lucht is een mengsel van gassen die we elke dag inademen. Het vult de ruimte om ons heen, heeft geen vaste vorm en verspreidt zich vrij.')],
          [LostInTheForest.locale.t('Zuurstof'), LostInTheForest.locale.t('Zuurstof is het gas dat we nodig hebben om te ademen en in leven te blijven. Het beweegt zich vrij en verspreidt zich in de lucht.')],
          [LostInTheForest.locale.t('Helium'), LostInTheForest.locale.t('Helium is een licht gas dat wordt gebruikt om ballonnen te vullen. Het stijgt op en verspreidt zich gemakkelijk.')],
          [LostInTheForest.locale.t('Waterdamp'), LostInTheForest.locale.t('Waterdamp is water in gasvorm, zoals stoom. Het stijgt op en verspreidt zich wanneer water erg heet wordt, waardoor damp in de lucht ontstaat.')]
        ]); // Gases

        categoryData.push([
          [LostInTheForest.locale.t('Melk'), LostInTheForest.locale.t('Melk is een drank die van koeien komt. Het bevat voedingsstoffen zoals calcium, die helpen de botten te versterken.')],
          [LostInTheForest.locale.t('Suiker'), LostInTheForest.locale.t('Suiker is een zoete stof die aan voedsel en dranken wordt toegevoegd.')],
          [LostInTheForest.locale.t('Chocolade'), LostInTheForest.locale.t('Chocolade is gemaakt van cacaobonen en is een zoete lekkernij.')],
          [LostInTheForest.locale.t('Boter'), LostInTheForest.locale.t('Boter is een zachte, gele voeding gemaakt van melk. Het wordt gebruikt in het koken en voegt smaak toe aan verschillende gerechten.')]
        ]); // Food Substances

        categoryNames = [
          LostInTheForest.locale.t('Vaste stoffen'),
          LostInTheForest.locale.t('Vloeistoffen'),
          LostInTheForest.locale.t('Gassen'),
          LostInTheForest.locale.t('Voedingsstoffen')
        ];
        break;

      case 'medium':
        categoryData.push([
          [LostInTheForest.locale.t('Hout'), LostInTheForest.locale.t('Hout komt van bomen en wordt gebruikt om meubels en huizen te bouwen. Het komt uit de natuur en is niet door mensen gemaakt.')],
          [LostInTheForest.locale.t('Zand'), LostInTheForest.locale.t('Zand bestaat uit kleine korrels gesteente, vaak te vinden op stranden. Het wordt van nature gevormd wanneer gesteente in kleine stukjes breekt.')],
          [LostInTheForest.locale.t('Steen'), LostInTheForest.locale.t('Een steen is een hard materiaal dat uit de grond komt. Stenen worden van nature gevormd door de aarde in de loop van de tijd.')],
          [LostInTheForest.locale.t('Water'), LostInTheForest.locale.t('Water is een vloeistof die we moeten drinken om in leven te blijven. Het komt uit rivieren, meren en regen.')]
        ]); // Natural Materials

        categoryData.push([
          [LostInTheForest.locale.t('Plastic'), LostInTheForest.locale.t('Plastic is een flexibel materiaal. Het wordt door mensen in fabrieken gemaakt met behulp van chemicaliën.')],
          [LostInTheForest.locale.t('Zeep'), LostInTheForest.locale.t('Zeep wordt gebruikt om onze handen en ons lichaam te reinigen. Zeep wordt door mensen gemaakt met oliën en andere ingrediënten.')],
          [LostInTheForest.locale.t('Papier'), LostInTheForest.locale.t('Papier is een dun materiaal waarop we schrijven en tekenen. Papier wordt gemaakt van houtpulp in fabrieken.')],
          [LostInTheForest.locale.t('Glas'), LostInTheForest.locale.t('Glas is een hard, doorzichtig materiaal. Mensen maken glas door zand op hoge temperaturen te verhitten.')]
        ]); // Man-Made Materials

        categoryData.push([
          [LostInTheForest.locale.t('Bliksem'), LostInTheForest.locale.t('Bliksem is een fel licht van energie dat optreedt tijdens stormen. Bliksem is een vorm van plasma omdat het super verhit is en vol energie zit.')],
          [LostInTheForest.locale.t('Zon'), LostInTheForest.locale.t('De zon is een enorme bal van zeer hete gas. Plasma is een zeer heet gas dat elektrisch geleidend is en dat is de zon ook.')],
          [LostInTheForest.locale.t('Neonlicht'), LostInTheForest.locale.t('Neonlichten zijn felle lichten die worden gebruikt voor borden. Ze gloeien omdat plasma zich binnen de buizen vormt wanneer elektriciteit stroomt.')],
          [LostInTheForest.locale.t('Sterren'), LostInTheForest.locale.t('Sterren zijn enorme ballen van gloeiend gas in de ruimte. Sterren zijn gemaakt van plasma omdat hun gassen extreem heet en vol energie zijn.')]
        ]); // Plasma

        categoryData.push([
          [LostInTheForest.locale.t('IJzer'), LostInTheForest.locale.t('IJzer is een sterk, hard metaal dat wordt gebruikt om dingen te bouwen.')],
          [LostInTheForest.locale.t('Zilver'), LostInTheForest.locale.t('Zilver is een glanzend metaal dat wordt gebruikt voor sieraden en munten.')],
          [LostInTheForest.locale.t('Goud'), LostInTheForest.locale.t('Goud is een zeldzaam, glanzend metaal dat wordt gebruikt voor sieraden en versiering.')],
          [LostInTheForest.locale.t('Koper'), LostInTheForest.locale.t('Koper is een roodbruin metaal dat wordt gebruikt in draden en pijpen. Koper geleidt elektriciteit heel goed.')]
        ]); // Metals

        categoryNames = [
          LostInTheForest.locale.t('Natuurlijke materialen'),
          LostInTheForest.locale.t('Mens gemaakte materialen'),
          LostInTheForest.locale.t('Plasma'),
          LostInTheForest.locale.t('Metalen')
        ];
        break;

      case 'hard':
        categoryData.push([
          [LostInTheForest.locale.t('Hout'), LostInTheForest.locale.t('Hout is een vast materiaal dat uit bomen komt. Hout is brandbaar omdat het gemakkelijk vlam vat en warmte en rook vrijgeeft.')],
          [LostInTheForest.locale.t('Papier'), LostInTheForest.locale.t('Papier is een dun materiaal gemaakt van houtpulp. Papier is brandbaar omdat het snel verbrandt bij contact met vuur.')],
          [LostInTheForest.locale.t('Plantenmateriaal'), LostInTheForest.locale.t('Plantenmateriaal bestaat uit bladeren en andere organische delen. Het brandt gemakkelijk vooral wanneer het droog is.')],
          [LostInTheForest.locale.t('Kaarsvet'), LostInTheForest.locale.t('Kaarsvet smelt bij verhitting en wordt gebruikt in kaarsen. Het brandt nadat het smelt in vloeistof en als gas verbrandt bij de vlam.')]
        ]); // Flammable Substances

        categoryData.push([
          [LostInTheForest.locale.t('Water'), LostInTheForest.locale.t('Water is een vloeistof die we drinken en gebruiken om schoon te maken. Het is niet brandbaar omdat het niet verbrandt en vuur blust.')],
          [LostInTheForest.locale.t('Zand'), LostInTheForest.locale.t('Zand is een natuurlijk materiaal van kleine gesteentekorrels. Het is niet brandbaar en kan vlammen doven door zuurstof af te sluiten.')],
          [LostInTheForest.locale.t('Glas'), LostInTheForest.locale.t('Glas is een hard, doorzichtig materiaal gemaakt van gesmolten zand. Het is niet brandbaar omdat het hoge temperaturen aankan en niet verbrandt.')],
          [LostInTheForest.locale.t('Metaal'), LostInTheForest.locale.t('Metaal is een sterk materiaal gebruikt in gereedschappen en gebouwen. De meeste metalen zijn niet brandbaar omdat ze extreem hoge hitte nodig hebben om te smelten of te verbranden.')]
        ]); // Non-Flammable Substances

        categoryData.push([
          [LostInTheForest.locale.t('Schuim'), LostInTheForest.locale.t('Schuim is een licht materiaal van gasbellen in een vaste stof of vloeistof. Het drijft doordat de luchtbellen het minder dicht maken dan water.')],
          [LostInTheForest.locale.t('Plastic'), LostInTheForest.locale.t('Plastic is een lichtgewicht materiaal. Veel kunststoffen drijven omdat ze minder dicht zijn dan water en aan het oppervlak blijven.')],
          [LostInTheForest.locale.t('Kurken'), LostInTheForest.locale.t('Kurk is een licht, sponsachtig materiaal van de schors van kurkbomen. Het drijft door de kleine luchtbellen.')],
          [LostInTheForest.locale.t('Olie'), LostInTheForest.locale.t('Olie is een vloeistof die zich niet mengt met water. Het drijft omdat het minder dicht is en zich over het wateroppervlak verspreidt.')]
        ]); // Floating Substances

        categoryData.push([
          [LostInTheForest.locale.t('Steen'), LostInTheForest.locale.t('Een steen is een hard, vast materiaal. Het zinkt omdat het dichter en zwaarder is dan water, waardoor het niet aan het oppervlak blijft.')],
          [LostInTheForest.locale.t('Klei'), LostInTheForest.locale.t('Klei is een zachte, plakkerige grond die hard wordt wanneer het droogt. Het zinkt omdat het compact en zwaar is, waardoor het dichter is dan water.')],
          [LostInTheForest.locale.t('Munt'), LostInTheForest.locale.t('Een munt is een klein, rond stuk metaal. Munten zinken omdat ze zijn gemaakt van metaal, dat veel zwaarder en dichter is dan water.')],
          [LostInTheForest.locale.t('Sleutel'), LostInTheForest.locale.t('Een sleutel is een klein, vast object van metaal dat wordt gebruikt om sloten te openen. Sleutels zinken omdat metaal dicht is, waardoor het niet op water blijft drijven.')]
        ]); // Sinking Substances

        categoryNames = [
          LostInTheForest.locale.t('Brandbare stoffen'),
          LostInTheForest.locale.t('Niet-brandbare stoffen'),
          LostInTheForest.locale.t('Drijvende stoffen'),
          LostInTheForest.locale.t('Zinkende stoffen')
        ];
        break;
    }
    this.initiateCategoryElements(categoryData, categoryNames);
  }

  /**
 * Set the next stage when this challenge is finished
 * @returns New stage when challenge is finished
 */
  public override getNextStage(): Stage | null {
    if (this.clickedFinished) {
      LostInTheForest.keyPhysics = true;
    }
    if (this.leavingChallenge()) {
      return new SpringArea(this.player);
    }
    if (this.nextDifficulty) {
      return new PhysicsChallenge(this.nextDifficulty, this.player);
    }
    return null;
  }
}
