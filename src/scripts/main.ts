/**
 * @archivo    main.ts
 * @modulo     Interacciones cliente
 * @descripcion Reemplaza toda la lógica React del prototipo original con
 *              vanilla TypeScript. Maneja: cursor personalizado, loader,
 *              navbar con sombra al scrollear, hover-play + tilt 3D en cards
 *              de proyecto, reveals con IntersectionObserver, marquee
 *              (ya en CSS), reloj en vivo de Madrid, panel de contacto
 *              flotante y stagger letter-by-letter del headline.
 *
 *              Mucho más liviano que React+Babel+Framer-Motion del prototipo:
 *              ~5KB vs ~300KB.
 * @actualizado 2026-05-13
 */

// ── Utilidad: ¿el usuario prefiere reducir el movimiento? ─────────────────
// Si es así, deshabilitamos animaciones costosas (tilt, lerp del cursor, etc.)
// pero dejamos los reveals como aparición instantánea (no rota nada).
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// ── 1. CURSOR PERSONALIZADO ───────────────────────────────────────────────
function initCursor() {
  // Solo en dispositivos con puntero fino (no touch)
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) {
    document.getElementById("cursor-dot")?.remove();
    document.getElementById("cursor-ring")?.remove();
    return;
  }

  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  // Posición real del mouse y posición del anillo (lerp para movimiento suave)
  const mouse = { x: -100, y: -100 };
  const ringPos = { x: -100, y: -100 };
  let variant: "default" | "link" | "view" | "play" = "default";
  let hidden = false;

  // Actualiza el punto en tiempo real (sin lag, translate3d directo)
  function onMove(e: MouseEvent) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    dot!.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  }

  // Detecta sobre qué elemento está el cursor para cambiar la variante
  function onOver(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const withCursor = target.closest("[data-cursor]");
    if (withCursor) {
      const v = withCursor.getAttribute("data-cursor") as typeof variant;
      setVariant(v || "link");
      return;
    }
    if (target.closest("a, button")) {
      setVariant("link");
      return;
    }
    setVariant("default");
  }

  function setVariant(v: typeof variant) {
    if (v === variant) return;
    variant = v;
    const isLabel = v === "view" || v === "play";
    const size = isLabel ? 88 : v === "link" ? 56 : 32;
    ring!.style.width = `${size}px`;
    ring!.style.height = `${size}px`;

    if (isLabel) {
      ring!.style.background = "#fff";
      ring!.style.border = "1px solid rgba(255,255,255,0)";
      ring!.style.mixBlendMode = "normal";
      ring!.textContent = v === "view" ? "VIEW" : "PLAY";
    } else {
      ring!.style.background = "transparent";
      ring!.style.border = "1px solid rgba(255,255,255,0.6)";
      ring!.style.mixBlendMode = "difference";
      ring!.textContent = "";
    }

    // El punto crece a 6px en default, se achica a 4px sobre elementos
    dot!.style.width = v === "default" ? "6px" : "4px";
    dot!.style.height = v === "default" ? "6px" : "4px";
  }

  // Oculta el cursor al salir de la ventana
  function setHidden(h: boolean) {
    if (h === hidden) return;
    hidden = h;
    dot!.style.opacity = h ? "0" : "1";
    ring!.style.opacity = h ? "0" : "1";
  }

  // Animation loop: lerp del anillo para que siga al punto con suavidad
  function tick() {
    ringPos.x += (mouse.x - ringPos.x) * 0.18;
    ringPos.y += (mouse.y - ringPos.y) * 0.18;
    ring!.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseover", onOver);
  document.documentElement.addEventListener("mouseleave", () => setHidden(true));
  document.documentElement.addEventListener("mouseenter", () => setHidden(false));
  requestAnimationFrame(tick);
}

// ── 2. LOADER ─────────────────────────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById("loader");
  const pctEl = document.getElementById("loader-pct");
  const barEl = document.getElementById("loader-bar");
  if (!loader || !pctEl || !barEl) return;

  // Si el usuario prefiere menos movimiento, oculta el loader directamente
  if (prefersReducedMotion) {
    loader.remove();
    return;
  }

  let p = 0;
  const interval = setInterval(() => {
    // Incremento aleatorio entre 6 y 20 — el porcentaje es decorativo
    p += Math.random() * 14 + 6;
    if (p >= 100) {
      p = 100;
      clearInterval(interval);
      // Hold 350ms al llegar a 100, luego slide-up de 1.1s
      setTimeout(() => {
        loader.style.transform = "translateY(-100%)";
        setTimeout(() => loader.remove(), 1200);
      }, 350);
    }
    const pInt = Math.floor(p);
    pctEl.textContent = pInt.toString().padStart(3, "0");
    barEl.style.width = `${pInt}%`;
  }, 90);
}

