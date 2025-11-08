/* ====== CONFIG ====== */
const TOTAL_GALLERY = 30; // change if you have more images in /sliki
const IMAGE_PATH = i => `sliki/${i}.jpg`;

/* ====== DOM ====== */
const yearEl = document.getElementById('year');
const galleryGrid = document.getElementById('gallery-grid');
const langBtns = document.querySelectorAll('.lang-btn');
const shareBtn = document.getElementById('shareBtn');
const mobileMenu = document.getElementById('mobileMenu');
const hamburgerBtn = document.querySelector('.hamburger');
const closeMobileBtn = document.querySelector('.close-btn');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.slider-btn.next');
const prevBtn = document.querySelector('.slider-btn.prev');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbClose = document.querySelector('.lb-close');
const lbPrev = document.querySelector('.lb-prev');
const lbNext = document.querySelector('.lb-next');

/* ====== TRANSLATIONS ====== */
const I18 = {
  mk: {
    nav: ['Почетна','Услуги','Галерија','Контакт'],
    heroTitle: 'Фасади & Камен — професионално изведување',
    heroSub: 'Специјализација: фасади, облицовки, камини и мазилки.',
    ctaQuote: 'Барај проценка',
    ctaGallery: 'Галерија',
    servicesTitle: 'Нашите услуги',
    s1Title: 'Фасади и изолации',
    s1Desc: 'Топла изолација, декоративни мазилки и завршни фасадни работи.',
    s2Title: 'Облицовки со гнајс',
    s2Desc: 'Облицовки со природен камен — здравина и стил.',
    s3Title: 'Камини и огради',
    s3Desc: 'Камини, огради и декоративни каменни елементи.',
    galleryTitle: 'Галерија',
    contactTitle: 'Контакт',
    phoneLabel: 'Телефон:',
    emailLabel: 'Е-пошта:',
    lblName: 'Име / Телефон',
    lblEmail: 'Е-пошта',
    lblMsg: 'Порака',
    sendBtn: 'Испрати',
    sentOK: 'Благодарам — испратено!'
  },
  bg: {
    nav: ['Начало','Услуги','Галерия','Контакт'],
    heroTitle: 'Фасади & Камък — професионално изпълнение',
    heroSub: 'Специализация: фасади, облицовки, камини и мазилки.',
    ctaQuote: 'Заяви оферта',
    ctaGallery: 'Галерия',
    servicesTitle: 'Нашите услуги',
    s1Title: 'Фасади и изолации',
    s1Desc: 'Топлоизолации, декоративни мазилки и довършителни работи.',
    s2Title: 'Камен и гнайс',
    s2Desc: 'Облицовки с естествен камък за фасади и декорации.',
    s3Title: 'Камини и огради',
    s3Desc: 'Изработка на камини и каменни огради.',
    galleryTitle: 'Галерия',
    contactTitle: 'Контакт',
    phoneLabel: 'Телефон:',
    emailLabel: 'E-поща:',
    lblName: 'Име / Телефон',
    lblEmail: 'E-поща',
    lblMsg: 'Съобщение',
    sendBtn: 'Изпрати',
    sentOK: 'Благодарим — заявката е изпратена!'
  },
  en: {
    nav: ['Home','Services','Gallery','Contact'],
    heroTitle: 'Facades & Stone — professional execution',
    heroSub: 'We specialize in facades, stone cladding & plaster.',
    ctaQuote: 'Get a Quote',
    ctaGallery: 'Gallery',
    servicesTitle: 'Our Services',
    s1Title: 'Facades & Insulation',
    s1Desc: 'Thermal insulation, decorative plaster and finishes.',
    s2Title: 'Stone Cladding',
    s2Desc: 'Natural stone cladding for facades and accents.',
    s3Title: 'Fireplaces & Fences',
    s3Desc: 'Fireplace design and stone fences.',
    galleryTitle: 'Gallery',
    contactTitle: 'Contact',
    phoneLabel: 'Phone:',
    emailLabel: 'Email:',
    lblName: 'Name / Phone',
    lblEmail: 'Email',
    lblMsg: 'Message',
    sendBtn: 'Send',
    sentOK: 'Thanks — message sent!'
  }
};

/* ====== INIT ====== */
yearEl.textContent = new Date().getFullYear();
let currentLang = 'mk';

/* apply language */
function applyLang(lang){
  if(!I18[lang]) return;
  currentLang = lang;
  document.querySelectorAll('[data-i18]').forEach(el=>{
    const key = el.getAttribute('data-i18');
    if(key in I18[lang]) el.textContent = I18[lang][key];
  });
  // nav special (they are anchors without data-i18 attr but have data-i18 keys on them)
  document.querySelectorAll('.main-nav .nav-link').forEach((a, idx) => {
    a.textContent = I18[lang].nav[idx] || a.textContent;
  });
  // update aria-pressed
  langBtns.forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
  });
}
applyLang(currentLang);

/* language buttons */
langBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    langBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    applyLang(btn.dataset.lang);
  });
});

