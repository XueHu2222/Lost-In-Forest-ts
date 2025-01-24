import SummerArea from '../Areas/SummerArea.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';
import Animal from '../Animal.js';

export default class GeographyChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player, isDutch: boolean) {
    super(difficultyLevel, player, isDutch);
    const categoryData: string[][][] = [];
    let categoryNames: string[] = [];
    this.animal = new Animal(LostInTheForest.canvas.width * 0.8, LostInTheForest.canvas.height * 0.66, 'owl', 6);

    // Pushes the correct data for each category based on the difficulty
    switch (difficultyLevel) {
      case 'easy':
        categoryData.push([
          ['Chocolade / Chocolate', 'Chocolade is een zoete lekkernij gemaakt van cacaobonen, waarbij België    bekendstaat om zijn hoogwaardige chocolade.'],
          ['Brussel / Brussels', 'Brussel de hoofdstad van België, is belangrijk als regeringscentrum en     herbergt het hoofdkwartier van de Europese Unie.'],
          ['Friet / Fries', 'Frieten worden door België geclaimd als hun uitvinding, met "Belgische     frieten" die wereldwijd bekend staan om hun unieke smaak en dikte.'],
          ['Wafels / Waffles', 'Wafels zijn een Belgische specialiteit met twee beroemde soorten: Brusselse wafels (licht en luchtig) en Luikse wafels (zoet en gekarameliseerd).']]
        ); // Belgium
        categoryData.push([
          ['Windmolen / Windmill', 'Nederland staat bekend om zijn historische windmolens en ze werden gebruikt om energie op te wekken of graan te malen. '],
          ['Kanaal / Canal', 'Een kanaal is een door mensen gemaakte waterweg die wordt gebruikt voor    transport en waterbeheer. Nederland heeft veel kanalen.'],
          ['Fietsen / Bicycles', 'Nederland staat bekend als de fietshoofdstad van de wereld, met meer       fietsen dan mensen.'],
          ['Tulpen / Tulips', 'Tulpen zijn mooie bloemen die in de lente bloeien. Nederland is beroemd om zijn uitgestrekte tulpenvelden en tulpenfestivals, en het exporteert       miljoenen tulpenbollen wereldwijd.']]
        ); // Netherlands
        categoryData.push([
          ['Bratwurst', 'Duitsland staat bekend om de bratwurst en is een traditioneel gerecht dat  vaak wordt gegeten tijdens festivals en maaltijden.'],
          ['Schnitzel', 'Schnitzel is een dun stuk vlees, meestal varkensvlees, dat gepaneerd en    gefrituurd wordt. Het is een van de beroemdste Duitse gerechten.'],
          ['Oktoberfest', 'Oktoberfest is een groot festival dat de Beierse cultuur viert met         traditioneel eten, muziek en bier.'],
          ['Berlijn / Berlin', 'Berlijn is de hoofdstad van Duitsland. Het is een belangrijk cultureel en  historisch centrum, bekend om bezienswaardigheden zoals de Berlijnse Muur. ']]
        ); // Germany
        categoryData.push([
          ['Big Ben', 'Big Ben is een beroemde klokkentoren in Londen. Het is een symbool van     Engeland en zijn hoofdstad Londen. '],
          ['Royalty', 'Royalty verwijst naar de koninklijke familie die deel uitmaken van een     monarchie. Engeland staat hier wereldwijd bekend om. '],
          ['Thee / Tea', 'Thee is een warme drank die wordt gemaakt door gedroogde theebladeren in   water te laten trekken. Thee drinken is een grote traditie in Engeland.'],
          ['Rode Telefooncellen / Red Telephone Boxes', 'Rode telefooncellen zijn kleine hokjes met openbare telefoons. De rode     telefooncel is een iconisch symbool van Engeland, vooral in steden zoals   Londen.']]
        ); // England

        categoryNames = ['Belgium', 'Netherlands', 'Germany', 'England'];
        break;
      case 'medium':
        categoryData.push([
          ['Frankrijk / France', 'Frankrijk is een land in Europa en staat bekend om zijn rijke cultuur,     eten, wijn, mode en bezienswaardigheden zoals de Eiffeltoren. '],
          ['Italië / Italy', 'Italië is een land in Europa en staat bekend om zijn eten, kunst en oude   geschiedenis zoals de Grieken en Romeinen. '],
          ['Spanje / Spain', 'Spanje is een land in Europa en staat bekend om flamencodansen, mooie      stranden en traditionele gerechten zoals paella.'],
          ['Zweden / Sweden', 'Zweden is een land in Europa en staat bekend om zijn prachtige bossen,     meren en moderne steden zoals Stockholm. ']]
        ); // Europe
        categoryData.push([
          ['Japan', 'Japan is een eilandnatie in Azië, beroemd om zijn technologie,             kersenbloesems en traditionele cultuur. '],
          ['India', 'India, een land in Zuid-Azië, staat bekend om zijn rijke geschiedenis,     cultuur en bezienswaardigheden zoals de Taj Mahal. '],
          ['Thailand', 'Thailand, een land in Zuidoost-Azië staat bekend om zijn prachtige         stranden, tempels en traditioneel Thais eten. '],
          ['Korea', 'Zuid-Korea, een land in Azië staat bekend om K-Pop, technologie en         gerechten zoals kimchi. ']]
        ); // Asia
        categoryData.push([
          ['Egypte / Egypt', 'Egypte, een land in Afrika, staat bekend om zijn oude piramides, de Sfinx  en zijn rijke geschiedenis. '],
          ['Zuid-Afrika / South Africa', 'Zuid-Afrika een land in Afrika, staat bekend om zijn diverse culturen, die-ren, prachtige landschappen en levendige steden zoals Kaapstad.'],
          ['Kenia / Kenya', 'Kenia, een land in Afrika, staat bekend om zijn safari’s, wilde dieren     zoals leeuwen en olifanten en prachtige landschappen.'],
          ['Nigeria', 'Nigeria, een land in Afrika, staat bekend om zijn grote bevolking,         diversiteit en Nollywood, de op een na grootste filmindustrie ter wereld. ']]
        ); // Africa
        categoryData.push([
          ['Verenigde Staten / United States', 'De V.S. een land in Noord-Amerika staat bekend om grote steden zoals       New York, iconische bezienswaardigheden en zijn invloed op de wereld.'],
          ['Brazilië / Brazil', 'Brazilië, een land in Zuid-Amerika staat bekend om het Amazonewoud,        levendige carnavalsfeesten en zijn bruisende cultuur.'],
          ['Canada', 'Canada, een land in Noord-Amerika, staat bekend om zijn verbluffende       landschappen, uitgestrekte bossen en bruisende steden zoals Toronto.'],
          ['Argentinië / Argentina', 'Argentinië, een land in Zuid-Amerika, staat bekend om de tangodans, het    wereldberoemde rundvlees en de Andes. ']]
        ); // Americas

        categoryNames = ['Europe', 'Asia', 'Africa', 'Americas'];
        break;
      case 'hard':
        categoryData.push([
          ['Japan', 'Japan is een eilandnatie in Azië, bestaande uit meer dan 6.000 eilanden.'],
          ['IJsland / Iceland', 'IJsland is een klein eiland in de Noord-Atlantische Oceaan. Bekend om zijn vulkanen, gletsjers en prachtige landschappen'],
          ['Madagaskar / Madagascar', 'Madagaskar is een groot eiland voor de kust van Afrika. Beroemd om zijn     unieke dieren, zoals lemuren. '],
          ['Verenigd Koninkrijk / United Kingdom', 'Het Verenigd Koninkrijk is een eiland bestaande uit Engeland, Schotland,   Wales en Noord-Ierland. ']]
        ); // Island Nations
        categoryData.push([
          ['Zwitserland / Switzerland', 'Zwitserland is een klein land in Europa, omringd door bergen. Het heeft    geen kustlijn en is omringd door landen zoals Frankrijk en Italië.'],
          ['Oostenrijk / Austria', 'Oostenrijk is een land in Centraal-Europa, bekend om zijn bergen en steden zoals Wenen. Het is volledig landlocked, zonder toegang tot de zee.'],
          ['Hongarije / Hungary', 'Hongarije is een land in Centraal-Europa. Het is landlocked zonder kustlijn, en wordt omringd door landen zoals Oostenrijk, Slowakije en Roemenië.'],
          ['Tsjechië / Czech Republic', 'Tsjechië is een land in Centraal-Europa, bekend om zijn kastelen en        hoofdstad Praag. Het is landlocked, omringd door andere landen zonder      toegang tot de oceaan.']]
        ); // Landlocked Countries
        categoryData.push([
          ['Noorwegen / Norway', 'Noorwegen is een land in Noord-Europa met een lange kustlijn. Het heeft    duizenden kilometers kustlijn, met fjorden en toegang tot de Oceaan.'],
          ['Spanje / Spain', 'Spanje is een land in Zuid-Europa. Het heeft een lange kustlijn langs de   Middellandse Zee en de Atlantische Oceaan. '],
          ['Griekenland / Greece', 'Griekenland is een land in Zuidoost-Europa dat bestaat uit honderden eilan-den. Het heeft een lange kustlijn met toegang tot de Middellandse Zee.'],
          ['Frankrijk / France', 'Frankrijk is een land in West-Europa met bergen en stranden. Het heeft kustlijnen langs de Atlantische Oceaan en de Middellandse Zee.']]
        ); // Coastal Nations
        categoryData.push([
          ['Egypte / Egypt', 'Egypte is een land in Noord-Afrika dat grotendeels uit woestijn bestaat.   Het herbergt de Sahara, de grootste hete woestijn ter wereld.'],
          ['Saoedi-Arabië / Saudi Arabia', 'Saoedi-Arabië is een groot land in het Midden-Oosten. Grote delen van het   land zijn bedekt door woestijn, zoals de Rub al Khali.'],
          ['Australië / Australia', 'Australië is een groot land en continent op het zuidelijk halfrond. Het    heeft verschillende woestijnen, zoals de Grote Victoriawoestijn. '],
          ['Verenigde Staten / United States', 'De Verenigde Staten is een groot land in Noord-Amerika. Het heeft verschillende woestijnen, zoals de Mojave woestijn en de Sonora woestijn, die zich  bevinden in staten zoals Californië en Arizona.']]
        ); // Countries with Deserts

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
    if (this.clickedFinished) {
      LostInTheForest.keyGeography = true;
    }
    if (this.leavingChallenge()) {
      return new SummerArea(this.player, this.isDutch);
    }
    if (this.nextDifficulty) {
      return new GeographyChallenge(this.nextDifficulty, this.player, this.isDutch);
    }
    return null;
  }
}
