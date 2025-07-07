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
        ctx.arc(this.x, this.y, 2*unit, 0, 2 * Math.PI, false);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

let snake;

let loc = { x: undefined, y: undefined };

const init = () => {
    loc.x = canvas.width / 2;
    loc.y = canvas.height / 2;

    snake = new Snake(loc.x, loc.y);
    snake.drawSnake();
};

// Call init()
init();

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.drawSnake();
};

// Call animate()
animate();
