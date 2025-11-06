// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// GALLERY
const galleryGrid = document.getElementById("gallery-grid");
const TOTAL_IMAGES = 30;
for(let i=1;i<=TOTAL_IMAGES;i++){
  const img = document.createElement("img");
  img.src = `sliki/${i}.jpg`;
  img.loading = "lazy";
  img.alt = `Project ${i}`;
  img.onerror = ()=>img.src="https://placehold.co/600x400?text=Majstor+Naste";
  galleryGrid.appendChild(img);
}

// HERO SLIDER
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
function showSlide(i){ slides.forEach((s,idx)=>s.classList.toggle("active",idx===i)); }
document.querySelector(".next").onclick = () => { currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide);}
document.querySelector(".prev").onclick = () => { currentSlide=(currentSlide-1+slides.length)%slides.length; showSlide(currentSlide);}
setInterval(()=>{ currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide);},5000);

// THEME TOGGLE
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click",()=>{document.body.classList.toggle("dark"); document.body.classList.toggle("light");});

// MOBILE MENU
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.querySelector(".close-btn");
hamburger.onclick = ()=>{ mobileMenu.classList.add("active"); document.body.style.overflow="hidden"; }
closeBtn.onclick = ()=>{ mobileMenu.classList.remove("active"); document.body.style.overflow=""; }
document.querySelectorAll(".mobile-nav a").forEach(a=>a.onclick=()=>{ mobileMenu.classList.remove("active"); document.body.style.overflow=""; });

langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    langBtns.forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    const lang = btn.dataset.lang;
    applyLang(lang);
  });
});
