const categoryEl = document.getElementById("category");
const valueInput = document.getElementById("valueInput");
const fromUnitEl = document.getElementById("fromUnit");
const toUnitEl = document.getElementById("toUnit");
const convertBtn = document.getElementById("convertBtn");
const resultCard = document.getElementById("resultCard");
const resultText = document.getElementById("resultText");
const errorEl = document.getElementById("error");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

let history = JSON.parse(localStorage.getItem("unitHistory")) || [];

/* ---------- UNIT DEFINITIONS ---------- */

const units = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    mile: 1609.34,
    foot: 0.3048
  },
  weight: {
    gram: 1,
    kilogram: 1000,
    pound: 453.592,
    ounce: 28.3495
  },
  volume: {
    liter: 1,
    milliliter: 0.001,
    gallon: 3.78541
  },
  temperature: ["celsius", "fahrenheit", "kelvin"]
};

/* ---------- UI HELPERS ---------- */

function showError(msg) {
  errorEl.textContent = msg;
  valueInput.classList.add("invalid");
}

function clearError() {
  errorEl.textContent = "";
  valueInput.classList.remove("invalid");
}

/* ---------- POPULATE DROPDOWNS ---------- */

function loadCategories() {
  categoryEl.innerHTML = "";
  Object.keys(units).forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.toUpperCase();
    categoryEl.appendChild(option);
  });
}

function loadUnits() {
  const category = categoryEl.value;
  fromUnitEl.innerHTML = "";
  toUnitEl.innerHTML = "";

  if (category === "temperature") {
    units.temperature.forEach(unit => {
      fromUnitEl.add(new Option(unit, unit));
      toUnitEl.add(new Option(unit, unit));
    });
  } else {
    Object.keys(units[category]).forEach(unit => {
      fromUnitEl.add(new Option(unit, unit));
      toUnitEl.add(new Option(unit, unit));
    });
  }
}

/* ---------- CONVERSION LOGIC ---------- */

function convertTemperature(value, from, to) {
  if (from === to) return value;

  let celsius;
  if (from === "fahrenheit") celsius = (value - 32) * 5 / 9;
  else if (from === "kelvin") celsius = value - 273.15;
  else celsius = value;

  if (to === "fahrenheit") return celsius * 9 / 5 + 32;
  if (to === "kelvin") return celsius + 273.15;
  return celsius;
}

function convertUnits() {
  clearError();

  const value = parseFloat(valueInput.value);
  if (isNaN(value)) {
    showError("Please enter a valid number.");
    return;
  }

  const category = categoryEl.value;
  const from = fromUnitEl.value;
  const to = toUnitEl.value;

  let result;

  if (category === "temperature") {
    result = convertTemperature(value, from, to);
  } else {
    const baseValue = value * units[category][from];
    result = baseValue / units[category][to];
  }

  result = Number(result.toFixed(6));
  resultText.textContent = `${value} ${from} = ${result} ${to}`;
  resultCard.classList.remove("hidden");

  addToHistory(`${value} ${from} → ${result} ${to}`);
}

/* ---------- HISTORY ---------- */

function addToHistory(entry) {
  history.unshift(entry);
  localStorage.setItem("unitHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

/* ---------- EVENTS ---------- */

categoryEl.addEventListener("change", loadUnits);
convertBtn.addEventListener("click", convertUnits);
valueInput.addEventListener("input", () => clearError());

document.addEventListener("keydown", e => {
  if (e.key === "Enter") convertUnits();
});

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("unitHistory");
  renderHistory();
});

/* ---------- INIT ---------- */

loadCategories();
loadUnits();
renderHistory();
