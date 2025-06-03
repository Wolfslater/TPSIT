const operatorsInput = document.getElementsByClassName("operator");
const operationSelect = document.getElementById("operation");
const excecute = document.getElementById("excecute");
let output = document.getElementById("output");
let result;

const calculate = () => {
    const operators = [];
    for (let i = 0; i < operatorsInput.length; i++) {
    operators.push(Number(operatorsInput[i].value))
    };

    const operation = operationSelect.value;
    
    switch(operation) {
        case "+":
            result = operators[0] + operators[1];
            break;
        case "-":
            result = operators[0] - operators[1];
            break;
        case "/":
            result = operators[0] / operators[1];
            break;
        case "*":
            result = operators[0] * operators[1];
            break;
        case "**":
            result = operators[0] ** operators[1];
            break;
        case "%":
            result = operators[0] % operators[1];
            break;
    };

    console.log(result);
    console.log(output.innerHTML = result);
};

excecute.addEventListener("click", calculate)