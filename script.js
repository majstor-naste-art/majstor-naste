/* CONFIG */
const TOTAL_IMAGES = 30;         // gallery images (sliki/1.jpg ... sliki/30.jpg)
const SLIDER_COUNT = 5;         // how many images used in hero slider (from 1..TOTAL_IMAGES)
const IMAGE_SRC = i => `sliki/${i}.jpg`;

/* DOM ready */
document.addEventListener('DOMContentLoaded', () => {
  // basic elements
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // theme default: dark
  const savedTheme = localStorage.getItem('mn_theme') || 'dark';
  setTheme(savedTheme);

  // main elements
  const heroSlider = document.getElementById('heroSlider');
  const galleryGrid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.querySelector('.lb-close');
  const lbPrev = document.querySelector('.lb-prev');
  const lbNext = document.querySelector('.lb-next');
  const langBtns = document.querySelectorAll('.lang-btn');
  const contactForm = document.getElementById('contact-form');
  const statusEl = document.getElementById('contact-status');
  const shareBtn = document.getElementById('shareBtn');
  const themeToggle = document.getElementById('themeToggle');

  /* TRANSLATIONS */
  const TEXT = {
    mk: {
      brand:'Мајстор Насте', slogan:'Фасади и каменни облицовки',
      nav:['Почетна','Услуги','Галерија','Контакт'],
      heroTitle:'Фасади & Камен — прецизно и трајно',
      heroSub:'Професионални фасади, облицовки од камен и декоративна мазилка.',
      ctaQuote:'Барај проценка',
      galleryTitle:'Галерија',
      servicesTitle:'Нашите услуги',
      s1:['Фасади и Изолации','Професионално поставување топлинска изолација и декоративни мазилки.'],
      s2:['Облицовки со камен','Облицовки и акценти со гнајс и други природни камења.'],
      s3:['Камини и огради','Дизајн и изработка на камини и декоративни облици.'],
      contactTitle:'Контакт', phoneLabel:'Телефон:', emailLabel:'Е-пошта:', nameLabel:'Име / Телефон',
      msgLabel:'Порака', sendBtn:'Испрати', sending:'Се праќа...', sentOK:'Благодарам — испратено!'
    },
    bg: {
      brand:'Майстор Насте', slogan:'Фасади и камък',
      nav:['Начало','Услуги','Галерия','Контакт'],
      heroTitle:'Фасади & Камък - прецизно и трайно',
      heroSub:'Професионални фасади, облицовки и декоративни мазилки.',
      ctaQuote:'Вземете оферта',
      galleryTitle:'Галерия',
      servicesTitle:'Нашите услуги',
      s1:['Фасади и изолации','Професионално полагане на топлоизолация и декоративни мазилки.'],
      s2:['Облицовки с камък','Облицовки с гнайс и други естествени камъни.'],
      s3:['Камини и огради','Дизайн и изработка на камини и огради.'],
      contactTitle:'Контакт', phoneLabel:'Телефон:', emailLabel:'E-поща:', nameLabel:'Име / Телефон',
      msgLabel:'Съобщение', sendBtn:'Изпрати', sending:'Изпращане...', sentOK:'Благодарим — заявката е изпратена!'
    },
    en: {
      brand:'Majstor Naste', slogan:'Facades & Stone Cladding',
      nav:['Home','Services','Gallery','Contact'],
      heroTitle:'Facades & Stone — precise and lasting',
      heroSub:'Professional facades, stone cladding and decorative plaster.',
      ctaQuote:'Get a Quote',
      galleryTitle:'Gallery',
      servicesTitle:'Our Services',
      s1:['Facades & Insulation','Professional installation of insulation and decorative finishes.'],
      s2:['Stone Cladding','Cladding and accents in gneiss and natural stone.'],
      s3:['Fireplaces & Fences','Design and construction of fireplaces and stone features.'],
      contactTitle:'Contact', phoneLabel:'Phone:', emailLabel:'Email:', nameLabel:'Name / Phone',
      msgLabel:'Message', sendBtn:'Send', sending:'Sending...', sentOK:'Thanks — message sent!'
    }
  };

  /* BUILD HERO SLIDER (SLIDER_COUNT first images) */
  const slides = [];
  for (let i = 1; i <= Math.min(SLIDER_COUNT, TOTAL_IMAGES); i++) {
    const s = document.createElement('div');
    s.className = 'slide';
    s.style.backgroundImage = `url('${IMAGE_SRC(i)}')`;
    s.dataset.index = i;
    heroSlider.appendChild(s);
    slides.push(s);
  }
  if (slides.length) slides[0].classList.add('active');

  let currentSlide = 0;
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  function showSlide(index) { slides.forEach((sl, idx) => sl.classList.toggle('active', idx === index)); }
  function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); }
  function prevSlide() { currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); }
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });
  }
  let autoTimer = setInterval(nextSlide, 5000);
  function resetAuto() { clearInterval(autoTimer); autoTimer = setInterval(nextSlide, 5000); }

  /* BUILD GALLERY */
  const images = [];
  for (let i = 1; i <= TOTAL_IMAGES; i++) {
    const img = document.createElement('img');
    img.src = IMAGE_SRC(i);
    img.alt = `Проект ${i}`;
    img.dataset.index = i - 1;
    img.onerror = () => { img.src = 'https://placehold.co/800x600?text=Majstor+Naste'; };
    galleryGrid.appendChild(img);
    images.push(IMAGE_SRC(i));
  }
  // small stagger
  document.querySelectorAll('.gallery-grid img').forEach((el, idx) => el.style.animationDelay = `${idx * 30}ms`);

  /* LIGHTBOX */
  let lbIndex = 0;
  function openLB(i) { lbIndex = i; lbImg.src = images[lbIndex]; lightbox.style.display = 'flex'; lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; }
  function closeLB() { lightbox.style.display = 'none'; lightbox.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }
  function prevLB() { lbIndex = (lbIndex - 1 + images.length) % images.length; lbImg.src = images[lbIndex]; }
  function nextLB() { lbIndex = (lbIndex + 1) % images.length; lbImg.src = images[lbIndex]; }

  document.getElementById('gallery-grid').addEventListener('click', e => {
    if (e.target && e.target.tagName === 'IMG') openLB(parseInt(e.target.dataset.index, 10));
  });
  lbClose.addEventListener('click', closeLB);
  lbPrev.addEventListener('click', prevLB);
  lbNext.addEventListener('click', nextLB);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
  document.addEventListener('keydown', e => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') prevLB();
      if (e.key === 'ArrowRight') nextLB();
    }
  });

  /* LANG SWITCH */
  let currentLang = localStorage.getItem('mn_lang') || 'mk';
  function setActiveLangBtn(code) {
    langBtns.forEach(b => { b.classList.toggle('active', b.dataset.lang === code); b.setAttribute('aria-pressed', b.dataset.lang === code ? 'true' : 'false'); });
  }
  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('mn_lang', lang);
    setActiveLangBtn(lang);
    const t = TEXT[lang];
    const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    setText('brand-name', t.brand);
    setText('brand-slogan', t.slogan);
    setText('hero-title', t.heroTitle);
    setText('hero-sub', t.heroSub);
    setText('cta-quote', t.ctaQuote);
    setText('gallery-title', t.galleryTitle);
    setText('services-title', t.servicesTitle);
    setText('s1-title', t.s1[0]); setText('s1-desc', t.s1[1]);
    setText('s2-title', t.s2[0]); setText('s2-desc', t.s2[1]);
    setText('s3-title', t.s3[0]); setText('s3-desc', t.s3[1]);
    setText('contact-title', t.contactTitle);
    setText('contact-phone-label', t.phoneLabel);
    setText('contact-email-label', t.emailLabel);
    setText('lbl-name', t.nameLabel);
    setText('lbl-email', t.emailLabel);
    setText('lbl-msg', t.msgLabel);
    setText('send-btn', t.sendBtn);
    setText('footer-name', t.brand);
    // navs
    document.querySelectorAll('.main-nav a').forEach((a, i) => a.textContent = t.nav[i] || a.textContent);
    document.querySelectorAll('.mobile-nav a').forEach((a, i) => a.textContent = t.nav[i] || a.textContent);
  }
  langBtns.forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  applyLang(currentLang);

  /* CONTACT FORM (mailto fallback) */
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    if (!name || !email || !message) {
      statusEl.textContent = TEXT[currentLang].sending;
      setTimeout(() => statusEl.textContent = '', 2000);
      return;
    }
    const subject = encodeURIComponent(`${TEXT[currentLang].brand} - Contact`);
    const body = encodeURIComponent(`Name/Phone: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@majstornaste.example?subject=${subject}&body=${body}`;
    statusEl.textContent = TEXT[currentLang].sentOK;
    this.reset();
    setTimeout(() => statusEl.textContent = '', 5000);
  });

  /* SHARE */
  if (shareBtn) {
    if (navigator.share) {
      shareBtn.addEventListener('click', async () => {
        try { await navigator.share({ title: document.title, text: TEXT[currentLang].heroSub, url: window.location.href }); } catch (e) { /* ignore */ }
      });
    } else {
      shareBtn.addEventListener('click', () => { navigator.clipboard.writeText(window.location.href); alert('🔗 Линкот е копиран!'); });
    }
  }

  /* THEME TOGGLE */
  function setTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode === 'light' ? 'light' : 'dark');
    localStorage.setItem('mn_theme', mode);
    if (themeToggle) themeToggle.textContent = mode === 'light' ? '☀️' : '🌙';
  }
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
  setTheme(savedTheme);

  /* MOBILE MENU */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = mobileMenu.querySelector('.close-btn');
  hamburger.addEventListener('click', () => { mobileMenu.style.display = 'block'; mobileMenu.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; });
  closeBtn.addEventListener('click', () => { mobileMenu.style.display = 'none'; mobileMenu.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; });
  mobileMenu.addEventListener('click', (e) => { if (e.target === mobileMenu) { mobileMenu.style.display = 'none'; document.body.style.overflow = ''; } });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mobileMenu.style.display = 'none'; document.body.style.overflow = ''; }));

}); // DOMContentLoaded

