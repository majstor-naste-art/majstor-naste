/* CONFIG */
const TOTAL_IMAGES = 30;
const IMAGE_SRC = i => `sliki/${i}.jpg`;

/* DOM */
const yearEl = document.getElementById('year');
const galleryGrid = document.getElementById('gallery-grid');
const langBtns = document.querySelectorAll('.lang-btn');
const shareBtn = document.getElementById("shareBtn");

/* TRANSLATIONS */
const TEXT = {
  mk: {
    brand: "Мајстор Насте",
    slogan: "Фасади, камен и мазилка",
    nav: ["Почетна", "Услуги", "Галерија", "Контакт"],
    heroTitle: "Фасади & Камен — професионално изведување",
    heroSub: "Специјализација: фасади, облицовки, камини и мазилки.",
    ctaQuote: "Барај проценка",
    galleryTitle: "Галерија"
  },
  bg: {
    brand: "Майстор Насте",
    slogan: "Фасади, камък и мазилка",
    nav: ["Начало", "Услуги", "Галерия", "Контакт"],
    heroTitle: "Фасади & Камък — професионално изпълнение",
    heroSub: "Специализация: фасади, облицовки, камини и мазилки.",
    ctaQuote: "Заяви оферта",
    galleryTitle: "Галерия"
  },
  en: {
    brand: "Majstor Naste",
    slogan: "Facades, stone & plaster",
    nav: ["Home", "Services", "Gallery", "Contact"],
    heroTitle: "Facades & Stone — professional execution",
    heroSub: "Specializing in facades, stone cladding & plaster.",
    ctaQuote: "Get a quote",
    galleryTitle: "Gallery"
  }
};

/* YEAR */
yearEl.textContent = new Date().getFullYear();

/* GALLERY */
const images = [];
for (let i = 1; i <= TOTAL_IMAGES; i++) {
  const img = document.createElement("img");
  img.src = IMAGE_SRC(i);
  img.loading = "lazy";
  img.alt = `Project ${i}`;
  img.onerror = () => img.src = "https://placehold.co/800x600?text=Majstor+Naste";
  galleryGrid.appendChild(img);
  images.push(img.src);
}

/* LANGUAGE SWITCH */
let currentLang = "mk";
function applyLang(lang) {
  currentLang = lang;
  const t = TEXT[lang];
  document.getElementById("brand-name").textContent = t.brand;
  document.getElementById("brand-slogan").textContent = t.slogan;
  document.getElementById("hero-title").textContent = t.heroTitle;
  document.getElementById("hero-sub").textContent = t.heroSub;
  document.getElementById("cta-quote").textContent = t.ctaQuote;
  document.getElementById("gallery-title").textContent = t.galleryTitle;
  document.querySelectorAll(".main-nav a").forEach((a, i) => {
    a.textContent = t.nav[i];
  });
}
langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    langBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyLang(btn.dataset.lang);
  });
});
applyLang(currentLang);

/* SHARE BUTTON */
if (shareBtn && navigator.share) {
  shareBtn.addEventListener("click", async () => {
    try {
      await navigator.share({
        title: "Мајстор Насте — Фасади & Камен",
        text: "Погледни го нашиот сајт!",
        url: window.location.href
      });
    } catch (err) {
      console.log("Share cancelled or unsupported", err);
    }
  });
} else if (shareBtn) {
  shareBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);
    alert("🔗 Линкот е копиран!");
  });
}

/* FLASH LOGO */
const logo = document.querySelector('.logo.flash');
setInterval(() => {
  logo.classList.toggle('active');
}, 2000);

/* HERO SLIDER */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.slider-btn.next');
const prevBtn = document.querySelector('.slider-btn.prev');
function showSlide(i) {
  slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
function prevSlideFunc() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlideFunc);
setInterval(nextSlide, 5000);


// ========== GALLERY AUTO-GENERATION ==========
const gallery = document.getElementById('gallery-grid');
if (gallery) {
  for (let i = 1; i <= 30; i++) {
    const img = document.createElement('img');
    img.src = `sliki/${i}.jpg`;
    img.alt = `Слика ${i}`;
    img.loading = "lazy";
    img.onerror = () => img.remove(); // ако нема слика, ја брише
    gallery.appendChild(img);
  }
}

// ========== LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const closeBtn = document.querySelector('.lb-close');
const nextBtn = document.querySelector('.lb-next');
const prevBtn = document.querySelector('.lb-prev');
let currentIndex = 0;

document.addEventListener('click', e => {
  if (e.target.closest('#gallery-grid img')) {
    const imgs = [...document.querySelectorAll('#gallery-grid img')];
    currentIndex = imgs.indexOf(e.target);
    showLightbox(imgs[currentIndex].src);
  }
  if (e.target === closeBtn) lightbox.style.display = 'none';
  if (e.target === nextBtn) navigate(1);
  if (e.target === prevBtn) navigate(-1);
});

function showLightbox(src) {
  lightbox.style.display = 'flex';
  lbImg.src = src;
}

function navigate(dir) {
  const imgs = [...document.querySelectorAll('#gallery-grid img')];
  currentIndex = (currentIndex + dir + imgs.length) % imgs.length;
  lbImg.src = imgs[currentIndex].src;
}
