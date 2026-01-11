/* =========================
   DOM ELEMENTS
========================= */
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");

const board = document.getElementById("game-board");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const attemptsEl = document.getElementById("attempts");

const finalScoreEl = document.getElementById("final-score");
const bestScoreEl = document.getElementById("best-score");

const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");

const stopBtn = document.getElementById("stop-btn");
const stopModal = document.getElementById("stop-modal");
const confirmStopBtn = document.getElementById("confirm-stop");
const cancelStopBtn = document.getElementById("cancel-stop");



/* =========================
   GAME CONFIGURATION
========================= */
const levelOrder = ["easy", "medium", "hard"];
let currentLevelIndex = 0;

const levels = {
  easy:   { pairs: 8,  time: 60 },
  medium: { pairs: 12, time: 90 },
  hard:   { pairs: 18, time: 120 }
};

/* =========================
   GAME STATE VARIABLES
========================= */
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

let score = 0;
let attempts = 0;

let timer = 0;
let interval = null;
let paused = false;

let level = "easy";

/* =========================
   EVENT LISTENERS
========================= */
document.querySelectorAll("[data-level]").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    currentLevelIndex = index;
    level = levelOrder[currentLevelIndex];
    startGame(true);
  });
});

pauseBtn.addEventListener("click", togglePause);

// stopBtn.addEventListener("click", stopGame);

stopBtn.addEventListener("click", () => {
  stopModal.classList.remove("hidden");
  paused = true;
});


confirmStopBtn.addEventListener("click", () => {
  stopModal.classList.add("hidden");
  finishGameEarly();
});

cancelStopBtn.addEventListener("click", () => {
  stopModal.classList.add("hidden");
  paused = false;
});



restartBtn.addEventListener("click", () => {
  switchScreen(startScreen);
});

/* =========================
   GAME FLOW FUNCTIONS
========================= */
function startGame(resetScore = false) {
  if (resetScore) score = 0;

  resetRound();
  switchScreen(gameScreen);
  generateCards(levels[level].pairs);
  startTimer();
  updateUI();
}

function handleLevelComplete() {
  clearInterval(interval);

  // Bonus for remaining time
  score += timer * 2;

  setTimeout(() => {
    currentLevelIndex++;

    if (currentLevelIndex < levelOrder.length) {
      level = levelOrder[currentLevelIndex];
      showMessage(`Level Complete! ${level.toUpperCase()} unlocked`);
      startGame(false);
    } else {
      endGame();
    }
  }, 1200);
}

function endGame() {
  clearInterval(interval);
  saveHighScore();
  finalScoreEl.textContent = score;
  bestScoreEl.textContent = getHighScore();
  switchScreen(gameOverScreen);
}

/* =========================
   SCREEN MANAGEMENT
========================= */
function switchScreen(activeScreen) {
  [startScreen, gameScreen, gameOverScreen].forEach(screen =>
    screen.classList.remove("active")
  );
  activeScreen.classList.add("active");
}

/* =========================
   CARD GENERATION
========================= */
function generateCards(pairs) {
  board.innerHTML = "";
  flippedCards = [];
  matchedPairs = 0;

  const totalCards = pairs * 2;
  const gridSize = Math.ceil(Math.sqrt(totalCards));
  board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  const values = [...Array(pairs).keys()];
  cards = [...values, ...values].sort(() => Math.random() - 0.5);

  cards.forEach(value => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.value = value;
    card.textContent = "❓";

    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

/* =========================
   CARD LOGIC
========================= */
function flipCard(card) {
  if (
    paused ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched") ||
    flippedCards.length === 2
  ) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.value;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    attempts++;
    attemptsEl.textContent = attempts;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flippedCards;

  if (first.dataset.value === second.dataset.value) {
    first.classList.add("matched");
    second.classList.add("matched");

    score += 10;
    matchedPairs++;
    flippedCards = [];
    updateUI();

    if (matchedPairs === levels[level].pairs) {
      handleLevelComplete();
    }
  } else {
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      first.textContent = "❓";
      second.textContent = "❓";
      flippedCards = [];
    }, 800);
  }
}

/* =========================
   TIMER (COUNTDOWN)
========================= */
function startTimer() {
  clearInterval(interval);
  timer = levels[level].time;
  timerEl.textContent = timer;

  interval = setInterval(() => {
    if (!paused) {
      timer--;
      timerEl.textContent = timer;

      if (timer <= 0) {
        clearInterval(interval);
        endGame();
      }
    }
  }, 1000);
}

/* =========================
   PAUSE / RESUME
========================= */
function togglePause() {
  paused = !paused;
  pauseBtn.textContent = paused ? "▶ Resume" : "⏸ Pause";
}

// STOP BUTTON
function stopGame() {
  clearInterval(interval);
  paused = false;
  saveHighScore();

  finalScoreEl.textContent = score;
  bestScoreEl.textContent = getHighScore();

  switchScreen(gameOverScreen);
}

function stopGame() {
  if (!confirm("Stop the game and end your session?")) return;

  clearInterval(interval);
  paused = false;
  saveHighScore();

  finalScoreEl.textContent = score;
  bestScoreEl.textContent = getHighScore();

  switchScreen(gameOverScreen);
}

function finishGameEarly() {
  clearInterval(interval);
  paused = false;

  saveHighScore();
  finalScoreEl.textContent = score;
  bestScoreEl.textContent = getHighScore();

  switchScreen(gameOverScreen);
}




/* =========================
   UI & UTILITIES
========================= */
function updateUI() {
  scoreEl.textContent = score;
  attemptsEl.textContent = attempts;
}

function showMessage(text) {
  const msg = document.createElement("div");
  msg.textContent = text;
  msg.style.position = "fixed";
  msg.style.top = "20px";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.background = "#b8860b";
  msg.style.color = "#000";
  msg.style.padding = "10px 20px";
  msg.style.borderRadius = "6px";
  msg.style.zIndex = "1000";
  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 1500);
}

/* =========================
   STORAGE (HIGH SCORE)
========================= */
function saveHighScore() {
  const key = `memory-highscore`;
  const best = getHighScore();

  if (score > best) {
    localStorage.setItem(key, score);
  }
}

function getHighScore() {
  return Number(localStorage.getItem("memory-highscore")) || 0;
}

/* =========================
   RESET
========================= */
function resetRound() {
  clearInterval(interval);
  attempts = 0;
  paused = false;
  pauseBtn.textContent = "⏸ Pause";
  updateUI();
}
