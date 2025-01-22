import WinterArea from '../Areas/WinterArea.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';
import Animal from '../Animals/Animal.js';


export default class BiologyChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player, isDutch: boolean) {
    super(difficultyLevel, player, isDutch);
    const categoryData: string[][][] = [];
    let categoryNames: string[] = [];
    this.animal = new Animal(this.canvas.width * 0.8, this.canvas.height * 0.66, 'monkey', 4);

    // Pushes the correct data for each category based on the difficulty
    switch (difficultyLevel) {
      case 'easy':
        categoryData.push([
          ['Koe / Cow', 'Een koe is een groot boerderijdier dat melk produceert. Koeien worden vaak op boerderijen gehouden omdat ze melk, vlees en leer leveren.'],
          ['Schaap / Sheep', 'Een schaap is een wollig dier dat op boerderijen leeft. Ze worden gehouden voor hun wol, die wordt gebruikt om kleding te maken, en voor hun vlees.'],
          ['Varken / Pig', 'Een varken is een roze of bruin boerderijdier met een snuit. Varkens worden gefokt voor hun vlees, zoals spek en varkensvlees.'],
          ['Paard / Horse', 'Een paard is een groot dier dat snel kan rennen en mensen kan dragen. Paar-den worden op boerderijen gebruikt voor werk, zoals het trekken van karren.']]
        ); // Farm Animals
        categoryData.push([
          ['Kat / Cat', 'Een kat is een klein, harig dier dat spint en veel slaapt. Katten zijn pop-ulaire huisdieren omdat ze vriendelijk en gemakkelijk te verzorgen zijn.'],
          ['Hond / Dog', 'Een hond is een trouw dier dat kan blaffen. Honden worden als huisdier     gehouden omdat ze loyaal, beschermend en geweldige metgezellen zijn.'],
          ['Hamster', 'Een hamster is een klein, harig knaagdier met kleine pootjes. Hamsters zijn populaire huisdieren omdat ze gemakkelijk te verzorgen zijn.'],
          ['Konijn / Rabbit', 'Een konijn is een klein dier met lange oren dat huppelt. Konijnen worden   als huisdieren gehouden omdat ze zachtaardig en leuk zijn.']]
        ); // Pets
        categoryData.push([
          ['Arend / Eagle', 'Een arend is een grote vogel met scherpe klauwen en een haakvormige snavel. Arenden zijn krachtige vogels die hoog kunnen vliegen en jagen.'],
          ['Mus / Sparrow', 'Een mus is een kleine, bruine vogel die in steden en tuinen voorkomt.      Mussen zijn veel voorkomende vogels die vaak dicht bij mensen leven.'],
          ['Meeuw / Seagull', 'Een meeuw is een witte vogel die vaak bij de oceaan wordt gezien. Meeuwen  zijn goed in het vinden van voedsel op stranden.'],
          ['Flamingo', 'Een flamingo is een lange, roze vogel met lange poten. De flamingo is een  unieke vogel vanwege hun roze veren en hun liefde voor water.']]
        ); // Birds
        categoryData.push([
          ['Haai / Shark', 'Een haai is een grote vis met scherpe tanden. Haaien leven in de oceaan en behoren tot de top-roofdieren in het water.'],
          ['Dolfijn / Dolphin', 'Een dolfijn is een slim en speels zeedier. Dolfijnen leven in de oceaan,   zwemmen snel en staan bekend om hun intelligentie.'],
          ['Walvis / Whale', 'Een walvis is een gigantisch zeezoogdier dat lucht ademt. Walvissen leven  in de oceaan en zijn enkele van de grootste dieren ter wereld.'],
          ['Octopus', 'Een octopus is een zeedier met acht armen. Octopussen leven in de oceaan en zijn bijzonder omdat ze kunnen camoufleren en zich in kleine ruimtes      kunnen wurmen.']]
        ); // Ocean Animals

        categoryNames = ['Farm Animals', 'Pets', 'Birds', 'Ocean Animals'];
        break;

      case 'medium':
        categoryData.push([
          ['Leeuw / Lion', 'Een leeuw is naast de tijger de allergrootste kat, vaak de "koning van de  jungle" genoemd. Leeuwen zijn zoogdieren omdat ze hun jongen melk geven.'],
          ['Dolfijn / Dolphin', 'Een dolfijn is een speels zeedier. Dolfijnen zijn zoogdieren omdat ze lucht ademen en hun jongen met melk voeden.'],
          ['Vleermuis / Bat', 'Een vleermuis is een klein vliegend dier dat in de nacht actief is. Vleer- muizen zijn zoogdieren omdat ze bont hebben en hun jongen melk geven.'],
          ['Olifant / Elephant', 'Een olifant is het grootste landzoogdier. Olifanten zijn zoogdieren omdat  ze haar hebben, warmbloedig zijn en levende jongen baren.']]
        ); // Mammals
        categoryData.push([
          ['Krokodil / Crocodile', 'Een krokodil is een groot reptiel met scherpe tanden en schubbenhuid.      Krokodillen zijn reptielen omdat ze schubben hebben en eieren leggen.'],
          ['Hagedis / Lizard', 'Een hagedis is een klein reptiel dat kan kruipen en klimmen. Het zijn rep- tielen omdat ze koudbloedig zijn en een droge, schubbige huid hebben.'],
          ['Slang / Snake', 'Een slang is een lang reptiel zonder poten dat kronkelt. Slangen zijn      reptielen omdat ze schubben hebben en eieren leggen.'],
          ['Schildpad / Turtle', 'Een schildpad is een langzaam reptiel met een hard schild. Schildpadden    zijn reptielen omdat ze schubben hebben, eieren leggen en op land of in het water leven.']]
        ); // Reptiles
        categoryData.push([
          ['Lieveheersbeestje / Ladybug', 'Een lieveheersbeestje is een klein, rood insect met zwarte stippen. Het    zijn insecten omdat ze zes poten en drie lichaamsdelen hebben.'],
          ['Rups / Caterpillar', 'Een rups is de jonge vorm van een vlinder. Rupsen zijn insecten omdat ze   zes poten hebben en zich ontwikkelen tot vlinders.'],
          ['Mier / Ant', 'Een mier is een klein, hardwerkend insect dat in kolonies leeft. Het zijn  insecten omdat ze zes poten, voelsprieten hebben en grote groepen vormen.'],
          ['Bij / Bee', 'Een bij is een zoemend insect dat honing maakt. Bijen zijn insecten omdat  ze zes poten hebben en belangrijk zijn voor planten en bloemen.']]
        ); // Insects
        categoryData.push([
          ['Frog', 'Een kikker is een klein dier dat in water en op het land leeft en daarom   zijn het ook amfibieën.'],
          ['Toad', 'Een pad heeft een drogere huid en kortere poten dan een kikker. Het zijn   amfibieën omdat ze op het land leven maar hun eieren in water leggen.'],
          ['Salamander', 'Een salamander is een klein dier een gladde huid heeft. Salamanders zijn   amfibieën omdat ze water nodig hebben om hun huid vochtig te houden.'],
          ['Newt', 'Een watersalamander is een type kleine salamander. Watersalamanders zijn   amfibieën omdat ze hun leven in water beginnen en later op het land kunnen leven.']]
        ); // Amphibians

        categoryNames = ['Mammals', 'Reptiles', 'Insects', 'Amphibians'];
        break;

      case 'hard':
        categoryData.push([
          ['Paard / Horse', 'Een paard is een groot dier dat gras en hooi eet. Paarden zijn herbivoren  omdat ze alleen planten eten zoals gras en bladeren, om energie te krijgen.'],
          ['Koe / Cow', 'Een koe is een boerderijdier dat gras eet en melk levert. Het zijn herbivo-ren omdat ze een speciale maag hebben die hen helpt planten te verteren.'],
          ['Giraf / Giraffe', 'Een giraf is het hoogste landdier. Giraffen zijn herbivoren omdat ze alleen planten eten, en hun lange nek gebruiken om bij hun voedsel te komen.'],
          ['Konijn / Rabbit', 'Een konijn is een klein dier dat huppelt en groenten eet. Konijnen zijn    herbivoren omdat ze gras, groenten en planten eten om gezond te blijven.']]
        ); // Herbivores
        categoryData.push([
          ['Tijger / Tiger', 'Een tijger is een grote, gestreepte kat die jaagt op andere dieren. Tijgers zijn carnivoren omdat ze vlees eten om te overleven..'],
          ['Wolf / Wolf', 'Een wolf is een wilde hond die in groepen jaagt. Wolven zijn carnivoren    omdat ze jagen en vlees eten, zoals herten, konijnen en kleinere dieren.'],
          ['Haai / Shark', 'Een haai is een krachtige zee-roofdier met scherpe tanden. Haaien zijn     carnivoren omdat ze andere vissen en zeedieren eten om te overleven.'],
          ['Leeuw / Lion', 'Een leeuw is een grote kat die jaagt op dieren op de grasvlakten. Leeuwen  zijn carnivoren omdat ze jagen en dieren eten, zoals gazellen.']]
        ); // Carnivores
        categoryData.push([
          ['Beer / Bear', 'Een beer is een groot dier. Beren zijn omnivoren omdat ze planten zoals    bessen eten, maar ook jagen op vis en kleine dieren.'],
          ['Varken / Pig', 'Een varken is een boerderijdier dat veel soorten voedsel eet. Varkens zijn omnivoren omdat ze zowel planten als vlees eten. '],
          ['Mens / Human', 'Een mens is een persoon, en wij maken deel uit van het dierenrijk. Mensen  zijn omnivoren omdat we zowel planten als vlees eten om energie te krijgen.'],
          ['Wasbeer / Raccoon', 'Een wasbeer is een klein dier dat  in de nacht vaak naar voedsel zoekt. Was-beren zijn omnivoren omdat ze zowel planten, als kleine dieren eten.']]
        ); // Omnivores
        categoryData.push([
          ['Miereneter / Anteater', 'Een miereneter is een groot dier met een lange snuit en een tong. Het zijn insectivoren omdat ze voornamelijk mieren eten om hun voedsel te krijgen.'],
          ['Egel / Hedgehog', 'Een egel is een klein, stekelig dier dat zich oprolt voor bescherming. Het zijn insectivoren omdat ze insecten, zoals kevers en wormen eten.'],
          ['Vogel / Bird', 'Sommige vogels, zoals roodborstjes, eten insecten als hun belangrijkste    voedsel. Vogels kunnen insectivoren zijn omdat veel van hen insecten eten.'],
          ['Kameleon / Chameleon', 'Kameleons zijn insectivoren omdat ze insecten, zoals vliegen en krekels,   vangen met hun lange, kleverige tongen.']]
        ); // Insectivores

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
      if (this.clickedFinished) {
        LostInTheForest.keyBiology = true;
      }
      this.clickedFinished = false;
      this.goBack = false;
      return new WinterArea(this.player, this.isDutch);
    }
    if (this.nextDifficulty) {
      return new BiologyChallenge(this.nextDifficulty, this.player, this.isDutch);
    }
    return null;
  }
}
