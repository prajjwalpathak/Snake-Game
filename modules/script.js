import { getRandom, inArea } from "./utils.js";
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
    text: "START",
};
let pauseButton = {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    text: "PAUSE",
};
let resumeButton = {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    text: "RESUME",
};
let restartButton = {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    text: "RESTART",
};

let start = false;
let pause = true;
let mouse = {
    x: undefined,
    y: undefined,
};

let array = [];

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
    start = false;
    pause = true;
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
    startButton.y = gameArea.y + gameArea.height + 4 * unit;
    startButton.width = 12 * unit;
    startButton.height = 2.4 * unit;

    pauseButton.x = gameArea.x + 1.8 * startButton.width;
    pauseButton.y = gameArea.y + gameArea.height + 4 * unit;
    pauseButton.width = 12 * unit;
    pauseButton.height = 2.4 * unit;

    resumeButton.x = gameArea.x + 3.5 * startButton.width;
    resumeButton.y = gameArea.y + gameArea.height + 4 * unit;
    resumeButton.width = 14 * unit;
    resumeButton.height = 2.4 * unit;

    restartButton.x = gameArea.x + 5.3 * startButton.width;
    restartButton.y = gameArea.y + gameArea.height + 4 * unit;
    restartButton.width = 16 * unit;
    restartButton.height = 2.4 * unit;

    gameArea = new GameArea(gameArea.x, gameArea.y, gameArea.width, gameArea.height);
    snake = new Snake(snake.x, snake.y, snake.radius);
    gameArea.drawGameArea();
    snake.drawSnake();

    array = [];
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
        init();
    }
};

const foodCollisionResolution = () => {
    if (food.x < snake.x + snake.radius && food.x > snake.x - snake.radius && food.y < snake.y + snake.radius && food.y > snake.y - snake.radius) {
        food.x = getRandom(gameArea.x + snake.radius, gameArea.x + gameArea.width - snake.radius);
        food.y = getRandom(gameArea.y + snake.radius, gameArea.y + gameArea.height - snake.radius);
        ++score;
        drawFood();
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
    let fontSize = 2.4 * unit;
    let textX = button.x;
    let textY = button.y + button.height;

    // ctx.strokeStyle = "red";
    // ctx.strokeRect(button.x, button.y, button.width, button.height);

    ctx.font = `${fontSize}px "Press Start 2P"`;
    ctx.fillStyle = "white";
    ctx.fillText(button.text, textX, textY);
};

const drawScore = () => {
    let fontSize = 3 * unit;
    let textX = gameArea.x;
    let textY = gameArea.y - 3 * unit;

    ctx.font = `${fontSize}px "Press Start 2P"`;
    ctx.fillStyle = "white";
    ctx.fillText(`SCORE - ${score}`, textX, textY);
};

window.addEventListener("click", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;

    if (inArea(mouse, startButton) && !start) {
        key = "right";
        start = true;
        pause = false;
    } else if (inArea(mouse, pauseButton) && !pause) pause = true;
    else if (inArea(mouse, resumeButton) && start) pause = false;
    else if (inArea(mouse, restartButton)) init();
});

const addInArray = () => {
    array = [];
    for (let i = 1; i <= 5; i++) {
        let node = {
            x: snake.x + 2 * i * snake.radius,
            y: snake.y,
            radius: snake.radius,
        }
        array.push(node);
    }
}
// addInArray();
console.log(array);
const drawNode = (node) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
}

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameArea.drawGameArea();
    drawFrame();
    snake.drawSnake();
    drawFood();
    if (!pause) snake.moveSnake(key);
    edgeCollisionResolution();
    foodCollisionResolution();
    drawButton(startButton);
    drawButton(pauseButton);
    drawButton(resumeButton);
    drawButton(restartButton);
    drawScore();
    addInArray();
    array.forEach(node => {
        drawNode(node);
    });

};

// Call animate()
animate();
