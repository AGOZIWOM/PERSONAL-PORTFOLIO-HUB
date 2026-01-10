const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const historyEl = document.getElementById("history");
const clearHistoryBtn = document.getElementById("clearHistory");

let expression = "";
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

/* ---------- CORE HELPERS ---------- */

function updateDisplay(value) {
  display.value = value;
}

function addToHistory(entry) {
  history.push(entry);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyEl.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyEl.appendChild(li);
  });
}

/* ---------- MATH FUNCTIONS ---------- */

function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) throw Error("Invalid factorial");
  return n <= 1 ? 1 : n * factorial(n - 1);
}

function calculate() {
  try {
    let result = Function(`"use strict"; return (${expression})`)();
    if (!isFinite(result)) throw Error();
    addToHistory(`${expression} = ${result}`);
    expression = result.toString();
    updateDisplay(expression);
  } catch {
    updateDisplay("Error");
    expression = "";
  }
}

/* ---------- BUTTON HANDLING ---------- */

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;
    const fn = btn.dataset.fn;

    if (value) {
      expression += value;
    }

    if (action === "clear") expression = "";
    if (action === "backspace") expression = expression.slice(0, -1);
    if (action === "equals") calculate();

    if (fn) {
      try {
        let num = parseFloat(expression);
        if (isNaN(num)) throw Error();

        switch (fn) {
          case "sin": expression = Math.sin(num).toString(); break;
          case "cos": expression = Math.cos(num).toString(); break;
          case "tan": expression = Math.tan(num).toString(); break;
          case "log":
            if (num <= 0) throw Error();
            expression = Math.log10(num).toString();
            break;
          case "sqrt":
            if (num < 0) throw Error();
            expression = Math.sqrt(num).toString();
            break;
          case "pow": expression += "**"; break;
          case "fact": expression = factorial(num).toString(); break;
        }
      } catch {
        expression = "";
        updateDisplay("Invalid Input");
        return;
      }
    }

    updateDisplay(expression);
  });
});

/* ---------- KEYBOARD SUPPORT ---------- */

document.addEventListener("keydown", ee => {
  if (/[\d+\-*/().]/.test(e.key)) {
    expression += e.key;
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
  } else if (e.key === "Escape") {
    expression = "";
  }
  updateDisplay(expression);
});

/* ---------- HISTORY ---------- */

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("calcHistory");
  renderHistory();
});

renderHistory();
