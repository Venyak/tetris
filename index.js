import { Game } from './modules/game.js';

const game = new Game();
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
    showArea(game.viewArea);
  }

  if (game.gameReady) {
    switch (key) {
      case 'ArrowLeft':
        game.moveLeft();
        showArea(game.viewArea);
        break;
      case 'ArrowRight':
        game.moveRight();
        showArea(game.viewArea);
        break;
      case 'ArrowDown':
        game.moveDown();
        showArea(game.viewArea);
        break;
      case 'ArrowUp':
        game.rotateTetramino();
        showArea(game.viewArea);
        break;
    }
  }
});
