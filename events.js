const h1 = document.getElementById("response");
let counter = 0;

document.onkeydown = function(event) {
    if (event.key === "ArrowRight") {
        counter++;
    } else if (event.key === "ArrowLeft") {
        counter--;
    } else if (event.key === "ArrowUp") {
        counter = 0;
    }
    counterColour(counter);
    h1.innerHTML = counter;
};
function increase() {
    counterColour(counter);
    h1.innerHTML = counter++
};

function decrease() {
    counterColour(counter);
    h1.innerHTML = counter--
};

function reset() {
    counter = 0;
    counterColour(counter);
    h1.innerHTML = counter;
};

const counterColour = (counter) => {
    if (counter < 0) {
        h1.style.color = "red";
        console.log(counter);
    } else if (counter > 0) {
        h1.style.color = "green";
        console.log(counter);
    } else {
        h1.style.color = "black";
        console.log(counter);
    };
}