import { Game } from './modules/game.js';
import { View } from './modules/view.js';
import { Controller } from './modules/controller.js';

export const SIZE_BLOCK = 31;
export const COLUMNS = 10;
export const ROWS = 20;
export const startWrapper = document.querySelector('.start-wrapper');
export const theme = document.querySelector('.music');
export const stopMoveSFX = document.querySelector('.stop-move');
export const clearRowSFX = document.querySelector('.clear-row');
export const gameOverSFX = document.querySelector('.game-over');
export const highScoreSFX = document.querySelector('.high-score');

const game = new Game();
const view = new View(document.querySelector('.container'));
const controller = new Controller(game, view);

controller.init('Enter');
