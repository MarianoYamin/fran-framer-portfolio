/**
 * @archivo    site.ts
 * @modulo     Datos del sitio
 * @descripcion Contenido editable del portfolio: proyectos, servicios, clientes,
 *              perfil, estadísticas y datos de contacto.
 *              Modificá este archivo para actualizar el contenido del sitio.
 *              Esta estructura está pensada para conectarse a un mini panel de
 *              admin o CMS más adelante (Decap, Sanity, etc.).
 * @actualizado 2026-05-13
 */

// ── Tipos ─────────────────────────────────────────────────────────────────
// NOTA: Los proyectos ya NO viven acá. Se migraron a una Content Collection
// (src/content/projects/*.json) para que el panel Decap CMS pueda crearlos,
// editarlos y borrarlos. El schema está en src/content.config.ts.
// Acá solo queda PROJECT_CATEGORIES (la lista de categorías, más abajo).

export interface Service {
  /** Número en formato "01", "02"... */
  n: string;
  /** Nombre del servicio */
  title: string;
  /** Descripción corta del servicio (1-2 oraciones) */
  body: string;
  /** Lista de bullets en mono mayúsculas (ej: equipo, técnicas, herramientas) */
  bullets: string[];
}

export interface SiteContact {
  email: string;
  phone: string;
  /** URL completa de WhatsApp tipo https://wa.me/34600000000 */
  whatsapp: string;
  studio: {
    address1: string;
    address2: string;
    note: string;
  };
  social: { label: string; href: string }[];
  /** Coordenadas del hero (formato libre, ej: "N 41.3851° &nbsp; E 2.1734°") */
  coords: string;
  /** Subtítulo del header en hero (ej: "Barcelona — En localización") */
  location: string;
}

// ── Categorías de proyectos ───────────────────────────────────────────────
// Definen el orden y los grupos en la página /trabajos. El campo `category`
// de cada proyecto debe coincidir con uno de estos valores. Para agregar o
// quitar categorías, editá esta lista (y asigná la categoría correcta a
// cada proyecto arriba).
export const PROJECT_CATEGORIES: string[] = [
  "Cortometraje",
  "Videoclip",
  "Video para YouTube",
  "Pieza de marca",
  "Podcast",
  "Cobertura de evento deportivo",
];

// ── Términos cinematográficos para el marquee ─────────────────────────────
// Palabras en español relacionadas al oficio de Fran (cine, fotografía,
// edición). Funcionan como banda visual de identidad — se desplazan en serif
// italic verde. Si más adelante hay marcas reales con las que trabajó,
// reemplazar por nombres de marca.
export const CLIENTS: string[] = [
  "Filmmaking",
  "Dirección",
  "Animación",
  "Montaje",
  "Grabación",
  "Sonido",
  "Composición",
  "Visual",
  "Creativo",
];

// ── Servicios ─────────────────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    n: "01",
    title: "Creación",
    body: "Generación de ideas para videos de redes sociales y planeación óptima de rodaje.",
    bullets: ["Moodboard", "Guiones", "Storyboards"],
  },
  {
    n: "02",
    title: "Dirección y Grabación",
    body: "Coordinación en set y ejecución de planos cuidando la luz y el encuadre. Todo comunica, desde lo sutil hasta lo más evidente.",
    bullets: [
      "Criterio",
      "Equipo Profesional",
      "4K 120fps",
      "S-Log3",
      "Sonido Nítido",
    ],
  },
  {
    n: "03",
    title: "Edición",
    body: "Montaje, diseño sonoro y color grading. Un trabajo fino con el objetivo de potenciar el mensaje de la pieza.",
    bullets: [
      "Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Photoshop",
      "Illustrator",
    ],
  },
  {
    n: "04",
    title: "Diseño y Animación",
    body: "Diseño de composiciones visuales atractivas, potenciadas por animaciones suaves y profesionales, listas para brillar en cualquier pantalla.",
    bullets: [
      "Illustrator",
      "Photoshop",
      "After Effects",
      "DaVinci Resolve",
    ],
  },
];

