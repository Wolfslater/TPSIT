//anima il tutto

let animating = true;
const animate = () => {
    if (animating) {
        if (setLevelStatus()) nextLevel();
        currentLevel();
        //createLevelTargets(); un buon modo per dar crushare chorme :)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        for (let i of targets) {
            i.checkCollision();
        }
        if (flagCounter < levels[`level${levelNumber}`].targetNumber) {
            //draws currrent target if flag is false
            for (let i of targets) {
                if (i.active) i.drawTarget(i);
            }
        }
        ball.drawTrajectoryLine();
        ball.update(); //updates ball position, checks for walls collisions
        ball.drawBall();
        window.requestAnimationFrame(animate);
    }
}

const endAnimation = () => {
    animating = false; //to stop the animation when needed
    ctx.setLineDash([]);
}

displayLevel();
displayShots();
currentLevel();
createLevelTargets();
window.requestAnimationFrame(animate);