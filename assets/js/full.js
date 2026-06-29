// =====================================
// Neon Snake - Full Version
// =====================================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Board
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake;
let food;
let direction;
let score;
let hue = 0;
let paused = false;

let gameLoop;
let speed = 120;

// ----------------------
// Start Game
// ----------------------

function startGame() {

    snake = [
        { x: 10, y: 10 }
    ];

    direction = "right";
    score = 0;
    speed = 120;

    updateScore();

    placeFood();

    document.getElementById("gameStatus").textContent =
        "Game Running";

    clearInterval(gameLoop);

    gameLoop = setInterval(updateGame, speed);

}

// ----------------------
// Draw
// ----------------------

function drawGame() {

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    hue += 2;
    if(hue > 360) hue = 0;

    snake.forEach((segment,index)=>{

        ctx.fillStyle =
            `hsl(${hue + index * 10},100%,50%)`;

        ctx.fillRect(
            segment.x * gridSize,
            segment.y * gridSize,
            gridSize-2,
            gridSize-2
        );

    });

    ctx.fillStyle="red";

    ctx.fillRect(
        food.x*gridSize,
        food.y*gridSize,
        gridSize-2,
        gridSize-2
    );

}

// ----------------------
// Update
// ----------------------

function updateGame(){

    let head={
        x:snake[0].x,
        y:snake[0].y
    };

    switch(direction){

        case "up":
            head.y--;
            break;

        case "down":
            head.y++;
            break;

        case "left":
            head.x--;
            break;

        case "right":
            head.x++;
            break;

    }

    // Wall

    if(
        head.x<0||
        head.x>=tileCount||
        head.y<0||
        head.y>=tileCount
    ){
        endGame();
        return;
    }

    // Self

    for(let i=0;i<snake.length;i++){

        if(
            head.x===snake[i].x &&
            head.y===snake[i].y
        ){
            endGame();
            return;
        }

    }

    snake.unshift(head);

    if(
        head.x===food.x &&
        head.y===food.y
    ){

        score++;

        updateScore();

        placeFood();

        // Speed up every 5 points
        if(score % 5 === 0){

            speed -= 10;

            clearInterval(gameLoop);

            gameLoop = setInterval(updateGame,speed);

        }

    }else{

        snake.pop();

    }

    drawGame();

}

// ----------------------
// Food
// ----------------------

function placeFood(){

    food={

        x:Math.floor(Math.random()*tileCount),
        y:Math.floor(Math.random()*tileCount)

    };

}

// ----------------------
// Score
// ----------------------

function updateScore(){

    document.getElementById("score").textContent=score;

}

// ----------------------
// End Game
// ----------------------

function endGame(){

    clearInterval(gameLoop);

    document.getElementById("gameStatus").textContent =
        "Game Over!";

    // Save leaderboard
    saveScore(score);

    renderLeaderboard("leaderboard");

    // Bootstrap modal
    let modal = new bootstrap.Modal(
        document.getElementById("gameOverModal")
    );

    modal.show();

}

// ----------------------
// Controls
// ----------------------

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "ArrowUp":
            if(direction!="down") direction="up";
            break;

        case "ArrowDown":
            if(direction!="up") direction="down";
            break;

        case "ArrowLeft":
            if(direction!="right") direction="left";
            break;

        case "ArrowRight":
            if(direction!="left") direction="right";
            break;

    }

});

// ----------------------
// Buttons
// ----------------------

document.getElementById("startBtn")
.addEventListener("click",startGame);

document.getElementById("resetBtn")
.addEventListener("click",startGame);

document.getElementById("pauseBtn")
.addEventListener("click", togglePause);

// ----------------------
// Load Page
// ----------------------

window.onload=()=>{

    document.getElementById("playerName").textContent=
        getPlayerName();

    loadBrowserInfo();

    loadDateTime();

    renderLeaderboard("leaderboard");

    snake=[
        {x:10,y:10}
    ];

    food={
        x:5,
        y:5
    };

    drawGame();

};

// ----------------------
// Optional Cheat
// ----------------------

window.cheatMode=function(){

    score += 50;

    updateScore();

    console.log("Cheat Activated!");

}

// ----------------------
//  Pause Button
// ----------------------
function togglePause() {

    if (!paused) {

        clearInterval(gameLoop);

        paused = true;

        document.getElementById("gameStatus").textContent =
            "Paused";

        document.getElementById("pauseBtn").innerHTML =
            '<i class="bi bi-play-fill"></i> Resume';

    } else {

        gameLoop = setInterval(updateGame, speed);

        paused = false;

        document.getElementById("gameStatus").textContent =
            "Game Running";

        document.getElementById("pauseBtn").innerHTML =
            '<i class="bi bi-pause-fill"></i> Pause';

    }

}