// ── Estadísticas de la sección "Sobre mí" ─────────────────────────────────
export const STATS: { value: string; label: string }[] = [
  { value: "03+", label: "Años" },
  { value: "04", label: "Proyectos" },
  { value: "100+", label: "Reels" },
  { value: "02", label: "Notas" },
];

// ── Datos de contacto (editá estos valores con los reales de Fran) ────────
export const CONTACT: SiteContact = {
  email: "franframer.creative@gmail.com",
  phone: "+54 9 388 618 2588",
  whatsapp: "https://wa.me/5493886182588",
  studio: {
    address1: "Córdoba Capital",
    address2: "5000 Córdoba, Argentina",
    note: "Solo con cita previa",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
  // Coordenadas de Córdoba, Argentina (latitud sur · longitud oeste)
  coords: "S 31.4135°&nbsp;&nbsp;O 64.1810°",
  location: "Córdoba, AR",
};

// ── Integraciones de terceros (formulario + agenda) ──────────────────────
// IMPORTANTE: para que el formulario y la agenda funcionen en producción,
// hay que dar de alta las dos cuentas (las dos gratis) y reemplazar los
// placeholders abajo.
//
// 1. Web3Forms (envía el formulario al mail de Fran sin necesidad de backend):
//    - Entrá a https://web3forms.com/
//    - Ingresá el email donde querés recibir las consultas
//    - Te llega un access key (formato UUID) — pegalo abajo
//    - Servicio gratis, sin límite de envíos mensuales
//
// 2. Cal.com (agenda inline embebida):
//    - Creá cuenta gratis en https://cal.com/
//    - Configurá un tipo de evento (sugerencia: "Consulta — 30 minutos")
//    - Copiá tu link público (formato https://cal.com/usuario/evento)
//      o sólo la parte "usuario/evento" — el código acepta ambas formas
//    - Pegalo abajo en calcomLink
//
//    Por qué Cal.com y no Calendly:
//    - Cal.com gratis = sin branding "Powered by". Calendly gratis lo pone.
//    - Cal.com es open source, eventos ilimitados en el plan free.
//    - Mejor personalización visual del widget embebido.
//
// Si los placeholders quedan sin reemplazar, el sitio se ve correcto pero
// el formulario tira error al enviar y Cal.com muestra "perfil no encontrado".
export const INTEGRATIONS = {
  /** Access key de Web3Forms — registrate gratis en https://web3forms.com/ */
  web3formsKey: "REEMPLAZAR_CON_TU_ACCESS_KEY_DE_WEB3FORMS",

  /** Link de Cal.com — acepta URL completa o sólo "usuario/evento".
   *  Ej: "https://cal.com/franframer/30min" o "franframer/30min". */
  calcomLink: "franframer/reunion-30-minutos",
};

// ── Meta del sitio (para SEO) ─────────────────────────────────────────────
export const SITE_META = {
  name: "Fran Framer",
  /** Aparece en <title> y como brand */
  brand: "Fran / Framer",
  /** Slogan principal para meta description (lo que se ve al compartir el link) */
  description:
    "Fran — Filmmaker, editor de video y diseñador digital en Córdoba, Argentina. Creo piezas visuales con eficacia: dirección, grabación, edición y animación.",
  /** Frase del hero (sin animar, para SEO) */
  heroTagline: "El encuadre exacto donde vive tu historia.",
  /** Idioma principal del sitio (ISO 639-1) */
  lang: "es",
  /** URL canónica de producción.
   *  Cuando Fran tenga un dominio propio, cambiar acá (y en astro.config.mjs
   *  y public/robots.txt). Por ahora apunta al deploy real de Vercel. */
  url: "https://fran-framer-portfolio.vercel.app",
  /** Imagen para Open Graph y Twitter cards (relativa a /public) */
  ogImage: "/og-image.jpg",
  /** Twitter handle, sin @ — opcional */
  twitter: "",
};
