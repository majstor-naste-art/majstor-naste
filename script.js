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

/* MOBILE MENU */
const hamburger=document.querySelector(".hamburger");
const mobileMenu=document.getElementById("mobileMenu");
const closeBtn=mobileMenu.querySelector(".close-btn");
hamburger.onclick=()=>mobileMenu.classList.add("open");
closeBtn.onclick=()=>mobileMenu.classList.remove("open");

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
