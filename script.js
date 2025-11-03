// Automatic gallery generation
const gallery = document.getElementById("gallery");
const totalImages = 6; // number of images in /sliki

for (let i = 1; i <= totalImages; i++) {
  const img = document.createElement("img");
  img.src = `https://raw.githubusercontent.com/majstor-naste-art/majstor-naste/main/sliki/${i}.jpg`;
  img.alt = `Фасада ${i}`;
  img.onerror = () => img.src = "https://placehold.co/400x300?text=Majstor+Naste";
  gallery.appendChild(img);
}

// Lightbox logic
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("caption");

gallery.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    lightbox.style.display = "block";
    lightboxImg.src = e.target.src;
    caption.innerText = e.target.alt;
  }
});

document.querySelector(".close").addEventListener("click", () => {
  lightbox.style.display = "none";
});
