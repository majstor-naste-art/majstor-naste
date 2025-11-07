// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// MOBILE MENU
const mobileMenu = document.getElementById("mobileMenu");
document.querySelector(".hamburger").onclick = () => mobileMenu.classList.add("active");
document.querySelector(".close-btn").onclick = () => mobileMenu.classList.remove("active");

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

// LANGUAGE SWITCHER
const langButtons = document.querySelectorAll('.lang-btn');
langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    langButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const lang = btn.dataset.lang;
    document.documentElement.lang = lang;
    changeLanguage(lang);
  });
});

// пример за едноставен превод
function changeLanguage(lang) {
  const texts = {
    mk: {
      hero: 'Фасади & Камен — професионално изведување',
      services: 'Нашите услуги'
    },
    bg: {
      hero: 'Фасади и Камък — професионално изпълнение',
      services: 'Нашите услуги'
    },
    en: {
      hero: 'Facades & Stone — Professional Work',
      services: 'Our Services'
    }
  };

  document.getElementById('hero-title').textContent = texts[lang].hero;
  document.getElementById('services-title').textContent = texts[lang].services;
}


// === HERO SLIDER ===
const slides = document.querySelectorAll('.slide');
let index = 0;
function showSlide(i) {
  slides.forEach(s => s.classList.remove('active'));
  slides[i].classList.add('active');
}
document.querySelector('.next').onclick = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
};
document.querySelector('.prev').onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};
setInterval(() => { index = (index + 1) % slides.length; showSlide(index); }, 5000);

// === MOBILE MENU ===
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');
document.querySelector('.close-btn').onclick = () => mobileMenu.classList.remove('active');
hamburger.onclick = () => mobileMenu.classList.add('active');

// === SHARE ===
document.getElementById('shareBtn').onclick = async () => {
  if (navigator.share) {
    await navigator.share({ title: document.title, url: window.location.href });
  } else {
    alert('Споделувањето не е поддржано во овој прелистувач.');
  }
};

// === GALLERY ===
const gallery = document.getElementById('gallery-grid');
for (let i = 1; i <= 12; i++) {
  const img = document.createElement('img');
  img.src = `sliki/${i}.jpg`;
  img.loading = 'lazy';
  img.alt = `Слика ${i}`;
  gallery.appendChild(img);
}

// === LIGHTBOX ===
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
let currentIndex = 0;
gallery.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    lightbox.style.display = 'flex';
    lbImg.src = e.target.src;
    currentIndex = [...gallery.children].indexOf(e.target);
  }
});
document.querySelector('.lb-close').onclick = () => lightbox.style.display = 'none';
document.querySelector('.lb-prev').onclick = () => {
  currentIndex = (currentIndex - 1 + gallery.children.length) % gallery.children.length;
  lbImg.src = gallery.children[currentIndex].src;
};
document.querySelector('.lb-next').onclick = () => {
  currentIndex = (currentIndex + 1) % gallery.children.length;
  lbImg.src = gallery.children[currentIndex].src;
};

// === LANG SWITCH ===
const langBtns = document.querySelectorAll('.lang-btn');
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    langBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.documentElement.lang = btn.dataset.lang;
  });
});

// === FOOTER YEAR ===
document.getElementById('year').textContent = new Date().getFullYear();

