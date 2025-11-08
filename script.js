import { db } from "./firebase-config.js";
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

/* TRANSLATIONS */
const TEXT = {
  mk: { brand:'Мајстор Насте', slogan:'Фасади, камен и мазилка', nav:['Почетна','Услуги','Галерија','Контакт'] },
  bg: { brand:'Майстор Насте', slogan:'Фасади, камък и мазилка', nav:['Начало','Услуги','Галерия','Контакт'] },
  en: { brand:'Majstor Naste', slogan:'Facades, stone & plaster', nav:['Home','Services','Gallery','Contact'] }
};

/* LANG SWITCH */
let currentLang = 'mk';
const langBtns = document.querySelectorAll('.lang-btn');

langBtns.forEach(b=>{
  b.addEventListener('click', ()=>{
    langBtns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    currentLang = b.dataset.lang;
    applyLang();
  });
});

function applyLang() {
  const t = TEXT[currentLang];
  document.getElementById('brand-name').textContent = t.brand;
  document.getElementById('brand-slogan').textContent = t.slogan;
  document.querySelectorAll('.main-nav a').forEach((a,i)=>a.textContent=t.nav[i]);
}

/* HERO SLIDER */
let currentSlide = 0;
const slides = document.querySelectorAll('.hero .slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

function showSlide(i){
  slides.forEach((s, idx)=>s.classList.toggle('active', idx===i));
}
function nextSlideFn(){ currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide);}
function prevSlideFn(){ currentSlide=(currentSlide-1+slides.length)%slides.length; showSlide(currentSlide);}
nextBtn.addEventListener('click', nextSlideFn);
prevBtn.addEventListener('click', prevSlideFn);
setInterval(nextSlideFn,5000);

/* GALLERY LOAD FROM FIRESTORE */
const galleryGrid = document.getElementById('gallery-grid');

async function loadGallery(){
  galleryGrid.innerHTML='';
  const q = query(collection(db,'gallery'), orderBy('created','desc'));
  const snapshot = await getDocs(q);
  snapshot.forEach(docSnap=>{
    const data = docSnap.data();
    const img = document.createElement('img');
    img.src = data.imgUrl;
    img.alt = data.title;
    img.loading='lazy';
    img.dataset.index = galleryGrid.children.length;
    galleryGrid.appendChild(img);
  });
}
loadGallery();

/* LIGHTBOX */
let lbIndex=0;
const lightbox=document.getElementById('lightbox');
const lbImg=document.getElementById('lb-img');
document.getElementById('gallery-grid').addEventListener('click', e=>{
  if(e.target.tagName==='IMG'){
    lbIndex=parseInt(e.target.dataset.index);
    openLB();
  }
});
function openLB(){ lbImg.src=galleryGrid.children[lbIndex].src; lightbox.style.display='flex';}
document.querySelector('.lb-close').addEventListener('click', ()=>lightbox.style.display='none');
document.querySelector('.lb-prev').addEventListener('click', ()=>{ lbIndex=(lbIndex-1+galleryGrid.children.length)%galleryGrid.children.length; openLB(); });
document.querySelector('.lb-next').addEventListener('click', ()=>{ lbIndex=(lbIndex+1)%galleryGrid.children.length; openLB(); });

/* YEAR */
document.getElementById('year').textContent=new Date().getFullYear();

/* SHARE BUTTON */
const shareBtn = document.getElementById("shareBtn");
if(navigator.share){
  shareBtn.addEventListener("click", async ()=>{
    try{ await navigator.share({title:"Мајстор Насте", text:"Погледни нашиот сајт!", url:window.location.href}); } 
    catch(e){ console.error(e);}
  });
} else {
  shareBtn.addEventListener("click", ()=>{ navigator.clipboard.writeText(window.location.href); alert("Линкот е копиран!"); });
}

/* MOBILE MENU */
const hamburger=document.querySelector('.hamburger');
const mobileMenu=document.getElementById('mobileMenu');
const closeBtn=document.querySelector('.close-btn');
hamburger.addEventListener('click', ()=>{ mobileMenu.style.display='block'; });
closeBtn.addEventListener('click', ()=>{ mobileMenu.style.display='none'; });
