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
			display: flex;
      flex-direction: column;
      justify-content: space-between;
			justify-self: start;
			border: 2px solid #003566;
			font-size: 20px;
			text-align: center;
			grid-area: score;
			padding: 20px;
			width: ${SIZE_BLOCK * 5}px;
      height: ${SIZE_BLOCK * 8}px;
		`;

    const linesElem = document.createElement('p');
    const scoreElem = document.createElement('p');
    const levelElem = document.createElement('p');
    const highScoreElem = document.createElement('p');

    scoreBlock.append(linesElem, scoreElem, levelElem, highScoreElem);

    this.container.append(scoreBlock);

    return (lines, score, level, highScore) => {
      linesElem.textContent = `Lines: ${lines}`;
      scoreElem.textContent = `Score: ${score}`;
      levelElem.textContent = `Level: ${level}`;
      highScoreElem.textContent = `High Score: ${highScore}`;
    };
  }

  createBlockNextTetramino() {
    const tetraminoBlock = document.createElement('div');
    tetraminoBlock.style.cssText = `
			border: 2px solid #003566;
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

    return (tetramino) => {
      canvas.width = SIZE_BLOCK * tetramino.length;
      canvas.height = SIZE_BLOCK * tetramino.length;
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < tetramino.length; y++) {
        const line = tetramino[y];

        for (let x = 0; x < line.length; x++) {
          const block = line[x];
          if (block !== 'o') {
            context.fillStyle = this.colors[block];
            context.strokeStyle = 'white';
            context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
            context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          }
        }
      }
    };
  }

  showArea(area) {
    const context = this.canvas.getContext('2d');

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < area.length; y++) {
      const line = area[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== 'o') {
          context.fillStyle = this.colors[block];
          context.strokeStyle = 'white';
          context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
        }
      }
    }
  }
}
