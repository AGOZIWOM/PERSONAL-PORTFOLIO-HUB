/* ===============================
   SMOOTH SCROLL
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

/* ===============================
   SCROLL REVEAL
================================ */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// NAVBAR CONTROL

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu on link click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Shrink navbar on scroll
window.addEventListener("scroll", () => {
  navbar.classList.toggle("shrink", window.scrollY > 50);
});

document.addEventListener("click", (e) => {
  const isClickInside =
    navbar.contains(e.target) ||
    menuToggle.contains(e.target);

  if (!isClickInside) {
    navLinks.classList.remove("active");
  }
});




/* ===============================
   PROJECT MODAL
================================ */
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".preview-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".project-card");
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalLink.href = card.dataset.link;
    modal.style.display = "flex";
  });
});

// const modal = document.getElementById("projectModal");
// const modalTitle = document.getElementById("modalTitle");
// const modalDesc = document.getElementById("modalDesc");
// const modalLink = document.getElementById("modalLink");
// const closeModal = document.querySelector(".close-modal");

/* OPEN MODAL FROM PREVIEW BUTTON */
// document.querySelectorAll(".preview-btn").forEach(btn => {
//   btn.addEventListener("click", e => {
//     const btn = e.target.closest(".project-card");
//     e.stopPropagation(); // prevents card click issues
    
//     modalTitle.textContent = btn.dataset.title;
//     modalDesc.textContent = btn.dataset.desc;
//     modalLink.href = btn.dataset.link;

//     modal.classList.add("active");
//   });
// });

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

/* ===============================
   DARK MODE TOGGLE
================================ */
const toggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
