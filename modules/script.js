import { getRandom } from "./utils.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let unit = window.innerHeight < window.innerWidth ? window.innerHeight * 0.01 : window.innerWidth * 0.01;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// game elements
let gameArea = {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
};
let snake = {
    x: undefined,
    y: undefined,
    radius: undefined,
};
let food = {
    x: undefined,
    y: undefined,
    radius: undefined,
};
let score = 0;
let startButton = {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
};
let pauseButton = {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
};
let resumeButton = {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
};
let restartButton = {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
};

// Resize canvas everytime the window is resized
window.addEventListener("resize", () => {
    init();
});

// Gmaearea class
class GameArea {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawGameArea() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Snake class
class Snake {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    drawSnake() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    moveSnake(dir) {
        if (dir == "up") this.y -= unit / 2;
        else if (dir == "down") this.y += unit / 2;
        else if (dir == "left") this.x -= unit / 2;
        else if (dir == "right") this.x += unit / 2;
        this.drawSnake();
    }
}

// event listener for keypress - snake movement
let key = "right";
window.addEventListener("keypress", (e) => {
    if (e.key == "w") key = "up";
    else if (e.key == "a") key = "left";
    else if (e.key == "s") key = "down";
    else if (e.key == "d") key = "right";
});

const init = () => {
    unit = window.innerHeight < window.innerWidth ? window.innerHeight * 0.01 : window.innerWidth * 0.01;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    key = "right";
    score = 0;

    gameArea.width = 80 * unit;
    gameArea.height = 80 * unit;
    gameArea.x = canvas.width / 2 - gameArea.width / 2;
    gameArea.y = canvas.height / 2 - gameArea.height / 2;

    snake.radius = 2 * unit;
    snake.x = snake.radius + gameArea.x + gameArea.width / 4;
    snake.y = snake.radius + gameArea.y + gameArea.height / 2;

    food.radius = unit;
    food.x = getRandom(gameArea.x + snake.radius, gameArea.x + gameArea.width - snake.radius);
    food.y = getRandom(gameArea.y + snake.radius, gameArea.y + gameArea.height - snake.radius);

    startButton.x = gameArea.x;
    startButton.y = gameArea.y + gameArea.height + 2*unit;
    startButton.width = 8*unit;
    startButton.height = 2*unit;

    gameArea = new GameArea(gameArea.x, gameArea.y, gameArea.width, gameArea.height);
    snake = new Snake(snake.x, snake.y, snake.radius);
    gameArea.drawGameArea();
    snake.drawSnake();
};

// Call init()
init();

// draw food
const drawFood = () => {
    ctx.beginPath();
    ctx.arc(food.x, food.y, food.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();
};

const edgeCollisionResolution = () => {
    if (snake.x + snake.radius >= gameArea.x + gameArea.width || snake.x - snake.radius <= gameArea.x || snake.y + snake.radius >= gameArea.y + gameArea.height || snake.y - snake.radius <= gameArea.y) {
        console.log("Dead");
        init();
    }
};

const foodCollisionResolution = () => {
    if (food.x < snake.x + snake.radius && food.x > snake.x - snake.radius && food.y < snake.y + snake.radius && food.y > snake.y - snake.radius) {
        food.x = getRandom(gameArea.x + snake.radius, gameArea.x + gameArea.width - snake.radius);
        food.y = getRandom(gameArea.y + snake.radius, gameArea.y + gameArea.height - snake.radius);
        drawFood();
        console.log(++score);
    }
};

// Draw frame to hide respawning of snake
const drawFrame = () => {
    ctx.lineWidth = unit;
    ctx.strokeStyle = "midnightBlue";
    ctx.strokeRect(gameArea.x - 0.5 * unit, gameArea.y - 0.5 * unit, gameArea.width + 0.5 * unit, gameArea.height + 0.5 * unit);
};

// Draw button function
const drawButton = (button) => {

}

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameArea.drawGameArea();
    snake.drawSnake();
    drawFood();
    // snake.moveSnake(key);
    drawFrame();
    edgeCollisionResolution();
    foodCollisionResolution();
};

// Call animate()
animate();
