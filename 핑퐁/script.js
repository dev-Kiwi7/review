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
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red',
    'gray'
];

//블록 정의 
const tetrisblock = [
    [
        [1, 1, 1, 1],  // I
    ],
    [
        [0, 1, 0],
        [1, 1, 1],     // T
    ],
    [
        [1, 1],
        [1, 1],        // O
    ],
    [
        [0, 1, 1],
        [1, 1, 0],     // S
    ],
    [
        [1, 1, 0],
        [0, 1, 1],     // Z
    ],
    [
        [1, 0, 0],
        [1, 1, 1],     // J
    ],
    [
        [0, 0, 1],
        [1, 1, 1],     // L
    ],
    [
        [0, 1, 0],
        [0, 1, 0],     
        [0, 1, 0],     
        [0, 1, 0],     // l
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
            if(cell){
                context.fillRect((colIndex+x)*grid,(rowIndex+y)*grid,grid,grid);
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
  drawTetrisBlock(currentShape, x, y, currentColor); // 블럭 그리기
  drawGrid(); // 그리드 다시 그리기
}


//움직이기
function move(){
  y += 1;  // 한 칸 아래로
  render();
}

function startGame() {
   // score = 0;
    //scoreDisplay.textContent = 'Score: 0';
    setInterval(move,1000);
}

// document.addEventListener('keydown', control);
addEventListener("load",()=>{
    drawTetrisBlock(currentShape, 3, 0, currentColor); // (9, 0) 위치에 그림
    drawGrid();
})