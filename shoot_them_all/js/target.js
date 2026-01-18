//oggetto target
//contiene le info per generare i target
//controllo collisioni

var flagCounter = 0; //può essere utile? //alla fdine serviva "\_('_')_/"
const targets = []; //lista dei target presenti in mappa

class target {
    constructor(x, y, size, height, width, active) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.height = height;
        this.width = width;
        this.active = active;
    }

  drawTarget = (activeTrget) => {
    //draws bird image when loaded
    //else fallback to lavandish square
    if (birdImage.complete && birdImage.naturalWidth !== 0) {
      ctx.drawImage(birdImage, activeTrget.x, activeTrget.y, activeTrget.width, activeTrget.height);
    } else {
      ctx.beginPath();
      ctx.fillStyle = "rgb(49, 6, 78)";
      ctx.fillRect(activeTrget.x, activeTrget.y, activeTrget.size, activeTrget.size);
      ctx.fill();
      ctx.closePath();
    }
  //console.log(target.x, target.y, target.size, target.size);
  }

  checkCollision = () => {
    for (let idx = targets.length - 1; idx >= 0; idx--) {
      const t = targets[idx];
      if (!t.active) continue;
      if (
        ball.x < t.x + t.width &&  //checks if the coordinballtes overlballp
        ball.x + ball.width > t.x &&
        ball.y < t.y + t.height &&
        ball.y + ball.height > t.y
      ) {
        flagCounter++;
        console.log("Hit!", t);
        t.active = false;
        targets.splice(idx, 1);
      }
    }
  }
};

//const targetLevelOne = new target(550, canvas.height-20, 20, 20, 20, true); //test levelOne
/*const targetLevelOne2 = new target(400, canvas.height-100, 20, 20, 20, true);
const targetLevelOne3 = new target(300, canvas.height-200, 20, 20, 20, true);
const targets = [targetLevelOne, targetLevelOne2, targetLevelOne3];*/