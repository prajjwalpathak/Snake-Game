const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas everytime the window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

const init = () => {
  // Your code
};

// Call init()
init();

// Animate function
const animate = () => {
  requestAnimationFrame(animate);
  // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // Your code
};

// Call animate()
animate();