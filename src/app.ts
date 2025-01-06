import LostInTheForest from './LostInTheForest.js';

const game: LostInTheForest = new LostInTheForest(document.getElementById('game') as HTMLCanvasElement);

window.addEventListener('load', () => {
  game.start();
});
