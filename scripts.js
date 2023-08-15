class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        if (current === 0) {
          this.currentOperand = "You just won Maths!";
          this.operation = undefined;
          this.previousOperand = "";
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    if (this.currentOperand === "You just won Maths!") {
      this.currentOperandTextElement.innerText = this.currentOperand;
      this.previousOperandTextElement.innerText = "";
    } else {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(
        this.currentOperand
      );

      if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
          this.previousOperand
        )} ${this.operation}`;
      } else {
        this.previousOperandTextElement.innerText = "";
      }
    }
  }
}

const numberButtons = document.querySelectorAll('[data-type="number"]');
const operationButtons = document.querySelectorAll('[data-type="operator"]');
const equalButton = document.querySelector('[data-type="equal"]');
const deleteButton = document.querySelector('[data-type="clear"]');
const allClearButton = document.querySelector('[data-type="del"]');
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
  if (calculator.currentOperand === "") {
    calculator.currentOperand = "0";
    calculator.updateDisplay();
  }
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.currentOperand = "0";
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
  if (calculator.currentOperand === "") {
    calculator.currentOperand = "0";
    calculator.updateDisplay();
  }
});

const keys = document.querySelector(".calculatorKeys");

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const keyElement = keys.querySelector(`button[data-key="${key}"]`);

  if (keyElement) {
    keyElement.click();
    keyElement.classList.add("active-keyboard");
    if (keyElement.dataset.type === "operator") {
      keyElement.classList.add("active-keyboard");
    }
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key;
  const keyElement = keys.querySelector(`button[data-key="${key}"]`);

  if (keyElement) {
    keyElement.classList.remove("active-keyboard");
  }
});
