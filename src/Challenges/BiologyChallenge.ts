import WinterArea from '../Areas/WinterArea.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';
import Animal from '../Animal.js';


export default class BiologyChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player) {
    super(difficultyLevel, player);
    this.animal = new Animal(LostInTheForest.canvas.width * 0.8, LostInTheForest.canvas.height * 0.66, 'monkey', 4);
    this.challengeScience = 'Biology';
    this.textColor = 'black';
    this.activeTextColor = 'orange';
    this.primaryTextColor = 'blue';
    this.secondaryTextColor = 'purple';
  }

  protected initiateData(): void {
    const categoryData: string[][][] = [];
    let categoryNames: string[] = [];

    // Pushes the correct data for each category based on the difficulty
    switch (this.difficultyLevel) {
      case 'easy':
        categoryData.push([
          [LostInTheForest.locale.t('Koe'), LostInTheForest.locale.t('Een koe is een groot boerderijdier dat melk produceert. Koeien worden vaak op boerderijen gehouden omdat ze melk, vlees en leer leveren.')],
          [LostInTheForest.locale.t('Schaap'), LostInTheForest.locale.t('Een schaap is een wollig dier dat op boerderijen leeft. Ze worden gehouden voor hun wol, die wordt gebruikt om kleding te maken, en voor hun vlees.')],
          [LostInTheForest.locale.t('Varken'), LostInTheForest.locale.t('Een varken is een roze of bruin boerderijdier met een snuit. Varkens worden gefokt voor hun vlees, zoals spek en varkensvlees.')],
          [LostInTheForest.locale.t('Paard'), LostInTheForest.locale.t('Een paard is een groot dier dat snel kan rennen en mensen kan dragen. Paarden worden op boerderijen gebruikt voor werk, zoals het trekken van karren.')]]
        ); // Farm Animals

        categoryData.push([
          [LostInTheForest.locale.t('Kat'), LostInTheForest.locale.t('Een kat is een klein, harig dier dat spint en veel slaapt. Katten zijn populaire huisdieren omdat ze vriendelijk en gemakkelijk te verzorgen zijn.')],
          [LostInTheForest.locale.t('Hond'), LostInTheForest.locale.t('Een hond is een trouw dier dat kan blaffen. Honden worden als huisdier gehouden omdat ze loyaal, beschermend en geweldige metgezellen zijn.')],
          [LostInTheForest.locale.t('Hamster'), LostInTheForest.locale.t('Een hamster is een klein, harig knaagdier met kleine pootjes. Hamsters zijn populaire huisdieren omdat ze gemakkelijk te verzorgen zijn.')],
          [LostInTheForest.locale.t('Konijn'), LostInTheForest.locale.t('Een konijn is een klein dier met lange oren dat huppelt. Konijnen worden als huisdieren gehouden omdat ze zachtaardig en leuk zijn.')]
        ]); // Pets

        categoryData.push([
          [LostInTheForest.locale.t('Arend'), LostInTheForest.locale.t('Een arend is een grote vogel met scherpe klauwen en een haakvormige snavel. Arenden zijn krachtige vogels die hoog kunnen vliegen en jagen.')],
          [LostInTheForest.locale.t('Mus'), LostInTheForest.locale.t('Een mus is een kleine, bruine vogel die in steden en tuinen voorkomt. Mussen zijn veel voorkomende vogels die vaak dicht bij mensen leven.')],
          [LostInTheForest.locale.t('Meeuw'), LostInTheForest.locale.t('Een meeuw is een witte vogel die vaak bij de oceaan wordt gezien. Meeuwen zijn goed in het vinden van voedsel op stranden.')],
          [LostInTheForest.locale.t('Flamingo'), LostInTheForest.locale.t('Een flamingo is een lange, roze vogel met lange poten. De flamingo is een unieke vogel vanwege hun roze veren en hun liefde voor water.')]
        ]); // Birds

        categoryData.push([
          [LostInTheForest.locale.t('Haai'), LostInTheForest.locale.t('Een haai is een grote vis met scherpe tanden. Haaien leven in de oceaan en behoren tot de top-roofdieren in het water.')],
          [LostInTheForest.locale.t('Dolfijn'), LostInTheForest.locale.t('Een dolfijn is een slim en speels zeedier. Dolfijnen leven in de oceaan, zwemmen snel en staan bekend om hun intelligentie.')],
          [LostInTheForest.locale.t('Walvis'), LostInTheForest.locale.t('Een walvis is een gigantisch zeezoogdier dat lucht ademt. Walvissen leven in de oceaan en zijn enkele van de grootste dieren ter wereld.')],
          [LostInTheForest.locale.t('Octopus'), LostInTheForest.locale.t('Een octopus is een zeedier met acht armen. Octopussen leven in de oceaan en zijn bijzonder omdat ze kunnen camoufleren en zich in kleine ruimtes kunnen wurmen.')]
        ]); // Ocean Animals

        categoryNames = [
          LostInTheForest.locale.t('Boerderijdieren'),
          LostInTheForest.locale.t('Huisdieren'),
          LostInTheForest.locale.t('Vogels'),
          LostInTheForest.locale.t('Zeedieren')
        ];
        break;

      case 'medium':
        categoryData.push([
          [LostInTheForest.locale.t('Leeuw'), LostInTheForest.locale.t('Een leeuw is naast de tijger de allergrootste kat, vaak de "koning van de jungle" genoemd. Leeuwen zijn zoogdieren omdat ze hun jongen melk geven.')],
          [LostInTheForest.locale.t('Dolfijn'), LostInTheForest.locale.t('Een dolfijn is een speels zeedier. Dolfijnen zijn zoogdieren omdat ze lucht ademen en hun jongen met melk voeden.')],
          [LostInTheForest.locale.t('Vleermuis'), LostInTheForest.locale.t('Een vleermuis is een klein vliegend dier dat in de nacht actief is. Vleermuizen zijn zoogdieren omdat ze bont hebben en hun jongen melk geven.')],
          [LostInTheForest.locale.t('Olifant'), LostInTheForest.locale.t('Een olifant is het grootste landzoogdier. Olifanten zijn zoogdieren omdat ze haar hebben, warmbloedig zijn en levende jongen baren.')]
        ]); // Mammals

        categoryData.push([
          [LostInTheForest.locale.t('Krokodil'), LostInTheForest.locale.t('Een krokodil is een groot reptiel met scherpe tanden en schubbenhuid. Krokodillen zijn reptielen omdat ze schubben hebben en eieren leggen.')],
          [LostInTheForest.locale.t('Hagedis'), LostInTheForest.locale.t('Een hagedis is een klein reptiel dat kan kruipen en klimmen. Het zijn reptielen omdat ze koudbloedig zijn en een droge, schubbige huid hebben.')],
          [LostInTheForest.locale.t('Slang'), LostInTheForest.locale.t('Een slang is een lang reptiel zonder poten dat kronkelt. Slangen zijn reptielen omdat ze schubben hebben en eieren leggen.')],
          [LostInTheForest.locale.t('Schildpad'), LostInTheForest.locale.t('Een schildpad is een langzaam reptiel met een hard schild. Schildpadden zijn reptielen omdat ze schubben hebben, eieren leggen en op land of in het water leven.')]
        ]); // Reptiles

        categoryData.push([
          [LostInTheForest.locale.t('Lieveheersbeestje'), LostInTheForest.locale.t('Een lieveheersbeestje is een klein, rood insect met zwarte stippen. Het zijn insecten omdat ze zes poten en drie lichaamsdelen hebben.')],
          [LostInTheForest.locale.t('Rups'), LostInTheForest.locale.t('Een rups is de jonge vorm van een vlinder. Rupsen zijn insecten omdat ze zes poten hebben en zich ontwikkelen tot vlinders.')],
          [LostInTheForest.locale.t('Mier'), LostInTheForest.locale.t('Een mier is een klein, hardwerkend insect dat in kolonies leeft. Het zijn insecten omdat ze zes poten, voelsprieten hebben en grote groepen vormen.')],
          [LostInTheForest.locale.t('Bij'), LostInTheForest.locale.t('Een bij is een zoemend insect dat honing maakt. Bijen zijn insecten omdat ze zes poten hebben en belangrijk zijn voor planten en bloemen.')]
        ]); // Insects

        categoryData.push([
          [LostInTheForest.locale.t('Kikker'), LostInTheForest.locale.t('Een kikker is een klein dier dat in water en op het land leeft en daarom zijn het ook amfibieën.')],
          [LostInTheForest.locale.t('Pad'), LostInTheForest.locale.t('Een pad heeft een drogere huid en kortere poten dan een kikker. Het zijn amfibieën omdat ze op het land leven maar hun eieren in water leggen.')],
          [LostInTheForest.locale.t('Salamander'), LostInTheForest.locale.t('Een salamander is een klein dier een gladde huid heeft. Salamanders zijn amfibieën omdat ze water nodig hebben om hun huid vochtig te houden.')],
          [LostInTheForest.locale.t('Watersalamander'), LostInTheForest.locale.t('Een watersalamander is een type kleine salamander. Watersalamanders zijn amfibieën omdat ze hun leven in water beginnen en later op het land kunnen leven.')]
        ]); // Amphibians

        categoryNames = [
          LostInTheForest.locale.t('Zoogdieren'),
          LostInTheForest.locale.t('Reptielen'),
          LostInTheForest.locale.t('Insecten'),
          LostInTheForest.locale.t('Amfibieën')
        ];
        break;

      case 'hard':
        categoryData.push([
          [LostInTheForest.locale.t('Paard'), LostInTheForest.locale.t('Een paard is een groot dier dat gras en hooi eet. Paarden zijn herbivoren omdat ze alleen planten eten zoals gras en bladeren, om energie te krijgen.')],
          [LostInTheForest.locale.t('Koe'), LostInTheForest.locale.t('Een koe is een boerderijdier dat gras eet en melk levert. Het zijn herbivoren omdat ze een speciale maag hebben die hen helpt planten te verteren.')],
          [LostInTheForest.locale.t('Giraf'), LostInTheForest.locale.t('Een giraf is het hoogste landdier. Giraffen zijn herbivoren omdat ze alleen planten eten, en hun lange nek gebruiken om bij hun voedsel te komen.')],
          [LostInTheForest.locale.t('Konijn'), LostInTheForest.locale.t('Een konijn is een klein dier dat huppelt en groenten eet. Konijnen zijn herbivoren omdat ze gras, groenten en planten eten om gezond te blijven.')]
        ]); // Herbivores

        categoryData.push([
          [LostInTheForest.locale.t('Tijger'), LostInTheForest.locale.t('Een tijger is een grote, gestreepte kat die jaagt op andere dieren. Tijgers zijn carnivoren omdat ze vlees eten om te overleven.')],
          [LostInTheForest.locale.t('Wolf'), LostInTheForest.locale.t('Een wolf is een wilde hond die in groepen jaagt. Wolven zijn carnivoren omdat ze jagen en vlees eten, zoals herten, konijnen en kleinere dieren.')],
          [LostInTheForest.locale.t('Haai'), LostInTheForest.locale.t('Een haai is een krachtige zee-roofdier met scherpe tanden. Haaien zijn carnivoren omdat ze andere vissen en zeedieren eten om te overleven.')],
          [LostInTheForest.locale.t('Leeuw'), LostInTheForest.locale.t('Een leeuw is een grote kat die jaagt op dieren op de grasvlakten. Leeuwen zijn carnivoren omdat ze jagen en dieren eten, zoals gazellen.')]
        ]); // Carnivores

        categoryData.push([
          [LostInTheForest.locale.t('Beer'), LostInTheForest.locale.t('Een beer is een groot dier. Beren zijn omnivoren omdat ze planten zoals bessen eten, maar ook jagen op vis en kleine dieren.')],
          [LostInTheForest.locale.t('Varken'), LostInTheForest.locale.t('Een varken is een boerderijdier dat veel soorten voedsel eet. Varkens zijn omnivoren omdat ze zowel planten als vlees eten.')],
          [LostInTheForest.locale.t('Mens'), LostInTheForest.locale.t('Een mens is een persoon, en wij maken deel uit van het dierenrijk. Mensen zijn omnivoren omdat we zowel planten als vlees eten om energie te krijgen.')],
          [LostInTheForest.locale.t('Wasbeer'), LostInTheForest.locale.t('Een wasbeer is een klein dier dat in de nacht vaak naar voedsel zoekt. Wasberen zijn omnivoren omdat ze zowel planten als kleine dieren eten.')]
        ]); // Omnivores

        categoryData.push([
          [LostInTheForest.locale.t('Miereneter'), LostInTheForest.locale.t('Een miereneter is een groot dier met een lange snuit en een tong. Het zijn insectivoren omdat ze voornamelijk mieren eten om hun voedsel te krijgen.')],
          [LostInTheForest.locale.t('Egel'), LostInTheForest.locale.t('Een egel is een klein, stekelig dier dat zich oprolt voor bescherming. Het zijn insectivoren omdat ze insecten, zoals kevers en wormen eten.')],
          [LostInTheForest.locale.t('Vogel'), LostInTheForest.locale.t('Sommige vogels, zoals roodborstjes, eten insecten als hun belangrijkste voedsel. Vogels kunnen insectivoren zijn omdat veel van hen insecten eten.')],
          [LostInTheForest.locale.t('Kameleon'), LostInTheForest.locale.t('Kameleons zijn insectivoren omdat ze insecten, zoals vliegen en krekels, vangen met hun lange, kleverige tongen.')]
        ]); // Insectivores

        categoryNames = [
          LostInTheForest.locale.t('Herbivoren'),
          LostInTheForest.locale.t('Carnivoren'),
          LostInTheForest.locale.t('Omnivoren'),
          LostInTheForest.locale.t('Insectivoren')
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
      LostInTheForest.keyBiology = true;
    }
    if (this.leavingChallenge()) {
      return new WinterArea(this.player);
    }
    if (this.nextDifficulty) {
      return new BiologyChallenge(this.nextDifficulty, this.player);
    }
    return null;
  }
}
