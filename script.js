
const player = document.getElementById("player");
const coin = document.getElementById("coin");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");

const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const jumpBtn = document.getElementById("jump");
const restartBtn = document.getElementById("restart");

let x = 40;
let score = 0;
let jumping = false;

function move(direction) {
    x += direction * 15;

    const max = game.clientWidth - player.offsetWidth;
    x = Math.max(0, Math.min(x, max));

    player.style.left = x + "px";

    checkCoin();
}

function checkCoin() {
    const p = player.getBoundingClientRect();
    const c = coin.getBoundingClientRect();

    const hit =
        p.left < c.right &&
        p.right > c.left &&
        p.top < c.bottom &&
        p.bottom > c.top;

    if (hit) {
        score += 10;
        scoreText.textContent = score;
        newCoin();
    }
}

function newCoin() {
    const max = game.clientWidth - 35;
    const randomX = Math.random() * max;

    coin.style.left = randomX + "px";
    coin.style.top =
        (50 + Math.random() * 220) + "px";
}

function jump() {
    if (jumping) return;

    jumping = true;
    player.style.bottom = "100px";

    setTimeout(() => {
        player.style.bottom = "10px";
        jumping = false;
    }, 400);
}

leftBtn.addEventListener("click", () => move(-1));
rightBtn.addEventListener("click", () => move(1));
jumpBtn.addEventListener("click", jump);

restartBtn.addEventListener("click", () => {
    x = 40;
    score = 0;

    player.style.left = x + "px";
    player.style.bottom = "10px";
    scoreText.textContent = score;

    jumping = false;
    newCoin();
});

newCoin();
