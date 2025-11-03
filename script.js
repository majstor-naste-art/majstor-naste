// Inject gallery images
const gallery = document.getElementById("gallery-grid");
const total = 6;

for (let i = 1; i <= total; i++) {
  const img = document.createElement("img");
  img.src = `sliki/${i}.jpg`;
  img.alt = `Проект ${i}`;
  img.onerror = () => img.src = "https://placehold.co/400x300?text=Majstor+Naste";
  gallery.appendChild(img);
}

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const close = document.querySelector(".close");

gallery.addEventListener("click", e => {
  if (e.target.tagName === "IMG") {
    lightbox.style.display = "flex";
    lightboxImg.src = e.target.src;
  }
});
close.onclick = () => (lightbox.style.display = "none");
