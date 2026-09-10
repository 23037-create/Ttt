const game = document.getElementById("game");
const target = document.getElementById("target");
const crosshair = document.getElementById("crosshair");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");

let score = 0;
let time = 30;

let crosshairX = window.innerWidth / 2;
let crosshairY = window.innerHeight / 2;

let targetX;
let targetY;

function moveTarget() {
  const margin = 100;

  targetX =
    margin + Math.random() * (window.innerWidth - margin * 2);

  targetY =
    margin + Math.random() * (window.innerHeight - margin * 2);

  target.style.left = targetX + "px";
  target.style.top = targetY + "px";
}

function updateCrosshair() {
  crosshair.style.left = crosshairX + "px";
  crosshair.style.top = crosshairY + "px";
}

function checkHit() {
  const dx = crosshairX - targetX;
  const dy = crosshairY - targetY;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 60) {
    score++;
    scoreText.textContent = "SCORE: " + score;

    moveTarget();
  }
}

/*
  iPadのタッチ操作
*/
game.addEventListener("touchmove", (event) => {
  event.preventDefault();

  const touch = event.touches[0];

  crosshairX = touch.clientX;
  crosshairY = touch.clientY;

  updateCrosshair();
  checkHit();
}, { passive: false });

/*
  ゲーム開始
*/
moveTarget();
updateCrosshair();

/*
  タイマー
*/
const timer = setInterval(() => {
  time--;

  timeText.textContent = "TIME: " + time;

  if (time <= 0) {
    clearInterval(timer);

    alert("ゲーム終了！\nSCORE: " + score);
  }
}, 1000);