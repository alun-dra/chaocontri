import React, { useEffect, useRef, useState } from "react";
import {
  ExternalLink, PlayCircle, ArrowRight, Share2,
  Instagram, Youtube, Facebook, X,
  Landmark, ShieldCheck, Sparkles, CheckCircle2
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ================= THEME (elegante) ================= */
const THEME = {
  primary: "#164E63",   // azul petróleo
  sky: "#38BDF8",       // acento celeste
  paperA: "#F6F8FC",    // porcelana
  paperB: "#FFFFFF",    // blanco
  text:   "#0A1220",    // texto
};

/* ================= DATA ================= */
const VIDEOS = [
  { id: 1, title: "¿Por qué eliminar las contribuciones?", src: "/videos/videos1.mp4", poster: "/assets/poster1.jpg", social: { label: "Instagram", url: "https://www.instagram.com/reel/DMLWMGfRA5W/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", icon: "instagram" }, tags: ["#ChaoContribuciones"] },
  { id: 2, title: "El impuesto territorial y tu familia", src: "/videos/video2.mp4", poster: "/assets/poster2.jpg", social: { label: "Instagram", url: "https://www.instagram.com/reel/DMS3ljiuAG8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", icon: "instagram" }, tags: ["Familia", "Vivienda"] },
  { id: 3, title: "¿Cómo se financiarán los municipios?", src: "/videos/videos3.mp4", poster: "/assets/poster3.jpg", social: { label: "Instagram", url: "https://www.instagram.com/reel/DMY0gHSs9pa/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", icon: "instagram" }, tags: ["Transparencia"] },
  { id: 4, title: "Propiedad y esfuerzo familiar", src: "/videos/videos4.mp4", poster: "/assets/poster4.jpg", social: { label: "Instagram", url: "https://www.instagram.com/reel/DMkx_tlsGXT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", icon: "instagram" }, tags: ["Propiedad", "Esfuerzo"] },
  { id: 5, title: "Beneficios para los adultos mayores", src: "/videos/videos6.mp4", poster: "/assets/poster5.jpg", social: { label: "Instagram", url: "https://www.instagram.com/reel/DMydAmqBv3e/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", icon: "instagram" }, tags: ["Adultos mayores", "Apoyo"] },
  { id: 6, title: "Transparencia municipal sin castigar", src: "/videos/videos7.mp4", poster: "/assets/poster6.jpg", social: { label: "Instagram", url: "https://www.instagram.com/reel/DNDb5maszVD/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", icon: "instagram" }, tags: ["Transparencia", "Eficiencia"] },
];

const SocialIcon = ({ name, className = "w-4 h-4" }) => {
  switch (name) {
    case "instagram": return <Instagram className={className} />;
    case "youtube":   return <Youtube   className={className} />;
    case "facebook":  return <Facebook  className={className} />;
    case "twitter":   return <X         className={className} />;
    default:          return <ExternalLink className={className} />;
  }
};

/* ========= Fondo global: patrón + blobs sutiles ========= */
function BackgroundFX() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
          backgroundPosition: "0 0, 12px 12px",
          backgroundSize: "24px 24px",
          color: THEME.sky,
        }}
      />
      <svg className="fixed -z-10 -top-24 -right-24 w-[520px] h-[520px] opacity-25" viewBox="0 0 200 200">
        <path
          fill="#93C5FD"
          d="M42.8,-59C56.4,-50.3,68,-37.4,72.2,-22.6C76.4,-7.8,73.2,8.9,65.8,23.3C58.5,37.7,46.9,49.9,33,59.5C19.1,69.2,3,76.4,-12.3,78.8C-27.6,81.2,-51.9,78.8,-65.4,66.7C-79,54.5,-81.8,32.6,-80.9,12.2C-80,-8.2,-75.4,-27.1,-64.6,-41.3C-53.8,-55.6,-36.7,-65.3,-19.2,-72.1C-1.7,-78.8,16.1,-82.6,31.6,-77.6C47.2,-72.6,60.5,-58,42.8,-59Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg className="fixed -z-10 -bottom-20 -left-28 w-[420px] h-[420px] opacity-20" viewBox="0 0 200 200">
        <path
          fill="#BAE6FD"
          d="M49,-62.5C62.3,-52.9,71.8,-37.6,74,-22.1C76.2,-6.6,71.1,9.2,63.4,22.5C55.8,35.8,45.6,46.7,33.2,56.3C20.8,65.9,10.4,74.2,-2.5,78.1C-15.5,82,-31,81.6,-44.1,74.9C-57.2,68.1,-67.9,55.1,-72.2,40.2C-76.4,25.3,-74.1,8.4,-69.5,-6.1C-64.9,-20.6,-58.1,-32.8,-48.6,-43.7C-39.1,-54.6,-27,-64.3,-13.1,-69.4C0.8,-74.6,16.5,-75.2,30.3,-69.4C44,-63.6,55.7,-51.2,49,-62.5Z"
          transform="translate(100 100)"
        />
      </svg>
    </>
  );
}

