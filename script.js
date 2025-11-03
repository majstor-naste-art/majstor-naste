/* ======== configuration ======== */
const TOTAL_IMAGES = 6;            // how many images in /sliki (1..TOTAL_IMAGES)
const IMAGE_PATH = i => `sliki/${i}.jpg`; // relative path on GH Pages

/* ======== DOM refs ======== */
const yearEl = document.getElementById('year');
const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbClose = document.querySelector('.lb-close');
const lbPrev = document.querySelector('.lb-prev');
const lbNext = document.querySelector('.lb-next');
const langBtns = document.querySelectorAll('.lang-btn');
const contactForm = document.getElementById('contact-form');
const statusEl = document.getElementById('contact-status');

/* ======== translations ======== */
const TEXT = {
  mk: {
    brand: 'Мајстор Насте',
    slogan: 'Фасади, камен и мазилка',
    nav: ['Почетна','Услуги','Галерија','Контакт'],
    heroTitle: 'Фасади & Камен — професионално изведување',
    heroSub: 'Специјализација: фасади, облицовки, камини и мазилки.',
    ctaQuote: 'Контактирај не',
    servicesTitle: 'Наши Услуги',
    s1: ['Фасади и Изолации','Топлоизолации, декоративни мазилки и завршни фасадни работи.'],
    s2: ['Камен и Гнајс','Облицовки со природен камен за фасади и декоративни површини.'],
    s3: ['Камини и Огради','Изработка на камини и камени огради.'],
    galleryTitle: 'Галерија',
    contactTitle: 'Контакт',
    phoneLabel: 'Телефон:',
    emailLabel: 'Е-пошта:',
    nameLabel: 'Име / Телефон',
    emailInput: 'Е-пошта',
    msgLabel: 'Съобщение',
    sendBtn: 'Испрати',
    sending: 'Се праќа…',
    sentOK: 'Благодарам — побараката е испратена!'
  },
  bg: {
    brand: 'Майстор Насте',
    slogan: 'Фасади, камък и мазилка',
    nav: ['Начало','Услуги','Галерия','Контакт'],
    heroTitle: 'Фасади & Камен - професионално изпълнение',
    heroSub: 'Специализация: фасади, облицовки с гнайс, камини и мазилки.',
    ctaQuote: 'Вземете оферта',
    servicesTitle: 'Нашите услуги',
    s1: ['Фасади и изолации','Топлоизолации, декоративни мазилки и довършителни работи.'],
    s2: ['Камен и гнайс','Облицовки с естествен камък за фасади и декорации.'],
    s3: ['Камини и огради','Изработка на камини и каменни огради.'],
    galleryTitle: 'Галерия',
    contactTitle: 'Контакт',
    phoneLabel: 'Телефон:',
    emailLabel: 'Е-поща:',
    nameLabel: 'Име / Телефон',
    emailInput: 'E-mail',
    msgLabel: 'Съобщение',
    sendBtn: 'Изпрати',
    sending: 'Изпращане…',
    sentOK: 'Благодарим — заявката е изпратена!'
  },
  en: {
    brand: 'Majstor Naste',
    slogan: 'Facades, stone & plaster',
    nav: ['Home','Services','Gallery','Contact'],
    heroTitle: 'Facades & Stone — professional execution',
    heroSub: 'We specialize in facades, stone cladding, fireplaces and plaster.',
    ctaQuote: 'Get a Quote',
    servicesTitle: 'Our Services',
    s1: ['Facades & Insulation','Thermal insulation, decorative plaster and finishes.'],
    s2: ['Stone Cladding','Natural stone cladding for facades and accents.'],
    s3: ['Fireplaces & Fences','Fireplace design and stone fences.'],
    galleryTitle: 'Gallery',
    contactTitle: 'Contact',
    phoneLabel: 'Phone:',
    emailLabel: 'Email:',
    nameLabel: 'Name / Phone',
    emailInput: 'Email',
    msgLabel: 'Message',
    sendBtn: 'Send',
    sending: 'Sending…',
    sentOK: 'Thanks — message sent!'
  }
};