/* ====== HERO SLIDER ====== */
let slideIndex = 0;
function showSlide(i){
  slides.forEach((s, idx)=> s.classList.toggle('active', idx === i));
}
function nextSlide(){ slideIndex = (slideIndex + 1) % slides.length; showSlide(slideIndex); }
function prevSlide(){ slideIndex = (slideIndex - 1 + slides.length) % slides.length; showSlide(slideIndex); }
nextBtn.addEventListener('click', ()=>{ nextSlide(); resetAuto(); });
prevBtn.addEventListener('click', ()=>{ prevSlide(); resetAuto(); });

let autoSlide = setInterval(nextSlide, 5000);
function resetAuto(){ clearInterval(autoSlide); autoSlide = setInterval(nextSlide, 5000); }

/* pause on hover */
document.querySelector('.hero').addEventListener('mouseenter', ()=> clearInterval(autoSlide));
document.querySelector('.hero').addEventListener('mouseleave', ()=> autoSlide = setInterval(nextSlide, 5000));

/* ====== GALLERY GENERATION ====== */
(function buildGallery(){
  for(let i=1;i<=TOTAL_GALLERY;i++){
    const img = document.createElement('img');
    img.src = IMAGE_PATH(i);
    img.loading = 'lazy';
    img.alt = `Проект ${i}`;
    img.onerror = () => { img.src = 'https://placehold.co/800x600?text=Majstor+Naste'; };
    galleryGrid.appendChild(img);
  }
})();

/* ====== LIGHTBOX ====== */
let currentImgIndex = 0;
galleryGrid.addEventListener('click', e=>{
  const imgs = Array.from(galleryGrid.querySelectorAll('img'));
  if(e.target && e.target.tagName === 'IMG'){
    currentImgIndex = imgs.indexOf(e.target);
    lbImg.src = imgs[currentImgIndex].src;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden','false');
  }
});
lbClose.addEventListener('click', ()=>{ lightbox.classList.remove('active'); lightbox.setAttribute('aria-hidden','true'); });
lbPrev.addEventListener('click', ()=>{ navigateLB(-1); });
lbNext.addEventListener('click', ()=>{ navigateLB(1); });
lightbox.addEventListener('click', e=>{ if(e.target === lightbox) { lightbox.classList.remove('active'); lightbox.setAttribute('aria-hidden','true'); }});
document.addEventListener('keydown', e=>{
  if(lightbox.classList.contains('active')){
    if(e.key === 'Escape') { lbClose.click(); }
    if(e.key === 'ArrowLeft') navigateLB(-1);
    if(e.key === 'ArrowRight') navigateLB(1);
  }
});
function navigateLB(dir){
  const imgs = Array.from(galleryGrid.querySelectorAll('img'));
  if(imgs.length === 0) return;
  currentImgIndex = (currentImgIndex + dir + imgs.length) % imgs.length;
  lbImg.src = imgs[currentImgIndex].src;
}

/* ====== SHARE BUTTON ====== */
if(shareBtn){
  shareBtn.addEventListener('click', async ()=>{
    if(navigator.share){
      try{
        await navigator.share({ title: document.title, text: document.querySelector('#hero-title').textContent, url: window.location.href });
      }catch(e){}
    } else {
      navigator.clipboard.writeText(window.location.href).then(()=> alert('Линкот е копиран во clipboard'));
    }
  });
}

/* ====== MOBILE MENU ====== */
if(hamburgerBtn && mobileMenu){
  hamburgerBtn.addEventListener('click', ()=>{
    mobileMenu.style.display = 'flex';
    mobileMenu.setAttribute('aria-hidden','false');
    hamburgerBtn.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  });
  closeMobileBtn.addEventListener('click', ()=>{
    mobileMenu.style.display = 'none';
    mobileMenu.setAttribute('aria-hidden','true');
    hamburgerBtn.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  });
  // close when clicking link
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
    mobileMenu.style.display = 'none';
    mobileMenu.setAttribute('aria-hidden','true');
    hamburgerBtn.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }));
}

/* ====== CONTACT FORM (mailto fallback) ====== */
const contactForm = document.getElementById('contact-form');
const statusEl = document.getElementById('contact-status');
if(contactForm){
  contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    if(!name || !email || !message){
      statusEl.textContent = 'Пополнете ги сите полиња.';
      return;
    }
    const subject = encodeURIComponent(`${I18[currentLang].heroTitle} - Contact`);
    const body = encodeURIComponent(`Name/Phone: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@majstornaste.example?subject=${subject}&body=${body}`;
    statusEl.textContent = I18[currentLang].sentOK;
    setTimeout(()=> statusEl.textContent = '', 5000);
    contactForm.reset();
  });
}

/* ====== SMALL UTILS ====== */
window.addEventListener('load', ()=> {
  // remove inline mobileMenu display none if set previously
  if(mobileMenu) mobileMenu.style.display = mobileMenu.getAttribute('aria-hidden') === 'false' ? 'flex' : 'none';
});
