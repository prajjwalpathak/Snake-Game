const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let unit = window.innerHeight < window.innerWidth ? window.innerHeight * 0.01 : window.innerWidth * 0.01;
canvas.width = 80 * unit;
canvas.height = 80 * unit;

// Resize canvas everytime the window is resized
window.addEventListener("resize", () => {
    unit = window.innerHeight < window.innerWidth ? window.innerHeight * 0.01 : window.innerWidth * 0.01;
    canvas.width = 80 * unit;
    canvas.height = 80 * unit;
    init();
});

class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawSnake() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2 * unit, 0, 2 * Math.PI, false);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    moveSnake() {
        this.x += unit / 2;
        this.drawSnake();
    }
}

class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawFood() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, unit, 0, 2 * Math.PI, false);
        ctx.fillStyle = "red";
        ctx.fill();
    }
}

let snake;
let food;

let snakeLoc = { x: undefined, y: undefined };
let foodLoc = { x: undefined, y: undefined };

const init = () => {
    snakeLoc.x = 2 * unit;
    snakeLoc.y = 2 * unit;

    foodLoc.x = 8 * unit;
    foodLoc.y = 8 * unit;

    snake = new Snake(snakeLoc.x, snakeLoc.y);
    food = new Food(foodLoc.x, foodLoc.y);
    snake.drawSnake();
    food.drawFood();
};

// Call init()
init();

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.drawSnake();
    food.drawFood();
    // snake.moveSnake();
};

// Call animate()
animate();
