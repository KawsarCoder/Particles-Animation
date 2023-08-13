const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
}

const particles = [];

function createParticles(x, y) {
  const particleCount = 15;
  const hue = Math.random() * 360;

  for (let i = 0; i < particleCount; i++) {
    particles.push(
      new Particle(x, y, Math.random() * 8 + 2, `hsl(${hue}, 100%, 50%)`)
    );
  }
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.size > 0.2) {
      particle.update();
      particle.draw();
    } else {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (event) => {
  const { x, y } = event;
  createParticles(x, y);
});

animate();
