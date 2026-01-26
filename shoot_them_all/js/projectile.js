const angleInput = document.getElementById("angle");
const setBtn = document.querySelector(".btn");
const shootBtn = document.querySelector("input[value='shoot']");

const gravity = 0.4;
const launchSpeed = 17;
const maxAngle = 91;
const minAngle = 10;

let isShot = false;
let showLine = true;
let trajectoryAngle = 45;

class Cannon {
    constructor() {
        this.x = -10;
        this.y = canvas.height - 70;
        this.radius = 0;
        this.width = 80;  // diameter for collision detection
        this.height = 80; // diameter for collision detection
    }

    drawCannon() {
            if (cannonImage.complete && cannonImage.naturalWidth !== 0) {
            ctx.drawImage(cannonImage, this.x, this.y, this.width, this.height);
        } else {
        ctx.beginPath();
        ctx.fillStyle = "rgb(94, 0, 55)";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        }
    }
}

class Ball {
    constructor() {
        this.x = cannon.x + cannon.width / 2;
        this.y = cannon.y + cannon.height / 2;
        this.radius = 10;
        this.width = 20;  // diameter for collision detection
        this.height = 24; // diameter for collision detection
        this.speedx = 0;
        this.speedy = 0;
    }


 drawBall() {
    if (cannonBallImage.complete && cannonBallImage.naturalWidth !== 0) {
        ctx.drawImage(cannonBallImage, this.x, this.y - this.height, this.width, this.height);
    } else {
    ctx.beginPath();
    ctx.fillStyle = "#5e0000ff";
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    }
}

 drawTrajectoryLine = () => {
    if (!showLine) return;
    
    const length = 100; //length of the trajectory line
    const rad = trajectoryAngle * Math.PI / 180;
    const startX = cannon.x + cannon.width / 2; // cannon beak x position
    const startY = cannon.y + cannon.height / 2; // cannon beak y position
    ctx.beginPath();
    ctx.setLineDash([10, 5]);
    ctx.moveTo(startX, startY); //starting point
    ctx.lineTo(startX + Math.cos(rad) * length, startY - Math.sin(rad) * length); //end point 
    ctx.strokeStyle = "rgba(0,0,0,0.7)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
};

  angleCorrection = () => {
    if (trajectoryAngle < minAngle) trajectoryAngle = maxAngle - 1;
    if (trajectoryAngle >= maxAngle) trajectoryAngle = minAngle;
    return angleInput.value = trajectoryAngle;
}

 update() {
    if (!isShot) return;

    ball.x += ball.speedx;
    ball.y += ball.speedy;
    ball.speedy += gravity;

    if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
        ball.speedx = -ball.speedx*0;
        //ball.x = ball.x + ball.radius > canvas.width ? canvas.width -ball.radius: ball.radius;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedy = -ball.speedy*gravity;
        ball.y = ball.y +ball.radius > canvas.height ? canvas.height - ball.radius: ball.radius;
    }
 }
}

setBtn.addEventListener("click", () => {
    cannon.drawCannon();
    trajectoryAngle = Number(angleInput.value);
    showLine = true;
    isShot = false;

    ball.x = 10;
    ball.y = canvas.height - 10;
    ball.speedx = 0;
    ball.speedy = 0;
});

shootBtn.addEventListener("click", () => {
    const rad = trajectoryAngle * Math.PI / 180;
    levels[`level${levelNumber}`].shootCounter--;
    displayShots(); //display shots left
    showLine = false;
    isShot = true;

    ball.x = 10;
    ball.y = canvas.height - 10;
    ball.speedx = launchSpeed * Math.cos(rad);
    ball.speedy = -launchSpeed * Math.sin(rad);
});

angleInput.addEventListener("change", () => {
    trajectoryAngle = Number(angleInput.value);
    ball.angleCorrection();
});

const cannon = new Cannon();
const ball = new Ball();
ball.angleCorrection();