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
