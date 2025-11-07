// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// MOBILE MENU
const mobileMenu = document.getElementById("mobileMenu");
document.querySelector(".hamburger").onclick = () => mobileMenu.classList.add("active");
document.querySelector(".close-btn").onclick = () => mobileMenu.classList.remove("active");

// HERO SLIDER
let slides = document.querySelectorAll(".slide");
let current = 0;
function showSlide(i) {
  slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
}
document.querySelector(".next").onclick = () => {
  current = (current + 1) % slides.length;
  showSlide(current);
};
document.querySelector(".prev").onclick = () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
};
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000);

// GALLERY LOAD
const gallery = document.getElementById("gallery-grid");
for (let i = 1; i <= 9; i++) {
  const img = document.createElement("img");
  img.src = `sliki/${i}.jpg`;
  img.loading = "lazy";
  gallery.appendChild(img);
}

// LIGHTBOX
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbPrev = document.querySelector(".lb-prev");
const lbNext = document.querySelector(".lb-next");
const lbClose = document.querySelector(".lb-close");
let currentImg = 0;

function openLightbox(index) {
  const imgs = [...gallery.querySelectorAll("img")];
  currentImg = index;
  lbImg.src = imgs[currentImg].src;
  lb.classList.add("active");
}
gallery.querySelectorAll("img").forEach((img, i) => img.onclick = () => openLightbox(i));
lbClose.onclick = () => lb.classList.remove("active");
lbPrev.onclick = () => { currentImg = (currentImg - 1 + gallery.children.length) % gallery.children.length; lbImg.src = gallery.children[currentImg].src; };
lbNext.onclick = () => { currentImg = (currentImg + 1) % gallery.children.length; lbImg.src = gallery.children[currentImg].src; };

// SHARE BUTTON
const shareBtn = document.getElementById("shareBtn");
shareBtn.onclick = async () => {
  try {
    await navigator.share({ title: "Мајстор Насте", url: window.location.href });
  } catch {}
};

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
