import SpringArea from '../Areas/SpringArea.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';
import Animal from '../Animal.js';

export default class PhysicsChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player) {
    super(difficultyLevel, player);
    const categoryData: string[][][] = [];
    let categoryNames: string[] = [];
    this.animal = new Animal(LostInTheForest.canvas.width * 0.8, LostInTheForest.canvas.height * 0.66, 'bunny', 4);

    // Pushes the correct data for each category based on the difficulty
    switch (difficultyLevel) {
      case 'easy':
        categoryData.push([
          ['Steen / Stone', 'Een steen is een hard materiaal dat in de natuur voorkomt. Het verandert   niet gemakkelijk van vorm en blijft in de loop van de tijd vast.'],
          ['Hout / Wood', 'Hout is een materiaal dat afkomstig is van bomen en veel wordt gebruikt.   Het is vast en behoudt zijn vorm, tenzij het wordt veranderd.'],
          ['IJzer / Iron', 'IJzer is een sterk metaal. Het is vast, duurzaam en bestand tegen buigen,  waardoor het essentieel is voor veel industrieën.'],
          ['Krijt / Chalk', 'Krijt is een zacht, wit materiaal dat wordt gebruikt om te schrijven.      Krijt blijft in één vorm en stroomt niet zoals een vloeistof of gas.']]
        ); // Solids
        categoryData.push([
          ['Water / Water', 'Water is een heldere vloeistof die essentieel is voor het leven. Het       stroomt gemakkelijk en wordt voor veel gebruikt.'],
          ['Lichaamsvloeistoffen/Bodily Fluids', 'Lichaamsvloeistoffen zijn vloeistoffen zoals bloed, speeksel en urine die  door het lichaam worden geproduceerd. Ze stromen gemakkelijk. '],
          ['Azijn / Vinegar', 'Azijn is een zure vloeistof die wordt gebruikt in koken, schoonmaken en als conserveermiddel. Het stroomt zoals andere vloeistoffen.'],
          ['Olie / Oil', 'Olie is een gladde vloeistof die zich niet mengt met water. Het stroomt    gemakkelijk, en wordt voor veel gebruikt. ']]
        ); // Liquids
        categoryData.push([
          ['Lucht / Air', 'Lucht is een mengsel van gassen die we elke dag inademen. Het vult de      ruimte om ons heen, heeft geen vaste vorm en verspreidt zich vrij.'],
          ['Zuurstof / Oxygen', 'Zuurstof is het gas dat we nodig hebben om te ademen en in leven te blijven Het beweegt zich vrij en verspreidt zich in de lucht.'],
          ['Helium / Helium', 'Helium is een licht gas dat wordt gebruikt om ballonnen te vullen. Het     stijgt op en verspreidt zich gemakkelijk. '],
          ['Waterdamp / Water Vapor', 'Waterdamp is water in gasvorm, zoals stoom. Het stijgt op en verspreidt    zich wanneer water erg heet wordt, waardoor damp in de lucht ontstaat.']]
        ); // Gases
        categoryData.push([
          ['Melk / Milk', 'Melk is een drank die van koeien komt. Het bevat voedingsstoffen zoals     calcium, die helpen de botten te versterken.'],
          ['Suiker / Sugar', 'Suiker is een zoete stof die aan voedsel en dranken wordt toegevoegd.'],
          ['Chocolade / Chocolate', 'Chocolade is gemaakt van cacaobonen en is een zoete lekkernij.'],
          ['Boter / Butter', 'Boter is een zachte, gele voeding gemaakt van melk. Het wordt gebruikt in  het koken en voegt smaak toe aan verschillende gerechten.']]
        ); // Food Substances

        categoryNames = ['Solids', 'Liquids', 'Gases', 'Food Substances'];
        break;

      case 'medium':
        categoryData.push([
          ['Hout / Wood', 'Hout komt van bomen en wordt gebruikt om meubels en huizen te bouwen. Het  komt uit de natuur en is niet door mensen gemaakt.'],
          ['Zand / Sand', 'Zand bestaat uit kleine korrels gesteente, vaak te vinden op stranden. Het wordt van nature gevormd wanneer gesteente in kleine stukjes breekt.'],
          ['Steen / Stone', 'Een steen is een hard materiaal dat uit de grond komt. Stenen worden van   nature gevormd door de aarde in de loop van de tijd.'],
          ['Water / Water', 'Water is een vloeistof die we moeten drinken om in leven te blijven. Het   komt uit rivieren, meren en regen.']]
        ); // Natural Materials
        categoryData.push([
          ['Plastic / Plastic', 'Plastic is een flexibel materiaal. Het wordt door mensen in fabrieken      gemaakt met behulp van chemicaliën.'],
          ['Zeep / Soap', 'Zeep wordt gebruikt om onze handen en ons lichaam te reinigen. Zeep wordt  door mensen gemaakt met oliën en andere ingrediënten.'],
          ['Papier / Paper', 'Papier is een dun materiaal waarop we schrijven en tekenen. Papier wordt   gemaakt van houtpulp in fabrieken.'],
          ['Glas / Glass', 'Glas is een hard, doorzichtig materiaal. Mensen maken glas door zand op    hoge temperaturen te verhitten.']]
        ); // Man-Made Materials
        categoryData.push([
          ['Bliksem / Lightning', 'Bliksem is een fel licht van energie dat optreedt tijdens stormen. Bliksem is een vorm van plasma omdat het super verhit is en vol energie zit.'],
          ['Zon / Sun', 'De zon is een enorme bal van zeer hete gas. Plasma is  een zeer heet gas   dat elektrisch geleidend is en dat is de zon ook. '],
          ['Neonlicht / Neon Light', 'Neonlichten zijn felle lichten die worden gebruikt voor borden. Ze gloeien omdat plasma zich binnen de buizen vormt wanneer elektriciteit stroomt.'],
          ['Sterren / Stars', 'Sterren zijn enorme ballen van gloeiend gas in de ruimte. Sterren zijn     gemaakt van plasma omdat hun gassen extreem heet en vol energie zijn.']]
        ); // Plasma
        categoryData.push([
          ['IJzer / Iron', 'IJzer is een sterk, hard metaal dat wordt gebruikt om dingen te bouwen.'],
          ['Zilver / Silver', 'Zilver is een glanzend metaal dat wordt gebruikt voor sieraden en munten. '],
          ['Goud / Gold', 'Goud is een zeldzaam, glanzend metaal dat wordt gebruikt voor sieraden en  versiering.'],
          ['Koper / Copper', 'Koper is een roodbruin metaal dat wordt gebruikt in draden en pijpen. Koper geleidt elektriciteit heel goed. ']]
        ); // Metals

        categoryNames = ['Natural Materials', 'Man-Made Materials', 'Plasma', 'Metals'];
        break;

      case 'hard':
        categoryData.push([
          ['Hout / Wood', 'Hout is een vast materiaal dat uit bomen komt. Hout is brandbaar omdat het gemakkelijk vlam vat en warmte en rook vrijgeeft.'],
          ['Papier / Paper', 'Papier is een dun materiaal gemaakt van houtpulp. Papier is brandbaar omdat het snel verbrandt bij contact met vuur.'],
          ['Plantenmateriaal/Plant Material', 'Plantenmateriaal bestaat uit bladeren en andere organische delen. Het      brandt gemakkelijk vooral wanneer het droog is.'],
          ['Kaarsvet / Candle Wax', 'Kaarsvet smelt bij verhitting en wordt gebruikt in kaarsen. Het brandt     nadat het smelt in vloeistof en als gas verbrandt bij de vlam.']]
        ); // Flammable Substances
        categoryData.push([
          ['Water / Water', 'Water is een vloeistof die we drinken en gebruiken om schoon te maken. Het is niet brandbaar omdat het niet verbrandt en vuur blust.'],
          ['Zand / Sand', 'Zand is een natuurlijk materiaal van kleine gesteentekorrels. Het is niet  brandbaar en kan vlammen doven door zuurstof af te sluiten.'],
          ['Glas / Glass', 'Glas is een hard, doorzichtig materiaal gemaakt van gesmolten zand. Het is niet brandbaar omdat het hoge temperaturen aankan en niet verbrandt.'],
          ['Metaal / Metal', 'Metaal is een sterk materiaal gebruikt in gereedschappen en gebouwen. De   meeste metalen zijn niet brandbaar omdat ze extreem hoge hitte nodig hebben om te smelten of te verbranden.']
        ]); // Non-Flammable Substances
        categoryData.push([
          ['Schuim/Foam', 'Schuim is een licht materiaal van gasbellen in een vaste stof of vloeistof. Het drijft doordat de luchtbellen het minder dicht maken dan water.'],
          ['Plastic / Plastic', 'Plastic is een lichtgewicht materiaal. Veel kunststoffen drijven omdat ze  minder dicht zijn dan water en aan het oppervlak blijven.'],
          ['Kurken / Cork', 'Kurk is een licht, sponsachtig materiaal van de schors van kurkbomen. Het  drijft door de kleine luchtbellen.'],
          ['Olie / Oil', 'Olie is een vloeistof die zich niet mengt met water. Het drijft omdat het  minder dicht is en zich over het wateroppervlak verspreidt.']]
        ); // Floating Substances
        categoryData.push([
          ['Steen / Stone', 'Een steen is een hard, vast materiaal. Het zinkt omdat het dichter en      zwaarder is dan water, waardoor het niet aan het oppervlak blijft.'],
          ['Klei / Clay', 'Klei is een zachte, plakkerige grond die hard wordt wanneer het droogt. Het zinkt omdat het compact en zwaar is, waardoor het dichter is dan water.'],
          ['Munt / Coin', 'Een munt is een klein, rond stuk metaal. Munten zinken omdat ze zijn       gemaakt van metaal, dat veel zwaarder en dichter is dan water.'],
          ['Sleutel / Key', 'Een sleutel is een klein, vast object van metaal dat wordt gebruikt om sloten te openen. Sleutels zinken omdat metaal dicht is, waardoor het niet op  water blijft drijven.']]
        ); // Sinking Substances

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
