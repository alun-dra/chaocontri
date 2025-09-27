import React, { useEffect, useRef, useState } from "react";
import {
  ExternalLink, PlayCircle, ArrowRight, Share2,
  Instagram, Youtube, Facebook, X,
  Landmark, ShieldCheck, Sparkles, CheckCircle2
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ================= THEME ================= */
const THEME = {
  primary: "#164E63",
  sky: "#38BDF8",
  paperA: "#F6F8FC",
  paperB: "#FFFFFF",
  text: "#0A1220",
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

/* ============== FONDO NUEVO: “Aurora + Bubbles” ============== */
function BackgroundFX() {
  const gridRef = useRef(null);
  const auroraRef = useRef(null);
  const bubblesRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const makeBubbles = (container, qty) => {
      bubblesRef.current = [];
      container.innerHTML = "";
      for (let i = 0; i < qty; i++) {
        const b = document.createElement("span");
        b.className =
          "absolute rounded-full bg-sky-200/40 dark:bg-sky-300/30";
        const size = 6 + Math.random() * 18; // px
        b.style.width = `${size}px`;
        b.style.height = `${size}px`;
        b.style.left = `${Math.random() * 100}%`;
        b.style.top = `${20 + Math.random() * 60}%`;
        b.style.filter = "blur(0.3px)";
        container.appendChild(b);
        bubblesRef.current.push(b);
      }
    };

    const ctx = gsap.context(() => {
      // Dotted grid parallax muy suave
      if (gridRef.current && !prefersReduced) {
        gsap.to(gridRef.current, {
          backgroundPosition: "-120px -120px",
          duration: 80,
          repeat: -1,
          ease: "linear",
        });
      }

      // Aurora: 3 blobs grandes con blur que se mueven horizontalmente
      if (auroraRef.current && !prefersReduced) {
        const [a, b, c] = auroraRef.current.children;
        gsap.to(a, { xPercent: 20, yPercent: -5, duration: 18, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(b, { xPercent: -18, yPercent: 4, duration: 22, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(c, { xPercent: 12, yPercent: 8, duration: 26, yoyo: true, repeat: -1, ease: "sine.inOut" });
        // Parallax con scroll, leve
        gsap.to(auroraRef.current, {
          y: -30,
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.4 },
        });
      }

      // Bubbles (menos en móvil)
      const bubbleLayer = document.getElementById("bubble-layer");
      if (bubbleLayer && !prefersReduced) {
        makeBubbles(bubbleLayer, window.innerWidth < 640 ? 8 : 16);
        bubblesRef.current.forEach((el, i) => {
          gsap.to(el, {
            y: -40 - Math.random() * 60,
            x: "+=" + (Math.random() * 40 - 20),
            opacity: 0.15 + Math.random() * 0.25,
            duration: 8 + Math.random() * 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.15,
          });
        });
      }
    });

    mm.add("(max-width: 639px)", () => {
      // en móvil, aurora menos intensa
      if (auroraRef.current) auroraRef.current.style.opacity = "0.6";
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* base gradient */}
      <div className="fixed inset-0 -z-50" style={{ background: `linear-gradient(180deg, ${THEME.paperA} 0%, ${THEME.paperB} 100%)` }} />

      {/* dotted grid */}
      <div
        ref={gridRef}
        className="fixed inset-0 -z-40 pointer-events-none"
        style={{
          opacity: 0.08,
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          color: THEME.sky,
          maskImage: "linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        }}
      />

      {/* aurora blobs */}
      <div ref={auroraRef} className="fixed -z-30 inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-16 w-[36rem] h-[36rem] rounded-full blur-3xl"
             style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.35), transparent 60%)" }} />
        <div className="absolute top-10 right-[-10%] w-[40rem] h-[40rem] rounded-full blur-3xl"
             style={{ background: "radial-gradient(closest-side, rgba(22,78,99,0.28), transparent 62%)" }} />
        <div className="absolute bottom-[-15%] left-[20%] w-[30rem] h-[30rem] rounded-full blur-3xl"
             style={{ background: "radial-gradient(closest-side, rgba(2,132,199,0.22), transparent 65%)" }} />
      </div>

      {/* bubbles */}
      <div id="bubble-layer" className="fixed inset-0 -z-20 pointer-events-none" />
    </>
  );
}

/* ======== Hook: botones “magnéticos” ======== */
function useMagnetic(ref, strength = 18) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const enter = () => gsap.to(el, { scale: 1.02, duration: 0.15 });
    const leave = () => gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.2 });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: (relX / r.width) * strength, y: (relY / r.height) * strength, duration: 0.2 });
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("mousemove", move);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("mousemove", move);
    };
  }, [ref, strength]);
}

