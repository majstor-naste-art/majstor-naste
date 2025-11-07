/* CONFIG */
const TOTAL_IMAGES = 30;
const IMAGE_SRC = i => `sliki/${i}.jpg`;

/* DOM */
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

yearEl.textContent = new Date().getFullYear();

/* TRANSLATIONS */
const TEXT = {
  mk: { brand:'Мајстор Насте', slogan:'Фасади, камен и мазилка', nav:['Почетна','Услуги','Галерија','Контакт'], heroTitle:'Фасади & Камен — професионално изведување', heroSub:'Специјализација: фасади, облицовки, камини и мазилки.', ctaQuote:'Барај проценка', galleryTitle:'Галерија', servicesTitle:'Нашите услуги', s1:['Фасади и Изолации','Топла изолација, декоративни мазилки и завршни фасадни работи.'], s2:['Облицовки с гнајс','Облицовки со природен камен за фасади и декори.'], s3:['Камини и огради','Камини, огради и декоративни каменни елементи.'], contactTitle:'Контакт', phoneLabel:'Телефон:', emailLabel:'Е-пошта:', nameLabel:'Име / Телефон', msgLabel:'Порака', sendBtn:'Испрати', sending:'Се праќа...', sentOK:'Благодарам — испратено!'},
  bg: { brand:'Майстор Насте', slogan:'Фасади, камък и мазилка', nav:['Начало','Услуги','Галерия','Контакт'], heroTitle:'Фасади & Камен - професионално изпълнение', heroSub:'Специализация: фасади, облицовки, камини и мазилки.', ctaQuote:'Вземете оферта', galleryTitle:'Галерия', servicesTitle:'Нашите услуги', s1:['Фасади и изолации','Топлоизолации, декоративни мазилки и довършителни работи.'], s2:['Камен и гнайс','Облицовки с естествен камък за фасади и декорации.'], s3:['Камини и огради','Изработка на камини и каменни огради.'], contactTitle:'Контакт', phoneLabel:'Телефон:', emailLabel:'E-поща:', nameLabel:'Име / Телефон', msgLabel:'Съобщение', sendBtn:'Изпрати', sending:'Изпращане...', sentOK:'Благодарим — заявката е изпратена!'},
  en: { brand:'Majstor Naste', slogan:'Facades, stone & plaster', nav:['Home','Services','Gallery','Contact'], heroTitle:'Facades & Stone — professional execution', heroSub:'We specialize in facades, stone cladding, fireplaces and plaster.', ctaQuote:'Get a Quote', galleryTitle:'Gallery', servicesTitle:'Our Services', s1:['Facades & Insulation','Thermal insulation, decorative plaster and finishes.'], s2:['Stone Cladding','Natural stone cladding for facades and accents.'], s3:['Fireplaces & Fences','Fireplace design and stone fences.'], contactTitle:'Contact', phoneLabel:'Phone:', emailLabel:'Email:', nameLabel:'Name / Phone', msgLabel:'Message', sendBtn:'Send', sending:'Sending...', sentOK:'Thanks — message sent!'}
};

let currentLang = 'mk';

/* LANGUAGE SWITCH */
function applyLang(lang){
  currentLang = lang;
  const t = TEXT[lang];
  document.getElementById('brand-name').textContent = t.brand;
  document.getElementById('brand-slogan').textContent = t.slogan;
  document.getElementById('hero-title').textContent = t.heroTitle;
  document.getElementById('hero-sub').textContent = t.heroSub;
  document.getElementById('cta-quote').textContent = t.ctaQuote;
  document.getElementById('gallery-title').textContent = t.galleryTitle;
  document.getElementById('services-title').textContent = t.servicesTitle;
  document.getElementById('s1-title').textContent = t.s1[0];
  document.getElementById('s1-desc').textContent = t.s1[1];
  document.getElementById('s2-title').textContent = t.s2[0];
  document.getElementById('s2-desc').textContent = t.s2[1];
  document.getElementById('s3-title').textContent = t.s3[0];
  document.getElementById('s3-desc').textContent = t.s3[1];
  document.getElementById('contact-title').textContent = t.contactTitle;
  document.getElementById('contact-phone-label').textContent = t.phoneLabel;
  document.getElementById('contact-email-label').textContent = t.emailLabel;
  document.getElementById('lbl-name').textContent = t.nameLabel;
  document.getElementById('lbl-msg').textContent = t.msgLabel;
  document.getElementById('send-btn').textContent = t.sendBtn;
  const navs = document.querySelectorAll('.main-nav a');
  navs.forEach((a,i)=>a.textContent=t.nav[i]);
  const mobileNavs = document.querySelectorAll('.mobile-nav a');
  mobileNavs.forEach((a,i)=>a.textContent=t.nav[i]);
}
langBtns.forEach(b=>{
  b.addEventListener('click', ()=>{
    langBtns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    applyLang(b.dataset.lang);
  });
});
applyLang(currentLang);

