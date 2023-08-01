// Initialize variables to store the current operation, result, and previous result.
let currentOperation = '';
let currentResult = '';
let previousResult = '';

// Flag to track whether an operation is complete and the result is shown.
let operationComplete = false;

// Function to update the operation and result screens.
function updateScreens() {
  const operationScreen = document.querySelector('.operation-screen');
  const resultScreen = document.querySelector('.result-screen');

  operationScreen.textContent = currentOperation;
  resultScreen.textContent = currentResult;
}

// Function to perform the calculation when the equal button is pressed.
function calculate() {
  // Split the current operation into operands and operator.
  const operands = currentOperation.split(/[+\-*/]/);
  const operator = currentOperation.match(/[+\-*/]/);

  // If there are not enough operands or an invalid operator, return an error.
  if (operands.length !== 2 || !operator) {
    currentResult = 'Error';
  } else {
    const [num1, num2] = operands.map(parseFloat);

    switch (operator[0]) {
      case '+':
        currentResult = num1 + num2;
        break;
      case '-':
        currentResult = num1 - num2;
        break;
      case '*':
        currentResult = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          currentResult = 'Error: Division by zero';
        } else {
          currentResult = num1 / num2;
        }
        break;
      default:
        currentResult = 'Error';
        break;
    }
  }

  // Set the flag to indicate the operation is complete and the result is shown.
  operationComplete = true;
}

// Event listener for button clicks.
document.addEventListener('click', function (event) {
  const target = event.target;

  // If the operation is complete, and a new input is received (number or operator), reset the operation and result.
  if (operationComplete && (target.matches('.num button') || target.matches('.oper button'))) {
    currentOperation = previousResult.toString(); // Use the previous result as the new operation.
    currentResult = '';
    operationComplete = false;
  }

  // If the clicked element is a number or a decimal point, add it to the current operation.
  if (target.matches('.num button') || target.matches('.oper-decimal button')) {
    currentOperation += target.textContent;
    updateScreens();
  }

  // If the clicked element is an operator, add it to the current operation.
  if (target.matches('.oper button')) {
    currentOperation += target.textContent === 'x' ? '*' : target.textContent; // Convert 'x' to '*' for multiplication.
    updateScreens();
  }

  // If the clicked element is the clear button, reset the current operation and result.
  if (target.matches('.clear button')) {
    currentOperation = '';
    currentResult = '';
    operationComplete = false;
    updateScreens();
  }

  // If the clicked element is the delete button, remove the last character from the current operation.
  if (target.matches('.delete button')) {
    currentOperation = currentOperation.slice(0, -1);
    updateScreens();
  }

  // If the clicked element is the equal button, perform the calculation.
  if (target.matches('.oper-equal button')) {
    calculate();
    previousResult = currentResult; // Save the current result as the previous result.
    updateScreens();
  }
});
