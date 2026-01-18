// disables canvas
//displays a message

const wins = () => {
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
    if (victoryFlag) return;
    if (levels[`level${levelNumber}`].shootCounter <= 0) {
        shootBtn.disabled = true;
        setBtn.disabled = true;
        angleInput.disabled = true;

        setTimeout(() => { //attende l'ultimo colpo sparatoconsole.log('All shots fired');
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
            return true;
        }, 4000);
    }
    return false;
}