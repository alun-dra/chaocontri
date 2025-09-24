import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, PlayCircle, ArrowRight, Share2, Instagram, Youtube, Facebook, X, Landmark, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ================= THEME (minimal limpio: azul primario + neutros) =================
const THEME = {
  primary: "#1D4ED8",   // Azul primario
  sky: "#0EA5E9",       // Azul claro para detalles
  paperA: "#F8FAFC",    // fondo claro 1
  paperB: "#EEF2FF",    // fondo claro 2 (degradado sutil)
  text: "#0F172A",      // texto fuerte
};

// ================= DATA =================
const VIDEOS = [
  { id: 1, title: "¿Por qué eliminar las contribuciones?", src: "/videos/videos1.mp4", poster: "/assets/poster1.jpg", social: { label: "Instagram", url: "https://instagram.com/", icon: "instagram" }, tags: ["#ChaoContribuciones", "Proyecto de ley"] },
  { id: 2, title: "El impuesto territorial y tu familia", src: "/videos/video2.mp4", poster: "/assets/poster2.jpg", social: { label: "YouTube", url: "https://youtube.com/", icon: "youtube" }, tags: ["Familia", "Vivienda"] },
  { id: 3, title: "¿Cómo se financiarán los municipios?", src: "/videos/videos3.mp4", poster: "/assets/poster3.jpg", social: { label: "Facebook", url: "https://facebook.com/", icon: "facebook" }, tags: ["Transparencia", "Municipios"] },
  { id: 4, title: "Propiedad y esfuerzo familiar", src: "/videos/videos4.mp4", poster: "/assets/poster4.jpg", social: { label: "Instagram", url: "https://instagram.com/", icon: "instagram" }, tags: ["Propiedad", "Esfuerzo"] },
  { id: 5, title: "Beneficios para los adultos mayores", src: "/videos/videos6.mp4", poster: "/assets/poster5.jpg", social: { label: "X", url: "https://twitter.com/", icon: "twitter" }, tags: ["Adultos mayores", "Apoyo"] },
  { id: 6, title: "Transparencia municipal sin castigar", src: "/videos/videos7.mp4", poster: "/assets/poster6.jpg", social: { label: "YouTube", url: "https://youtube.com/", icon: "youtube" }, tags: ["Transparencia", "Eficiencia"] },
];

const SocialIcon = ({ name, className = "w-4 h-4" }) => {
  switch (name) {
    case "instagram": return <Instagram className={className} />;
    case "youtube": return <Youtube className={className} />;
    case "facebook": return <Facebook className={className} />;
    case "twitter": return <X className={className} />;
    default: return <ExternalLink className={className} />;
  }
};

