const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculateBtn");
const errorEl = document.getElementById("error");

const resultCard = document.getElementById("result");
const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const nextBirthdayEl = document.getElementById("nextBirthday");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

let history = JSON.parse(localStorage.getItem("ageHistory")) || [];

/* ---------- UTILITIES ---------- */

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function showError(message) {
  errorEl.textContent = message;
  dobInput.classList.add("invalid");
}

function clearError() {
  errorEl.textContent = "";
  dobInput.classList.remove("invalid");
}

/* ---------- AGE CALCULATION ---------- */

function calculateAge(dob) {
  const today = new Date();
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonthDays = daysInMonth(today.getFullYear(), today.getMonth() - 1);
    days += prevMonthDays;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function daysUntilNextBirthday(dob) {
  const today = new Date();
  let nextBirthday = new Date(
    today.getFullYear(),
    dob.getMonth(),
    dob.getDate()
  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diffTime = nextBirthday - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/* ---------- HISTORY ---------- */

function addToHistory(entry) {
  history.unshift(entry);
  localStorage.setItem("ageHistory", JSON.stringify(history));
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

/* ---------- MAIN HANDLER ---------- */

function handleCalculation() {
  clearError();

  if (!dobInput.value) {
    showError("Please select your date of birth.");
    return;
  }

  const dob = new Date(dobInput.value);
  const today = new Date();

  if (dob > today || isNaN(dob)) {
    showError("Invalid date selected.");
    return;
  }

  const age = calculateAge(dob);
  const nextBirthday = daysUntilNextBirthday(dob);

  yearsEl.textContent = age.years;
  monthsEl.textContent = age.months;
  daysEl.textContent = age.days;
  nextBirthdayEl.textContent = nextBirthday;

  resultCard.classList.remove("hidden");

  addToHistory(
    `${dobInput.value} → ${age.years}y ${age.months}m ${age.days}d | Next birthday in ${nextBirthday} days`
  );
}

/* ---------- EVENTS ---------- */

calculateBtn.addEventListener("click", handleCalculation);

dobInput.addEventListener("change", handleCalculation);

document.addEventListener("keydown", e => {
  if (e.key === "Enter") handleCalculation();
});

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("ageHistory");
  renderHistory();
});

renderHistory();
