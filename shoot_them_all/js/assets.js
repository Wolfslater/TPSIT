//style canvas

const canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "aliceBlue"
canvas.height = 400;
canvas.width = 700;
const ctx = canvas.getContext("2d");
canvas.style.border = "2px solid #000000";
canvas.style.marginBottom = "10px";

//targets asset
const birdImage = new Image();
birdImage.src = "img/bird.png";