/* ================= MAIN ================= */
export default function ChaoContribucionesPage() {
  const [activeTab, setActiveTab] = useState("fin");
  const [modal, setModal] = useState({ open: false, src: "", poster: "", title: "" });

  const progressRef = useRef(null);
  const heroRef = useRef(null);
  const revealRef = useRef([]);

  const titleUnderlineRef = useRef(null);
  const videoCardRef = useRef(null);
  const btnVideosRef = useRef(null);
  const btnFaqRef = useRef(null);

  useMagnetic(btnVideosRef, 16);
  useMagnetic(btnFaqRef, 12);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });

      if (titleUnderlineRef.current) {
        gsap.fromTo(
          titleUnderlineRef.current,
          { scaleX: 0, transformOrigin: "0% 50%" },
          { scaleX: 1, duration: 1.1, ease: "power3.out", delay: 0.2 }
        );
      }

      if (videoCardRef.current) {
        const shine = videoCardRef.current.querySelector(".shine");
        if (shine) {
          gsap.fromTo(shine, { xPercent: -130 }, { xPercent: 180, duration: 2.4, repeat: -1, ease: "power2.inOut", repeatDelay: 1.6 });
        }
        gsap.to(videoCardRef.current, {
          y: -8,
          scrollTrigger: { trigger: videoCardRef.current, start: "top bottom", end: "bottom top", scrub: 0.35 },
        });
      }

      return () => window.removeEventListener("scroll", updateBar);
    });

    return () => ctx.revert();
  }, []);

  const addReveal = (el) => {
    if (!el) return;
    if (!revealRef.current.includes(el)) revealRef.current.push(el);
  };

  const openVideo = (v) => setModal({ open: true, src: v.src, poster: v.poster, title: v.title });
  const closeVideo = () => setModal({ open: false, src: "", poster: "", title: "" });

  return (
    <main className="min-h-screen relative" style={{ color: THEME.text }}>
      <BackgroundFX />

      {/* Progress */}
      <div className="fixed top-0 left-0 h-1 z-[60]" style={{ background: THEME.sky, width: 0 }} ref={progressRef} />

      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight text-lg sm:text-xl" style={{ color: THEME.primary }}>
            <span>Chao</span>
            <span className="text-[#38BDF8]">Contribuciones</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#manifiesto" className="hover:opacity-80">Manifiesto</a>
            <a href="#pasos" className="hover:opacity-80">Pasos</a>
            <a href="#videos" className="hover:opacity-80">Videos</a>
            <a href="#faq" className="hover:opacity-80">Preguntas</a>
          </div>
          <a href="#sumate" className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-white text-xs sm:text-sm hover:shadow-lg transition-shadow" style={{ backgroundColor: THEME.primary }}>
            Súmate ahora <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header ref={heroRef} id="top" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* Columna texto */}
          <div>
            <span
              className="hero-animate inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: THEME.sky + "22", color: THEME.primary }}
            >
              <Sparkles className="w-4 h-4" /> Movimiento ciudadano
            </span>

            <h1 className="hero-animate text-4xl sm:text-5xl md:text-6xl font-black leading-tight mt-3" style={{ color: THEME.primary }}>
              Eliminemos el <span className="text-[#38BDF8]">100% de las contribuciones</span>
              <span ref={titleUnderlineRef} className="block mt-3 h-[4px] w-40 sm:w-48 rounded-full" style={{ background: THEME.sky }} />
            </h1>

            <p className="hero-animate mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl">
              Terminar el cobro permanente sobre la vivienda familiar y financiar con <strong>transparencia</strong> y <strong>eficiencia</strong>.
            </p>

            <KPIStrip />
            <Marquee />

            <div className="hero-animate mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
              <a
                ref={btnVideosRef}
                href="#videos"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl font-semibold shadow hover:shadow-lg will-change-transform w-full sm:w-auto justify-center"
                style={{ backgroundColor: THEME.primary, color: "white" }}
              >
                Ver videos <PlayCircle className="w-5 h-5" />
              </a>
              <a
                ref={btnFaqRef}
                href="#faq"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl border border-gray-300 text-gray-800 bg-white/70 backdrop-blur hover:bg-white will-change-transform w-full sm:w-auto justify-center"
              >
                ¿Cómo se financia?
              </a>
            </div>
          </div>

          {/* Columna video (pasa abajo en móvil) */}
          {/* Columna video (pasa abajo en móvil) */}
