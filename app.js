const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreVal');

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;

let foodX;
let foodY;
let xVal = 25;
let yVal = 0;
let score=0;
let active = true;
let started = false;
let reStart = true;
let paused = false;
let speed = 200;
var interval = window.setInterval(function() {

},1000);
let snake = [
    {x:0,y:0}

];
window.addEventListener('keydown',keyPress)
startGame();

function startGame(){
context.fillStyle = '#212121';
context.fillRect(0,0,WIDTH,HEIGHT);
createFood();
displayFood();
// drawSnake();
// moveSnake();
// clearBoard();
drawSnake();

}
function clearBoard(){
    context.fillStyle = '#212121';
context.fillRect(0,0,WIDTH,HEIGHT);
}
function createFood(){
foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}

function displayFood(){
    context.fillStyle = 'red';
    context.fillRect(foodX,foodY,UNIT,UNIT); 
}

function drawSnake(){
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121'
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT);
    })
}
function moveSnake(){
    const head ={x:snake[0].x+xVal,
                    y:snake[0].y+yVal}       
    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        score++;
        scoreText.textContent = score*100;
        if(score>4)
        speed = 100;
        createFood();
    }
    else
    snake.pop()
}
function nextTick(){
    if(active && !paused){
    setTimeout(() =>{
    clearBoard();
    displayFood();
    moveSnake();
    drawSnake();
    checkGameOver();
    nextTick();
    },speed)
}
else if(!active && !paused){
    clearBoard();
    console.log(snake);
    context.font="bold 50px serif";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over!!",WIDTH/2,HEIGHT/2);
    reStart = false;
}
}
function keyPress(event){
    if(!started){
        started = true;
        nextTick();
    }
    const SPACE = 32;
    const ENTER = 13;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
   if(event.keyCode==ENTER && !reStart){
    console.log('enter key');
    reStart=true;
    snake = [
        {x:0,y:0}
    
    ];
    xVal = 25;
 yVal = 0;
score=0;
active = true;
started = false;
paused = false;
speed = 200;
    startGame();
   }
 if(event.keyCode==SPACE){
    console.log("space key entered");
    if(!paused){
paused = true;
}
else{
paused = false;
 }
 console.log(paused);
nextTick();
}
   
    switch(true){
        case(event.keyCode==LEFT && xVal!=UNIT):
        xVal=-UNIT;
        yVal=0;
        break;
        case(event.keyCode==RIGHT && xVal!=-UNIT):
        xVal = UNIT;
        yVal = 0;
        break;
         case(event.keyCode==UP && yVal!=UNIT):
         xVal=0;
         yVal=-UNIT;
         break;
         case(event.keyCode==DOWN && yVal!=-UNIT):
         xVal =0;
         yVal=UNIT;
         break;
    }
    
}
function checkGameOver(){
for(let i=1;i<snake.length;i++){
    if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
    active=false;
}
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
        active=false;
    break;    }
}