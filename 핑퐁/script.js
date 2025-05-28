// const rows = 20;
// const cols = 10;

// 1) grid 그리드 크기 설정 
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

const grid = 30;  // 테트리스 그리드 크기
const cols = canvas.width / grid;
const rows = canvas.height / grid;


function drawGrid() {
  context.strokeStyle = '#333'; // 선 색상

  // 세로줄
  for (let x = 0; x <= canvas.width; x += grid) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  // 가로줄
  for (let y = 0; y <= canvas.height; y += grid) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }
}

// 호출
drawGrid();


// let board = [];
// let boardDiv = document.getElementById('board');
// let score = 0;
// let scoreDisplay = document.getElementById('score');
// let currentBlock;
// let currentPosition;
// let currentRotation;
// let dropInterval;
// const tetrominoes = [
//   // I
//   [[1, cols + 1, cols * 2 + 1, cols * 3 + 1]],
//   // O
//   [[0, 1, cols, cols + 1]],
//   // T
//   [[1, cols, cols + 1, cols + 2]],
//   // S
//   [[1, 2, cols, cols + 1]],
//   // Z
//   [[0, 1, cols + 1, cols + 2]],
//   // J
//   [[0, cols, cols + 1, cols + 2]],
//   // L
//   [[2, cols, cols + 1, cols + 2]]
// ];

// function createBoard() {
//   board = new Array(rows * cols).fill(0);
//   boardDiv.innerHTML = '';
//   for (let i = 0; i < rows * cols; i++) {
//     const cell = document.createElement('div');
//     cell.classList.add('cell');
//     boardDiv.appendChild(cell);
//   }
// }

// function draw() {
//   currentBlock.forEach(index => {
//     const pos = currentPosition + index;
//     if (pos >= 0) board[pos] = 1;
//   });
//   updateDisplay();
// }

// function undraw() {
//   currentBlock.forEach(index => {
//     const pos = currentPosition + index;
//     if (pos >= 0) board[pos] = 0;
//   });
// }

// function updateDisplay() {
//   const cells = document.querySelectorAll('.cell');
//   board.forEach((value, i) => {
//     cells[i].classList.toggle('filled', value === 1);
//   });
// }

// function generateBlock() {
//   const rand = Math.floor(Math.random() * tetrominoes.length);
//   currentBlock = tetrominoes[rand][0];
//   currentPosition = 3; // Start in the middle
// }

// function moveDown() {
//   undraw();
//   if (canMove(cols)) {
//     currentPosition += cols;
//   } else {
//     freeze();
//     clearLines();
//     generateBlock();
//     if (!canMove(0)) {
//       clearInterval(dropInterval);
//       alert('Game Over');
//     }
//   }
//   draw();
// }

// function canMove(offset) {
//   return currentBlock.every(index => {
//     const pos = currentPosition + index + offset;
//     const nextRow = Math.floor((currentPosition + index + offset) / cols);
//     const curRow = Math.floor((currentPosition + index) / cols);

//     return pos < rows * cols &&
//            board[pos] === 0 &&
//            !(offset === 1 && curRow !== nextRow) &&
//            !(offset === -1 && curRow !== nextRow);
//   });
// }

// function freeze() {
//   currentBlock.forEach(index => {
//     const pos = currentPosition + index;
//     board[pos] = 2; // Frozen block
//   });
// }

// function clearLines() {
//   for (let r = 0; r < rows; r++) {
//     const start = r * cols;
//     const line = board.slice(start, start + cols);
//     if (line.every(val => val === 2)) {
//       board.splice(start, cols);
//       board.unshift(...new Array(cols).fill(0));
//       score += 100;
//     }
//   }
//   scoreDisplay.textContent = `Score: ${score}`;
//   updateDisplay();
// }

// function moveLeft() {
//   if (canMove(-1)) {
//     undraw();
//     currentPosition -= 1;
//     draw();
//   }
// }

// function moveRight() {
//   if (canMove(1)) {
//     undraw();
//     currentPosition += 1;
//     draw();
//   }
// }

// function rotate() {
//   // simple 90-degree rotation - for simplicity, no complex shape rotation
//   // (this implementation uses only one rotation shape)
// }

// function control(e) {
//   switch (e.keyCode) {
//     case 37: moveLeft(); break;    // left arrow
//     case 39: moveRight(); break;   // right arrow
//     case 40: moveDown(); break;    // down arrow
//     case 38: rotate(); break;      // up arrow
//   }
// }

//배열 생성 및 위치별 색상 정의 

let board = Array.from({ length: rows }, () => Array(cols).fill(0));

const colors = [
    null,
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];

// 3) 테트로미노 블록 정의 

const tetrominoes = [
    [
        [1, 1, 1, 1],  // I
    ],
    [
        [0, 2, 0],
        [2, 2, 2],     // T
    ],
    [
        [3, 3],
        [3, 3],        // O
    ],
    [
        [0, 4, 4],
        [4, 4, 0],     // S
    ],
    [
        [5, 5, 0],
        [0, 5, 5],     // Z
    ],
    [
        [6, 0, 0],
        [6, 6, 6],     // J
    ],
    [
        [0, 0, 7],
        [7, 7, 7],     // L
    ]
];

function createPiece(type) {
    return tetrominoes[type];
}
function startGame() {
  score = 0;
  //scoreDisplay.textContent = 'Score: 0';
  generateBlock();
  draw();
  clearInterval(dropInterval);
  dropInterval = setInterval(moveDown, 500);
}

// document.addEventListener('keydown', control);
