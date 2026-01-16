const angleInput = document.getElementById("angle");
const setBtn = document.querySelector(".btn");
const shootBtn = document.querySelector("input[value='shoot']");

const gravity = 0.3;
const launchSpeed = 20;
const maxAngle = 90;
const minAngle = 10;

let isShot = false;
let showLine = true;
let trajectoryAngle = 0;

const ball = {
    x: 10,
    y: canvas.height - 10,
    radius: 10,
    speedx: 0,
    speedy: 0,
    height: 10 * 2,
    width: 10 * 2
};

function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = "#5e0000ff";
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

const drawTrajectoryLine = () => {
    if (!showLine) return;

    const rad = trajectoryAngle * Math.PI / 180;
    const length = 150;

    ctx.beginPath();
    ctx.setLineDash([10, 5]);
    ctx.moveTo(10, canvas.height - 10);
    ctx.lineTo(10 + Math.cos(rad) * length, canvas.height - 10 - Math.sin(rad) * length);
    ctx.strokeStyle = "rgba(0,0,0,0.7)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
};

const  angleCorrection = () => {
    if (trajectoryAngle < minAngle) trajectoryAngle = maxAngle;
    if (trajectoryAngle > maxAngle) trajectoryAngle = minAngle;
    return angleInput.value = trajectoryAngle;
}

function update() {
    if (!isShot) return;

    ball.x += ball.speedx;
    ball.y += ball.speedy;
    ball.speedy += gravity;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedx = -ball.speedx*gravity;
        ball.x = ball.x + ball.radius > canvas.width ? canvas.width -ball.radius: ball.radius;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedy = -ball.speedy*gravity;
        ball.y = ball.y +ball.radius > canvas.height ? canvas.height - ball.radius: ball.radius;
    }

}

setBtn.addEventListener("click", () => {
    trajectoryAngle = Number(angleInput.value);
    showLine = true;
    isShot = false;

    ball.x = 10;
    ball.y = canvas.height - 10;
    ball.speedx = 0;
    ball.speedy = 0;
});

shootBtn.addEventListener("click", () => {
    if (levels[`level${levelNumber}`].shootCounter <= 0) return;
    const rad = trajectoryAngle * Math.PI / 180; //intendevo questo per calcolare il raggio
                                                 //non mi ricordo come ci sono arrivato però :)
    levels[`level${levelNumber}`].shootCounter--;
    alert(`${levels[`level${levelNumber}`].shootCounter} shots left.`);
    showLine = false;
    isShot = true;

    ball.x = 10;
    ball.y = canvas.height - 10;
    ball.speedx = launchSpeed * Math.cos(rad);
    ball.speedy = -launchSpeed * Math.sin(rad);
});

angleInput.addEventListener("change", () => {
    trajectoryAngle = Number(angleInput.value);
    angleCorrection();
});

angleCorrection();