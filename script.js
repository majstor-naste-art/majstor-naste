/* CONFIG */
const TOTAL_IMAGES = 15;              // gallery images count (sliki/1..TOTAL_IMAGES.jpg)
const SLIDER_COUNT = 5;              // how many images to use in hero slider (1..TOTAL_IMAGES)
const IMAGE_SRC = i => `sliki/${i}.jpg`;

/* DOM */
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // theme
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('mn_theme') || 'dark';
  setTheme(savedTheme);

  // elements
  const galleryGrid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.querySelector('.lb-close');
  const lbPrev = document.querySelector('.lb-prev');
  const lbNext = document.querySelector('.lb-next');
  const langBtns = document.querySelectorAll('.lang-btn');
  const contactForm = document.getElementById('contact-form');
  const statusEl = document.getElementById('contact-status');
  const shareBtn = document.getElementById('shareBtn');
  const themeToggle = document.getElementById('themeToggle');

  /* TRANSLATIONS */
  const TEXT = {
    mk: {
      brand:'Мајстор Насте', slogan:'Фасади, камен и мазилка',
      nav:['Почетна','Услуги','Галерија','Контакт'],
      heroTitle:'Фасади & Камен — професионално изведување',
      heroSub:'Специјализација: фасади, облицовки, камини и мазилки.',
      ctaQuote:'Барај проценка',
      galleryTitle:'Галерија',
      servicesTitle:'Нашите услуги',
      s1:['Фасади и Изолации','Топла изолација, декоративни мазилки и завршни фасадни работи.'],
      s2:['Облицовки с гнајс','Облицовки со природен камен за фасади и декори.'],
      s3:['Камини и огради','Камини, огради и декоративни каменни елементи.'],
      contactTitle:'Контакт', phoneLabel:'Телефон:', emailLabel:'Е-пошта:', nameLabel:'Име / Телефон',
      msgLabel:'Съобщение', sendBtn:'Испрати', sending:'Се праќа...', sentOK:'Благодарам — испратено!'
    },
    bg: {
      brand:'Майстор Насте', slogan:'Фасади, камък и мазилка',
      nav:['Начало','Услуги','Галерия','Контакт'],
      heroTitle:'Фасади & Камен - професионално изпълнение',
      heroSub:'Специализация: фасади, облицовки, камини и мазилки.',
      ctaQuote:'Вземете оферта',
      galleryTitle:'Галерия',
      servicesTitle:'Нашите услуги',
      s1:['Фасади и изолации','Топлоизолации, декоративни мазилки и довършителни работи.'],
      s2:['Камен и гнайс','Облицовки с естествен камък за фасади и декорации.'],
      s3:['Камини и огради','Изработка на камини и каменни огради.'],
      contactTitle:'Контакт', phoneLabel:'Телефон:', emailLabel:'E-поща:', nameLabel:'Име / Телефон',
      msgLabel:'Съобщение', sendBtn:'Изпрати', sending:'Изпращане...', sentOK:'Благодарим — заявката е изпратена!'
    },
    en: {
      brand:'Majstor Naste', slogan:'Facades, stone & plaster',
      nav:['Home','Services','Gallery','Contact'],
      heroTitle:'Facades & Stone — professional execution',
      heroSub:'We specialize in facades, stone cladding, fireplaces and plaster.',
      ctaQuote:'Get a Quote',
      galleryTitle:'Gallery',
      servicesTitle:'Our Services',
      s1:['Facades & Insulation','Thermal insulation, decorative plaster and finishes.'],
      s2:['Stone Cladding','Natural stone cladding for facades and accents.'],
      s3:['Fireplaces & Fences','Fireplace design and stone fences.'],
      contactTitle:'Contact', phoneLabel:'Phone:', emailLabel:'Email:', nameLabel:'Name / Phone',
      msgLabel:'Message', sendBtn:'Send', sending:'Sending...', sentOK:'Thanks — message sent!'
    }
  };

  /* build hero slider (use first SLIDER_COUNT images from sliki/) */
  const slider = document.getElementById('heroSlider');
  const slides = [];
  for(let i=1;i<=Math.min(SLIDER_COUNT,TOTAL_IMAGES);i++){
    const s = document.createElement('div');
    s.className = 'slide';
    s.style.backgroundImage = `url('${IMAGE_SRC(i)}')`;
    s.dataset.index = i;
    s.addEventListener('error', ()=>{ s.style.backgroundImage = `url('https://placehold.co/1200x800?text=Majstor+Naste')`; });
    slider.appendChild(s);
    slides.push(s);
  }
  if(slides.length) slides[0].classList.add('active');

  /* slider controls */
  let currentSlide = 0;
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  function showSlide(index){
    slides.forEach((sl,i)=> sl.classList.toggle('active', i===index));
  }
  function nextSlide(){ currentSlide = (currentSlide+1)%slides.length; showSlide(currentSlide); }
  function prevSlide(){ currentSlide = (currentSlide-1+slides.length)%slides.length; showSlide(currentSlide); }
  if(prevBtn && nextBtn){
    prevBtn.addEventListener('click', ()=>{ prevSlide(); resetAuto(); });
    nextBtn.addEventListener('click', ()=>{ nextSlide(); resetAuto(); });
  }
  let autoTimer = setInterval(nextSlide, 5000);
  function resetAuto(){ clearInterval(autoTimer); autoTimer = setInterval(nextSlide, 5000); }

  /* build gallery */
  const images = [];
  for(let i=1;i<=TOTAL_IMAGES;i++){
    const img = document.createElement('img');
    img.src = IMAGE_SRC(i);
    img.alt = `Проект ${i}`;
    img.dataset.index = i-1;
    img.onerror = ()=>{ img.src = 'https://placehold.co/800x600?text=Majstor+Naste'; };
    galleryGrid.appendChild(img);
    images.push(IMAGE_SRC(i));
  }
  // stagger fade-in
  document.querySelectorAll('.gallery-grid img').forEach((el,idx)=> el.style.animationDelay = `${idx*40}ms`);

  /* LIGHTBOX */
  let lbIndex = 0;
  function openLB(index){
    lbIndex = index;
    lbImg.src = images[lbIndex];
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLB(){
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  function prevLB(){ lbIndex = (lbIndex-1+images.length)%images.length; lbImg.src = images[lbIndex]; }
  function nextLB(){ lbIndex = (lbIndex+1)%images.length; lbImg.src = images[lbIndex]; }

  document.getElementById('gallery-grid').addEventListener('click', (e)=>{
    if(e.target && e.target.tagName==='IMG') openLB(parseInt(e.target.dataset.index,10));
  });
  lbClose.addEventListener('click', closeLB);
  lbPrev.addEventListener('click', prevLB);
  lbNext.addEventListener('click', nextLB);
  lightbox.addEventListener('click', (e)=> { if(e.target===lightbox) closeLB(); });
  document.addEventListener('keydown', (e)=> {
    if(lightbox.style.display === 'flex'){
      if(e.key === 'Escape') closeLB();
      if(e.key === 'ArrowLeft') prevLB();
      if(e.key === 'ArrowRight') nextLB();
    }
  });

  /* LANG SWITCH */
  let currentLang = localStorage.getItem('mn_lang') || 'mk';
  function setActiveLangBtn(code){
    langBtns.forEach(b=>{
      b.classList.toggle('active', b.dataset.lang === code);
      b.setAttribute('aria-pressed', b.dataset.lang === code ? 'true':'false');
    });
  }
  function applyLang(lang){
    currentLang = lang;
    localStorage.setItem('mn_lang', lang);
    setActiveLangBtn(lang);
    const t = TEXT[lang];
    // safe set helper
    const setText = (id, text) => { const el = document.getElementById(id); if(el) el.textContent = text; };
    setText('brand-name', t.brand);
    setText('brand-slogan', t.slogan);
    setText('hero-title', t.heroTitle);
    setText('hero-sub', t.heroSub);
    setText('cta-quote', t.ctaQuote);
    setText('gallery-title', t.galleryTitle);
    setText('services-title', t.servicesTitle);
    setText('s1-title', t.s1[0]); setText('s1-desc', t.s1[1]);
    setText('s2-title', t.s2[0]); setText('s2-desc', t.s2[1]);
    setText('s3-title', t.s3[0]); setText('s3-desc', t.s3[1]);
    setText('contact-title', t.contactTitle);
    setText('contact-phone-label', t.phoneLabel);
    setText('contact-email-label', t.emailLabel);
    setText('lbl-name', t.nameLabel);
    setText('lbl-email', t.emailLabel);
    setText('lbl-msg', t.msgLabel);
    setText('send-btn', t.sendBtn);
    setText('footer-name', t.brand);
    // nav
    document.querySelectorAll('.main-nav a').forEach((a,i)=> a.textContent = t.nav[i] || a.textContent);
    document.querySelectorAll('.mobile-nav a').forEach((a,i)=> a.textContent = t.nav[i] || a.textContent);
  }
  langBtns.forEach(b=> b.addEventListener('click', ()=> applyLang(b.dataset.lang)));
  applyLang(currentLang);

  /* CONTACT FORM - mailto fallback */
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    if(!name || !email || !message){
      statusEl.textContent = TEXT[currentLang].sending;
      setTimeout(()=> statusEl.textContent = '', 2500);
      return;
    }
    const subject = encodeURIComponent(`${TEXT[currentLang].brand} - Contact`);
    const body = encodeURIComponent(`Name/Phone: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@majstornaste.example?subject=${subject}&body=${body}`;
    statusEl.textContent = TEXT[currentLang].sentOK;
    this.reset();
    setTimeout(()=> statusEl.textContent = '', 5000);
  });

  /* SHARE */
  if(shareBtn){
    if(navigator.share){
      shareBtn.addEventListener('click', async ()=>{
        try{
          await navigator.share({ title: document.title, text: TEXT[currentLang].heroSub, url: window.location.href });
        }catch(e){ /* cancelled */ }
      });
    }else{
      shareBtn.addEventListener('click', ()=>{ navigator.clipboard.writeText(window.location.href); alert('🔗 Линкот е копиран!'); });
    }
  }

  /* THEME TOGGLE */
  function setTheme(mode){
    document.documentElement.setAttribute('data-theme', mode === 'light' ? 'light' : 'dark');
    localStorage.setItem('mn_theme', mode);
    if(themeToggle) themeToggle.textContent = mode === 'light' ? '☀️' : '🌙';
  }
  themeToggle.addEventListener('click', ()=>{
    const mode = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(mode);
  });

  /* MOBILE MENU */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = mobileMenu.querySelector('.close-btn');
  hamburger.addEventListener('click', ()=> { mobileMenu.style.display='block'; mobileMenu.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; });
  closeBtn.addEventListener('click', ()=> { mobileMenu.style.display='none'; mobileMenu.setAttribute('aria-hidden','true'); document.body.style.overflow=''; });
  mobileMenu.addEventListener('click',(e)=> { if(e.target === mobileMenu){ mobileMenu.style.display='none'; document.body.style.overflow=''; } });
  mobileMenu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> { mobileMenu.style.display='none'; document.body.style.overflow=''; }));

  /* ensure images clickable in gallery after build (some browsers may load later) */
  // already wired via event listener above

}); // end DOMContentLoaded

/* helpers */
function IMAGE_SRC(i){ return `sliki/${i}.jpg`; }
function setTheme(mode){ /* placeholder; real setter inside DOMContentLoaded to access themeToggle */ }
