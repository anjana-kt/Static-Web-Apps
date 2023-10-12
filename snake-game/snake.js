let gameBoard,ctx;
let scoreText;
let resetBtn;
let running,score = 0;
let gameWidth,gameHeight;
const unitSize=25;
let xVelocity,yVelocity;
let foodX,foodY;
const snakeColor = "yellow",snakeBorder = "rgb(184, 125, 17)", snakeHeadColor ="orange";
const foodColor = "red";
let snake;
let i,j;
let speed=150;
function start(){
    running = true;
    score=0;
    
    gameBoard = document.querySelector("#gameBoard");
    ctx = gameBoard.getContext('2d');
    ctx.clearRect(0,0,gameWidth,gameHeight);
    scoreText = document.querySelector("#score");
    resetBtn = document.querySelector("#start");
    gameWidth = gameBoard.width;
    gameHeight = gameBoard.height;
    xVelocity=unitSize,yVelocity=0;
    
    snake = [ 
        {x:unitSize*2,y:unitSize},
        {x:unitSize,y:unitSize},
        {x:0,y:unitSize}
    ];
    scoreText.textContent = score;
    window.addEventListener('keydown',changeDirection);
    createFood();
    nextTick();
}

function nextTick(){
    if(running){
        setTimeout(()=>{
            moveSnake();
            checkGameOver();
            drawFood();
            drawSnake();
            nextTick();
        }, speed)
    }
}

function drawSnake(){
    ctx.strokeStyle = snakeBorder;
    let head = snake[0]
    snake.forEach(snakePart => {
        console.log(snakePart,head,snakePart==head)
        if (snakePart == head){
            console.log("head")
            ctx.fillStyle = snakeHeadColor;
            ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
            ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);
        }
        else{
            ctx.fillStyle = snakeColor;
            ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
            ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);
        }
        
    });
}

function createFood(){
    ctx.fillStyle = foodColor;
    ctx.clearRect(foodX,foodY,unitSize,unitSize);
    foodX = Math.round(Math.random()*(gameWidth+1-unitSize)/unitSize)*unitSize;
    foodY = Math.round(Math.random()*(gameHeight+1-unitSize)/unitSize)*unitSize;
    ctx.fillRect(foodX,foodY,unitSize,unitSize);
}

function moveSnake(xx=snake[0].x+xVelocity,yy=snake[0].y+yVelocity){
    
    const head = {x:xx, y:yy};
   
    snake.unshift(head);

    if(snake[0].x == foodX && snake[0].y == foodY){
        score++;
        scoreText.textContent = score;
        createFood();
    }
    else{
        let p = snake.pop();
        ctx.clearRect(p.x-1,p.y-1,unitSize+2,unitSize+2);
    }
}
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize);
}

function changeDirection(event){
    const LEFT=37, UP = 38, RIGHT=39, DOWN=40;
    let keyPressed = event.keyCode;

    const movingUp = (yVelocity == -unitSize);
    const movingDown = (yVelocity == unitSize);
    const movingLeft = (xVelocity == -unitSize);
    const movingRight = (xVelocity == unitSize);

    switch(true){
        case (keyPressed == LEFT && !movingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == RIGHT && !movingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == UP && !movingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed == DOWN && !movingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break; 
    }
}

function checkGameOver(){

    // Uncomment below code and comment switch for boundary 

    // if(snake[0].x<0 || snake[0].x>=gameWidth || snake[0].y<0 || snake[0].y>=gameHeight){
    //     console.log("Ouch you hit the boundary!");
    //     running = false;
    // }
    
    // No boundary game
    switch(true){
        case (snake[0].x<0):
            moveSnake(gameWidth,snake[0].y);
            break;

        case (snake[0].x>=gameWidth):
            moveSnake(0,snake[0].y)
            break;

        case (snake[0].y<0):
            moveSnake(snake[0].x,gameHeight)
            break;

        case (snake[0].y>=gameHeight):
            moveSnake(snake[0].x,0)
            break;
    }
    for (let i=1;i<snake.length;i++){
        if(snake[0].x==snake[i].x && snake[0].y == snake[i].y){
            console.log("Don't touch the body!");
            running = false;
        }
    }

    if(!running){
        displayText("Game Over !");
        nextTick();
    }
    
}

function displayText(txt){
    ctx.fillStyle = "black";
    ctx.textAlign = "centre";
    ctx.font = "50px MV BOli";
    ctx.fillText(txt,gameWidth/4,gameHeight/2);
}

function control(inc){
    speed += inc*10*-1;
}