// ── 3. NAVBAR (sombra al scrollear) ───────────────────────────────────────
function initNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  const pill = nav.firstElementChild as HTMLElement | null;
  if (!pill) return;

  function onScroll() {
    if (window.scrollY > 40) {
      pill!.classList.add("shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]");
    } else {
      pill!.classList.remove("shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ── 4. PROJECT CARDS: tilt 3D + hover-to-play ─────────────────────────────
function initProjectCards() {
  const cards = document.querySelectorAll<HTMLAnchorElement>(".project-card");

  cards.forEach((card) => {
    const tilt = card.querySelector<HTMLElement>(".tilt-card");
    const video = card.querySelector<HTMLVideoElement>("video.play-video");
    if (!tilt) return;

    // Tilt 3D al mover el mouse (deshabilitado si prefiere reducir movimiento)
    if (!prefersReducedMotion) {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        // perspective fija + rotación inversa en X y proporcional en Y
        tilt.style.transform = `perspective(1200px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateZ(0)`;
      });
    }

    // Al entrar: reproduce video si existe
    card.addEventListener("mouseenter", () => {
      if (video) {
        video.play().catch(() => {
          /* el navegador puede bloquear autoplay; ignoramos silenciosamente */
        });
      }
    });

    // Al salir: pausa video, resetea tiempo y resetea tilt
    card.addEventListener("mouseleave", () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      tilt.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    });
  });
}

// ── 5. REVEALS controlados por IntersectionObserver ───────────────────────
function initReveals() {
  // Elementos que deben aparecer al entrar al viewport
  const elements = document.querySelectorAll<HTMLElement>(".reveal");

  // Algunos elementos (eyebrow del hero, bio, meta) deben animarse al cargar
  // la página sin esperar al viewport — los marcamos con [data-reveal-immediate]
  const immediate: HTMLElement[] = [];
  const viewport: HTMLElement[] = [];

  elements.forEach((el) => {
    if (el.hasAttribute("data-reveal-immediate")) {
      immediate.push(el);
    } else {
      viewport.push(el);
    }
  });

  // Los inmediatos: arrancan en el siguiente frame
  requestAnimationFrame(() => {
    immediate.forEach((el) => el.classList.add("in"));
  });

  // Los del viewport: usan IntersectionObserver con threshold 0.2
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  viewport.forEach((el) => io.observe(el));

  // ── 5b. Reveal especial para la línea horizontal del eyebrow del contacto
  // Crece de scaleX(0) a scaleX(1) cuando entra en viewport
  const lineGrows = document.querySelectorAll<HTMLElement>(".line-grow");
  const lineIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          lineIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  lineGrows.forEach((el) => lineIO.observe(el));
}

// ── 6. STAGGERED HEADLINES (letra por letra) ──────────────────────────────
function initStaggeredHeadlines() {
  const headlines = document.querySelectorAll<HTMLElement>(".stagger-headline");

  headlines.forEach((headline) => {
    const trigger = headline.getAttribute("data-trigger") || "mount";
    const letters = headline.querySelectorAll<HTMLElement>(".letter");

    // Función que activa la animación añadiendo .in a cada letra
    const playAnimation = () => {
      letters.forEach((letter) => letter.classList.add("in"));
    };

    if (trigger === "mount") {
      // Arranca en el siguiente frame para que se vea la transición
      requestAnimationFrame(() => playAnimation());
    } else {
      // trigger === "view": espera a que entre en viewport
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playAnimation();
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
      );
      io.observe(headline);
    }
  });
}

// ── 7. RELOJ EN VIVO DE MADRID (footer) ───────────────────────────────────
function initLiveClock() {
  const clockEl = document.getElementById("live-clock");
  if (!clockEl) return;

  const fmt = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Cordoba",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  function tick() {
    // ART = Argentina Time (UTC-3)
    clockEl!.textContent = `${fmt.format(new Date())} ART`;
  }
  tick();
  setInterval(tick, 1000);
}

