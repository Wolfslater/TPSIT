//struttura per definire i livelli
//ed il numero dei target per livello
import { canvas, commandList } from "./assets.js";
import { Target, targets, setflagCounter } from "./target.js";
import { shootBtn, setBtn, angleInput } from "./cannon.js";
import { wins, loses } from "./displayEnding.js";

const level = document.getElementsByClassName('display')[1];
const shots = document.getElementsByClassName('display')[0];
const commandListBtn = document.getElementById('commandListBtn');
let levelNumber = 1;
export let victoryFlag = false;
export const setVictoryFlag = (value) => {
    victoryFlag = value;
};

const levels = {
    level1: {
        targetNumber: 3,
        completed: false,
        shootCounter: 6
    },
    level2: {
        targetNumber: 5,
        completed: false,
        shootCounter: 8
    },
    level3: {
        targetNumber: 5,
        completed: false,
        shootCounter: 7
    },
    level4: {
        targetNumber: 4,
        completed: false,
        shootCounter: 6
    },
    level5: {
        targetNumber: 5,
        completed: false,
        shootCounter: 7
    },
    level6: {
        targetNumber: 6,
        completed: false,
        shootCounter: 6
    }
}

const currentLevel = () => {
    for (let level in levels) {
        if (!levels[level].completed) {
            //console.log("Current Level:", level);
            levelNumber = parseInt(level.replace('level', '')); //extracts level number from string
            return levelNumber;
        }
    } //return levelNumber = levels.level5; //test choosen level
}

const setLevelStatus = () => {
    if (targets.length === 0) {
        const lvl = levels[`level${levelNumber}`];
        if (!lvl.completed) {
            lvl.completed = true;
            if (window.lossTimeoutId) {
                clearTimeout(window.lossTimeoutId);
                //reset loss timeout and re-enable controls
                window.lossTimeoutId = null;
                angleInput.disabled = false;
                shootBtn.disabled = false;
                setBtn.disabled = false;
                commandListBtn.disabled = false;
                commandList.hidden = true;
                commandList.style.display = 'block';
                commandList.style.display = 'none';

            }
            return true;
        }
    }
    return false;
}

const nextLevel = () => {
    const nextNum = levelNumber + 1;
    const nextLvl = levels[`level${nextNum}`];
    if (nextLvl) {
        levelNumber = nextNum;
        displayLevel();
        setflagCounter(0); //resets hit counter for new level
        createLevelTargets();
        displayShots();
        console.log('Advanced to level', levelNumber);
    } else {
        wins();
        level.style.display = 'none';
        shots.style.display = 'none';

    }
}

const randomRangeXY = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomV = (speedMultiplier) => {
     //random speed between -4 and 4, scaled by level number
    return (Math.random() * 4) * (0.9 + Math.random() * speedMultiplier)
}

//generates level targets
const createLevelTargets = () => {
    targets.length = 0; // clear array before creating new targets
    const targetWidth = 20;
    const targetHeight = 20;
    const minY = 135; ////sets minimum y
    const minX = 120; //sets minimum x
    const maxX = 650; //sets max x
    const maxY = canvas.height - targetHeight; //sets max y
    
    for (let i = levels[`level${levelNumber}`].targetNumber; i > 0; i--) {
        const randomX = randomRangeXY(maxX, minX);
        const randomY = randomRangeXY(maxY, minY);
        const speedMultiplier = 4 + (levelNumber - 1) * 0.3;
        let vX = randomV(speedMultiplier);
        let vY = randomV(speedMultiplier) * 0.5; //random vertical speed, slower than horizontal
        //console.log(vX, randomX, randomY, targetWidth, targetHeight, minX, maxX, levels[`level${levelNumber}`].targetNumber, i);
        const newTarget = new Target(randomX, randomY, targetWidth,
                                targetHeight, targetWidth, true,
                                vX, minX, maxX, vY, minY, maxY);
        targets.push(newTarget);
    }
}

const displayLevel = () => {
    level.innerHTML = `Level ${levelNumber}`;
}

const displayShots = () => {
    const lvl = levels[`level${levelNumber}`];
    if (lvl.shootCounter < 0) {
        lvl.shootCounter = 0;
    }
    shots.innerHTML = `${lvl.shootCounter} shots left.`;
    if (victoryFlag || loses()) return;
}

export { currentLevel, setLevelStatus,
    nextLevel, createLevelTargets,
    displayLevel, displayShots,
    levelNumber, level,
    shots, levels, setflagCounter };
