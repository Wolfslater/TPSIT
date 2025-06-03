const buttons = document.querySelectorAll("button");
const output = document.getElementById("output");
let expression = document.getElementById("expression");
let operators = [];
let currentOperation;
let result;
let operations;

const evaluate = () => {
    operators.forEach(format);
    operators = operators.reduce(reducing, []);
};

const reducing = (array, item) => {
    if (typeof item === "number" && typeof array.at(-1) === "number") {
        array[array.length - 1] = +(array.at(-1) + "" + item);
    } else {
        array.push(item);
    }
    return array;
};

const format = (element, index, array) => {
    if (!isNaN(Number(element))) {
        array[index] = Number(element);
    }
};

const checkForError = () => {
    if (operators.includes(NaN) || typeof operators[0] !== "number") {
        return true;
    } else if (operators.length > 2  && typeof operators[2] !== "number") {
        return true;
    };
    return false;
};

for (let i of buttons) {
    if (operators.length < 3) {
        i.addEventListener("click", () => {
            if (i.value != operators.at(-1)) {
                operators.push(i.value);
            } else if (typeof operators.at(-1) === "number") {
                operators.push(i.value);
            };

            evaluate();
            operations = operators.join(" ");
            output.innerHTML = operations;

            if (operators.includes("CA")) {
                operators = [];
                result = 0;
                output.innerHTML = result;
                expression.innerHTML = result;
                return;
            };

            if (checkForError()) {
                output.innerHTML = "Error";
                expression.innerHTML = "";
                operators = [];
            };

            if (operators.includes("=") && operators.length >= 3) {
                operators.splice(3);

                if (checkForError()) {
                    output.innerHTML = "Error";
                    expression.innerHTML = "";
                    operators = [];
                };

                if (operators.includes("x")) {
                    result = operators[0] * operators[2];
                    currentOperation = `${operators[0]} * ${operators[2]} =`;
                } else if (operators.includes("/")) {
                    result = operators[0] / operators[2];
                    result = result.toFixed(2);
                    currentOperation = `${operators[0]} / ${operators[2]} =`;
                } else if (operators.includes("+")) {
                    result = operators[0] + operators[2];
                    currentOperation = `${operators[0]} + ${operators[2]} =`;
                } else if (operators.includes("-")) {
                    result = operators[0] - operators[2];
                    currentOperation = `${operators[0]} - ${operators[2]} =`;
                };

                expression.innerHTML = currentOperation;
                output.innerHTML = result;
                operators = [result];
            };
        });
    };
};