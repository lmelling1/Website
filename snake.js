const snakeBoard = document.querySelector("#snakeBoard");
const ctx = snakeBoard.getContext("2d");
const scoreTxt = document.querySelector("#scoreTxt");
const resetSnake = document.querySelector("#resetSnake");
const gameWidth = snakeBoard.width;
const gameHeight = snakeBoard.height;
const colorBackground = "#fbf6ef";
const colorSnake = "#696e29";
const gameOver = "#3b2002";
const appleColor = "#A83232";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let appleX;
let appleY;
let score = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize * 1, y: 0 },
    { x: 0, y: 0 },
]

window.addEventListener("keydown", changeDirection);
resetSnake.addEventListener("click", resetGame);

gameStart();


function gameStart() {
    running = true;
    scoreTxt.textContent = score;
    createApple();
    drawApple();
    nextTick();

};
function nextTick() {
    if (running) {
        setTimeout(()=>{
            clearBoard();
            drawApple();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 50);
    }
    else {
        displayGameOver();
    };
};
function clearBoard() {
    ctx.fillStyle = colorBackground;
    ctx.fillRect(0,0, gameWidth, gameHeight);
};
function createApple(){
    function randomApple(min, max) {
        const randomNumber = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randomNumber;
    }
    appleX = randomApple(0, gameWidth - unitSize);
    appleY = randomApple(0, gameHeight - unitSize);
};
function drawApple() {
    ctx.fillStyle = appleColor;
    ctx.beginPath();
    ctx.roundRect(appleX, appleY, unitSize, unitSize, 8);
    ctx.fill();

};
function moveSnake() {
    const head = {x: snake[0].x + xVelocity,
                y: snake[0].y + yVelocity};

    snake.unshift(head);
    if(snake[0].x == appleX && snake[0].y == appleY){
        score+=1;
        scoreTxt.textContent = score;
        createApple();
    }
    else {
        snake.pop();
    };

};
function drawSnake() {
    ctx.fillStyle = colorSnake;
    snake.forEach(snakePart => {
        ctx.beginPath();
        ctx.roundRect(snakePart.x, snakePart.y, unitSize, unitSize, 8);
        ctx.fill();
    });
};
function changeDirection(event) {
    event.preventDefault(); //stop the browser from going up or down
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUP = (yVelocity == -unitSize);
    const goingDOWN = (yVelocity == unitSize);
    const goingRIGHT = (xVelocity == unitSize);
    const goingLEFT = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRIGHT):
            xVelocity=-unitSize;
            yVelocity= 0;
            break;
        case(keyPressed == RIGHT && !goingLEFT):
            xVelocity= unitSize;
            yVelocity= 0;
            break;
        case(keyPressed == UP && !goingDOWN):
            xVelocity=0;
            yVelocity= -unitSize;
            break;
        case(keyPressed == DOWN && !goingUP):
            xVelocity=0;
            yVelocity= unitSize;
            break;
    }
};
function checkGameOver() {
    if ((snake[0].x <0) || (snake[0].x >= gameWidth) ||(snake[0].y <0) || (snake[0].y >=gameHeight)){
        running = false; 
    };
    for (let i =1; i < snake.length; i++){
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    };
};
function displayGameOver() {
    ctx.font = "50px Quando"
    ctx.fillStyle = gameOver;
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize * 1, y: 0 },
    { x: 0, y: 0 },
    ];
    gameStart();
};