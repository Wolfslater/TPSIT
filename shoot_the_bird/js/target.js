//oggetto target
//contiene le info per generare i target
//controllo collisioni
import { canvas, ctx, birdImage } from "./assets.js";
import { ball } from "./cannon.js";

var flagCounter = 0; //può essere utile? //alla fine serviva "\_('_')_/"
const targets = []; //lista dei target presenti in mappa

class Target {
    constructor(x, y, size, height, width,
                active, vX = 0, minX = 0,
                maxX = canvas.width, vY = 0,
                minY = 0, maxY = canvas.height) {
                  
        this.x = x;
        this.y = y;
        this.size = size;
        this.height = height;
        this.width = width;
        this.active = active; 
        this.vX = vX;
        this.minX = minX;
        this.maxX = maxX;
        this.vY = vY;
        this.minY = minY;
        this.maxY = maxY;
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

  update = () => {
    if (!this.active) return;
    
    //Horizontal movement
    if (this.vX !== 0) {
      this.x += this.vX;
      if (this.x <= this.minX) {
        this.x = this.minX;
        this.vX = -this.vX;
      } else if (this.x + this.width >= this.maxX) {
        this.x = this.maxX - this.width;
        this.vX = -this.vX;
      }
    }
    
    // Vertical movement
    if (this.vY !== 0) {
      this.y += this.vY;
      if (this.y <= this.minY) {
        this.y = this.minY;
        this.vY = -this.vY;
      } else if (this.y + this.height >= this.maxY) {
        this.y = this.maxY - this.height;
        this.vY = -this.vY;
      }
    }
  }

};

const maxXY = (t, x=false) => {
  if (x) {
    return Math.max(t.x, Math.min(ball.x, t.x + t.width));
  }
  return Math.max(t.y, Math.min(ball.y, t.y + t.height));
}

const checkAllCollisions = () => {
  for (let idx = targets.length - 1; idx >= 0; idx--) {
    const t = targets[idx];
    if (!t.active) continue;

    const ballRadius = ball.radius || (ball.width / 2);
    const closestX = maxXY(t, true);
    const closestY = maxXY(t, false);
    const distX = ball.x - closestX;
    const distY = ball.y - closestY;
    const distanceSquared = distX * distX + distY * distY;
    const radiusSquared = ballRadius * ballRadius;

    if (distanceSquared < radiusSquared) {
      flagCounter++;
      t.active = false;
      targets.splice(idx, 1);
    }
  }
}

const setflagCounter = (value) => {
    flagCounter = value;
}

//const targetLevelOne = new target(550, canvas.height-20, 20, 20, 20, true); //test levelOne
/*const targetLevelOne2 = new target(400, canvas.height-100, 20, 20, 20, true);
const targetLevelOne3 = new target(300, canvas.height-200, 20, 20, 20, true);
const targets = [targetLevelOne, targetLevelOne2, targetLevelOne3];*/

export { Target, targets, flagCounter, setflagCounter, checkAllCollisions };
