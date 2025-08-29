const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth > window.innerHeight ? window.innerHeight / 1.4 : window.innerWidth / 1.4;
canvas.height = window.innerWidth > window.innerHeight ? window.innerHeight / 1.4 : window.innerWidth / 1.4;
let unit = window.innerHeight < window.innerWidth ? window.innerHeight * 0.01 : window.innerWidth * 0.01;

// Game Components
let start = false;
let score = 0;

const init = () => {
    canvas.width = window.innerWidth > window.innerHeight ? window.innerHeight / 1.4 : window.innerWidth / 1.4;
    canvas.height = window.innerWidth > window.innerHeight ? window.innerHeight / 1.4 : window.innerWidth / 1.4;
    unit = window.innerHeight < window.innerWidth ? window.innerHeight * 0.01 : window.innerWidth * 0.01;
    start = false;
    score = 0;
}

init();

const startGame = () => {
    start = true;
    score = 0;
    console.log("Start");
}

const updateScore = () => {
    console.log(score++);
}

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Call animate()
animate();

// Event-Listeners

// Resize canvas everytime the window is resized
window.addEventListener("resize", () => {
    init();
});

// Learn Go
// Learn Go backend
// Create a Go project (Dev)
