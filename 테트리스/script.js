// const rows = 20;
// const cols = 10;

//grid 그리드 크기 설정 
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const grid = 30; 
const cols = canvas.width / grid;
const rows = canvas.height / grid;
let x=3;
let y=0;
//색상 정의 
const colors = [
    'rgba(0,255,255,0.7)',    // cyan
    'rgba(0,0,255,0.7)',      // blue
    'rgba(255,165,0,0.7)',    // orange
    'rgba(255,255,0,0.7)',    // yellow
    'rgba(0,255,0,0.7)',      // green
    'rgba(128,0,128,0.7)',    // purple
    'rgba(255,0,0,0.7)',      // red
    'rgba(200,200,200,0.5)',  // gray
    'rgba(255,0,0,0.7)'      // red
    
];

const BOMB_INDEX = 8;
const bombImg = new Image();
bombImg.src = './cookie.png';

//블록 정의 
const tetrisblock = [
    [
        [1, 1, 1, 1],  
    ],
    [
        [0, 1, 0],
        [1, 1, 1],     
    ],
    [
        [1, 1],
        [1, 1],        
    ],
    [
        [0, 1, 1],
        [1, 1, 0],     
    ],
    [
        [1, 1, 0],
        [0, 1, 1],     
    ],
    [
        [1, 0, 0],
        [1, 1, 1],     
    ],
    [
        [0, 0, 1],
        [1, 1, 1],     
    ],
    [
        [0, 1, 0],
        [0, 1, 0],     
        [0, 1, 0],     
        [0, 1, 0],     
    ],
    [
        [1, 1],
        [1, 1],        
    ]
    
];

//선 그리기
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

//블럭그리기
function drawTetrisBlock(shape,x,y,color){
    context.fillStyle=color
    shape.forEach((row,rowIndex)=>{
        row.forEach((cell,colIndex)=>{
            if (cell) {
                const drawX = (colIndex + x) * grid;
                const drawY = (rowIndex + y) * grid;

                // 폭탄 블럭이면 이미지로 그리기
                if (currentBlockIndex === BOMB_INDEX) {
                    context.drawImage(bombImg, drawX, drawY, grid, grid);
                } else {
                    // 일반 블럭은 색상으로 그리기
                    context.fillStyle = color;
                    context.fillRect(drawX, drawY, grid, grid);
                  
                }
            }
        })
    })
}

let currentBlockIndex = Math.floor(Math.random() * tetrisblock.length); //랜덤 블럭 숫자
let currentColorIndex = Math.floor(Math.random() * colors.length); //랜덤 색깔 숫자
let currentShape = tetrisblock[currentBlockIndex];
let currentColor = colors[currentColorIndex];

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height); // 화면 지우기
    drawGrid(); // 그리드 다시 그리기
    drawTetrisBlock(currentShape, x, y, currentColor); // 블럭 그리기
    drawField();
}

// 고정블럭 쌓인 블럭
const field = Array.from({ length: rows }, () => Array(cols).fill(0));


//기존필드그리기
function drawField() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const color = field[r][c];
      if (color) {
        context.fillStyle = color;
        context.fillRect(c * grid, r * grid, grid, grid);
      }
    }
  }
}


function clearLine() {
  for (let r = rows - 1; r >= 0; r--) {
    // 모든 칸이 null이 아니면 -> 가득 찬 줄
    if (field[r].every(cell => cell !== 0)) {
      // 그 줄 삭제
      field.splice(r, 1);
      // 맨 위에 빈 줄 추가
      field.unshift(Array(cols).fill(0));

      // 다시 같은 줄 검사하기 위해 r++
      r++;
    }
  }
}

function isCollision(shape, x, y) {
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j]) {
        const newY = y + i;
        const newX = x + j;

        // 바닥,벽
        if (newY >= rows || newX < 0 || newX >= cols) {
          return true;
        }

        // 이미 있는 블럭
        if (newY >= 0 && field[newY][newX]) {
          return true;
        }

        
      }
    }
  }
  return false;
}


function move() {
  if (!isCollision(currentShape, x, y + 1)) {
    y += 1;
  } else {
    if (currentBlockIndex === BOMB_INDEX) {
      currentShape.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell) {
            const centerY = y + i;
            const centerX = x + j;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                const fy = centerY + dy;
                const fx = centerX + dx;
                if (fy >= 0 && fy < rows && fx >= 0 && fx < cols) {
                  field[fy][fx] = 0;
                }
              }
            }
          }
        });
      });
    } else {
      currentShape.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell) {
            const fy = y + i;
            const fx = x + j;
            if (fy >= 0 && fy < rows && fx >= 0 && fx < cols) {
              field[fy][fx] = currentColor;
            }
          }
        });
      });
    }
    clearLine();

    x = Math.floor(Math.random() * (cols - 4));
    y = 0;
    currentBlockIndex = Math.floor(Math.random() * tetrisblock.length);
    currentColorIndex = Math.floor(Math.random() * colors.length);
    currentShape = tetrisblock[currentBlockIndex];
    currentColor = colors[currentColorIndex];
  }
  render();
}



function rotate(shape) {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = [];

  for (let c = 0; c < cols; c++) {
    const rotated1=[];
    for (let r = rows - 1; r >= 0; r--) {
        rotated1.push(shape[r][c]);
    }
    rotated.push(rotated1);
  }

  return rotated;
}

addEventListener("keydown",(e)=>{
    switch(e.keyCode){
        case 37: 
            if (!isCollision(currentShape, x-1, y)) {
                x=x-1;
                render();
            };
            break;
        case 38:
            const rotated = rotate(currentShape);
            if (!isCollision(rotated, x, y)) {
                currentShape = rotated;
                render();
            };break;
        case 39:
            if (!isCollision(currentShape, x+1, y)) {
                x=x+1;
                render();
            }
            break;
        case 40:
             if (!isCollision(currentShape, x, y+1)) {
                y=y+1;
                 render();
             }
            break;
  
    }
})


function startGame() {

    
    setInterval(move,1000);
}

addEventListener("load",()=>{
    drawGrid();
    drawTetrisBlock(currentShape, x, y, currentColor); // (9, 0) 위치에 그림
     
})

function Bomb() {
  currentBlockIndex = BOMB_INDEX;
  currentShape = tetrisblock[BOMB_INDEX];
  currentColor = colors[BOMB_INDEX];
  
  // 떨어뜨릴 위치 초기화
  x = Math.floor(Math.random() * (cols - 1)); // 폭탄은 1칸짜리니까
  y = 0;

  render(); 
}
