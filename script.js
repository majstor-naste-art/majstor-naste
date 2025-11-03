// script.js

// -------------------
// CONFIG
// -------------------
const TOTAL_IMAGES = 13; // број на слики во папката "sliki"
const LANGS_ACTIVE = ["bg", "mk","gb"]; // кои јазици се активни
let currentLang = "bg"; // default јазик

// -------------------
// LANGUAGE SWITCH
// -------------------
function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  LANGS_ACTIVE.forEach(l => {
    const btn = document.querySelector(`.lang-btn[data-lang="${l}"]`);
    if(btn) btn.classList.add("active");
  });
  
  // Тука можеш да додадеш и промена на текстовите на страната според lang
}

// Иницијализирај јазикот при load
setLanguage(currentLang);

// Додади click events
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.lang);
  });
});

// -------------------
// HERO SECTION ACTIVE
// -------------------
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if(hero) hero.classList.add("active");
});

// -------------------
// GALLERY AUTOMATIC LOAD
// -------------------
function loadGallery() {
  const gallery = document.getElementById("gallery");
  if(!gallery) return;

  for(let i = 1; i <= TOTAL_IMAGES; i++) {
    const img = document.createElement("img");
    img.src = `sliki/${i}.jpg`;
    img.alt = `Проект ${i}`;
    img.className = "gallery-img";
    img.onerror = function() {
      this.onerror = null;
      this.src = "https://placehold.co/400x300?text=Majstor+Naste";
    };
    
    // Optional: ако сакаш да се отвора во lightbox
    img.addEventListener("click", () => {
      openLightbox(i);
    });

    gallery.appendChild(img);
  }
}

// -------------------
// SIMPLE LIGHTBOX
// -------------------
function openLightbox(index) {
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <div class="lightbox-content">
      <img src="sliki/${index}.jpg" alt="Проект ${index}">
      <span class="lightbox-close">&times;</span>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector(".lightbox-close").addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  overlay.addEventListener("click", (e) => {
    if(e.target === overlay) document.body.removeChild(overlay);
  });
}

// -------------------
// INIT
// -------------------
document.addEventListener("DOMContentLoaded", () => {
  loadGallery();
});
