// disables canvas
// displays a message

// global timeout id used to cancel a scheduled loss if level completes
window.lossTimeoutId = null;

const wins = () => {
    // cancel any pending loss timeout
    if (window.lossTimeoutId) {
        clearTimeout(window.lossTimeoutId);
        window.lossTimeoutId = null;
    }

    endAnimation();
    console.log('All levels completed');
    canvas.style.display = 'none';
    document.querySelector('.input').style.display = 'none';
    const congratsMsg = document.createElement('div');
    congratsMsg.innerText = 'Congratulations! You have cleared all levels!';
    congratsMsg.style.fontSize = '24px';
    congratsMsg.style.textAlign = 'center';
    document.body.appendChild(congratsMsg);
}

const loses = () => {
    // If victory already achieved, do nothing
    if (victoryFlag) return false;

    const lvl = levels[`level${levelNumber}`];
    if (!lvl) return false;

    // Defensive clamp: never allow negative counters here
    if (typeof lvl.shootCounter === 'number' && lvl.shootCounter < 0) {
        lvl.shootCounter = 0;
    }

    // If level is already completed, cancel any pending loss and do not trigger loss
    if (lvl.completeted) {
        if (window.lossTimeoutId) {
            clearTimeout(window.lossTimeoutId);
            window.lossTimeoutId = null;
        }
        return false;
    }

    // If there are still shots left, not a loss
    if (lvl.shootCounter > 0) return false;

    // At this point, shootCounter === 0 and level not completed -> trigger loss
    console.log('No shots left');
    shootBtn.disabled = true;
    setBtn.disabled = true;
    angleInput.disabled = true;

    // If a loss is already scheduled, don't schedule another
    if (window.lossTimeoutId) return true;

    window.lossTimeoutId = setTimeout(() => {
        console.log('All shots fired');
        endAnimation();
        level.style.display = 'none';
        shots.style.display = 'none';
        canvas.style.display = 'none';
        document.querySelector('.input').style.display = 'none';
        const congratsMsg = document.createElement('div');
        congratsMsg.innerText = 'Congratulations! You have terrible aim!';
        congratsMsg.style.fontSize = '24px';
        congratsMsg.style.textAlign = 'center';
        document.body.appendChild(congratsMsg);

        // clear timeout id now that loss has been executed
        window.lossTimeoutId = null;
    }, 4000);

    return true;
}