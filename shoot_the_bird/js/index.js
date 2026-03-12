//anima il tutto
import { keyDown, keyUp, initializeEventListeners } from "./controls.js";
import { canvas, ctx, backgroundImage } from "./assets.js";
import { targets, flagCounter, checkAllCollisions } from "./target.js";
import { wins, loses } from "./displayEnding.js";
import { currentLevel, setLevelStatus, nextLevel,
    createLevelTargets, displayLevel, displayShots,
    levels, levelNumber } from "./levels.js";
import { cannon, ball, isShot, energyLevel,
    isChargingEnergy, updateEnergyLevel } from "./cannon.js";

let animating = false;
const animate = () => {
    if (animating) {
        if (setLevelStatus()) nextLevel();
        currentLevel();
        //createLevelTargets(); un buon modo per dar crushare chorme :)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        if (isChargingEnergy && energyLevel < 2) {
            updateEnergyLevel(energyLevel + 0.01); //increase energie
            if (energyLevel > 3) updateEnergyLevel(3); //energie cap
        }
        
        cannon.rotateCannon(ctx);
        for (let i of targets) {
            i.update()
        }
        if (flagCounter < levels[`level${levelNumber}`].targetNumber) {
            //draws currrent target if flag is false
            for (let i of targets) {
                if (i.active) i.drawTarget(i);
            }
        }
        ball.drawCurvedTrajectoryLine();
        ball.update(); //updates ball position, checks for walls collisions
        checkAllCollisions();
        if (isShot) ball.drawBall();
        if (isChargingEnergy) {
            ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.font = "30px Arial";
            ctx.fillText("Energy: " + energyLevel.toFixed(1) + "x", 20, 30);
        }
        window.requestAnimationFrame(animate);
    }
}

const endAnimation = () => {
    animating = false; //to stop the animation when needed
    ctx.setLineDash([]);
}

const startAnimation = () => {
    animating = true;
    window.requestAnimationFrame(animate);
}

displayLevel();
displayShots();
currentLevel();
createLevelTargets();
initializeEventListeners();
window.requestAnimationFrame(animate);

export { animate, endAnimation, 
    startAnimation, keyDown,
    keyUp, wins, loses,
    animating };
