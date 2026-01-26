//struttura per definire i livelli
//ed il numero dei target per livello
const shots = document.getElementsByClassName('display')[0];
const level = document.getElementsByClassName('display')[1];
let levelNumber = 1;
let victoryFlag = false;

const levels = {
    level1: {
        targetNumber: 3,
        completeted: false,
        shootCounter: 8
    },
    level2: {
        targetNumber: 5,
        completeted: false,
        shootCounter: 6
    },
    level3: {
        targetNumber: 7,
        completeted: false,
        shootCounter: 7
    },
    level4: {
        targetNumber: 10,
        completeted: false,
        shootCounter: 9
    },
    level5: {
        targetNumber: 15,
        completeted: false,
        shootCounter: 7
    },
    level6: {
        targetNumber: 17,
        completeted: false,
        shootCounter: 6
    }
}

const currentLevel = () => {
    for (let level in levels) {
        if (!levels[level].completeted) {
            //console.log("Current Level:", level);
            levelNumber = parseInt(level.replace('level', '')); //extracts level number from string
            return levelNumber;
        }
    } //return levelNumber = levels.level5; //test choosen level
}

const setLevelStatus = () => {
    if (targets.length === 0) {
        const lvl = levels[`level${levelNumber}`];
        if (!lvl.completeted) {
            lvl.completeted = true;
            if (typeof window.lossTimeoutId !== 'undefined' && window.lossTimeoutId) {
                clearTimeout(window.lossTimeoutId);
                window.lossTimeoutId = null;
                angleInput.disabled = false;
                shootBtn.disabled = false;
                setBtn.disabled = false;
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
        flagCounter = 0; //resets hit counter for new level
        createLevelTargets();
        displayShots();
        console.log('Advanced to level', levelNumber);
    } else {
        wins();
        level.style.display = 'none';
        shots.style.display = 'none';

    }
}

//generates level targets
const createLevelTargets = () => {
    targets.length = 0; // clear array before creating new targets
    const targetWidth = 20;
    const targetHeight = 20;
    const minY = 135; ////sets minimum y
    const minX = 120; //sets minimum x
    const maxX = 670; //sets max x
    const maxY = canvas.height - targetHeight; //sets max y
    
    for (let i = levels[`level${levelNumber}`].targetNumber; i > 0; i--) {
        const randomX = Math.floor(Math.random() * (maxX - minX + 1));
        const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        const newTarget = new target(randomX, randomY, targetWidth, targetHeight, targetWidth, true);
        targets.push(newTarget);
    }
}

const displayLevel = () => {
    level.innerHTML = `Level ${levelNumber}`;
}

const displayShots = () => {
    const lvl = levels[`level${levelNumber}`];
    if (!lvl) return;
    if (typeof lvl.shootCounter === 'number' && lvl.shootCounter < 0) {
        lvl.shootCounter = 0;
    }
    shots.innerHTML = `${lvl.shootCounter} shots left.`;
    if (victoryFlag || loses()) return;
}