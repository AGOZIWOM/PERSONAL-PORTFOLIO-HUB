let images = JSON.parse(localStorage.getItem("gallery")) || [];
let activeCategory = "all";
let selectedId = null;
let currentIndex = null;

/* DOM */
const gallery = document.getElementById("gallery");
const uploadInput = document.getElementById("uploadInput");
const deleteBtn = document.getElementById("deleteBtn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

/* SAVE */
function save() {
  localStorage.setItem("gallery", JSON.stringify(images));
}

/* RENDER */
function render() {
  gallery.innerHTML = "";

  images
    .filter(img => activeCategory === "all" || img.category === activeCategory)
    .forEach((img, index) => {
      const card = document.createElement("div");
      card.className = "card";
      if (img.id === selectedId) card.classList.add("selected");

      card.innerHTML = `<img src="${img.data}" />`;

      card.onclick = () => {
        selectedId = img.id;
        render();
      };

      card.ondblclick = () => openLightbox(index);

      gallery.appendChild(card);
    });
}

/* UPLOAD */
uploadInput.onchange = e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const category = prompt("Enter category (Nature, Travel, etc):", "Nature");
    images.push({
      id: Date.now(),
      data: reader.result,
      category,
      timestamp: Date.now()
    });
    save();
    render();
  };
  reader.readAsDataURL(file);
};

/* DELETE */
deleteBtn.onclick = () => {
  if (!selectedId) return alert("Select an image first");
  if (!confirm("Delete this image?")) return;

  images = images.filter(i => i.id !== selectedId);
  selectedId = null;
  save();
  render();
};

/* FILTER */
document.querySelectorAll(".filter").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    render();
  };
});

/* LIGHTBOX */
function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = images[index].data;
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  lightbox.classList.add("hidden");
}

document.querySelector(".close").onclick = closeLightbox;

/* KEYBOARD NAVIGATION */
window.addEventListener("keydown", e => {
  if (lightbox.classList.contains("hidden")) return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].data;
  }

  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].data;
  }

  if (e.key === "Escape") closeLightbox();
});

render();
