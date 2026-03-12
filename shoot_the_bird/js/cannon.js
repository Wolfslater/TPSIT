import { canvas, ctx, barrelImage, carriageImage, cannonBallImage } from "./assets.js";
import { levels, levelNumber, displayShots } from "./levels.js";

const setBtn = document.querySelector(".btn");
const shootBtn = document.querySelector("input[value='shoot']")
let angleInput = document.getElementById("angle");

const gravity = 0.4;
const launchSpeed = 18;

let isShot = false;
let showLine = true;
let trajectoryAngle = parseInt(angleInput.value); //initial angle from input
let energyLevel = 1
let isChargingEnergy = false

class Cannon {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = -10;
        this.radius = 0;
        this.width = 130;  //diameter for collision detection
        this.height = 130; //diameter for collision detection
        this.y = canvas.height - this.height + 35;
    }

    drawCannon() {
        if (barrelImage.complete && barrelImage.naturalWidth !== 0) {
            ctx.drawImage(carriageImage, this.x, this.y, this.width, this.height);
            ctx.drawImage(barrelImage, this.x, this.y, this.width, this.height);
        } else {
            ctx.beginPath();
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }

    rotateCannon(ctx) {
        if (carriageImage.complete && carriageImage.naturalWidth !== 0) {
            ctx.drawImage(carriageImage, this.x, this.y, this.width, this.height);
        }
        //rotate the barrel around a fixed carriage pivot so both sprites stay connected
        const pivotX = this.x + this.width * 0.30;
        const pivotY = this.y + this.height * 0.58;
        ctx.save();
        ctx.translate(pivotX, pivotY);
        ctx.rotate(-trajectoryAngle * Math.PI / 180); //convert angle to radians
        ctx.translate(-pivotX, -pivotY);
        ctx.drawImage(
            barrelImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
        ctx.restore();
    }

    getBarrelTipPosition() {
        //sets the barrel tip position basedon on 
        //the current angle and fixed pivot point
        const rad = -trajectoryAngle * Math.PI / 180;
        const pivotX = this.x + this.width * 0.30;
        const pivotY = this.y + this.height * 0.58;
        const muzzleLocalX = this.width * 0.771;
        const muzzleLocalY = this.height * 0.365;
        const pivotLocalX = this.width * 0.30;
        const pivotLocalY = this.height * 0.58;

        const muzzleOffsetX = muzzleLocalX - pivotLocalX;
        const muzzleOffsetY = muzzleLocalY - pivotLocalY;

        return {
            x: pivotX + muzzleOffsetX * Math.cos(rad) - muzzleOffsetY * Math.sin(rad),
            y: pivotY + muzzleOffsetX * Math.sin(rad) + muzzleOffsetY * Math.cos(rad)
        };
    }
}

class Ball {
    constructor() {
        const tip = cannon.getBarrelTipPosition();
        this.x = tip.x;
        this.y = tip.y;
        this.radius = 10;
        this.width = 20;  //diameter for collision detection
        this.height = 24; //diameter for collision detection
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

    drawCurvedTrajectoryLine = () => {
        if (!showLine) return;

        const start = cannon.getBarrelTipPosition();
        const rad = trajectoryAngle * Math.PI / 180;

        // Simulate a short ballistic arc using physics steps
        const steps = 10;
        const dt = 1;
        let vx = launchSpeed * Math.cos(rad) * energyLevel;
        let vy = -launchSpeed * Math.sin(rad) * energyLevel;
        let px = start.x;
        let py = start.y;

        ctx.beginPath();
        ctx.setLineDash([10, 5]);
        ctx.moveTo(px, py);

        for (let i = 0; i < steps; i++) {
            px += vx * dt;
            py += vy * dt;
            vy += gravity * dt;
            ctx.lineTo(px, py);
        }

        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);
    };

    update() {
        if (!isShot) return;

        ball.x += ball.speedx;
        ball.y += ball.speedy;
        ball.speedy += gravity;

        if (ball.x - ball.radius <= 0) {
            ball.speedx = -ball.speedx * 0.7;
            ball.x = ball.radius;
        }

        if (ball.y + ball.radius > canvas.height) {
            ball.speedy = -ball.speedy * 0.6; //40% energy loss on bounce
            ball.y = canvas.height - ball.radius;
        } else if (ball.y - ball.radius < 0) {
            ball.speedy = -ball.speedy * 0.8;
            ball.y = ball.radius;
        }
    }
}

const set = () => {
    cannon.drawCannon();
    trajectoryAngle = Number(angleInput.value);
    showLine = true;
    isShot = false;

    const tip = cannon.getBarrelTipPosition();
    ball.x = tip.x;
    ball.y = tip.y;
    ball.speedx = 0;
    ball.speedy = 0;
}

const shoot = () => {
    const lvl = levels[`level${levelNumber}`];
    if (lvl.shootCounter <= 0) {
        return;
    }

    const rad = trajectoryAngle * Math.PI / 180;
    lvl.shootCounter--;
    displayShots(); //display shots left
    showLine = false;
    isShot = true;

    const tip = cannon.getBarrelTipPosition();
    ball.x = tip.x;
    ball.y = tip.y;
    ball.speedx = launchSpeed * Math.cos(rad) * energyLevel;
    ball.speedy = -launchSpeed * Math.sin(rad) * energyLevel;
    energyLevel = 1; //reset energy after shooting
    isChargingEnergy = false;
}

const updateTrajectoryAngle = (value) => {
    trajectoryAngle = Number(value);
}

const setChargingEnergy = (value) => {
    isChargingEnergy = value;
}

const updateEnergyLevel = (value) => {
    energyLevel = value;
}

const cannon = new Cannon(ctx);
const ball = new Ball();
//angleCorrection removed; no auto-correction on ball creation

export { cannon, ball, set, shoot, angleInput,
    setBtn, shootBtn, isShot, energyLevel,
    isChargingEnergy, trajectoryAngle,
    updateTrajectoryAngle, setChargingEnergy,
    updateEnergyLevel };
