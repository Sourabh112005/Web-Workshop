const display = document.getElementById('display');
const historyScreen = document.getElementById('history-screen');
let history = [];

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  const expression = display.value;
  if (!expression.trim()) return;

  try {
    const result = eval(expression);
    const entry = `${expression} = ${result}`;
    
    // Add to history (keep max 4)
    history.unshift(entry);
    if (history.length > 4) {
      history.pop();
    }

    updateHistoryScreen();
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}

function updateHistoryScreen() {
  historyScreen.textContent = history.join('\n');
}

// ✅ Keyboard support
document.addEventListener('keydown', function (event) {
  const key = event.key;
  const allowedKeys = ['0','1','2','3','4','5','6','7','8','9',
                       '+', '-', '*', '/', '.', '(', ')'];

  if (allowedKeys.includes(key)) {
    appendToDisplay(key);
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