/* ================= MAIN ================= */
export default function ChaoContribucionesPage() {
  const [activeTab, setActiveTab] = useState("fin");
  const [modal, setModal] = useState({ open: false, src: "", poster: "", title: "" });
  const progressRef = useRef(null);
  const heroRef = useRef(null);
  const revealRef = useRef([]);
  revealRef.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateBar = () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (progressRef.current) progressRef.current.style.width = scrolled + "%";
    };
    updateBar();
    window.addEventListener("scroll", updateBar);

    if (heroRef.current) {
      const items = heroRef.current.querySelectorAll(".hero-animate");
      gsap.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out" });
    }

    revealRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } }
      );
    });

    return () => window.removeEventListener("scroll", updateBar);
  }, []);

  const addReveal = (el) => el && revealRef.current.push(el);
  const openVideo = (v) => setModal({ open: true, src: v.src, poster: v.poster, title: v.title });
  const closeVideo = () => setModal({ open: false, src: "", poster: "", title: "" });

  return (
    <main
      className="min-h-screen"
      style={{ background: `linear-gradient(180deg, ${THEME.paperA} 0%, ${THEME.paperB} 100%)`, color: THEME.text }}
    >
      <BackgroundFX />

      {/* Progress */}
      <div className="fixed top-0 left-0 h-1 z-[60]" style={{ background: THEME.sky, width: 0 }} ref={progressRef} />

      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight text-xl" style={{ color: THEME.primary }}>
            <span>Chao</span>
            <span className="text-[#38BDF8]">Contribuciones</span>
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
      <header
        ref={heroRef}
        id="top"
        className="relative overflow-hidden"
        style={{ background: "radial-gradient(900px 300px at 18% 0%, rgba(56,189,248,.18), transparent 60%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="hero-animate inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: THEME.sky + "22", color: THEME.primary }}>
              <Sparkles className="w-4 h-4" /> Movimiento ciudadano
            </span>
            <h1 className="hero-animate text-4xl md:text-6xl font-black leading-tight mt-4" style={{ color: THEME.primary }}>
              Eliminemos el <span className="text-[#38BDF8]">100% de las contribuciones</span>
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
      <section id="manifiesto" className="max-w-6xl mx-auto px-4 py-12 md:py-16 border-t border-slate-200/60">
        <div className="grid md:grid-cols-3 gap-6">
          <Pillar icon={<ShieldCheck className="w-6 h-6" />} title="Protección del patrimonio" text="Prioridad a adultos mayores, primera vivienda y familias vulnerables." />
          <Pillar icon={<Landmark className="w-6 h-6" />} title="Transparencia y eficiencia" text="Municipios con reglas claras, portales abiertos y gasto auditable." />
          <Pillar icon={<CheckCircle2 className="w-6 h-6" />} title="Derogación total" text="Fin al cobro permanente: lo que pagaste por tu casa no se paga dos veces." />
        </div>
      </section>

      {/* PASOS + Tabs */}
      <section id="pasos" className="max-w-6xl mx-auto px-4 py-12 md:py-16 border-t border-slate-200/60">
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

      {/* VIDEOS – sección clara con diseño */}
      <section id="videos" className="relative overflow-hidden">
        {/* Fondo porcelana + rejilla sutil */}
        <div aria-hidden className="absolute inset-0 -z-10"
             style={{ background: `linear-gradient(180deg, ${THEME.paperB} 0%, ${THEME.paperA} 100%)` }}/>
        <div aria-hidden className="absolute inset-0 -z-[9] opacity-[0.07]"
             style={{
               backgroundImage:
                 "linear-gradient(transparent 95%, currentColor 95%), linear-gradient(90deg, transparent 95%, currentColor 95%)",
               backgroundSize: "28px 28px, 28px 28px",
               color: "#91A4B6"
             }}/>

        {/* Banda diagonal decorativa */}
        <div aria-hidden
             className="absolute -z-[8] -top-40 right-[-15%] w-[60%] h-[120%] rounded-[48px] rotate-6"
             style={{ background: "linear-gradient(180deg, rgba(56,189,248,0.10) 0%, rgba(22,78,99,0.08) 100%)",
                      boxShadow: "0 40px 100px rgba(22,78,99,0.12)" }}/>

        <div className="max-w-6xl mx-auto px-4 py-14 md:py-16 relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{color: THEME.primary}}>
              Mira y comparte
            </h2>
            <span className="text-slate-600/80 text-sm flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Ayúdanos a difundir
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 justify-items-center">
            {VIDEOS.map((v) => (
              <SocialPostCard key={v.id} v={v} />
            ))}
          </div>
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
          <div className="rounded-3xl p-8 md:p-12 text-white shadow-lg overflow-hidden"
               style={{ background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.sky})` }}>
            <h3 className="text-2xl md:text-3xl font-extrabold">Súmate a Chao Contribuciones</h3>
            <p className="mt-2 text-white/90 max-w-2xl">Deja tu correo para recibir novedades y participar en actividades del movimiento.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-3">
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
              <a href="https://www.instagram.com/dalylibertario/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white"><Instagram className="w-4 h-4" /> Instagram</a>
              {/* <a href="https://youtube.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white"><Youtube className="w-4 h-4" /> YouTube</a>
              <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white"><Facebook className="w-4 h-4" /> Facebook</a> */}
              <a href="https://x.com/cristiandalyd?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthorhttps://x.com/cristiandalyd?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white"><X className="w-4 h-4" /> X</a>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-500">© {new Date().getFullYear()} Chao Contribuciones. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Floating CTA */}
      <a href="#sumate" className="fixed bottom-4 right-4 md:bottom-6 md:right-6 inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl" style={{ backgroundColor: THEME.primary, color: "white" }}>
        Súmate <ArrowRight className="w-4 h-4" />
      </a>

      {/* MODAL (solo hero) */}
      {modal.open && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm grid place-items-center p-4" onClick={closeVideo}>
          <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
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

/* ================= Subcomponentes ================= */
function Pillar({ icon, title, text }) {
  return (
    <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3" style={{color: THEME.primary}}>
        {icon}<h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="mt-2 text-gray-700 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function Step({ n, t, d, addReveal }) {
  return (
    <div ref={addReveal} className="p-5 rounded-2xl border border-gray-200 bg-[linear-gradient(180deg,#ffffff,#f9fafb)]">
      <div className="text-sm font-semibold" style={{color: THEME.sky}}>Paso {n}</div>
      <div className="mt-1 text-lg font-bold" style={{color: THEME.primary}}>{t}</div>
      <p className="mt-2 text-gray-700 text-sm">{d}</p>
    </div>
  );
}

function Tabs({ activeTab, setActiveTab }) {
  const tabs = {
    fin:  { title: "Financiamiento", body: "Reasignación de ingresos existentes y eficiencia del gasto municipal. Indicadores públicos y control ciudadano." },
    prop: { title: "Propiedad",      body: "La vivienda familiar es patrimonio. Protección explícita a adultos mayores y primera vivienda." },
    trans:{ title: "Transparencia",  body: "Portales de gasto abiertos, auditorías y metas de desempeño para municipios." },
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(tabs).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setActiveTab(k)}
            className={`px-4 py-2 rounded-xl border text-sm ${activeTab === k ? "bg-slate-900 text-white border-slate-900" : "bg-white text-gray-800 border-gray-300"}`}
          >
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

/* Tarjetas de video claras, “glass” */
function SocialPostCard({ v }) {
  const [isPortrait, setIsPortrait] = useState(true);
  return (
    <article
      className="w-[320px] md:w-[340px] xl:w-[360px] rounded-3xl border border-slate-200/70 bg-white/90 backdrop-blur
                 shadow-[0_6px_24px_rgba(2,6,23,.06)] hover:shadow-[0_12px_40px_rgba(2,6,23,.12)]
                 transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-3">
        <div
          className={`relative rounded-2xl overflow-hidden border border-slate-200/70 ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`}
        >
          <video
            className={`absolute inset-0 w-full h-full ${isPortrait ? "object-cover" : "object-contain bg-black"}`}
            controls
            playsInline
            preload="metadata"
            poster={v.poster}
            controlsList="nodownload noremoteplayback"
            onLoadedMetadata={(e) => {
              const vid = e.currentTarget;
              setIsPortrait(vid.videoHeight >= vid.videoWidth);
            }}
          >
            <source src={v.src} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="px-4 pb-4">
        <h3 className="font-semibold text-slate-900">{v.title}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {v.tags?.map((t, i) => (
            <span key={i} className="px-3 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
              {t}
            </span>
          ))}
          <a
            href={v.social.url}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{ backgroundColor: THEME.primary, color: "white" }}
          >
            <SocialIcon name={v.social.icon} /> Ver en {v.social.label}
          </a>
        </div>
      </div>
    </article>
  );
}
