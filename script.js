const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* HERO SLIDER */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
function showSlide(i){ slides.forEach((s,idx)=>s.classList.toggle("active", idx===i)); }
function nextSlide(){ slideIndex=(slideIndex+1)%slides.length; showSlide(slideIndex); }
function prevSlide(){ slideIndex=(slideIndex-1+slides.length)%slides.length; showSlide(slideIndex); }
document.querySelector(".slider-btn.next").addEventListener("click", nextSlide);
document.querySelector(".slider-btn.prev").addEventListener("click", prevSlide);
setInterval(nextSlide, 5000);

/* GALLERY */
const gallery = document.getElementById("gallery-grid");
for(let i=1;i<=15;i++){
  const img=document.createElement("img");
  img.src=`sliki/${i}.jpg`;
  img.alt=`Проект ${i}`;
  img.addEventListener("click",()=>openLB(i));
  gallery.appendChild(img);
}

/* LIGHTBOX */
const lightbox=document.getElementById("lightbox");
const lbImg=document.getElementById("lb-img");
const lbPrev=document.querySelector(".lb-prev");
const lbNext=document.querySelector(".lb-next");
const lbClose=document.querySelector(".lb-close");
let current=0;

function openLB(i){ current=i; lbImg.src=`sliki/${i}.jpg`; lightbox.style.display="flex"; }
function closeLB(){ lightbox.style.display="none"; }
function prevLB(){ current=current>1?current-1:15; lbImg.src=`sliki/${current}.jpg`; }
function nextLB(){ current=current<15?current+1:1; lbImg.src=`sliki/${current}.jpg`; }

lbPrev.onclick=prevLB; lbNext.onclick=nextLB; lbClose.onclick=closeLB;
lightbox.addEventListener("click", e=>{ if(e.target===lightbox) closeLB(); });

// MOBILE MENU
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn = mobileMenu.querySelector('.close-btn');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});
closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* SHARE */
const shareBtn=document.getElementById("shareBtn");
if(shareBtn && navigator.share){
  shareBtn.onclick=()=>navigator.share({
    title:"Мајстор Насте",
    text:"Фасади, камен, мазилка — професионално изведување.",
    url:window.location.href
  });
} else if(shareBtn){
  shareBtn.onclick=()=>{ navigator.clipboard.writeText(window.location.href); alert("🔗 Линкот е копиран!"); };
}

/* LANG SWITCH */
const TEXT={
  mk:{heroTitle:"Фасади & Камен — професионално изведување",heroSub:"Фасади, облицовки, камини и мазилки."},
  bg:{heroTitle:"Фасади и Камък — професионално изпълнение",heroSub:"Фасади, облицовки, камини и мазилки."},
  en:{heroTitle:"Facades & Stone — professional execution",heroSub:"Facades, stone, fireplaces & plaster."}
};
document.querySelectorAll(".lang-btn").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".lang-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const lang=btn.dataset.lang;
    document.getElementById("hero-title").textContent=TEXT[lang].heroTitle;
    document.getElementById("hero-sub").textContent=TEXT[lang].heroSub;
  };
});
/* HEADER */
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  color: #fff;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1rem;
  flex-wrap: wrap;
}

/* BRAND */
.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo.flash {
  font-size: 1.6rem;
  font-weight: bold;
  color: gold;
  animation: flash 2s infinite alternate;
}
@keyframes flash { from {opacity: 0.7;} to {opacity: 1;} }

.brand-text {
  line-height: 1.2;
  font-weight: 500;
}
#brand-name { font-size: 1.1rem; }
#brand-slogan { font-size: 0.85rem; opacity: 0.8; }

/* MAIN NAVIGATION */
.main-nav {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.main-nav a {
  display: inline-block;
  padding: 0.45rem 0.9rem;
  border: 2px solid transparent;
  border-radius: 8px;
  color: #fff;
  text-decoration: none;
  background: rgba(255,255,255,0.05);
  font-weight: 500;
  transition: 0.25s;
}
.main-nav a:hover {
  border-color: gold;
  background: rgba(255,215,0,0.15);
  transform: scale(1.05);
}
.main-nav a.active {
  border-color: gold;
  box-shadow: 0 0 6px rgba(255,215,0,0.4);
}

/* TOOLS */
.tools {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.lang-switch {
  display: flex;
  gap: 0.3rem;
}
.lang-btn {
  background: none;
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
}
.lang-btn:hover {
  background: rgba(255,255,255,0.2);
}
.lang-btn.active {
  background: gold;
  color: #000;
  border-color: gold;
}

/* SOCIAL ICONS */
.social {
  display: flex;
  gap: 0.4rem;
}
.social-link {
  width: 26px;
  height: 26px;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  transition: transform 0.2s ease;
}
.social-link:hover { transform: scale(1.1); }
.social-link.facebook { background-image: url('icons/facebook.svg'); }
.social-link.instagram { background-image: url('icons/instagram.svg'); }
.social-link.telegram { background-image: url('icons/telegram.svg'); }

/* SHARE BUTTON */
.btn-share {
  background: gold;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-weight: 600;
  transition: 0.25s;
}
.btn-share:hover {
  transform: scale(1.05);
  background: #ffdf00;
}

/* MOBILE MENU */
.hamburger {
  display: none;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  padding-top: 5rem;
  text-align: center;
}
.mobile-menu.open { display: block; }
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  color: #fff;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}
.mobile-nav a {
  display: block;
  margin: 1rem auto;
  padding: 0.7rem 1.5rem;
  color: #fff;
  text-decoration: none;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  width: 70%;
  background: rgba(255,255,255,0.05);
  transition: 0.3s;
}
.mobile-nav a:hover {
  border-color: gold;
  background: rgba(255,215,0,0.15);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .main-nav { display: none; }
  .hamburger { display: block; }
}
