const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculatorKeys");
const display = calculator.querySelector(".calculatorDisplay");

keys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return; //if a user clicks on the grid gap, it selects the calculatorKeys div, instead of a specific button. This line prevents this.

  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const type = key.dataset.type;
  const previousKeyType = calculator.dataset.previousKeyType;

  if (type === "number") {
    if (displayValue === "0" || previousKeyType === "operator") {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  if (type === "operator") {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach((el) => {
      el.dataset.state = "";
    });
    key.dataset.state = "selected";

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === "equal") {
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;
    if (operator) {
      display.textContent = calculate(firstNumber, operator, secondNumber);
    }
  }

  if (type === "clear") {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach((el) => (el.dataset.state = ""));
    key.dataset.state = "";

    calculator.dataset.firstNumber = "0";
    display.textContent = 0;
  }

  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  let result = "";

  if (operator === "plus") result = firstNumber + secondNumber;
  if (operator === "minus") result = firstNumber - secondNumber;
  if (operator === "times") result = firstNumber * secondNumber;
  if (operator === "divide") result = firstNumber / secondNumber;

  return result;
}
