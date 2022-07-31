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
                this.drawCell(col,row, WHITE_COLOR_ID)
            }
        }
    }
}
class Brick {
    constructor(id) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id];
        this.activeIndex = 0;
        this.colPos = 3;
        this.rowPos = 5;
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
        }
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
                if( nextLayout[row][col] !== WHITE_COLOR_ID){
                    if ((col + nextCol >= COLS) || (row + nextRow >= ROWS) || (col + nextCol < 0))
                        return true;
                }
            }
        }
    return false;
    }
}
let board = new Board(ctx);
// console.log(board) ve thu bang
board.drawBoard()
let brick = new Brick(0);
brick.draw()
// ve thu 1 hinh
document.addEventListener('keydown', (e) => {
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
            break;
    }
})