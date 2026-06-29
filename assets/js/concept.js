// ===============================
// RGB Snake - Concept Version
// ===============================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Settings
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake;
let food;
let direction;
let score;
let gameLoop;

// RGB hue tracker (FIXED)
let hue = 0;

// -------------------------------
// Initialize Game
// -------------------------------
function initGame() {

    snake = [
        { x: 10, y: 10 }
    ];

    direction = "right";

    score = 0;

    document.getElementById("score").textContent = score;
    document.getElementById("gameStatus").textContent = "Game Running";

    placeFood();

    clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, 150);
}

// -------------------------------
// Draw Game
// -------------------------------
function drawGame() {

    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Increase hue each frame (RGB effect)
    hue += 2;
    if (hue > 360) hue = 0;

    // Snake (RGB gradient)
    snake.forEach((segment, index) => {

        ctx.fillStyle = `hsl(${hue + index * 10}, 100%, 50%)`;

        ctx.fillRect(
            segment.x * gridSize,
            segment.y * gridSize,
            gridSize - 2,
            gridSize - 2
        );
    });

    // Food
    ctx.fillStyle = "red";

    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 2,
        gridSize - 2
    );
}

// -------------------------------
// Update Game
// -------------------------------
function updateGame() {

    let head = {
        x: snake[0].x,
        y: snake[0].y
    };

    switch (direction) {

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

    // Wall Collision
    if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount
    ) {
        gameOver();
        return;
    }

    // Self Collision (fixed: ignore head)
    for (let i = 0; i < snake.length; i++) {

        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Eat Food
    if (head.x === food.x && head.y === food.y) {

        score++;
        document.getElementById("score").textContent = score;

        placeFood();

    } else {
        snake.pop();
    }

    drawGame();
}

// -------------------------------
// Random Food
// -------------------------------
function placeFood() {

    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

// -------------------------------
// Game Over
// -------------------------------
function gameOver() {

    clearInterval(gameLoop);

    document.getElementById("gameStatus").textContent = "Game Over!";
}

// -------------------------------
// Keyboard Controls
// -------------------------------
document.addEventListener("keydown", function (event) {

    switch (event.key) {

        case "ArrowUp":
            if (direction !== "down") direction = "up";
            break;

        case "ArrowDown":
            if (direction !== "up") direction = "down";
            break;

        case "ArrowLeft":
            if (direction !== "right") direction = "left";
            break;

        case "ArrowRight":
            if (direction !== "left") direction = "right";
            break;
    }
});

// -------------------------------
// Buttons
// -------------------------------
document.getElementById("startBtn").addEventListener("click", initGame);

document.getElementById("resetBtn").addEventListener("click", function () {
    clearInterval(gameLoop);
    initGame();
});

// -------------------------------
// Load Player Name
// -------------------------------
window.onload = function () {

    let player = sessionStorage.getItem("playerName");

    if (!player) {
        player = "Guest";
    }

    document.getElementById("playerName").textContent = player;

    document.getElementById("gameStatus").textContent = "Press Start to Play";

    // safe initial food so draw doesn't break
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };

    drawGame();
};