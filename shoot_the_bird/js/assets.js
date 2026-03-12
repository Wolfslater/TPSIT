//style canvas
const canvas = document.getElementById("canvas");
canvas.height = 500;
canvas.width = 800;
const ctx = canvas.getContext("2d");
canvas.style.border = "2px solid #000000";
canvas.style.marginBottom = "10px";

//targets asset
const birdImage = new Image();
birdImage.src = "assets/bird.png";

//background assset
const backgroundImage = new Image();
backgroundImage.src = "assets/background.jpg";

//cannon assets
const barrelImage = new Image();
barrelImage.src = "assets/barrel.png";

const carriageImage = new Image();
carriageImage.src = "assets/carriage.png";

//cannonBall aset
const cannonBallImage = new Image();
cannonBallImage.src = "assets/cannonBall.png"

//command list index
const commandList = new Image();
commandList.src = "assets/layout.png";

commandList.id = 'commandList';
commandList.className = 'commandList';
commandList.style.position = "fixed";
commandList.style.top = "0%";
commandList.style.left = "50%";
commandList.style.transform = "translateX(-50%)";
commandList.style.zIndex = "1000";
commandList.style.height = "600px";
commandList.style.width = "900px";
commandList.hidden = false; //hide command list by default
document.body.appendChild(commandList);

export { canvas, ctx, birdImage, backgroundImage,
    barrelImage, carriageImage, cannonBallImage, commandList };
