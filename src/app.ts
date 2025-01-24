import LostInTheForest from './LostInTheForest';

const game: LostInTheForest = new LostInTheForest(document.getElementById('game') as HTMLCanvasElement);

window.addEventListener('load', () => {
  game.start();
});
