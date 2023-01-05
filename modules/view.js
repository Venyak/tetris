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
    const prev = document.createElement('div');
    prev.classList.add('preview-button');
    startWrapper.append(prev);
    prev.insertAdjacentText('afterbegin', 'Press ENTER');
  }

  init() {
    this.container.textContent = '';
    this.canvas.style.gridArea = 'game';
    this.container.append(this.canvas);
    this.canvas.classList.add('game-area');
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }

  createBlockScore() {
    const scoreBlock = document.createElement('div');
    scoreBlock.style.cssText = `
			border: 2px solid black;
			font-size: 20px;
			text-align: center;
			grid-area: score;
			padding: 20px;
		`;

    const linesElem = document.createElement('p');
    const scoreElem = document.createElement('p');
    const levelElem = document.createElement('p');
    const recordElem = document.createElement('p');

    scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

    this.container.append(scoreBlock);
  }

  createBlockNextTetramino() {
    const tetraminoBlock = document.createElement('div');
    tetraminoBlock.style.cssText = `
			border: 2px solid black;
			width: ${SIZE_BLOCK * 4}px;
			height: ${SIZE_BLOCK * 4}px;
			font-size: 20px;
			text-align: center;
			grid-area: next;
			padding: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
		`;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    tetraminoBlock.append(canvas);

    this.container.append(tetraminoBlock);
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
