import React, { useState, useEffect } from "react";

// Majstor Naste — Facades & Stone Works (single-file React component)
// - Tailwind CSS utility classes assumed (add Tailwind to project)
// - Multilanguage: bg / mk / en
// - Uses images from the user's folder at https://majstor-naste-art.free.bg/images/

const IMAGE_BASE = "https://majstor-naste-art.free.bg/images/";
const PHONE = "+359881234567"; // replace with real phone
const EMAIL = "info@majstornaste.example"; // replace with real email
const MAP_LOCATION = "Your town, Bulgaria"; // replace if needed

const i18n = {
  bg: {
    brand: "Майстор Насте",
    slogan: "Фасади, камък и мазилка — качество без компромиси",
    cta: "Вземете безплатна оферта",
    servicesTitle: "Експертни услуги",
    galleryTitle: "Галерия: фасади и каменни решения",
    contactTitle: "Свържете се с нас",
    name: "Име / Телефон",
    email: "Имейл",
    message: "Съобщение",
    send: "Изпрати",
    thanks: "Благодарим — получихме съобщението!",
    langs: { bg: "Български", mk: "Македонски", en: "English" },
  },
  mk: {
    brand: "Мајстор Насте",
    slogan: "Фасади, камен и малтер — квалитет без компромис",
    cta: "Барај бесплатна проценка",
    servicesTitle: "Експертски услуги",
    galleryTitle: "Галерија: фасади и камени решенија",
    contactTitle: "Контакт",
    name: "Име / Телефон",
    email: "Е-пошта",
    message: "Порака",
    send: "Испрати",
    thanks: "Фала — ја примивме пораката!",
    langs: { bg: "Бугарски", mk: "Македонски", en: "English" },
  },
  en: {
    brand: "Majstor Naste",
    slogan: "Facades, stone and plaster — quality without compromise",
    cta: "Get a free estimate",
    servicesTitle: "Our expertise",
    galleryTitle: "Gallery: facades & stone works",
    contactTitle: "Contact",
    name: "Name / Phone",
    email: "Email",
    message: "Message",
    send: "Send message",
    thanks: "Thanks — we got your message!",
    langs: { bg: "Български", mk: "Македонски", en: "English" },
  },
};

