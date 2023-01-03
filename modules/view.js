import { SIZE_BLOCK, COLUMNS, ROWS } from '../index.js';

export class View {
  constructor(container) {
    this.container = container;
  }

  colors = {
    J: 'IndianRed',
    I: 'YellowGreen',
    O: 'Khaki',
    L: 'RoyalBlue',
    2: 'MediumOrchid',
    T: 'LightSalmon',
    S: 'DarkSlateGray',
  };

  canvas = document.createElement('canvas');

  init() {
    this.container.append(this.canvas);
    this.canvas.classList.add('game-area');
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }

  context = canvas.getContext('2d');

  showArea(area) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < area.length; y++) {
      const line = area[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== 'o') {
          context.fillStyle = colors[block];
          context.strokeStyle = 'white';
          context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
        }
      }
    }
  }
}
