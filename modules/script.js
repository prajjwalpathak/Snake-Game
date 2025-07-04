const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerHeight < window.innerWidth ? window.innerHeight * 0.9 : window.innerWidth * 0.9;
canvas.height = window.innerHeight < window.innerWidth ? window.innerHeight * 0.9 : window.innerWidth * 0.9;

// Resize canvas everytime the window is resized
window.addEventListener("resize", () => {
    canvas.width = window.innerHeight < window.innerWidth ? window.innerHeight * 0.9 : window.innerWidth * 0.9;
    canvas.height = window.innerHeight < window.innerWidth ? window.innerHeight * 0.9 : window.innerWidth * 0.9;
    init();
});

class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const init = () => {
    
};

// Call init()
init();

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Your code
};

// Call animate()
animate();
