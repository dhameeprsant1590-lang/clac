const prevDisplay = document.querySelector(".previous-operand");
const currDisplay = document.querySelector(".current-operand");
const buttons = document.querySelectorAll(".btn");

let currentValue = "0";
let previousValue = "";
let operator = null;
let shouldResetScreen = false;

function updateDisplay() {
    currDisplay.value = currentValue;
    prevDisplay.textContent = operator ? `${previousValue} ${symbolFor(operator)}` : "0";
}

function symbolFor(op) {
    if (op === "/") return "÷";
    if (op === "*") return "×";
    if (op === "-") return "−";
    return op;
}

function appendNumber(num) {
    if (currentValue === "0" || shouldResetScreen) {
        currentValue = num === "." ? "0." : num;
        shouldResetScreen = false;
        return;
    }
    if (num === "." && currentValue.includes(".")) return;
    currentValue += num;
}

function chooseOperator(nextOp) {
    if (operator !== null && !shouldResetScreen) {
        calculate();
    }
    previousValue = currentValue;
    operator = nextOp;
    shouldResetScreen = true;
}

function calculate() {
    if (operator === null || shouldResetScreen) return;

    const a = parseFloat(previousValue);
    const b = parseFloat(currentValue);
    if (Number.isNaN(a) || Number.isNaN(b)) return;

    let result;
    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = b === 0 ? "Error" : a / b;
            break;
        case "%":
            result = (a * b) / 100;
            break;
        default:
            return;
    }

    currentValue = result === "Error" ? "Error" : String(Number(result.toFixed(10)));
    previousValue = currentValue;
    operator = null;
    shouldResetScreen = true;
}

function clearAll() {
    currentValue = "0";
    previousValue = "";
    operator = null;
    shouldResetScreen = false;
}

function deleteLast() {
    if (shouldResetScreen || currentValue === "Error") {
        clearAll();
        return;
    }
    currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.dataset.value;
        const action = btn.dataset.action;

        if (action === "clear") {
            clearAll();
        } else if (action === "delete") {
            deleteLast();
        } else if (action === "calculate") {
            calculate();
        } else if (value && ["+", "-", "*", "/", "%"].includes(value)) {
            chooseOperator(value);
        } else if (value) {
            appendNumber(value);
        }

        updateDisplay();
    });
});

updateDisplay();
          
