import SummerArea from '../Areas/SummerArea.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';
import Animal from '../Animal.js';

export default class GeographyChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player) {
    super(difficultyLevel, player);
    this.animal = new Animal(LostInTheForest.canvas.width * 0.8, LostInTheForest.canvas.height * 0.66, 'owl', 6);
    this.challengeScience = 'Geography';
    this.textColor = 'black';
    this.activeTextColor = 'green';
    this.primaryTextColor = 'blue';
    this.secondaryTextColor = 'red';
  }

  protected initiateData(): void {
    const categoryData: string[][][] = [];
    let categoryNames: string[] = [];
    // Pushes the correct data for each category based on the difficulty
    switch (this.difficultyLevel) {
      case 'easy':
        categoryData.push([
          [LostInTheForest.locale.t('Chocolade'), LostInTheForest.locale.t('Chocolade is een zoete lekkernij gemaakt van cacaobonen, waarbij België bekendstaat om zijn hoogwaardige chocolade.')],
          [LostInTheForest.locale.t('Brussel'), LostInTheForest.locale.t('Brussel de hoofdstad van België, is belangrijk als regeringscentrum en herbergt het hoofdkwartier van de Europese Unie.')],
          [LostInTheForest.locale.t('Friet'), LostInTheForest.locale.t('Frieten worden door België geclaimd als hun uitvinding, met "Belgische frieten" die wereldwijd bekend staan om hun unieke smaak en dikte.')],
          [LostInTheForest.locale.t('Wafels'), LostInTheForest.locale.t('Wafels zijn een Belgische specialiteit met twee beroemde soorten: Brusselse wafels (licht en luchtig) en Luikse wafels (zoet en gekarameliseerd).')]
        ]); // Belgium

        categoryData.push([
          [LostInTheForest.locale.t('Windmolen'), LostInTheForest.locale.t('Nederland staat bekend om zijn historische windmolens en ze werden gebruikt om energie op te wekken of graan te malen.')],
          [LostInTheForest.locale.t('Kanaal'), LostInTheForest.locale.t('Een kanaal is een door mensen gemaakte waterweg die wordt gebruikt voor transport en waterbeheer. Nederland heeft veel kanalen.')],
          [LostInTheForest.locale.t('Fietsen'), LostInTheForest.locale.t('Nederland staat bekend als de fietshoofdstad van de wereld, met meer fietsen dan mensen.')],
          [LostInTheForest.locale.t('Tulpen'), LostInTheForest.locale.t('Tulpen zijn mooie bloemen die in de lente bloeien. Nederland is beroemd om zijn uitgestrekte tulpenvelden en tulpenfestivals, en het exporteert miljoenen tulpenbollen wereldwijd.')]
        ]); // Netherlands

        categoryData.push([
          [LostInTheForest.locale.t('Bratwurst'), LostInTheForest.locale.t('Duitsland staat bekend om de bratwurst en is een traditioneel gerecht dat vaak wordt gegeten tijdens festivals en maaltijden.')],
          [LostInTheForest.locale.t('Schnitzel'), LostInTheForest.locale.t('Schnitzel is een dun stuk vlees, meestal varkensvlees, dat gepaneerd en gefrituurd wordt. Het is een van de beroemdste Duitse gerechten.')],
          [LostInTheForest.locale.t('Oktoberfest'), LostInTheForest.locale.t('Oktoberfest is een groot festival dat de Beierse cultuur viert met traditioneel eten, muziek en bier.')],
          [LostInTheForest.locale.t('Berlijn'), LostInTheForest.locale.t('Berlijn is de hoofdstad van Duitsland. Het is een belangrijk cultureel en historisch centrum, bekend om bezienswaardigheden zoals de Berlijnse Muur.')]
        ]); // Germany

        categoryData.push([
          [LostInTheForest.locale.t('Big Ben'), LostInTheForest.locale.t('Big Ben is een beroemde klokkentoren in Londen. Het is een symbool van Engeland en zijn hoofdstad Londen.')],
          [LostInTheForest.locale.t('Royalty'), LostInTheForest.locale.t('Royalty verwijst naar de koninklijke familie die deel uitmaken van een monarchie. Engeland staat hier wereldwijd bekend om.')],
          [LostInTheForest.locale.t('Thee'), LostInTheForest.locale.t('Thee is een warme drank die wordt gemaakt door gedroogde theebladeren in water te laten trekken. Thee drinken is een grote traditie in Engeland.')],
          [LostInTheForest.locale.t('Rode Telefooncellen'), LostInTheForest.locale.t('Rode telefooncellen zijn kleine hokjes met openbare telefoons. De rode telefooncel is een iconisch symbool van Engeland, vooral in steden zoals Londen.')]
        ]); // England

        categoryNames = [
          LostInTheForest.locale.t('België'),
          LostInTheForest.locale.t('Nederland'),
          LostInTheForest.locale.t('Duitsland'),
          LostInTheForest.locale.t('Engeland')
        ];
        break;
      case 'medium':
        categoryData.push([
          [LostInTheForest.locale.t('Frankrijk'), LostInTheForest.locale.t('Frankrijk is een land in Europa en staat bekend om zijn rijke cultuur, eten, wijn, mode en bezienswaardigheden zoals de Eiffeltoren.')],
          [LostInTheForest.locale.t('Italië'), LostInTheForest.locale.t('Italië is een land in Europa en staat bekend om zijn eten, kunst en oude geschiedenis zoals de Grieken en Romeinen.')],
          [LostInTheForest.locale.t('Spanje'), LostInTheForest.locale.t('Spanje is een land in Europa en staat bekend om flamencodansen, mooie stranden en traditionele gerechten zoals paella.')],
          [LostInTheForest.locale.t('Zweden'), LostInTheForest.locale.t('Zweden is een land in Europa en staat bekend om zijn prachtige bossen, meren en moderne steden zoals Stockholm.')]
        ]); // Europe

        categoryData.push([
          [LostInTheForest.locale.t('Japan'), LostInTheForest.locale.t('Japan is een eilandnatie in Azië, beroemd om zijn technologie, kersenbloesems en traditionele cultuur.')],
          [LostInTheForest.locale.t('India'), LostInTheForest.locale.t('India, een land in Zuid-Azië, staat bekend om zijn rijke geschiedenis, cultuur en bezienswaardigheden zoals de Taj Mahal.')],
          [LostInTheForest.locale.t('Thailand'), LostInTheForest.locale.t('Thailand, een land in Zuidoost-Azië staat bekend om zijn prachtige stranden, tempels en traditioneel Thais eten.')],
          [LostInTheForest.locale.t('Korea'), LostInTheForest.locale.t('Zuid-Korea, een land in Azië staat bekend om K-Pop, technologie en gerechten zoals kimchi.')]
        ]); // Asia

        categoryData.push([
          [LostInTheForest.locale.t('Egypte'), LostInTheForest.locale.t('Egypte, een land in Afrika, staat bekend om zijn oude piramides, de Sfinx en zijn rijke geschiedenis.')],
          [LostInTheForest.locale.t('Zuid-Afrika'), LostInTheForest.locale.t('Zuid-Afrika een land in Afrika, staat bekend om zijn diverse culturen, dieren, prachtige landschappen en levendige steden zoals Kaapstad.')],
          [LostInTheForest.locale.t('Kenia'), LostInTheForest.locale.t('Kenia, een land in Afrika, staat bekend om zijn safari’s, wilde dieren zoals leeuwen en olifanten en prachtige landschappen.')],
          [LostInTheForest.locale.t('Nigeria'), LostInTheForest.locale.t('Nigeria, een land in Afrika, staat bekend om zijn grote bevolking, diversiteit en Nollywood, de op een na grootste filmindustrie ter wereld.')]
        ]); // Africa

        categoryData.push([
          [LostInTheForest.locale.t('Verenigde Staten'), LostInTheForest.locale.t('De V.S. een land in Noord-Amerika staat bekend om grote steden zoals New York, iconische bezienswaardigheden en zijn invloed op de wereld.')],
          [LostInTheForest.locale.t('Brazilië'), LostInTheForest.locale.t('Brazilië, een land in Zuid-Amerika staat bekend om het Amazonewoud, levendige carnavalsfeesten en zijn bruisende cultuur.')],
          [LostInTheForest.locale.t('Canada'), LostInTheForest.locale.t('Canada, een land in Noord-Amerika, staat bekend om zijn verbluffende landschappen, uitgestrekte bossen en bruisende steden zoals Toronto.')],
          [LostInTheForest.locale.t('Argentinië'), LostInTheForest.locale.t('Argentinië, een land in Zuid-Amerika, staat bekend om de tangodans, het wereldberoemde rundvlees en de Andes.')]
        ]); // Americas

        categoryNames = [
          LostInTheForest.locale.t('Europa'),
          LostInTheForest.locale.t('Azië'),
          LostInTheForest.locale.t('Afrika'),
          LostInTheForest.locale.t('Amerika')
        ];
        break;
      case 'hard':
        categoryData.push([
          [LostInTheForest.locale.t('Japan'), LostInTheForest.locale.t('Japan is een eilandnatie in Azië, bestaande uit meer dan 6.000 eilanden.')],
          [LostInTheForest.locale.t('IJsland'), LostInTheForest.locale.t('IJsland is een klein eiland in de Noord-Atlantische Oceaan. Bekend om zijn vulkanen, gletsjers en prachtige landschappen.')],
          [LostInTheForest.locale.t('Madagaskar'), LostInTheForest.locale.t('Madagaskar is een groot eiland voor de kust van Afrika. Beroemd om zijn unieke dieren, zoals lemuren.')],
          [LostInTheForest.locale.t('Verenigd Koninkrijk'), LostInTheForest.locale.t('Het Verenigd Koninkrijk is een eiland bestaande uit Engeland, Schotland, Wales en Noord-Ierland.')]
        ]); // Island Nations

        categoryData.push([
          [LostInTheForest.locale.t('Zwitserland'), LostInTheForest.locale.t('Zwitserland is een klein land in Europa, omringd door bergen. Het heeft geen kustlijn en is omringd door landen zoals Frankrijk en Italië.')],
          [LostInTheForest.locale.t('Oostenrijk'), LostInTheForest.locale.t('Oostenrijk is een land in Centraal-Europa, bekend om zijn bergen en steden zoals Wenen. Het is volledig landlocked, zonder toegang tot de zee.')],
          [LostInTheForest.locale.t('Hongarije'), LostInTheForest.locale.t('Hongarije is een land in Centraal-Europa. Het is landlocked zonder kustlijn, en wordt omringd door landen zoals Oostenrijk, Slowakije en Roemenië.')],
          [LostInTheForest.locale.t('Tsjechië'), LostInTheForest.locale.t('Tsjechië is een land in Centraal-Europa, bekend om zijn kastelen en hoofdstad Praag. Het is landlocked, omringd door andere landen zonder toegang tot de oceaan.')]
        ]); // Landlocked Countries

        categoryData.push([
          [LostInTheForest.locale.t('Noorwegen'), LostInTheForest.locale.t('Noorwegen is een land in Noord-Europa met een lange kustlijn. Het heeft duizenden kilometers kustlijn, met fjorden en toegang tot de oceaan.')],
          [LostInTheForest.locale.t('Spanje'), LostInTheForest.locale.t('Spanje is een land in Zuid-Europa. Het heeft een lange kustlijn langs de Middellandse Zee en de Atlantische Oceaan.')],
          [LostInTheForest.locale.t('Griekenland'), LostInTheForest.locale.t('Griekenland is een land in Zuidoost-Europa dat bestaat uit honderden eilanden. Het heeft een lange kustlijn met toegang tot de Middellandse Zee.')],
          [LostInTheForest.locale.t('Frankrijk'), LostInTheForest.locale.t('Frankrijk is een land in West-Europa met bergen en stranden. Het heeft kustlijnen langs de Atlantische Oceaan en de Middellandse Zee.')]
        ]); // Coastal Nations

        categoryData.push([
          [LostInTheForest.locale.t('Egypte'), LostInTheForest.locale.t('Egypte is een land in Noord-Afrika dat grotendeels uit woestijn bestaat. Het herbergt de Sahara, de grootste hete woestijn ter wereld.')],
          [LostInTheForest.locale.t('Saoedi-Arabië'), LostInTheForest.locale.t('Saoedi-Arabië is een groot land in het Midden-Oosten. Grote delen van het land zijn bedekt door woestijn, zoals de Rub al Khali.')],
          [LostInTheForest.locale.t('Australië'), LostInTheForest.locale.t('Australië is een groot land en continent op het zuidelijk halfrond. Het heeft verschillende woestijnen, zoals de Grote Victoriawoestijn.')],
          [LostInTheForest.locale.t('Verenigde Staten'), LostInTheForest.locale.t('De Verenigde Staten is een groot land in Noord-Amerika. Het heeft verschillende woestijnen, zoals de Mojave woestijn en de Sonora woestijn, die zich bevinden in staten zoals Californië en Arizona.')]
        ]); // Countries with Deserts

        categoryNames = [
          LostInTheForest.locale.t('Eilandnaties'),
          LostInTheForest.locale.t('Landen zonder toegang tot zee'),
          LostInTheForest.locale.t('Kustnaties'),
          LostInTheForest.locale.t('Landen met woestijnen')
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
      LostInTheForest.keyGeography = true;
    }
    if (this.leavingChallenge()) {
      return new SummerArea(this.player);
    }
    if (this.nextDifficulty) {
      return new GeographyChallenge(this.nextDifficulty, this.player);
    }
    return null;
  }
}