/* ======== init ======== */
yearEl.textContent = new Date().getFullYear();
let currentLang = 'mk';
let images = [];

// inject gallery images
for (let i=1;i<=TOTAL_IMAGES;i++){
  const src = IMAGE_PATH(i);
  const img = document.createElement('img');
  img.src = src;
  img.alt = `Project ${i}`;
  img.dataset.index = i-1;
  img.onerror = () => { img.src = 'https://placehold.co/800x600?text=Majstor+Naste'; };
  galleryGrid.appendChild(img);
  images.push(src);
}

/* Lightbox behavior */
let lbIndex = 0;
function openLightbox(index){
  lbIndex = index;
  lbImg.src = images[lbIndex];
  lightbox.style.display = 'flex';
  lightbox.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden','true');
}
function prevImage(){ lbIndex = (lbIndex-1+images.length)%images.length; lbImg.src = images[lbIndex]; }
function nextImage(){ lbIndex = (lbIndex+1)%images.length; lbImg.src = images[lbIndex]; }

galleryGrid.addEventListener('click', e=>{
  if(e.target && e.target.tagName === 'IMG'){
    openLightbox(parseInt(e.target.dataset.index,10));
  }
});
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevImage);
lbNext.addEventListener('click', nextImage);
lightbox.addEventListener('click', e=>{ if(e.target===lightbox) closeLightbox(); });
document.addEventListener('keydown', e=>{ if(lightbox.style.display==='flex'){ if(e.key==='Escape') closeLightbox(); if(e.key==='ArrowLeft') prevImage(); if(e.key==='ArrowRight') nextImage(); } });

/* LANG SWITCH */
function applyLang(lang){
  currentLang = lang;
  const t = TEXT[lang];
  // brand
  document.getElementById('brand-name').textContent = t.brand;
  document.getElementById('brand-slogan').textContent = t.slogan;
  // nav
  const navs = document.querySelectorAll('.main-nav a');
  navs.forEach((a,idx)=> a.textContent = t.nav[idx]);
  // hero
  document.getElementById('hero-title').textContent = t.heroTitle;
  document.getElementById('hero-sub').textContent = t.heroSub;
  document.getElementById('cta-quote').textContent = t.ctaQuote;
  document.getElementById('cta-gallery').textContent = t.ctaGallery || t.galleryTitle || 'Gallery';
  // services
  document.getElementById('services-title').textContent = t.servicesTitle;
  document.getElementById('s1-title').textContent = t.s1[0];
  document.getElementById('s1-desc').textContent = t.s1[1];
  document.getElementById('s2-title').textContent = t.s2[0];
  document.getElementById('s2-desc').textContent = t.s2[1];
  document.getElementById('s3-title').textContent = t.s3[0];
  document.getElementById('s3-desc').textContent = t.s3[1];
  // gallery
  document.getElementById('gallery-title').textContent = t.galleryTitle;
  // contact labels
  document.getElementById('contact-title').textContent = t.contactTitle;
  document.getElementById('contact-phone-label').textContent = t.phoneLabel;
  document.getElementById('contact-email-label').textContent = t.emailLabel;
  document.getElementById('lbl-name').textContent = t.nameLabel;
  document.getElementById('lbl-email').textContent = t.emailInput;
  document.getElementById('lbl-msg').textContent = t.msgLabel;
  document.getElementById('send-btn').textContent = t.sendBtn;
  // footer name
  document.getElementById('footer-name').textContent = t.brand;
}

/* wirelang buttons */
langBtns.forEach(b=>{
  b.addEventListener('click', ()=>{
    langBtns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    applyLang(b.dataset.lang);
  });
});
applyLang(currentLang);

/* CONTACT FORM: simple mailto fallback */
contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  if(!name && !email && !message){ statusEl.textContent = TEXT[currentLang].sending; return; }
  const subject = encodeURIComponent(`${TEXT[currentLang].brand} - Contact from site`);
  const body = encodeURIComponent(`Name/Phone: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:info@majstornaste.example?subject=${subject}&body=${body}`;
  statusEl.textContent = TEXT[currentLang].sentOK;
  setTimeout(()=> statusEl.textContent = '', 5000);
});
