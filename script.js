// Hero Slider
let currentSlide=0;
const slides=document.querySelectorAll('.hero .slide');
document.querySelector('.slider-btn.next').addEventListener('click',()=>{currentSlide=(currentSlide+1)%slides.length;showSlide(currentSlide);});
document.querySelector('.slider-btn.prev').addEventListener('click',()=>{currentSlide=(currentSlide-1+slides.length)%slides.length;showSlide(currentSlide);});
function showSlide(i){slides.forEach((s,index)=>s.classList.toggle('active',index===i));}
setInterval(()=>{currentSlide=(currentSlide+1)%slides.length;showSlide(currentSlide);},5000);

// Theme Toggle
const themeBtn=document.getElementById('toggleTheme');
themeBtn.addEventListener('click',()=>{document.body.classList.toggle('light');document.body.classList.toggle('dark');});

// Gallery
const TOTAL_IMAGES=30, galleryGrid=document.getElementById('gallery-grid'), images=[];
for(let i=1;i<=TOTAL_IMAGES;i++){
  const img=document.createElement('img');
  img.src=`sliki/${i}.jpg`;
  img.loading="lazy";
  img.alt=`Проект ${i}`;
  galleryGrid.appendChild(img);
  images.push(img.src);
}

// Language Switch (TEXT object со MK/BG/EN како порано)
const langBtns=document.querySelectorAll('.lang-btn');
let currentLang='mk';
langBtns.forEach(btn=>btn.addEventListener('click',()=>{
  langBtns.forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  currentLang=btn.dataset.lang;
  applyLang(currentLang); // функција со преводите
}));

// Share Button
const shareBtn=document.getElementById("shareBtn");
if(shareBtn) shareBtn.addEventListener("click",async()=>{
  if(navigator.share){try{await navigator.share({title:"Мајстор Насте",text:"Погледни го нашиот сајт!",url:window.location.href});}catch(e){console.error(e);}}
  else{navigator.clipboard.writeText(window.location.href);alert("🔗 Линкот е копиран!");}
});
