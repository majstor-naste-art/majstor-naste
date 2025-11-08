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

/* YEAR */
yearEl.textContent = new Date().getFullYear();

/* IMAGES */
let images = [];
for(let i=1;i<=TOTAL_IMAGES;i++){
  images.push(IMAGE_SRC(i));
  const img = document.createElement('img');
  img.src = IMAGE_SRC(i);
  img.alt = `Проект ${i}`;
  img.loading = "lazy";
  img.dataset.index = i-1;
  img.onerror = () => { img.src = 'https://placehold.co/800x600?text=Majstor+Naste'; };
  galleryGrid.appendChild(img);
}

/* LIGHTBOX */
let lbIndex = 0;
function openLB(i){
  lbIndex = i;
  lbImg.src = images[lbIndex];
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeLB(){
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}
function prevLB(){ lbIndex = (lbIndex-1+images.length)%images.length; lbImg.src = images[lbIndex]; }
function nextLB(){ lbIndex = (lbIndex+1)%images.length; lbImg.src = images[lbIndex]; }
galleryGrid.addEventListener('click', e=>{ if(e.target.tagName==='IMG') openLB(parseInt(e.target.dataset.index,10)); });
lbClose.addEventListener('click', closeLB);
lbPrev.addEventListener('click', prevLB);
lbNext.addEventListener('click', nextLB);
lightbox.addEventListener('click', e=>{ if(e.target===lightbox) closeLB(); });
document.addEventListener('keydown', e=>{
  if(lightbox.style.display==='flex'){
    if(e.key==='Escape') closeLB();
    if(e.key==='ArrowLeft') prevLB();
    if(e.key==='ArrowRight') nextLB();
  }
});

/* LANGUAGE SWITCH */
const TEXT = {
  mk: {brand:'Мајстор Насте', slogan:'Фасади, камен и мазилка', nav:['Почетна','Услуги','Галерија','Контакт'], heroTitle:'Фасади & Камен — професионално изведување', heroSub:'Специјализација: фасади, облицовки, камини и мазилки.', ctaQuote:'Барај проценка'},
  bg: {brand:'Майстор Насте', slogan:'Фасади, камък и мазилка', nav:['Начало','Услуги','Галерия','Контакт'], heroTitle:'Фасади & Камен - професионално изпълнение', heroSub:'Специализация: фасади, облицовки, камини и мазилки.', ctaQuote:'Вземете оферта'},
  en: {brand:'Majstor Naste', slogan:'Facades, stone & plaster', nav:['Home','Services','Gallery','Contact'], heroTitle:'Facades & Stone — professional execution', heroSub:'We specialize in facades, stone cladding, fireplaces and plaster.', ctaQuote:'Get a Quote'}
};
let currentLang = 'mk';
function applyLang(lang){
  currentLang = lang;
  const t = TEXT[lang];
  document.getElementById('brand-name').textContent = t.brand;
  document.getElementById('brand-slogan').textContent = t.slogan;
  document.getElementById('hero-title').textContent = t.heroTitle;
  document.getElementById('hero-sub').textContent = t.heroSub;
  document.getElementById('cta-quote').textContent = t.ctaQuote;
  document.querySelectorAll('.main-nav a').forEach((a,i)=>a.textContent=t.nav[i]);
}
langBtns.forEach(b=>{
  b.addEventListener('click', ()=>{
    langBtns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    applyLang(b.dataset.lang);
  });
});
applyLang(currentLang);

/* CONTACT FORM */
contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const msg = this.message.value.trim();
  if(!name || !email || !msg){ statusEl.textContent='Внесете податоци'; return; }
  const subject = encodeURIComponent(`${TEXT[currentLang].brand} - Contact`);
  const body = encodeURIComponent(`Name/Phone: ${name}\nEmail: ${email}\n\n${msg}`);
  window.location.href = `mailto:info@majstornaste.example?subject=${subject}&body=${body}`;
  statusEl.textContent='Испратено!';
  setTimeout(()=>statusEl.textContent='',5000);
});

/* SHARE BUTTON */
const shareBtn = document.getElementById('shareBtn');
if(shareBtn && navigator.share){
  shareBtn.addEventListener('click', async ()=>{
    try{ await navigator.share({title:"Мајстор Насте", text:"Погледни го нашиот сајт", url:window.location.href}); }
    catch(e){ console.error(e); }
  });
}else if(shareBtn){
  shareBtn.addEventListener('click', ()=>{ navigator.clipboard.writeText(window.location.href); alert("Линкот е копиран!"); });
}

/* HERO SLIDER */
let currentSlide=0;
const slides=document.querySelectorAll('.hero .slide');
const prevBtn=document.querySelector('.slider-btn.prev');
const nextBtn=document.querySelector('.slider-btn.next');
function showSlide(i){ slides.forEach((s,j)=>s.classList.toggle('active',i===j)); }
function nextSlide(){ currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide); }
function prevSlide(){ currentSlide=(currentSlide-1+slides.length)%slides.length; showSlide(currentSlide); }
if(nextBtn && prevBtn){ nextBtn.addEventListener('click',nextSlide); prevBtn.addEventListener('click',prevSlide); }
setInterval(nextSlide,5000);

/* MOBILE MENU */
const hamburger=document.querySelector('.hamburger');
const mobileMenu=document.getElementById('mobileMenu');
const closeBtn=document.querySelector('.close-btn');
hamburger.addEventListener('click',()=>{ mobileMenu.classList.add('active'); document.body.style.overflow='hidden'; });
closeBtn.addEventListener('click',()=>{ mobileMenu.classList.remove('active'); document.body.style.overflow=''; });
mobileMenu.addEventListener('click',(e)=>{ if(e.target===mobileMenu){ mobileMenu.classList.remove('active'); document.body.style.overflow=''; }});
document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{ mobileMenu.classList.remove('active'); document.body.style.overflow=''; }));
