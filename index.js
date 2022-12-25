const SIZE_BLOCK = 30;

// Механика игры

const game = {
  area: [
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x'],
    ['o', 'o', 'o', 'x', 'x', 'o', 'o', 'o', 'o', 'x'],
    ['o', 'o', 'o', 'x', 'x', 'o', 'o', 'o', 'x', 'x'],
  ],
  activeTetramino: {
    x: 3,
    y: 0,
    block: [
      ['o', 'o', 'o'],
      ['o', 'x', 'x'],
      ['x', 'x', 'o'],
    ],
  },
  moveLeft() {
    if (this.checkOutPosition(this.activeTetramino.x - 1, this.activeTetramino.y)) {
      this.activeTetramino.x -= 1;
    }
  },
  moveRight() {
    if (this.checkOutPosition(this.activeTetramino.x + 1, this.activeTetramino.y)) {
      this.activeTetramino.x += 1;
    }
  },
  moveDown() {
    if (this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y + 1)) {
      this.activeTetramino.y += 1;
    }
  },
  rotateTetramino() {},
  get viewArea() {
    const area = JSON.parse(JSON.stringify(this.area));
    const { x, y, block } = this.activeTetramino;

    for (let i = 0; i < block.length; i++) {
      const row = block[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === 'x') {
          area[y + i][x + j] = block[i][j];
        }
      }
    }

    return area;
  },
  checkOutPosition(x, y) {
    const tetramino = this.activeTetramino.block;

    for (let i = 0; i < tetramino.length; i++) {
      const row = tetramino[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === 'o') continue;
        if (!this.area[y + i] || !this.area[y + i][x + j] || this.area[y + i][x + j] === 'x') {
          return false;
        }
      }
    }
    return true;
  },
};

// Отрисовка
const container = document.querySelector('.container');

const canvas = document.createElement('canvas');
container.append(canvas);
canvas.classList.add('game-area');
canvas.width = SIZE_BLOCK * 10;
canvas.height = SIZE_BLOCK * 20;

const context = canvas.getContext('2d');

const showArea = (area) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < area.length; y++) {
    const line = area[y];

    for (let x = 0; x < line.length; x++) {
      const block = line[x];
      if (block === 'x') {
        context.fillStyle = 'purple';
        context.strokeStyle = 'white';
        context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
        context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
      }
    }
  }
};

window.addEventListener('keydown', (event) => {
  const key = event.code;

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
});

showArea(game.viewArea);
