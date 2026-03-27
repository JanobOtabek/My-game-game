const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 80,
  width: 50,
  height: 50
};

let bullets = [];
let enemies = [];

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach((b, i) => {
    b.y -= 7;
    ctx.fillRect(b.x, b.y, 5, 10);
    if (b.y < 0) bullets.splice(i, 1);
  });
}

function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach((e, i) => {
    e.y += 3;
    ctx.fillRect(e.x, e.y, 40, 40);
    if (e.y > canvas.height) enemies.splice(i, 1);
  });
}

function spawnEnemy() {
  enemies.push({
    x: Math.random() * (canvas.width - 40),
    y: -40
  });
}

function collision() {
  bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      if (
        b.x < e.x + 40 &&
        b.x + 5 > e.x &&
        b.y < e.y + 40 &&
        b.y + 10 > e.y
      ) {
        bullets.splice(bi, 1);
        enemies.splice(ei, 1);
      }
    });
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawBullets();
  drawEnemies();
  collision();

  requestAnimationFrame(gameLoop);
}

setInterval(spawnEnemy, 1000);

document.addEventListener("touchmove", e => {
  player.x = e.touches[0].clientX - 25;
});

document.addEventListener("click", () => {
  bullets.push({
    x: player.x + 22,
    y: player.y
  });
});

gameLoop();   