import { canvas, commandList, ctx } from "./assets.js";
import { startAnimation, endAnimation, animating } from "./index.js";
import { angleInput, setBtn, set, shootBtn,
        shoot, updateTrajectoryAngle, setChargingEnergy,
        updateEnergyLevel, cannon } from "./cannon.js";

const body = document.querySelector('body');
//AI thinks this is coconut "\('_')/"
const commandListBtn = document.getElementById('commandListBtn');

const stepAngle = (delta) => {
    const min = Number(angleInput.min);
    const max = Number(angleInput.max);
    let next = Number(angleInput.value) + delta;

    angleInput.value = String(next);
    updateTrajectoryAngle(angleInput.value);
    cannon.rotateCannon(ctx);
}

const keyDown = (e) => {
    switch (e.key) {
        case 'q':
        case 'Q':
            toggleCommandList();
            break;
        case 'r':
        case 'R':
            if (confirm("Are you sure you want to reset the level?")) {
                location.reload();
            }
            break;
    }
    
    if (!animating) return; //Only respond to input when animating
    
    switch (e.key) {
        case 'X':
        case 'x':
            shootBtn.click();
            break;
        case 'ArrowUp':
            stepAngle(1.5);
            break;
        case 'ArrowDown':
            stepAngle(-1.5);
            break;
        case 'Z':
        case 'z':   
            setBtn.click();
            break;
        case 'Control':
            setChargingEnergy(true);
            console.log("Energy charging started!");
            break;
    }
}

const keyUp = (e) => {
    if (!animating) return; //Only respond to input when animating
    
    switch (e.key) {
        case 'Control':
            setChargingEnergy(false);
            updateEnergyLevel(1); //reset energy if key is released before shooting
            console.log("Energy level: " + (1).toFixed(1) + "x");
            break;
    }
}

const toggleCommandList = () => {
    if (commandList.toggleAttribute('hidden')) {
        commandList.style.display = "none";
        canvas.style.opacity = "1";
        startAnimation(); //resume animation when command list is hidden
        console.log("Command list hidden");
    } else {
        canvas.style.opacity = "0.5";
        commandList.style.display = "block";
        endAnimation(); //pause animation when command list is shown        
        console.log("Command list shown");
    }
}

const initializeEventListeners = () => {
    angleInput.addEventListener("input", () => {
        if (!animating) return; //Only respond when animating
        updateTrajectoryAngle(angleInput.value);
           //ball.angleCorrection(); // Removed angle correction
    });
    
    setBtn.addEventListener("click", () => {
        if (animating) set(); //Only execute when animating
    });
    shootBtn.addEventListener("click", () => {
        if (animating) shoot(); //Only execute when animating
    });
    body.addEventListener('keydown', keyDown);
    commandListBtn.addEventListener('click', toggleCommandList);
    body.addEventListener('keyup', keyUp);
};

export { keyDown, keyUp, commandListBtn,
        initializeEventListeners };
