const paddle1Color="brown",paddle2Color="blue";
const ballColor = "yellow";
const paddle = {width:25,height:100};
const paddleSpeed=50;
const ballRadius =12.5;
const paddle1UP = 87,paddle1DOWN=83;
const paddle2UP = 38, paddle2DOWN = 40;

let  ballSpeed;
let gameBoard,ctx,scoreText;
let gameWidth,gameHeight;
let player1Score,player2Score;
let ballX,ballY;
let paddle1, paddle2;
let timerId;
let ballXDirection=0, ballYDirection=0;
let running = true;

function start(){
    running = true;
    ballSpeed = 10;
    gameBoard = document.getElementById("gameBoard");
    scoreText = document.getElementById("score");
    ctx = gameBoard.getContext('2d');
    gameWidth = gameBoard.width;
    gameHeight = gameBoard.height;
    player1Score =0,player2Score=0;
    paddle1 = {x:0,y:0},paddle2 = {x:gameWidth-paddle.width, y:gameHeight - paddle.height};
    ballXDirection=0, ballYDirection=0;
    ballX = gameWidth/2, ballY = gameHeight/2;
    updateScore();
    createBall();
    nextTick();

    window.addEventListener('keydown',changeDirection);

}
function nextTick(){
    timerId = setTimeout(()=>{
        if(running){
            clearBoard();
            drawPaddles();
            moveBall();
            drawBall();
            checkCollision();
            nextTick();

        }
    },100);
}

function drawPaddles(){
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black"

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x,paddle1.y,paddle.width,paddle.height);
    ctx.strokeRect(paddle1.x,paddle1.y,paddle.width,paddle.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x,paddle2.y,paddle.width,paddle.height);
    ctx.strokeRect(paddle2.x,paddle2.y,paddle.width,paddle.height);
}

function createBall(){
    if (Math.round(Math.random())==1)   ballXDirection = 1;
    else    ballXDirection =-1;

    if (Math.round(Math.random())==1)   ballYDirection = 1;
    else    ballYDirection =-1;

    ballX = gameWidth/2, ballY = gameHeight/2;
     
}

function drawBall(){
    ctx.fillStyle=ballColor;
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballRadius,0,2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
}

function changeDirection(event){
    let keyPressed = event.keyCode;

    switch(keyPressed){
        case (paddle1UP):
            if(paddle1.y>0) paddle1.y -= paddleSpeed;
            break;
        case (paddle1DOWN):
            if(paddle1.y<gameHeight-paddle.height) paddle1.y += paddleSpeed;
            break;
        case (paddle2UP):
            if(paddle2.y>0) paddle2.y -= paddleSpeed;
            break;
        case paddle2DOWN:
            if(paddle2.y<gameHeight-paddle.height) paddle2.y+=paddleSpeed;
            break;
    }

}

function checkCollision(){
    if (ballY <= ballRadius || ballY >= gameHeight-ballRadius){
        ballYDirection *= -1
    }
    if (ballX <= ballRadius ){
        player2Score++;
        updateScore();
        createBall();
        return ; 
    }
    if(ballX >= gameWidth-ballRadius){
        player1Score++;
        updateScore();
        createBall();
        return ;
    }
    if (ballX <= paddle1.x + paddle.width + ballRadius){
        if(ballY >= paddle1.y && ballY<= paddle1.y + paddle.height){
            ballX= (paddle1.x + paddle.width + ballRadius);
            ballXDirection *= -1;
            ballSpeed = Number((ballSpeed + 0.5).toFixed(1));
            console.log("ball Speed is ",ballSpeed);
        }
    }
    if (ballX >= paddle2.x - ballRadius){
        if(ballY >= paddle2.y && ballY<= paddle2.y + paddle.height){
            ballX = (paddle2.x - ballRadius);
            ballXDirection *= -1;
            ballSpeed = Number((ballSpeed + 0.5).toFixed(1));
            console.log("ball Speed is ",ballSpeed);
        }
    }

}
function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`;
    console.log(`${player1Score} : ${player2Score}`);

    running = (player1Score ==10 || player2Score == 10)? false : true;
}
function clearBoard(){
    ctx.fillStyle = "forestgreen";
    ctx.clearRect(0, 0, gameWidth, gameHeight);
}