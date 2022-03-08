const hesapla = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = hesapla;

  if (waitingForSecondOperand === true) {
    hesapla.displayValue = digit;
    hesapla.waitingForSecondOperand = false;
  } else {
    hesapla.displayValue =
      displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (hesapla.waitingForSecondOperand === true) {
    hesapla.displayValue = '0.';
    hesapla.waitingForSecondOperand = false;
    return;
  }

  if (!hesapla.displayValue.includes(dot)) {
    hesapla.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = hesapla;
  const inputValue = parseFloat(displayValue);

  if (operator && hesapla.waitingForSecondOperand) {
    hesapla.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    hesapla.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = calculate(currentValue, inputValue, operator);

    hesapla.displayValue = String(result);
    hesapla.firstOperand = result;
  }

  hesapla.waitingForSecondOperand = true;
  hesapla.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  hesapla.displayValue = '0';
  hesapla.firstOperand = null;
  hesapla.waitingForSecondOperand = false;
  hesapla.operator = null;
}

function updateDisplay() {
  const display = document.querySelector('.ekran');
  display.value = hesapla.displayValue;
}

updateDisplay();

const keys = document.querySelector('.tuslar');
keys.addEventListener('click', event => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('ondalik')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('temizle')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});