import AutumnArea from '../Areas/AutumnArea.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';
import Animal from '../Animal.js';

export default class HistoryChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player) {
    super(difficultyLevel, player);
    this.animal = new Animal(LostInTheForest.canvas.width * 0.8, LostInTheForest.canvas.height * 0.66, 'frog', 5);
    this.challengeScience = 'History';
  }

  protected initiateData(): void {
    const categoryData: string[][][] = [];
    const categoryNames: string[] = [
      LostInTheForest.locale.t('Tweede wereldoorlog'),
      LostInTheForest.locale.t('Middeleeuwen'),
      LostInTheForest.locale.t('Oudheid'),
      LostInTheForest.locale.t('Prehistory'),
    ];

    // Pushes the correct data for each category based on the difficulty
    switch (this.difficultyLevel) {
      case 'easy':
        categoryData.push([
          [LostInTheForest.locale.t('Tanks'), LostInTheForest.locale.t('Een tank is een zwaar gepantserd voertuig met een kanon en rupsbanden, essentieel in WOII voor mobiele vuurkracht en het doorbreken van linies.')],
          [LostInTheForest.locale.t('Anne Frank'), LostInTheForest.locale.t('Anne Frank was een Joods meisje dat een dagboek schreef terwijl ze ondergedoken zat voor de nazis, het dagboek gaf inzicht in haar leven.')],
          [LostInTheForest.locale.t('Duitsland'), LostInTheForest.locale.t('Duitsland, onder leiding van Hitler, begon WOII en viel veel landen in Europa binnen, wat het een sleutelrol in het conflict gaf.')],
          [LostInTheForest.locale.t('Soldaten'), LostInTheForest.locale.t('Soldaten vochten in veldslagen tijdens de oorlog, verdedigden hun landen en namen deel aan militaire operaties op verschillende fronten.')]
        ]); // World War 2

        categoryData.push([
          [LostInTheForest.locale.t('Kastelen'), LostInTheForest.locale.t('Kastelen waren grote stenen gebouwen waar koningen, koninginnen en ridders woonden en bescherming boden tijdens gevechten.')],
          [LostInTheForest.locale.t('Ridders'), LostInTheForest.locale.t('Ridders waren geharnaste soldaten die dienden voor koningen en koninginnen, te paard gingen en het land en de mensen verdedigden.')],
          [LostInTheForest.locale.t('Koning'), LostInTheForest.locale.t('Koningen regeerden over landen, in kastelen waar ze toezicht hielden op het land en de bevolking.')],
          [LostInTheForest.locale.t('Koningin'), LostInTheForest.locale.t('Koninginnen waren heersers of de vrouwen van koningen, die hielpen bij het beheer van het land.')]
        ]); // The Dark Ages

        categoryData.push([
          [LostInTheForest.locale.t('Romeinen'), LostInTheForest.locale.t('De Romeinen waren mensen uit het oude Rome, bekend om het bouwen van wegen, steden en monumenten zoals het Colosseum.')],
          [LostInTheForest.locale.t('Grieken'), LostInTheForest.locale.t('De Grieken kwamen uit het oude Griekenland, beroemd om hun kunst en ideeën, en begonnen de Olympische Spelen en bouwden indrukwekkende tempels.')],
          [LostInTheForest.locale.t('Gladiatoren'), LostInTheForest.locale.t('Gladiatoren waren vechters in het oude Rome die het publiek vermaakten door in grote arenas zoals het Colosseum tegen elkaar of dieren te vechten.')],
          [LostInTheForest.locale.t('Colosseum'), LostInTheForest.locale.t('Het Colosseum, een enorme stenen arena in Rome, was belangrijk voor gladiatorengevechten en publieke spektakels in het oude Rome.')]
        ]); // Antiquity

        categoryData.push([
          [LostInTheForest.locale.t('Mammoet'), LostInTheForest.locale.t('Een mammoet was een groot, harig dier zoals een olifant, waarop vroege mensen jaagden voor voedsel, vacht en botten.')],
          [LostInTheForest.locale.t('Vuur'), LostInTheForest.locale.t('Vuur geeft warmte en licht, het was essentieel voor vroege mensen om te koken, warm te blijven en zich te beschermen tegen roofdieren.')],
          [LostInTheForest.locale.t('Grotten'), LostInTheForest.locale.t('Grotten zijn natuurlijke ruimtes in rotsen of bergen waar vroege mensen woonden voor veiligheid en grotschilderingen maakten.')],
          [LostInTheForest.locale.t('Steen'), LostInTheForest.locale.t('Stenen zijn harde rotsen die vroege mensen gebruikten om gereedschappen en onderkomens te maken, essentieel voor hun overleving.')]
        ]); // Prehistory
        break;
      case 'medium':
        categoryData.push([
          [LostInTheForest.locale.t('D-Day'), LostInTheForest.locale.t('D-Day was een belangrijke veldslag op 6 juni 1944. Op die dag gingen soldaten uit verschillende landen naar Frankrijk om Duitsland te verslaan.')],
          [LostInTheForest.locale.t('Holocaust'), LostInTheForest.locale.t('De Holocaust was een tragische gebeurtenis tijdens de Tweede Wereldoorlog, waarbij miljoenen Joodse mensen en anderen werden vervolgd of gedood.')],
          [LostInTheForest.locale.t('Atoombom'), LostInTheForest.locale.t('Een atoombom is een krachtig wapen dat hele steden kan verwoesten. In 1945 werden twee bommen op Japan gegooid, wat het einde van de oorlog betekende.')],
          [LostInTheForest.locale.t('1939'), LostInTheForest.locale.t('1939 markeerde het begin van de Tweede Wereldoorlog toen Duitsland Polen binnenviel, wat leidde tot een wereldomvattend conflict dat duurde tot 1945.')]
        ]); // World War 2

        categoryData.push([
          [LostInTheForest.locale.t('Kruistochten'), LostInTheForest.locale.t('De kruistochten waren lange reizen waarbij ridders naar het Midden-Oosten gingen om de heilige stad Jeruzalem te veroveren.')],
          [LostInTheForest.locale.t('Monniken'), LostInTheForest.locale.t('Monniken waren mannen die in kloosters leefden. Ze bewaakten kennis tijdens de Middeleeuwen door boeken te schrijven en les te geven.')],
          [LostInTheForest.locale.t('Adel'), LostInTheForest.locale.t('Edelen waren rijke en machtige landeigenaren die in kastelen woonden, over boeren en ridders heersten en wetten maakten om hun land te beschermen.')],
          [LostInTheForest.locale.t('De Pest'), LostInTheForest.locale.t('De pest, ook wel de Zwarte Dood genoemd, was een dodelijke ziekte die zich over Europa verspreidde en miljoenen mensen doodde.')]
        ]); // The Dark Ages

        categoryData.push([
          [LostInTheForest.locale.t('Olympische Spelen'), LostInTheForest.locale.t('De Olympische Spelen begonnen in het oude Griekenland als sportwedstrijden om Zeus, de koning van de Griekse goden, te eren.')],
          [LostInTheForest.locale.t('Mythologie'), LostInTheForest.locale.t('Mythologie is de verzameling van verhalen over goden, helden en wezens, verteld door de Grieken en Romeinen om de natuur en het leven uit te leggen.')],
          [LostInTheForest.locale.t('Julius Caesar'), LostInTheForest.locale.t('Julius Caesar was een machtige leider van het oude Rome die gebieden veroverde, Rome versterkte en heerser werd voordat hij werd vermoord.')],
          [LostInTheForest.locale.t('Filosofie'), LostInTheForest.locale.t('Filosofie is de studie van kennis en grote vragen over het leven.')]
        ]); // Antiquity

        categoryData.push([
          [LostInTheForest.locale.t('Homo Sapiens'), LostInTheForest.locale.t('Homo sapiens waren vroege mensen die het meest op ons van vandaag lijken. Ze jaagden op dieren, verzamelden voedsel en maakten gereedschap.')],
          [LostInTheForest.locale.t('Jagers'), LostInTheForest.locale.t('Jagers waren mensen die dieren vingen voor voedsel, en gebruikten gereedschap zoals speren en bogen om te jagen voor hun overleving.')],
          [LostInTheForest.locale.t('Boeren'), LostInTheForest.locale.t('Boeren verbouwden gewassen en hielden dieren voor voedsel, waardoor mensen op één plek konden blijven en dorpen konden bouwen.')],
          [LostInTheForest.locale.t('Verzamelaars'), LostInTheForest.locale.t('Verzamelaars verzamelden planten, vruchten, noten en bessen om te eten, en trokken rond om voedsel te vinden voordat de landbouw begon.')]
        ]); // Prehistory
        break;
      case 'hard':
        categoryData.push([
          [LostInTheForest.locale.t('Blitzkrieg'), LostInTheForest.locale.t('Blitzkrieg, dat "bliksemoorlog" betekent, was een strategie waarbij het Duitse leger snel aanviel om veldslagen snel te winnen.')],
          [LostInTheForest.locale.t('Kristallnacht'), LostInTheForest.locale.t('Kristallnacht, of de "Nacht van het Gebroken Glas", was een tragische gebeurtenis in 1938 waarin Joodse huizen en gebouwen werden verwoest.')],
          [LostInTheForest.locale.t('Geallieerden'), LostInTheForest.locale.t('De geallieerden, waaronder de VS, Groot-Brittannië en de Sovjet-Unie, werkten samen om Duitsland en zijn bondgenoten te verslaan.')],
          [LostInTheForest.locale.t('Pearl Harbor'), LostInTheForest.locale.t('Pearl Harbor, in Hawaï, werd op 7 december 1941 aangevallen door Japan, wat leidde tot de deelname van de VS aan de Tweede Wereldoorlog.')]
        ]); // World War 2

        categoryData.push([
          [LostInTheForest.locale.t('Karel de Grote'), LostInTheForest.locale.t('Karel de Grote, een koning die over een groot deel van Europa regeerde, verenigde landen en bracht onderwijs en orde terug tijdens de Middeleeuwen.')],
          [LostInTheForest.locale.t('Horigen'), LostInTheForest.locale.t('Horigen waren boeren die op het land van edelen werkten, voedsel verbouwden en niet zonder toestemming mochten vertrekken.')],
          [LostInTheForest.locale.t('Leenstelsel'), LostInTheForest.locale.t('Het leenstelsel gaf koningen de mogelijkheid om land aan edelen te geven in ruil voor trouw en bescherming, wat zorgde voor organisatie.')],
          [LostInTheForest.locale.t('Vikingen'), LostInTheForest.locale.t('Vikingen, dappere zeevaarders en krijgers uit Scandinavië verkenden, handelden en vielen soms Europese steden en dorpen aan.')]
        ]); // The Dark Ages

        categoryData.push([
          [LostInTheForest.locale.t('Alexander de Grote'), LostInTheForest.locale.t('Alexander de Grote een koning van het oude Griekenland creëerde een van de grootste rijken in de geschiedenis en verspreidde de Griekse cultuur.')],
          [LostInTheForest.locale.t('Democratie'), LostInTheForest.locale.t('Democratie, uitgevonden door de oude Grieken, geeft mensen de mogelijkheid om te stemmen en beslissingen te beïnvloeden, en wordt nog steeds gebruikt.')],
          [LostInTheForest.locale.t('Akropolis'), LostInTheForest.locale.t('De Akropolis, een heuvel in Athene met tempels zoals het Parthenon, was het culturele en religieuze centrum van het oude Athene.')],
          [LostInTheForest.locale.t('Cleopatra'), LostInTheForest.locale.t('Cleopatra, een koningin van het oude Egypte, was invloedrijk en bekend om haar relaties met Romeinse leiders zoals Julius Caesar en Marcus Antonius.')]
        ]); // Antiquity

        categoryData.push([
          [LostInTheForest.locale.t('Neanderthaler'), LostInTheForest.locale.t('Neanderthalers waren vroege mensen uit de ijstijd die jaagden, gereedschap maakten en in grotten leefden.')],
          [LostInTheForest.locale.t('Grotschilderingen'), LostInTheForest.locale.t('Grotschilderingen, door vroege mensen op muren gemaakt, tonen dieren en het dagelijks leven en zijn een van de eerste kunstvormen.')],
          [LostInTheForest.locale.t('Nomaden'), LostInTheForest.locale.t('Nomaden trokken rond om voedsel en onderdak te vinden. Ze jaagde op dieren en verzamelde zonder lang op één plek te blijven.')],
          [LostInTheForest.locale.t('Stenen Werktuigen'), LostInTheForest.locale.t('Stenen werktuigen, gemaakt van rotsen, waren cruciaal voor vroege mensen om te jagen, vlees te snijden en onderdak te bouwen.')]
        ]); // Prehistory
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
      LostInTheForest.keyHistory = true;
    }
    if (this.leavingChallenge()) {
      return new AutumnArea(this.player);
    }
    if (this.nextDifficulty) {
      return new HistoryChallenge(this.nextDifficulty, this.player);
    }
    return null;
  }
}
