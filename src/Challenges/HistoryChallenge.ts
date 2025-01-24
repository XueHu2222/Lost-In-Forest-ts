import AutumnArea from '../Areas/AutumnArea.js';
import LostInTheForest from '../LostInTheForest.js';
import Player from '../Player.js';
import Stage from '../Stage.js';
import Challenge from './Challenge.js';
import Animal from '../Animal.js';

export default class HistoryChallenge extends Challenge {
  public constructor(difficultyLevel: string, player: Player, isDutch: boolean) {
    super(difficultyLevel, player, isDutch);
    const categoryData: string[][][] = [];
    this.animal = new Animal(LostInTheForest.canvas.width * 0.8, LostInTheForest.canvas.height * 0.66, 'frog', 5);

    // Pushes the correct data for each category based on the difficulty
    switch (difficultyLevel) {
      case 'easy':
        categoryData.push([
          ['Tanks', 'Een tank is een zwaar gepantserd voertuig met een kanon en rupsbanden,     essentieel in WOII voor mobiele vuurkracht en het doorbreken van linies.'],
          ['Anne Frank', 'Anne Frank was een Joods meisje dat een dagboek schreef terwijl ze         ondergedoken zat voor de nazis, het dagboek gaf inzicht in haar leven.'],
          ['Duitsland / Germany', 'Duitsland, onder leiding van Hitler, begon WOII en viel veel landen in     Europa binnen, wat het een sleutelrol in het conflict gaf.'],
          ['Soldaten / Soldiers', 'Soldaten vochten in veldslagen tijdens de oorlog, verdedigden hun landen ennamen deel aan militaire operaties op verschillende fronten.']]
        ); // World War 2
        categoryData.push([
          ['Kastelen / Castles', 'Kastelen waren grote stenen gebouwen waar koningen, koninginnen en ridders woonden en bescherming boden tijdens gevechten. '],
          ['Ridders / Knights', 'Ridders waren geharnaste soldaten die dienden voor koningen en koninginnen, te paard gingen en het land en de mensen verdedigden.'],
          ['Koning / Kings', 'Koningen regeerden over landen, in kastelen waar ze toezicht hielden op het land en de bevolking.'],
          ['Koningin / Queen', 'Koninginnen waren heersers of de vrouwen van koningen, die hielpen bij het beheer van het land.']]
        ); // The Dark Ages
        categoryData.push([
          ['Romeinen / The Romans', 'De Romeinen waren mensen uit het oude Rome, bekend om het bouwen van wegen, steden en monumenten zoals het Colosseum.'],
          ['Grieken / The Greeks', 'De Grieken kwamen uit het oude Griekenland, beroemd om hun kunst en ideeën, en begonnen de Olympische Spelen en bouwden indrukwekkende tempels.'],
          ['Gladiatoren / Gladiators', 'Gladiatoren waren vechters in het oude Rome die het publiek vermaakten door in grote arenas zoals het Colosseum tegen elkaar of dieren te vechten.'],
          ['Colosseum', 'Het Colosseum, een enorme stenen arena in Rome, was belangrijk voor        gladiatorengevechten en publieke spektakels in het oude Rome.']]
        ); // Antiquity
        categoryData.push([
          ['Mammoet / Mammoth', 'Een mammoet was een groot, harig dier zoals een olifant, waarop vroege     mensen jaagden voor voedsel, vacht en botten.'],
          ['Vuur / Fire', 'Vuur geeft warmte en licht, het was essentieel voor vroege mensen om te    koken, warm te blijven en zich te beschermen tegen roofdieren.'],
          ['Grotten / Caves', 'Grotten zijn natuurlijke ruimtes in rotsen of bergen waar vroege mensen    woonden voor veiligheid en grotschilderingen maakten.'],
          ['Steen / Stone', 'Stenen zijn harde rotsen die vroege mensen gebruikten om gereedschappen en onderkomens te maken, essentieel voor hun overleving.']]
        ); // Prehistory
        break;
      case 'medium':
        categoryData.push([
          ['D-Day', 'D-Day was een belangrijke veldslag op 6 juni 1944. Op die dag gingen solda-ten uit verschillende landen naar Frankrijk om Duitsland te verslaan.'],
          ['Holocaust', 'De Holocaust was een tragische gebeurtenis tijdens de Tweede Wereldoorlog, waarbij miljoenen Joodse mensen en anderen werden vervolgd of gedood.'],
          ['Atoombom / Atomic Bomb', 'Een atoombom is een krachtig wapen dat hele steden kan verwoesten. In 1945 werden twee bommen op Japan gegooid, wat het einde van de oorlog betekende.'],
          ['1939', '1939 markeerde het begin van de Tweede Wereldoorlog toen Duitsland Polen   binnenviel, wat leidde tot een wereldomvattend conflict dat duurde tot 1945']]
        ); // World War 2
        categoryData.push([
          ['Kruistochten / Crusades', 'De kruistochten waren lange reizen waarbij ridders naar het Midden-Oosten  gingen om de heilige stad Jeruzalem te veroveren.'],
          ['Monniken / Monks', 'Monniken waren mannen die in kloosters leefden. Ze bewaakten kennis tijdens de Middeleeuwen door boeken te schrijven en les te geven.'],
          ['Adel / Nobility', 'Edelen waren rijke en machtige landeigenaren die in kastelen woonden, over boeren en ridders heersten en wetten maakten om hun land te beschermen.'],
          ['De Pest / The Plague', 'De pest, ook wel de Zwarte Dood genoemd, was een dodelijke ziekte die zich over Europa verspreidde en miljoenen mensen doodde.']]
        ); // The Dark Ages
        categoryData.push([
          ['Olympische Spelen / Olympic Games', 'De Olympische Spelen begonnen in het oude Griekenland als sportwedstrijden om Zeus, de koning van de Griekse goden, te eren.'],
          ['Mythologie / Mythology', 'Mythologie is de verzameling van verhalen over goden, helden en wezens,    verteld door de Grieken en Romeinen om de natuur en het leven uit te leggen.'],
          ['Julius Caesar', 'Julius Caesar was een machtige leider van het oude Rome die gebieden       veroverde, Rome versterkte en heerser werd voordat hij werd vermoord.'],
          ['Filosofie / Philosophy', 'Filosofie is de studie van kennis en grote vragen over het leven.']]
        ); // Antiquity
        categoryData.push([
          ['Homo Sapiens', 'Homo sapiens waren vroege mensen die het meest op ons van vandaag lijken.  Ze jaagden op dieren, verzamelden voedsel en maakten gereedschap.'],
          ['Jagers / Hunters', 'Jagers waren mensen die dieren vingen voor voedsel, en gebruikten          gereedschap zoals speren en bogen om te jagen voor hun overleving.'],
          ['Boeren / Farmers', 'Boeren verbouwden gewassen en hielden dieren voor voedsel, waardoor mensen op één plek konden blijven en dorpen konden bouwen.'],
          ['Verzamelaars / Gatherers', 'Verzamelaars verzamelden planten, vruchten, noten en bessen om te eten, en trokken rond om voedsel te vinden voordat de landbouw begon.']]
        ); // Prehistory
        break;
      case 'hard':
        categoryData.push([
          ['Blitzkrieg', 'Blitzkrieg, dat "bliksemoorlog" betekent, was een strategie waarbij het    Duitse leger snel aanviel om veldslagen snel te winnen.'],
          ['Kristallnacht', 'Kristallnacht, of de "Nacht van het Gebroken Glas", was een tragische      gebeurtenis in 1938 waarin Joodse huizen en gebouwen werden verwoest.'],
          ['Geallieerden / Allies', 'De geallieerden, waaronder de VS, Groot-Brittannië en de Sovjet-Unie,      werkten samen om Duitsland en zijn bondgenoten te verslaan'],
          ['Pearl Harbor', 'Pearl Harbor, in Hawaï, werd op 7 december 1941 aangevallen door Japan, wat leidde tot de deelname van de VS aan de Tweede Wereldoorlog.']]
        ); // World War 2
        categoryData.push([
          ['Karel de Grote / Charlemagne', 'Karel de Grote, een koning die over een groot deel van Europa regeerde,    verenigde landen en bracht onderwijs en orde terug tijdens de Middeleeuwen.'],
          ['Horigen / Serfs', 'Horigen waren boeren die op het land van edelen werkten, voedsel verbouwden en niet zonder toestemming mochten vertrekken.'],
          ['Leenstelsel / Loan System', 'Het leenstelsel gaf koningen de mogelijkheid om land aan edelen te geven in ruil voor trouw en bescherming, wat zorgde voor organisatie.'],
          ['Vikingen / Vikings', 'Vikingen, dappere zeevaarders en krijgers uit Scandinavië verkenden, handelden en vielen soms Europese steden en dorpen aan.']]
        ); // The Dark Ages
        categoryData.push([
          ['Alexander de Grote / Alexander the Great', 'Alexander de Grote een koning van het oude Griekenland creëerde een van de grootste rijken in de geschiedenis en verspreidde de Griekse cultuur.'],
          ['Democratie / Democracy', 'Democratie, uitgevonden door de oude Grieken, geeft mensen de mogelijkheid om te stemmen en beslissingen te beïnvloeden, en wordt nog steeds gebruikt.'],
          ['Akropolis / Acropolis', 'De Akropolis, een heuvel in Athene met tempels zoals het Parthenon, was het culturele en religieuze centrum van het oude Athene.'],
          ['Cleopatra', 'Cleopatra, een koningin van het oude Egypte, was invloedrijk en bekend om   haar relaties met Romeinse leiders zoals Julius Caesar en Marcus Antonius.']]
        ); // Antiquity
        categoryData.push([
          ['Neanderthaler', 'Neanderthalers waren vroege mensen uit de ijstijd die jaagden, gereedschap maakten en in grotten leefden.'],
          ['Grotschilderingen / Cave Paintings', 'Grotschilderingen, door vroege mensen op muren gemaakt, tonen dieren en het dagelijks leven en zijn een van de eerste kunstvormen.'],
          ['Nomaden / Nomads', 'Nomaden trokken rond om voedsel en onderdak te vinden. Ze jaagde op dieren en verzamelde zonder lang op één plek te blijven.'],
          ['Stenen Werktuigen / Stone Tools', 'Stenen werktuigen, gemaakt van rotsen, waren cruciaal voor vroege mensen om te jagen, vlees te snijden en onderdak te bouwen.']]
        ); // Prehistory
        break;
    }
    const categoryNames: string[] = ['World War 2', 'The Dark Ages', 'Antiquity', 'Prehistory'];
    this.challengeScience = 'History';
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
      return new AutumnArea(this.player, this.isDutch);
    }
    if (this.nextDifficulty) {
      return new HistoryChallenge(this.nextDifficulty, this.player, this.isDutch);
    }
    return null;
  }
}
