
// data & translations
const IMAGE_BASE = 'https://majstor-naste.uca.icu/';
const galleryFiles = ['fasada1.jpg','fasada2.jpg','gnajs1.jpg','kamin1.jpg','ograda1.jpg','kuka_kamen1.jpg','mazilka1.jpg','p7.jpg'];

const TEXT = {
  bg: {
    brand: 'Майстор Насте',
    slogan: 'Фасади, камък и мазилка — качество без компромиси',
    heroTitle: 'Фасади & Камен - професионално изпълнение',
    heroSub: 'Специализация: фасади, облицовки с гнајс, камини, каменни огради и мазилка.',
    cta: 'Вземете оферта',
    servicesTitle: 'Услуги',
    galleryTitle: 'Галерия',
    contactTitle: 'Свържете се'
  },
  mk: {
    brand: 'Мајстор Насте',
    slogan: 'Фасади, камен и малтер — квалитет без компромис',
    heroTitle: 'Фасади & Камен - професионално извршување',
    heroSub: 'Специјалност: фасади, облоги со гнајс, камини, камени огради и малтер.',
    cta: 'Барај проценка',
    servicesTitle: 'Услуги',
    galleryTitle: 'Галерија',
    contactTitle: 'Контакт'
  },
  en: {
    brand: 'Majstor Naste',
    slogan: 'Facades, stone and plaster — quality without compromise',
    heroTitle: 'Facades & Stone - professional execution',
    heroSub: 'We specialize in facades, gneiss cladding, fireplaces, stone fences and plaster.',
    cta: 'Get estimate',
    servicesTitle: 'Services',
    galleryTitle: 'Gallery',
    contactTitle: 'Contact'
  }
};

// language switch
const langButtons = document.querySelectorAll('.lang-btn');
function setLang(lang){
  langButtons.forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  const t = TEXT[lang];
  document.getElementById('brand-name').textContent = t.brand;
  document.getElementById('brand-slogan').textContent = t.slogan;
  document.getElementById('hero-title').textContent = t.heroTitle;
  document.getElementById('hero-sub').textContent = t.heroSub;
  document.getElementById('cta-btn').textContent = t.cta;
  document.getElementById('services-title')?.setAttribute('aria-label', t.servicesTitle);
  document.querySelectorAll('#services-title, #gallery-section h2, #contact h2').forEach(el=>{
    if(el) el.textContent = t.servicesTitle || el.textContent;
  });
  // update labels in contact
  document.getElementById('lbl-name').textContent = (lang==='en'?'Name / Phone':'Име/Телефон');
  document.getElementById('lbl-email').textContent = (lang==='en'?'Email':'Имейл');
  document.getElementById('lbl-msg').textContent = (lang==='en'?'Message':'Съобщение');
}
langButtons.forEach(b=>b.addEventListener('click', ()=>setLang(b.dataset.lang)));
setLang('bg');

// build gallery DOM
const gallery = document.getElementById('gallery');
galleryFiles.forEach(fn=>{
  const img = document.createElement('img');
  img.src = IMAGE_BASE + fn;
  img.alt = fn;
  img.loading = 'lazy';
  img.onerror = function(){ this.onerror=null; this.src='https://via.placeholder.com/400x300?text=Project'; };
  gallery.appendChild(img);
});

// contact form mailto fallback
document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('in-name').value.trim();
  const email = document.getElementById('in-email').value.trim();
  const msg = document.getElementById('in-message').value.trim();
  if(!name && !email && !msg){ document.getElementById('contact-status').textContent='Попълнете поне едно поле'; return; }
  const subject = encodeURIComponent('Запитване от сайт - Майстор Насте');
  const body = encodeURIComponent(`Име/тел: ${name}\nEmail: ${email}\n\n${msg}`);
  window.location.href = `mailto:info@majstornaste.example?subject=${subject}&body=${body}`;
  document.getElementById('contact-status').textContent = 'Благодарим — заявката беше изпратена.';
  setTimeout(()=>document.getElementById('contact-status').textContent='',4000);
});

// dynamic year
document.getElementById('yr').textContent = new Date().getFullYear();