<div className="relative md:justify-self-end">
  <div
    ref={videoCardRef}
    className="relative mx-auto w-[88vw] max-w-[420px] rounded-3xl overflow-hidden
               border border-gray-200 shadow-xl bg-white/80 backdrop-blur"
  >
    <span
      className="shine pointer-events-none absolute inset-y-0 -left-1 w-1/3 skew-x-[-20deg] opacity-20"
      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent)" }}
      aria-hidden
    />
    {/* ⬇️ El wrapper ahora es 100% ancho y controla el alto con aspect-ratio */}
    <div className="relative w-full aspect-[9/16]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        controls
        playsInline
        preload="metadata"
        poster="/assets/hero-poster.jpg"
      >
        <source src="/videos/atencion-moneda.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</div>



        </div>
      </header>

      {/* MANIFIESTO */}
      <section id="manifiesto" className="max-w-6xl mx-auto px-3 sm:px-4 py-10 sm:py-12 md:py-16 border-t border-slate-200/60">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <Pillar icon={<ShieldCheck className="w-6 h-6" />} title="Protección del patrimonio" text="Prioridad a adultos mayores, primera vivienda y familias vulnerables." />
          <Pillar icon={<Landmark className="w-6 h-6" />} title="Transparencia y eficiencia" text="Municipios con reglas claras, portales abiertos y gasto auditable." />
          <Pillar icon={<CheckCircle2 className="w-6 h-6" />} title="Derogación total" text="Fin al cobro permanente: lo que pagaste por tu casa no se paga dos veces." />
        </div>
      </section>

      {/* PASOS + Tabs */}
      <section id="pasos" className="max-w-6xl mx-auto px-3 sm:px-4 py-10 sm:py-12 md:py-16 border-t border-slate-200/60">
        <div className="rounded-3xl bg-white border border-gray-200 p-5 sm:p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: THEME.primary }}>¿Cómo se implementa?</h2>
          <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { n: "1", t: "Proyecto de ley", d: "Derogar el Impuesto Territorial y proteger la vivienda familiar." },
              { n: "2", t: "Reasignación y control", d: "Eficiencia del gasto, indicadores y control ciudadano del presupuesto municipal." },
              { n: "3", t: "Transición ordenada", d: "Reglas de implementación y foco en hogares vulnerables." },
            ].map((s, i) => (
              <Step key={i} n={s.n} t={s.t} d={s.d} addReveal={addReveal} />
            ))}
          </div>

          <div className="mt-6 md:mt-8">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10"
             style={{ background: `linear-gradient(180deg, ${THEME.paperB} 0%, ${THEME.paperA} 100%)` }} />
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-12 md:py-16 relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: THEME.primary }}>
              Mira y comparte
            </h2>
            <span className="text-slate-600/80 text-sm flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Ayúdanos a difundir
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7 justify-items-center">
            {VIDEOS.map((v) => (
              <SocialPostCard key={v.id} v={v} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-3 sm:px-4 py-12 md:py-16">
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
        <div className="max-w-6xl mx-auto px-3 sm:px-4 pb-14 md:pb-16">
          <div className="rounded-3xl p-6 md:p-12 text-white shadow-lg overflow-hidden"
               style={{ background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.sky})` }}>
            <h3 className="text-2xl md:text-3xl font-extrabold">Súmate a Chao Contribuciones</h3>
            <p className="mt-2 text-white/90 max-w-2xl">Deja tu correo para recibir novedades y participar en actividades del movimiento.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-3">
              <label className="sr-only" htmlFor="email">Correo</label>
              <input id="email" type="email" required placeholder="Tu correo" className="w-full sm:w-auto flex-1 px-4 py-3 rounded-2xl text-gray-900" />
              <button className="px-5 py-3 rounded-2xl font-semibold bg-white text-[#111827]">Quiero sumarme</button>
              <a href="#videos" className="px-5 py-3 rounded-2xl font-semibold border border-white/60 text-white text-center">Ver videos</a>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-10 text-sm text-gray-600">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-bold text-gray-800">Referencia:</p>
              <p>
                Movimiento Chao Contribuciones. Apoya al candidato a diputado{" "}
                <span className="font-semibold" style={{ color: THEME.primary }}>Cristian Daly</span>.
              </p>
              <a
                href="https://cristiandaly.cl/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-semibold hover:underline mt-1"
                style={{ color: THEME.primary }}
              >
                Página oficial <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a href="https://instagram.com/" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white flex-1 sm:flex-none justify-center">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white flex-1 sm:flex-none justify-center">
                <Youtube className="w-4 h-4" /> YouTube
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white flex-1 sm:flex-none justify-center">
                <Facebook className="w-4 h-4" /> Facebook
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-white flex-1 sm:flex-none justify-center">
                <X className="w-4 h-4" /> X
              </a>
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} Chao Contribuciones. Todos los derechos reservados.
          </p>
        </div>
      </footer>


      {/* MODAL */}
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
    <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm transition hover:shadow-md hover:border-sky-300/60">
      <div className="flex items-center gap-3" style={{ color: THEME.primary }}>
        {icon}<h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="mt-2 text-gray-700 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function Step({ n, t, d, addReveal }) {
  return (
    <div ref={addReveal} className="p-5 rounded-2xl border border-gray-200 bg-[linear-gradient(180deg,#ffffff,#f9fafb)] transition-transform hover:-translate-y-0.5">
      <div className="text-sm font-semibold" style={{ color: THEME.sky }}>Paso {n}</div>
      <div className="mt-1 text-lg font-bold" style={{ color: THEME.primary }}>{t}</div>
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

function SocialPostCard({ v }) {
  const [isPortrait, setIsPortrait] = useState(true);
  return (
    <article
      className="w-[320px] md:w-[340px] xl:w-[360px] rounded-3xl border border-slate-200/70 bg-white/90 backdrop-blur
                 shadow-[0_6px_24px_rgba(2,6,23,.06)] hover:shadow-[0_12px_40px_rgba(2,6,23,.12)]
                 transition-shadow duration-300 overflow-hidden hover:-translate-y-1"
    >
      <div className="p-3">
        <div className={`relative rounded-2xl overflow-hidden border border-slate-200/70 ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`}>
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
            <span key={`${v.id}-${i}`} className="px-3 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
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

/* ===== KPIs ===== */
function KPIStrip() {
  const items = [
    { value: 120000, label: "firmas meta" },
    { value: 345,    label: "comunas sumadas" },
    { value: 1,      label: "ley: vivienda familiar" },
  ];
  const refs = useRef([]);

  useEffect(() => {
    const tweens = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obj = { n: 0 };
      const t = gsap.to(obj, {
        n: items[i].value,
        duration: 1.4,
        ease: "power3.out",
        delay: i * 0.1,
        onUpdate() {
          el.textContent = Math.floor(obj.n).toLocaleString("es-CL");
        },
      });
      tweens.push(t);
    });
    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <ul id="kpi-strip" className="hero-animate mt-5 grid grid-cols-2 md:grid-cols-3 max-w-xl gap-3">
      {items.map((it, i) => (
        <li key={i} className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur px-4 py-3 shadow-sm">
          <div className="text-xl sm:text-2xl font-black" style={{ color: THEME.primary }}>
            <span ref={(el) => (refs.current[i] = el)}>0</span>{it.value >= 100 ? "" : "x"}
          </div>
          <div className="text-[11px] sm:text-[12px] font-semibold text-slate-600">{it.label}</div>
        </li>
      ))}
    </ul>
  );
}

/* ===== Marquee ===== */
function Marquee() {
  const track = useRef(null);
  useEffect(() => {
    if (!track.current) return;
    // velocidad diferente para móvil
    const dur = window.innerWidth < 640 ? 26 : 18;
    const tween = gsap.to(track.current, { xPercent: -50, repeat: -1, duration: dur, ease: "linear" });
    const el = track.current;
    const stop = () => tween.pause();
    const play = () => tween.resume();
    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", play);
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("touchend", play);
    return () => {
      tween.kill();
      el.removeEventListener("mouseenter", stop);
      el.removeEventListener("mouseleave", play);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("touchend", play);
    };
  }, []);
  const tags = ["#ChaoContribuciones", "Transparencia", "Eficiencia", "Vivienda Familiar", "Adultos Mayores"];
  return (
    <div className="relative mt-6 sm:mt-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,transparent,black,transparent)]" />
      <div ref={track} className="flex gap-3 sm:gap-4 will-change-transform">
        {[...tags, ...tags].map((t, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full border text-[11px] sm:text-xs font-semibold"
            style={{ borderColor: "#bae6fd", color: THEME.primary, background: "#f8fdff" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
