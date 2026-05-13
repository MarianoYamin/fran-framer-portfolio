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
export interface Project {
  /** ID en formato "01", "02"... (también define el orden) */
  id: string;
  /** Título del proyecto */
  title: string;
  /** Cliente o marca para la que se hizo */
  client: string;
  /** Año de producción */
  year: string;
  /** Rol de Fran en el proyecto (ej: "Dirección · DP") */
  role: string;
  /** Etiquetas que se muestran como píldoras (max 2 recomendado) */
  tags: string[];
  /** Clases tailwind para definir cuántas columnas/filas ocupa en el grid */
  span: string;
  /** Aspect ratio del card (clase tailwind, ej: "aspect-[16/9]") */
  ratio: string;
  /** URL de la imagen poster (estática) */
  img: string;
  /** URL del video que se reproduce en hover (MP4, muted, loop) */
  video: string;
  /** URL externa del proyecto completo (Vimeo, YouTube, página propia) — opcional */
  href?: string;
}

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

// ── Proyectos ─────────────────────────────────────────────────────────────
// ⚠️ Reemplazar imágenes y videos por los assets reales de Fran.
//    Convención: poner videos optimizados en /public/projects/[id].mp4
//    y posters en /public/projects/[id].jpg
export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Luz que Queda",
    client: "Aperture Films",
    year: "2025",
    role: "Dirección · DP",
    tags: ["Cortometraje", "35mm"],
    span: "lg:col-span-7 lg:row-span-2",
    ratio: "aspect-[16/9]",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/2022395/2022395-uhd_2560_1440_30fps.mp4",
  },
  {
    id: "02",
    title: "Flor Estática",
    client: "Maison Noir",
    year: "2024",
    role: "Cinematografía",
    tags: ["Fashion Film"],
    span: "lg:col-span-5 lg:row-span-2",
    ratio: "aspect-[4/5]",
    img: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=1200&q=80&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2732_1440_25fps.mp4",
  },
  {
    id: "03",
    title: "Rumbo Norte",
    client: "Ostgard Co.",
    year: "2024",
    role: "Dirección",
    tags: ["Documental"],
    span: "lg:col-span-4",
    ratio: "aspect-[16/10]",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=80&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/3015527/3015527-uhd_2560_1440_24fps.mp4",
  },
  {
    id: "04",
    title: "Aguantar el Pulso",
    client: "Atlas Athletic",
    year: "2024",
    role: "Dirección · Edición",
    tags: ["Brand Film"],
    span: "lg:col-span-4",
    ratio: "aspect-[16/10]",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&q=80&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/4754030/4754030-uhd_2560_1440_25fps.mp4",
  },
  {
    id: "05",
    title: "Horas Quietas",
    client: "Autoeditado",
    year: "2023",
    role: "Dirección · DP · Edición",
    tags: ["Videoclip"],
    span: "lg:col-span-4",
    ratio: "aspect-[16/10]",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&q=80&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4",
  },
  {
    id: "06",
    title: "Mar de Cemento",
    client: "Hertz / Studio One",
    year: "2023",
    role: "Cinematografía",
    tags: ["Publicidad"],
    span: "lg:col-span-7",
    ratio: "aspect-[21/9]",
    img: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1800&q=80&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/2103099/2103099-uhd_2560_1440_30fps.mp4",
  },
  {
    id: "07",
    title: "Poder Suave",
    client: "Velour",
    year: "2023",
    role: "Dirección",
    tags: ["Fashion Film"],
    span: "lg:col-span-5",
    ratio: "aspect-[3/4]",
    img: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1200&q=80&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/5532765/5532765-uhd_2560_1440_25fps.mp4",
  },
];

// ── Lista de clientes para el marquee ─────────────────────────────────────
export const CLIENTS: string[] = [
  "Aperture",
  "Maison Noir",
  "Atlas Athletic",
  "Ostgard Co.",
  "Velour",
  "Hertz",
  "Studio One",
  "Polaris",
  "Norte & Co.",
  "Media Luz",
  "Field Recordings",
  "Echoform",
];

// ── Servicios ─────────────────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    n: "01",
    title: "Dirección",
    body: "Del tratamiento al montaje final — construyendo mundos con intención. Cortometrajes, documental y piezas de marca.",
    bullets: [
      "Concepto y Tratamiento",
      "Casting y Localización",
      "Dirección en Set",
    ],
  },
  {
    n: "02",
    title: "Cinematografía",
    body: "Pintar con luz. Anamórfico, gran formato, 16/35mm. Mano calmada y mirada paciente.",
    bullets: [
      "ARRI · RED · Sony",
      "Anamórfico / Esférico",
      "Diseño de Iluminación",
    ],
  },
  {
    n: "03",
    title: "Postproducción",
    body: "Edición, color y mezcla de sonido bajo un mismo techo. Ritmo medido, negros profundos, piel honesta.",
    bullets: [
      "Edición · DaVinci Resolve",
      "Corrección de Color",
      "Diseño Sonoro / Mezcla",
    ],
  },
];

// ── Estadísticas de la sección "Sobre mí" ─────────────────────────────────
export const STATS: { value: string; label: string }[] = [
  { value: "07+", label: "Años" },
  { value: "62", label: "Películas" },
  { value: "18", label: "Festivales" },
  { value: "04", label: "Premios" },
];

// ── Datos de contacto (editá estos valores con los reales de Fran) ────────
export const CONTACT: SiteContact = {
  email: "hello@fran.film",
  phone: "+34 600 000 000",
  whatsapp: "https://wa.me/34600000000",
  studio: {
    address1: "Carrer de la Llum, 12",
    address2: "08003 Barcelona, ES",
    note: "Solo con cita previa",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Vimeo", href: "https://vimeo.com/" },
    { label: "Letterboxd", href: "https://letterboxd.com/" },
    { label: "Are.na", href: "https://are.na/" },
  ],
  coords: "N 41.3851°&nbsp;&nbsp;E 2.1734°",
  location: "Barcelona — En localización",
};

// ── Meta del sitio (para SEO) ─────────────────────────────────────────────
export const SITE_META = {
  name: "Fran Framer",
  /** Aparece en <title> y como brand */
  brand: "Fran / Framer",
  /** Slogan principal para meta description */
  description:
    "Cineasta y director de fotografía con base en Barcelona. Dirección, cinematografía y postproducción para cortometrajes, marcas y documentales.",
  /** Frase del hero (sin animar, para SEO) */
  heroTagline: "Planos que contienen su aliento.",
  /** Idioma principal del sitio (ISO 639-1) */
  lang: "es",
  /** URL canónica de producción */
  url: "https://fran-framer.com",
  /** Imagen para Open Graph y Twitter cards (relativa a /public) */
  ogImage: "/og-image.jpg",
  /** Twitter handle, sin @ — opcional */
  twitter: "",
};
