//style canvas
const canvas = document.getElementById("canvas");
canvas.height = 400;
canvas.width = 700;
const ctx = canvas.getContext("2d");
canvas.style.border = "2px solid #000000";
canvas.style.marginBottom = "10px";

//targets asset
const birdImage = new Image();
birdImage.src = "img/bird.png";

//background assset
const backgroundImage = new Image();
backgroundImage.src = "img/background.jpg";

//cannon asset
const cannonImage = new Image();
cannonImage.src = "img/cannon.jpg"

//cannonBall aset
const cannonBallImage = new Image();
cannonBallImage.src = "img/cannonBall.png"