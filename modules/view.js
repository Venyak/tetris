import { SIZE_BLOCK, COLUMNS, ROWS, startWrapper } from '../index.js';

export class View {
  constructor(container) {
    this.container = container;

    if (!this.isReady) this.preview();
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
  context = this.canvas.getContext('2d');

  preview() {
    this.container.textContent = '';
    const prev = document.createElement('h3');
    prev.classList.add('preview-button');
    startWrapper.append(prev);
    prev.insertAdjacentText('afterbegin', 'press enter');
  }

  init() {
    this.container.append(this.canvas);
    this.canvas.classList.add('game-area');
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }

  showArea(area) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < area.length; y++) {
      const line = area[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== 'o') {
          this.context.fillStyle = this.colors[block];
          this.context.strokeStyle = 'white';
          this.context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          this.context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
        }
      }
    }
  }
}
