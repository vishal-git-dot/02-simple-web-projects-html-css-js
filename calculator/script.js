const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');
const themeToggle = document.getElementById('themeToggle');
const historyList = document.getElementById('historyList');

let currentInput = '';
let history = [];

buttons.forEach(button => {
  const value = button.dataset.value;
  if (value) {
    button.addEventListener('click', () => {
      currentInput += value;
      display.value = currentInput;
    });
  }
});

clearBtn.addEventListener('click', () => {
  currentInput = '';
  display.value = '';
});

equalsBtn.addEventListener('click', () => {
  try {
    const result = eval(currentInput);
    const expression = currentInput + ' = ' + result;
    currentInput = result.toString();
    display.value = currentInput;

    // Save to history
    history.unshift(expression);
    if (history.length > 5) history.pop();
    updateHistory();
  } catch (error) {
    display.value = 'Error';
    currentInput = '';
  }
});

function updateHistory() {
  historyList.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});
