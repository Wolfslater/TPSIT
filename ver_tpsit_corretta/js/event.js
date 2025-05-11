const h1 = document.getElementById("route");
const div = document.querySelectorAll("div");
const section = document.getElementById("section");
const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
const div3 = document.getElementById("div3");
const div4 = document.getElementById("div4");
const div5 = document.getElementById("div5");

const getDivBackgroundColor = (div) => {
    return window.getComputedStyle(div).backgroundColor;
};

const changeColour1 = () => {
    h1.style.backgroundColor = getDivBackgroundColor(div1);
};

const changeColour2 = () => {
    h1.style.backgroundColor = getDivBackgroundColor(div2);
};

const changeColour3 = () => {
    h1.style.backgroundColor = getDivBackgroundColor(div3);
};

const changeColour4 = () => {
    h1.style.backgroundColor = getDivBackgroundColor(div4);
};

const changeColour5 = () => {
    h1.style.backgroundColor = getDivBackgroundColor(div5);
};

// Functions to set background color on click
const click1 = () => {
    h1.style.color = getDivBackgroundColor(div1);
};

const click2 = () => {
    h1.style.color = getDivBackgroundColor(div2);
};

const click3 = () => {
    h1.style.color = getDivBackgroundColor(div3);
};

const click4 = () => {
    h1.style.color = getDivBackgroundColor(div4);
};

const click5 = () => {
    h1.style.color = getDivBackgroundColor(div5);
};

const mouseLeave = () => {
    h1.style.color = "black";
    h1.style.backgroundColor = "white";
};

//div.addEventListener("mouseover", getDivBackgroundColor(div.value))
section.addEventListener("mouseleave", mouseLeave);