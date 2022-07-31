// khai bao bien co dinh
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'pink',
    'black',
    'white'
]
const KEYCODE = {
    LEFT : 'ArrowLeft',
    RIGHT : 'ArrowRight',
    UP : 'ArrowUp',
    DOWN : 'ArrowDown',
}
const BRICK_LAYOUT = [
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],
];
// hinh dang cua cac brick luu trong 1 mang 3 chieu
const WHITE_COLOR_ID = 7;
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
// ve canvas
ctx.canvas.width = COLS*BLOCK_SIZE;
ctx.canvas.height = ROWS* BLOCK_SIZE;

class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
        this.score = 0;
        this.gameOver = false;
        this.isPlaying = false;
    }
    reset() {
        this.score = 0;
        this.grid = this.generateWhiteBoard();
        this.gameOver = false;
        this.drawBoard()
    }
    generateWhiteBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(WHITE_COLOR_ID));
        // bang co 20 hang moi hang 10 cot va co id = 7
    }
    drawCell(xAxis, yAxis, colorId) {
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
        this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillStyle = 'black';
        this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      // ve tung o trong game
    }
    drawBoard() {
        for (let row = 0; row < this.grid.length; row++){
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col,row, this.grid[row][col])
            }
        }
    }
    handleCompleteRows(){
       const lastestGrid = board.grid.filter((row) => {
            return row.some(col => col === WHITE_COLOR_ID);
        });
       const newScore = ROWS - lastestGrid.length;
       const newRows = Array.from({length: newScore}, () => Array(COLS).fill(WHITE_COLOR_ID));
       if (newScore) {
           board.grid = [...newRows, ...lastestGrid];
           this.handleScore(newScore * 10)
       }
    }
    handleScore(newScore) {
        this.score += newScore
        document.getElementById('score').innerHTML = this.score;
    }
    handleGameOver() {
        this.gameOver = true;
        board.isPlaying = false;
        alert('Con Gà !!!')
    }
}
class Brick {
    constructor(id) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id];
        this.activeIndex = 0;
        this.colPos = 3;
        this.rowPos = -2;
    }
    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++ ){
            for (let col =0; col < this.layout[this.activeIndex][0].length; col++){
                if( this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID){
                    board.drawCell(col + this.colPos,row + this.rowPos,this.id);
                }
            }
        }
    }
    clear(){
        for (let row = 0; row < this.layout[this.activeIndex].length; row++ ){
            for (let col =0; col < this.layout[this.activeIndex][0].length; col++){
                if( this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID){
                    board.drawCell(col + this.colPos,row + this.rowPos,WHITE_COLOR_ID);
                }
            }
        }
    }
    moveLeft() {
        if (!this.checkCollision(this.rowPos, this.colPos - 1,this.layout[this.activeIndex] )){
        this.clear();
        this.colPos--;
        this.draw();
        }
    }
    moveRight() {
        if (!this.checkCollision(this.rowPos, this.colPos + 1,this.layout[this.activeIndex] )) {
            this.clear();
            this.colPos++;
            this.draw();
        }
    }
    moveDown() {
        if (!this.checkCollision(this.rowPos + 1, this.colPos,this.layout[this.activeIndex] )) {
            this.clear();
            this.rowPos++;
            this.draw();
            return
        }
        this.handleLanded();
        if (!board.gameOver){
        generateNewBrick();}
    }
    rotate() {
        if (!this.checkCollision(this.rowPos + 1, this.colPos,this.layout[(this.activeIndex + 1) % 4]  )) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;
            // chi co 4 hinh dang nen chia 4 thi chac chan thi se chi co so tu 0 toi 3
            this.draw()
        }
    }
    checkCollision(nextRow,nextCol,nextLayout){
        for (let row = 0; row < nextLayout.length; row++ ){
            for (let col =0; col < nextLayout[0].length; col++){
                if( nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0){
                    if ((col + nextCol >= COLS) ||
                        (row + nextRow >= ROWS) ||
                        (col + nextCol < 0) ||
                        (board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID))
                        return true;
                }
            }
        }
    return false;
    }
    handleLanded() {
        if ( this.rowPos <=0) {
            board.handleGameOver();
            return;
        }
        for (let row = 0; row < this.layout[this.activeIndex].length; row++ ){
            for (let col =0; col < this.layout[this.activeIndex][0].length; col++){
                if( this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID){
                    board.grid[row + this.rowPos][col + this.colPos] = this.id;
                }
            }
        }
        board.handleCompleteRows()
        board.drawBoard();
    }

}
function generateNewBrick() {
    brick = new Brick(Math.floor(Math.random()*10) % 7)
    // tao ra brick bat ky tu 0 - 6
}
let board = new Board(ctx);
// console.log(board) ve thu bang
board.drawBoard()
generateNewBrick();
document.getElementById('play').addEventListener('click', () => {
    board.reset();
    generateNewBrick();
    board.isPlaying = true;
    const refresh = setInterval(() => {
        if (!board.gameOver) {
            brick.moveDown();
        } else {
            clearInterval(refresh);
        }
    }, 1000);
})


// brick.draw()
// ve thu 1 hinh



document.addEventListener('keydown', (e) => {
    if (!board.gameOver && board.isPlaying){
    switch (e.code){
        case KEYCODE.LEFT:
            brick.moveLeft();
            break;
        case KEYCODE.RIGHT:
            brick.moveRight();
            break;
        case KEYCODE.DOWN:
            brick.moveDown();
            break;
        case KEYCODE.UP:
            brick.rotate();
            break;
        default:
            break;}
    }
})