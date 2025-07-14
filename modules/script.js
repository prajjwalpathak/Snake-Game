const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let unit = window.innerHeight < window.innerWidth ? window.innerHeight * 0.01 : window.innerWidth * 0.01;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

// Resize canvas everytime the window is resized
window.addEventListener("resize", () => {
    init();
});

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

class Food {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    drawFood() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "red";
        ctx.fill();
    }
}

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

    gameArea.width = 80 * unit;
    gameArea.height = 80 * unit;
    gameArea.x = canvas.width / 2 - gameArea.width / 2;
    gameArea.y = canvas.height / 2 - gameArea.height / 2;

    snake.radius = 2 * unit;
    snake.x = snake.radius + gameArea.x;
    snake.y = snake.radius + gameArea.y;

    food.radius = unit;
    food.x = food.radius + gameArea.x + gameArea.width / 2;
    food.y = food.radius + gameArea.y + gameArea.height / 2;

    gameArea = new GameArea(gameArea.x, gameArea.y, gameArea.width, gameArea.height);
    snake = new Snake(snake.x, snake.y, snake.radius);
    food = new Food(food.x, food.y, food.radius);
    gameArea.drawGameArea();
    snake.drawSnake();
    food.drawFood();
};

// Call init()
init();

const edgeCollisionResolution = () => {
    if (snake.x - snake.radius > gameArea.x + gameArea.width) snake.x = gameArea.x - snake.radius;
    if (snake.x + snake.radius < gameArea.x) snake.x = gameArea.x + gameArea.width + snake.radius;
    if (snake.y - snake.radius > gameArea.y + gameArea.height) snake.y = gameArea.y - snake.radius;
    if (snake.y + snake.radius < gameArea.y) snake.y = gameArea.y + gameArea.height + snake.radius;
};

// Draw frame to hide respawning of snake
const drawFrame = () => {
    ctx.lineWidth = 4 * unit;
    ctx.strokeStyle = "gold";
    ctx.strokeRect(gameArea.x - 2 * unit, gameArea.y - 2 * unit, gameArea.width + 4 * unit, gameArea.height + 4 * unit);
};

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameArea.drawGameArea();
    snake.drawSnake();
    food.drawFood();
    snake.moveSnake(key);
    drawFrame();
    edgeCollisionResolution();
};

// Call animate()
animate();