export default function MajstorNasteFacades() {
  const [lang, setLang] = useState("bg");
  const t = i18n[lang];
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  // probable image filenames in the user's folder — if a file doesn't exist, onError fallback will show placeholder
  const galleryFiles = [
    "hero.jpg",
    "fasada1.jpg",
    "fasada2.jpg",
    "gnajs1.jpg",
    "kamin1.jpg",
    "ograda1.jpg",
    "kuka_kamen1.jpg",
    "mazilka1.jpg",
  ];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mn_lang");
      if (saved && i18n[saved]) setLang(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("mn_lang", lang); } catch {}
  }, [lang]);

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const subject = encodeURIComponent(`${t.brand} - Website inquiry`);
    const body = encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    // fallback: open mail client
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus("sent");
    setTimeout(() => setStatus(null), 4000);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-600 flex items-center justify-center text-white font-extrabold shadow">MN</div>
            <div>
              <div className="font-semibold text-lg">{t.brand}</div>
              <div className="text-xs text-slate-600">{t.slogan}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href={`tel:${PHONE}`} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h4l2 5-1 7 6-3 5 2v4"/></svg>
              <span className="text-sm">{PHONE}</span>
            </a>

            <div className="flex items-center gap-1">
              {Object.keys(i18n).map((c) => (
                <button key={c} onClick={() => setLang(c)} aria-pressed={lang === c} className={`px-2 py-1 rounded ${lang === c ? "bg-slate-900 text-white" : "text-slate-600"}`}>
                  {i18n[lang].langs[c]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight mb-4">{t.brand}</h1>
          <p className="text-lg text-slate-700 mb-6">{t.slogan}</p>

          <div className="flex gap-3">
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 px-5 py-3 bg-amber-600 text-white rounded-lg shadow hover:shadow-lg transition">{t.cta}</a>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 px-4 py-3 border rounded-lg text-sm">{EMAIL}</a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow">
              <div className="w-10 h-10 rounded-md bg-amber-100 flex items-center justify-center font-semibold">1</div>
              <div>
                <div className="font-medium">Фасади и изолации</div>
                <div className="text-sm text-slate-500">Професионално изпълнение, топлинна и визуална защита.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow">
              <div className="w-10 h-10 rounded-md bg-amber-100 flex items-center justify-center font-semibold">2</div>
              <div>
                <div className="font-medium">Облицовки с гнајс и камък</div>
                <div className="text-sm text-slate-500">Дълготрайна красота и естествен характер.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={`${IMAGE_BASE}hero.jpg`}
            alt="hero"
            className="w-full h-full object-cover min-h-[320px]"
            onError={(e) => { e.currentTarget.src = `${IMAGE_BASE}fasada1.jpg`; e.currentTarget.onerror = null; }}
          />
        </div>
      </header>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">{t.servicesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Фасади</h3>
            <p className="text-sm text-slate-600">Изолации, мазилки и декоративни пластове за перфектен външен вид.</p>
          </article>

          <article className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Каменни облицовки</h3>
            <p className="text-sm text-slate-600">Гнајс, декоративен и облицовъчен камък — от проект до монтаж.</p>
          </article>

          <article className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Камини & огради</h3>
            <p className="text-sm text-slate-600">Декоративни камини, градински огради и елементи от камък.</p>
          </article>
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold mb-4">{t.galleryTitle}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryFiles.map((fn, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow-sm">
              <img
                src={`${IMAGE_BASE}${fn}`}
                alt={`project-${i+1}`}
                className="w-full h-44 object-cover"
                onError={(e) => { e.currentTarget.src = `https://via.placeholder.com/400x300?text=Project+${i+1}`; e.currentTarget.onerror = null; }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mb-2">{t.contactTitle}</h3>
          <p className="text-slate-600 mb-4">Ние работим на територията на {MAP_LOCATION}. Свържете се за безплатна оглед и оферта.</p>

          <div className="bg-white p-4 rounded-2xl shadow">
            <p className="text-sm"><strong>Телефон:</strong> <a href={`tel:${PHONE}`}>{PHONE}</a></p>
            <p className="text-sm mt-1"><strong>Имейл:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>

            <div className="mt-4 flex gap-3">
              <a target="_blank" rel="noreferrer" href={`https://wa.me/${PHONE.replace(/[^\d]/g, "")}`} className="px-4 py-2 border rounded-lg">WhatsApp</a>
              <a target="_blank" rel="noreferrer" href={`https://maps.google.com?q=${encodeURIComponent(MAP_LOCATION)}`} className="px-4 py-2 border rounded-lg">Open map</a>
            </div>
          </div>

          <div className="mt-6 rounded-lg overflow-hidden">
            <iframe title="map" src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_LOCATION)}&output=embed`} className="w-full h-48"></iframe>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow">
            <label className="block text-sm font-medium">{t.name}</label>
            <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" placeholder={t.name} />

            <label className="block text-sm font-medium mt-4">{t.email}</label>
            <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" placeholder={t.email} />

            <label className="block text-sm font-medium mt-4">{t.message}</label>
            <textarea name="message" value={form.message} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2 h-32" placeholder={t.message}></textarea>

            <div className="mt-4 flex items-center gap-3">
              <button type="submit" disabled={status === "sending"} className="px-4 py-2 bg-amber-600 text-white rounded-lg">{status === "sending" ? "Sending..." : t.send}</button>
              <button type="button" onClick={() => setForm({ name: "", email: "", message: "" })} className="px-3 py-2 border rounded-lg">Clear</button>
              {status === "sent" && <span className="text-green-600">{t.thanks}</span>}
            </div>

            <div className="mt-3 text-xs text-slate-500">Съвет: интегрирайте EmailJS или Formspree, за да изпращате съобщения без да напускате страницата.</div>
          </form>
        </div>
      </section>

      <footer className="mt-12 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} {t.brand} — Всички права запазени.
      </footer>
    </div>
  );
}
