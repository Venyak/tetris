import { Game } from './modules/game.js';
import { View } from './modules/view.js';

const game = new Game();
const view = new View();
game.createTetramino();

export const SIZE_BLOCK = 30;
export const COLUMNS = 10;
export const ROWS = 20;

// Отрисовка
const container = document.querySelector('.container');

window.addEventListener('keydown', (event) => {
  const key = event.code;

  if (key === 'Enter') {
    game.startGame();
    view.showArea(game.viewArea);
  }

  if (game.gameReady) {
    switch (key) {
      case 'ArrowLeft':
        game.moveLeft();
        view.showArea(game.viewArea);
        break;
      case 'ArrowRight':
        game.moveRight();
        view.showArea(game.viewArea);
        break;
      case 'ArrowDown':
        game.moveDown();
        view.showArea(game.viewArea);
        break;
      case 'ArrowUp':
        game.rotateTetramino();
        view.showArea(game.viewArea);
        break;
    }
  }
});