// ── 8. PANEL FLOTANTE DE CONTACTO ─────────────────────────────────────────
function initFloatingContact() {
  const button = document.getElementById("floating-button");
  const panel = document.getElementById("floating-panel");
  const iconChat = document.getElementById("floating-icon-chat");
  const iconClose = document.getElementById("floating-icon-close");
  if (!button || !panel || !iconChat || !iconClose) return;

  let open = false;

  function setOpen(v: boolean) {
    open = v;
    button!.setAttribute("aria-expanded", v ? "true" : "false");
    if (v) {
      panel!.classList.remove("hidden");
      panel!.classList.add("flex");
      iconChat!.classList.add("hidden");
      iconClose!.classList.remove("hidden");
    } else {
      panel!.classList.add("hidden");
      panel!.classList.remove("flex");
      iconChat!.classList.remove("hidden");
      iconClose!.classList.add("hidden");
    }
  }

  button.addEventListener("click", () => setOpen(!open));

  // Cualquier link dentro del panel con data-close-panel cierra al hacer click
  panel.querySelectorAll("[data-close-panel]").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  // Cerrar con Escape cuando el panel está abierto
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) setOpen(false);
  });
}

// ── 9. FORMULARIO DE CONTACTO (Web3Forms) ─────────────────────────────────
// Submitea via fetch a https://api.web3forms.com/submit y muestra el estado
// inline sin recargar la página. El access_key sale del input hidden que
// rellena Astro desde INTEGRATIONS.web3formsKey en src/data/site.ts.
function initContactForm() {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  // Clases base del mensaje de estado (mismo formato que el placeholder)
  const baseClass =
    "font-mono text-[11px] tracking-[0.22em] uppercase min-h-[16px]";

  function setStatus(msg: string, tone: "info" | "ok" | "error") {
    const colorMap = {
      info: "text-slate-400",
      ok: "text-accent",
      error: "text-red-400",
    } as const;
    status!.textContent = msg;
    status!.className = `${baseClass} ${colorMap[tone]}`;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Validación nativa antes de mandar — el novalidate del form la desactiva
    // a nivel HTML para poder mostrar nuestro propio mensaje en estilo del sitio.
    if (!form.checkValidity()) {
      setStatus("Falta completar algún campo obligatorio.", "error");
      return;
    }

    setStatus("Enviando…", "info");

    const formData = new FormData(form);
    // Web3Forms acepta tanto FormData como JSON; usamos JSON porque es más
    // robusto a través de proxies y CDN.
    const payload: Record<string, FormDataEntryValue> = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("Mensaje enviado. Te respondo pronto.", "ok");
        form.reset();
      } else {
        // Web3Forms devuelve un mensaje específico cuando el access key es inválido
        const reason = data.message || "Algo falló al enviar.";
        setStatus(reason, "error");
      }
    } catch (err) {
      setStatus(
        "Sin conexión. Probá por WhatsApp o email directo.",
        "error",
      );
    }
  });
}

// ── 10. CALENDLY POPUP (carga lazy al hacer click) ────────────────────────
// El widget de Calendly pesa ~30KB. En vez de cargarlo siempre, lo cargamos
// la primera vez que el usuario hace click en "Agendar reunión". Una vez
// cargado, queda disponible para clicks subsiguientes sin re-fetch.
function initCalendly() {
  const button = document.getElementById("open-calendly");
  if (!button) return;
  const calendlyUrl = button.getAttribute("data-calendly-url");
  if (!calendlyUrl) return;

  // Estado: ¿ya cargamos el script de Calendly?
  let calendlyLoaded = false;
  let loadingPromise: Promise<void> | null = null;

  function loadCalendly(): Promise<void> {
    if (calendlyLoaded) return Promise.resolve();
    if (loadingPromise) return loadingPromise;

    loadingPromise = new Promise<void>((resolve, reject) => {
      // Inyectamos el CSS de Calendly
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);

      // Y el script
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        calendlyLoaded = true;
        resolve();
      };
      script.onerror = () => reject(new Error("No se pudo cargar Calendly"));
      document.body.appendChild(script);
    });

    return loadingPromise;
  }

  button.addEventListener("click", async () => {
    try {
      await loadCalendly();
      // @ts-ignore — Calendly se inyecta en window al cargar el script
      window.Calendly?.initPopupWidget({ url: calendlyUrl });
    } catch {
      // Si falla la carga, fallback a abrir Calendly en pestaña nueva
      window.open(calendlyUrl, "_blank", "noopener");
    }
  });
}

// ── INICIALIZACIÓN ────────────────────────────────────────────────────────
// Se ejecuta apenas el DOM está parseado (no esperamos a las imágenes)
function init() {
  initLoader();
  initCursor();
  initNav();
  initProjectCards();
  initReveals();
  initStaggeredHeadlines();
  initLiveClock();
  initFloatingContact();
  initContactForm();
  initCalendly();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