/* helper for IMAGE_SRC in outside scope if needed */
function IMAGE_SRC(i) { return `sliki/${i}.jpg`; }



const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

/* GALLERY with lazy load */
const galleryGrid = document.getElementById("gallery-grid");
const TOTAL_IMAGES = 30;
for (let i = 1; i <= TOTAL_IMAGES; i++) {
  const img = document.createElement("img");
  img.src = `sliki/${i}.jpg`;
  img.loading = "lazy";
  img.alt = `Project ${i}`;
  img.onerror = () => img.src = "https://placehold.co/600x400?text=Majstor+Naste";
  galleryGrid.appendChild(img);
}

/* SLIDER */
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
function showSlide(i) {
  slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
}
document.querySelector(".next").onclick = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
};
document.querySelector(".prev").onclick = () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
};
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

/* THEME TOGGLE */
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});



/* HERO SLIDER */
let currentSlide=0;
const slides=document.querySelectorAll('.hero .slide');
const nextBtn=document.querySelector('.slider-btn.next');
const prevBtn=document.querySelector('.slider-btn.prev');

function showSlide(i){
  slides.forEach((s,index)=>s.classList.toggle('active',index===i));
}
function nextSlide(){ currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide);}
function prevSlide(){ currentSlide=(currentSlide-1+slides.length)%slides.length; showSlide(currentSlide);}
nextBtn.addEventListener('click',nextSlide);
prevBtn.addEventListener('click',prevSlide);
setInterval(nextSlide,5000);

