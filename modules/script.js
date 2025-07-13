const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let unit = window.innerHeight < window.innerWidth ? window.innerHeight * 0.01 : window.innerWidth * 0.01;
canvas.width = 80 * unit;
canvas.height = 80 * unit;
canvas.style.position = "absolute";
canvas.style.left = `${window.innerWidth / 2 - canvas.width / 2}px`;
canvas.style.top = `${window.innerHeight / 2 - canvas.height / 2}px`;

let gameArea = {
    x: undefined,
    y: undefined,
};
let snake = {
    x: undefined,
    y: undefined,
    radius: 2 * unit,
};
let food = {
    x: undefined,
    y: undefined,
    radius: unit,
};

// Resize canvas everytime the window is resized
window.addEventListener("resize", () => {
    init();
});

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
    canvas.width = 80 * unit;
    canvas.height = 80 * unit;
    canvas.style.position = "absolute";
    canvas.style.left = `${window.innerWidth / 2 - canvas.width / 2}px`;
    canvas.style.top = `${window.innerHeight / 2 - canvas.height / 2}px`;

    gameArea.x = window.innerWidth / 2 - canvas.width / 2;
    gameArea.y = window.innerHeight / 2 - canvas.height / 2;

    snake.x = 2 * unit;
    snake.y = 2 * unit;

    food.x = 8 * unit;
    food.y = 8 * unit;

    snake = new Snake(snake.x, snake.y, snake.radius);
    food = new Food(food.x, food.y, food.radius);
    snake.drawSnake();
    food.drawFood();
};

// Call init()
init();

const edgeCollisionResolution = () => {

};

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.drawSnake();
    food.drawFood();
    // snake.moveSnake(key);
    // edgeCollisionResolution();
};

// Call animate()
animate();