// ================= MAIN =================
export default function ChaoContribucionesPage() {
  const [activeTab, setActiveTab] = useState("fin");
  const [modal, setModal] = useState({ open: false, src: "", poster: "", title: "" });
  const progressRef = useRef(null);
  const heroRef = useRef(null);
  const revealRef = useRef([]);
  revealRef.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Barra de progreso de scroll
    const updateBar = () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (progressRef.current) progressRef.current.style.width = scrolled + "%";
    };
    updateBar();
    window.addEventListener("scroll", updateBar);

    // Hero reveal
    if (heroRef.current) {
      const items = heroRef.current.querySelectorAll(".hero-animate");
      gsap.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out" });
    }

    // Reveal general
    revealRef.current.forEach((el) => {
      gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
    });

    return () => window.removeEventListener("scroll", updateBar);
  }, []);

  const addReveal = (el) => el && revealRef.current.push(el);
  const openVideo = (v) => setModal({ open: true, src: v.src, poster: v.poster, title: v.title });
  const closeVideo = () => setModal({ open: false, src: "", poster: "", title: "" });

  return (
    <main className="min-h-screen" style={{ background: `linear-gradient(180deg, ${THEME.paperA} 0%, ${THEME.paperB} 100%)`, color: THEME.text }}>
      {/* Progress */}
      <div className="fixed top-0 left-0 h-1 z-[60]" style={{ background: THEME.sky, width: 0 }} ref={progressRef} />

      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight text-xl" style={{ color: THEME.primary }}>
            <span>Chao</span>
            <span className="text-[#0EA5E9]">Contribuciones</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#manifiesto" className="hover:opacity-80">Manifiesto</a>
            <a href="#pasos" className="hover:opacity-80">Pasos</a>
            <a href="#videos" className="hover:opacity-80">Videos</a>
            <a href="#faq" className="hover:opacity-80">Preguntas</a>
          </div>
          <a href="#sumate" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm hover:shadow-lg transition-shadow" style={{ backgroundColor: THEME.primary }}>
            Súmate ahora <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header ref={heroRef} id="top" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="hero-animate inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: THEME.sky + "22", color: THEME.primary }}>
              <Sparkles className="w-4 h-4" /> Movimiento ciudadano
            </span>
            <h1 className="hero-animate text-4xl md:text-6xl font-black leading-tight mt-4" style={{ color: THEME.primary }}>
              Eliminemos el <span className="text-[#0EA5E9]">100% de las contribuciones</span>
            </h1>
            <p className="hero-animate mt-4 md:mt-6 text-lg md:text-xl text-gray-700 max-w-2xl">
              Terminar el cobro permanente sobre la vivienda familiar y financiar con <strong>transparencia</strong> y <strong>eficiencia</strong>.
            </p>
            <div className="hero-animate mt-6 flex flex-wrap items-center gap-3">
              <a href="#videos" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold shadow hover:shadow-lg" style={{ backgroundColor: THEME.primary, color: "white" }}>
                Ver videos <PlayCircle className="w-5 h-5" />
              </a>
              <a href="#faq" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-gray-300 text-gray-800 hover:bg-white">¿Cómo se financia?</a>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
            <img src="/assets/hero-poster.jpg" alt="Cristian Daly" className="w-full h-full object-cover" />
            <button onClick={() => openVideo(VIDEOS[0])} className="absolute inset-0 grid place-items-center">
              <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold bg-white/95 text-black">
                <PlayCircle className="w-5 h-5" /> Reproducir 0:32
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MANIFIESTO */}
      <section id="manifiesto" className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Pillar icon={<ShieldCheck className="w-6 h-6"/>} title="Protección del patrimonio" text="Prioridad a adultos mayores, primera vivienda y familias vulnerables." />
          <Pillar icon={<Landmark className="w-6 h-6"/>} title="Transparencia y eficiencia" text="Municipios con reglas claras, portales abiertos y gasto auditable." />
          <Pillar icon={<CheckCircle2 className="w-6 h-6"/>} title="Derogación total" text="Fin al cobro permanente: lo que pagaste por tu casa no se paga dos veces." />
        </div>
      </section>

      {/* PASOS + Tabs */}
      <section id="pasos" className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="rounded-3xl bg-white border border-gray-200 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: THEME.primary }}>¿Cómo se implementa?</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              { n: "1", t: "Proyecto de ley", d: "Derogar el Impuesto Territorial y proteger la vivienda familiar." },
              { n: "2", t: "Reasignación y control", d: "Eficiencia del gasto, indicadores y control ciudadano del presupuesto municipal." },
              { n: "3", t: "Transición ordenada", d: "Reglas de implementación y foco en hogares vulnerables." },
            ].map((s, i) => (
              <Step key={i} n={s.n} t={s.t} d={s.d} addReveal={addReveal} />
            ))}
          </div>

          <div className="mt-8">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </section>

      {/* VIDEOS – estilo "social post" como tu ejemplo */}
      <section id="videos" className="max-w-6xl mx-auto px-4 py-14 md:py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: THEME.primary }}>Mira y comparte</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {VIDEOS.map((v) => (
            <SocialPostCard key={v.id} v={v} openVideo={() => openVideo(v)} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-14 md:py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: THEME.primary }}>Preguntas frecuentes</h2>
        <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {[
            { q: "¿Cómo se financiarán los municipios?", a: "Reasignación de ingresos existentes + eficiencia del gasto y transparencia con indicadores públicos. Sin nuevo cobro sobre la vivienda familiar." },
            { q: "¿A quiénes beneficia primero?", a: "Adultos mayores, familias vulnerables y propietarios de primera vivienda." },
            { q: "¿Qué pasa con segundas viviendas?", a: "El foco es la vivienda principal; el detalle se define en la transición regulatoria." },
          ].map((item, i) => (
            <details key={i} className="group p-5">
              <summary className="cursor-pointer list-none flex items-center justify-between font-semibold" style={{ color: THEME.primary }}>
                {item.q}
                <ArrowRight className="w-4 h-4 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="sumate" className="relative">
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <div className="rounded-3xl p-8 md:p-12 text-white shadow-lg overflow-hidden" style={{ background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.sky})`}}>
            <h3 className="text-2xl md:text-3xl font-extrabold">Súmate a Chao Contribuciones</h3>
            <p className="mt-2 text-white/90 max-w-2xl">Deja tu correo para recibir novedades y participar en actividades del movimiento.</p>
            <form onSubmit={(e)=>e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-3">
              <input type="email" required placeholder="Tu correo" className="w-full sm:w-auto flex-1 px-4 py-3 rounded-2xl text-gray-900" />
              <button className="px-5 py-3 rounded-2xl font-semibold bg-white text-[#111827]">Quiero sumarme</button>
              <a href="#videos" className="px-5 py-3 rounded-2xl font-semibold border border-white/60 text-white">Ver videos</a>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-bold text-gray-800">Referencia:</p>
              <p>Movimiento Chao Contribuciones. Apoya al candidato a diputado <span className="font-semibold" style={{ color: THEME.primary }}>Cristian Daly</span>.</p>
              <a href="https://cristiandaly.cl/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold hover:underline mt-1" style={{ color: THEME.primary }}>
                Página oficial <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white"><Instagram className="w-4 h-4" /> Instagram</a>
              <a href="https://youtube.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white"><Youtube className="w-4 h-4" /> YouTube</a>
              <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white"><Facebook className="w-4 h-4" /> Facebook</a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white"><X className="w-4 h-4" /> X</a>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-500">© {new Date().getFullYear()} Chao Contribuciones. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Floating CTA */}
      <a href="#sumate" className="fixed bottom-4 right-4 md:bottom-6 md:right-6 inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl" style={{ backgroundColor: THEME.primary, color: "white" }}>
        Súmate <ArrowRight className="w-4 h-4" />
      </a>

      {/* MODAL VIDEO */}
      {modal.open && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm grid place-items-center p-4" onClick={closeVideo}>
          <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden" onClick={(e)=>e.stopPropagation()}>
            <video className="w-full h-full" controls autoPlay poster={modal.poster}>
              <source src={modal.src} type="video/mp4" />
            </video>
          </div>
          <button onClick={closeVideo} className="mt-3 text-white/80 hover:text-white">Cerrar</button>
        </div>
      )}
    </main>
  );
}

// ================= Subcomponentes =================
function Pillar({ icon, title, text }) {
  return (
    <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition" >
      <div className="flex items-center gap-3 text-[#1D4ED8]">{icon}<h3 className="text-lg font-bold">{title}</h3></div>
      <p className="mt-2 text-gray-700 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function Step({ n, t, d, addReveal }) {
  return (
    <div ref={addReveal} className="p-5 rounded-2xl border border-gray-200 bg-[linear-gradient(180deg,#ffffff,#f9fafb)]">
      <div className="text-sm font-semibold text-[#0EA5E9]">Paso {n}</div>
      <div className="mt-1 text-lg font-bold text-[#1D4ED8]">{t}</div>
      <p className="mt-2 text-gray-700 text-sm">{d}</p>
    </div>
  );
}

function Tabs({ activeTab, setActiveTab }) {
  const tabs = {
    fin: { title: "Financiamiento", body: "Reasignación de ingresos existentes y eficiencia del gasto municipal. Indicadores públicos y control ciudadano." },
    prop: { title: "Propiedad", body: "La vivienda familiar es patrimonio. Protección explícita a adultos mayores y primera vivienda." },
    trans: { title: "Transparencia", body: "Portales de gasto abiertos, auditorías y metas de desempeño para municipios." },
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(tabs).map(([k, v]) => (
          <button key={k} onClick={() => setActiveTab(k)} className={`px-4 py-2 rounded-xl border text-sm ${activeTab===k?"bg-gray-900 text-white border-gray-900":"bg-white text-gray-800 border-gray-300"}` }>
            {v.title}
          </button>
        ))}
      </div>
      <div className="mt-4 p-5 rounded-2xl bg-white border border-gray-200">
        <p className="text-gray-700">{tabs[activeTab].body}</p>
      </div>
    </div>
  );
}

function SocialPostCard({ v, openVideo }) {
  return (
    <article className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Player grande como post social */}
      <div className="p-3">
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <video className="w-full h-full" controls poster={v.poster} preload="none">
            <source src={v.src} type="video/mp4" />
          </video>
        </div>
      </div>
      {/* Meta + CTA */}
      <div className="px-4 pb-4">
        <h3 className="font-semibold text-[#1D4ED8]">{v.title}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {v.tags?.map((t, i) => (
            <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{t}</span>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <a href={v.social.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1D4ED8] text-white text-xs font-semibold">
              <SocialIcon name={v.social.icon} /> Ver en {v.social.label}
            </a>
            <button onClick={openVideo} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-300 text-gray-800 text-xs font-semibold">
              <PlayCircle className="w-4 h-4"/> Reproducir
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}