/* LANGUAGE SWITCH */
const TEXT = { /* сите преводи MK/BG/EN исто како порано */ };
const langBtns=document.querySelectorAll('.lang-btn');
let currentLang='mk';

function applyLang(lang){
  currentLang=lang;
  const t=TEXT[lang];
  document.getElementById('brand-name').textContent=t.brand;
  document.getElementById('brand-slogan').textContent=t.slogan;
  document.getElementById('hero-title').textContent=t.heroTitle;
  document.getElementById('hero-sub').textContent=t.heroSub;
  document.getElementById('cta-quote').textContent=t.ctaQuote;
  document.getElementById('gallery-title').textContent=t.galleryTitle;
  document.getElementById('services-title').textContent=t.servicesTitle;
  document.getElementById('s1-title').textContent=t.s1[0];
  document.getElementById('s1-desc').textContent=t.s1[1];
  document.getElementById('s2-title').textContent=t.s2[0];
  document.getElementById('s2-desc').textContent=t.s2[1];
  document.getElementById('s3-title').textContent=t.s3[0];
  document.getElementById('s3-desc').textContent=t.s3[1];
  document.getElementById('contact-title').textContent=t.contactTitle;
  document.getElementById('contact-phone-label').textContent=t.phoneLabel;
  document.getElementById('contact-email-label').textContent=t.emailLabel;
  document.getElementById('lbl-name').textContent=t.nameLabel;
  document.getElementById('lbl-email').textContent=t.emailLabel;
  document.getElementById('lbl-msg').textContent=t.msgLabel;
  document.getElementById('send-btn').textContent=t.sendBtn;

  const navs=document.querySelectorAll('.main-nav a');
  navs.forEach((a,i)=>a.textContent=t.nav[i]);
  document.getElementById('footer-name').textContent=t.brand;
}

langBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    langBtns.forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    applyLang(btn.dataset.lang);
  });
});
applyLang(currentLang);

/* SHARE BUTTON */
const shareBtn=document.getElementById("shareBtn");
if(shareBtn){
  shareBtn.addEventListener("click",async()=>{
    if(navigator.share){
      try{ await navigator.share({title:"Мајстор Насте",text:"Погледни го нашиот сајт!",url:window.location.href}); }
      catch(e){ console.error(e);}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("🔗 Линкот е копиран!");
    }
  });
}