/* HERO SLIDER */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
function showSlide(i){
  slides.forEach((s,idx)=>s.classList.toggle('active', idx===i));
}
function nextSlide(){ currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide);}
function prevSlide(){ currentSlide=(currentSlide-1+slides.length)%slides.length; showSlide(currentSlide);}
document.querySelector('.slider-btn.next').addEventListener('click', nextSlide);
document.querySelector('.slider-btn.prev').addEventListener('click', prevSlide);
setInterval(nextSlide,5000);

/* GALLERY */
let images=[];
for(let i=1;i<=TOTAL_IMAGES;i++){
  const img=document.createElement('img');
  img.src=IMAGE_SRC(i); img.alt=`Проект ${i}`; img.loading='lazy';
  img.dataset.index=i-1; galleryGrid.appendChild(img); images.push(IMAGE_SRC(i));
  img.addEventListener('click',()=>openLB(parseInt(img.dataset.index)));
  img.style.animationDelay=`${i*80}ms`;
}

/* LIGHTBOX */
let lbIndex=0;
function openLB(i){lbIndex=i; lbImg.src=images[lbIndex]; lightbox.style.display='flex'; document.body.style.overflow='hidden';}
function closeLB(){lightbox.style.display='none'; document.body.style.overflow='';}
function prevLB(){lbIndex=(lbIndex-1+images.length)%images.length; lbImg.src=images[lbIndex];}
function nextLB(){lbIndex=(lbIndex+1)%images.length; lbImg.src=images[lbIndex];}
lbClose.addEventListener('click', closeLB); lbPrev.addEventListener('click', prevLB); lbNext.addEventListener('click', nextLB);
lightbox.addEventListener('click', e=>{if(e.target===lightbox)closeLB();});
document.addEventListener('keydown',e=>{if(lightbox.style.display==='flex'){if(e.key==='Escape')closeLB(); if(e.key==='ArrowLeft')prevLB(); if(e.key==='ArrowRight')nextLB();}});

/* CONTACT FORM */
contactForm.addEventListener('submit',function(e){
  e.preventDefault();
  const name=this.name.value.trim(), email=this.email.value.trim(), message=this.message.value.trim();
  if(!name||!email||!message){statusEl.textContent=TEXT[currentLang].sending; return;}
  const subject=encodeURIComponent(`${TEXT[currentLang].brand} - Contact`);
  const body=encodeURIComponent(`Name/Phone: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href=`mailto:info@majstornaste.example?subject=${subject}&body=${body}`;
  statusEl.textContent=TEXT[currentLang].sentOK;
  setTimeout(()=>statusEl.textContent='',5000);
});

/* SHARE BUTTON */
const shareBtn=document.getElementById('shareBtn');
if(shareBtn && navigator.share){shareBtn.addEventListener('click',async()=>{try{await navigator.share({title:"Мајстор Насте — Фасади & Камен",text:"Погледни го нашиот сајт за фасади, камен и мазилка!",url:window.location.href});}catch(err){console.error(err);}});}
else if(shareBtn){shareBtn.addEventListener('click',()=>{navigator.clipboard.writeText(window.location.href); alert("🔗 Линкот е копиран!");});}

/* MOBILE MENU */
const hamburger=document.querySelector('.hamburger');
const mobileMenu=document.getElementById('mobileMenu');
const closeBtn=document.querySelector('.close-btn');
hamburger.addEventListener('click',()=>{mobileMenu.classList.add('active'); document.body.style.overflow='hidden';});
closeBtn.addEventListener('click',()=>{mobileMenu.classList.remove('active'); document.body.style.overflow='';});
mobileMenu.addEventListener('click',(e)=>{if(e.target===mobileMenu){mobileMenu.classList.remove('active'); document.body.style.overflow='';}});
document.querySelectorAll('.mobile-nav a').forEach(link=>{link.addEventListener('click',()=>{mobileMenu.classList.remove('active'); document.body.style.overflow='';});});
