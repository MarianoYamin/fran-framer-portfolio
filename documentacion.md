# Documentación — Fran Framer (Portfolio Cineasta)

> Para nuevos integrantes: este archivo es la fuente de verdad del proyecto.
> Leelo completo antes de tocar una línea de código.

**Última actualización:** 2026-05-13
**Versión:** 0.1.0
**Agente:** WebAgent v1.0

---

## 1. ¿Qué es este sitio?

Portfolio one-page de **Fran**, cineasta y director de fotografía con base en
Barcelona. El sitio funciona como tarjeta de presentación profesional: muestra
una selección de trabajos audiovisuales, los servicios que ofrece y un canal
de contacto directo.

El diseño fue creado por el cliente en **Claude Design** (Anthropic), exportado
como prototipo HTML, y portado a Astro para la versión de producción.

## 2. Objetivo y público objetivo

- **Objetivo principal:** que productoras, agencias y marcas que buscan un
  cineasta con sensibilidad cinematográfica puedan ver el trabajo de Fran y
  contactarlo en menos de 30 segundos.
- **Público objetivo:** directores creativos, productores ejecutivos, agencias
  de publicidad, marcas con campañas editoriales, festivales y curadores.

## 3. Stack tecnológico y justificación

| Capa | Tecnología | Por qué |
|---|---|---|
| Framework | Astro 5 | Genera HTML estático puro → SEO máximo + carga instantánea |
| Estilos | Tailwind CSS v4 | Velocidad de desarrollo + CSS final mínimo (purge automático) |
| Tipografía | Google Fonts (Playfair, Inter, JetBrains) | Probadas, soporte completo, gratis |
| Lenguaje JS | TypeScript estricto | Detección de errores antes del build |
| Hosting | Vercel / Netlify / Cloudflare Pages | Deploy gratuito, CDN global, HTTPS automático |
| Analytics | (pendiente) | Recomendado: Plausible o GA4 |

**Por qué Astro y no Next.js, WordPress o HTML puro:**

- *Astro vs Next.js:* Astro produce HTML estático por defecto, sin necesidad
  de hidratación React. El portfolio no necesita interactividad de SPA — esto
  da carga mucho más rápida y mejor SEO.
- *Astro vs WordPress:* Sin servidor PHP, sin DB, sin plugins que mantener.
  El sitio es un puñado de archivos estáticos en un CDN. Casi indestructible.
- *Astro vs HTML puro:* Componentes reutilizables, tipado en datos, build
  optimizado, y permite agregar un mini panel de admin en el futuro sin
  reescribir todo.

## 4. Estructura de carpetas

```
Fran-Framer-Filmmaker/
├── public/
│   └── robots.txt              # SEO básico
├── src/
│   ├── components/             # Componentes reutilizables (.astro)
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   ├── Cursor.astro
│   │   ├── FloatingContact.astro
│   │   ├── Hero.astro
│   │   ├── Loader.astro
│   │   ├── Marquee.astro
│   │   ├── Nav.astro
│   │   ├── ProjectCard.astro
│   │   ├── Services.astro
│   │   ├── StaggeredHeadline.astro
│   │   └── Work.astro
│   ├── data/
│   │   └── site.ts             # ⭐ Todo el contenido editable
│   ├── layouts/
│   │   └── Layout.astro        # Head con SEO + meta + JSON-LD
│   ├── pages/
│   │   └── index.astro         # Página principal (única ruta)
│   ├── scripts/
│   │   └── main.ts             # ⭐ Lógica de interacciones cliente
│   └── styles/
│       └── global.css          # Tokens de diseño + utilidades
├── astro.config.mjs            # Configuración de Astro
├── package.json
├── tsconfig.json
├── .gitignore
├── CLAUDE.md                   # Instrucciones para Claude Code (agente)
└── documentacion.md            # Este archivo
```

## 5. Páginas y rutas

- `/` — única ruta (single-page application). Todas las secciones se acceden
  por scroll o anclas (#work, #services, #about, #contact).
- `/sitemap-index.xml` — generado automáticamente en build.
- `/robots.txt` — permite indexación completa.

## 6. Componentes principales

| Componente | Responsabilidad |
|---|---|
| `Layout.astro` | Head HTML completo: SEO, Open Graph, Twitter, JSON-LD schema.org/Person, fuentes |
| `Cursor.astro` | Punto + anillo del cursor personalizado (la lógica vive en main.ts) |
| `Loader.astro` | Pantalla de entrada con porcentaje y barra de progreso |
| `Nav.astro` | Navbar fija con píldora glass y 4 enlaces ancla |
| `Hero.astro` | Sección de entrada con video de fondo y H1 letter-by-letter |
| `Marquee.astro` | Banda infinita de clientes en serif italic |
| `Work.astro` | Grid bento de 7 proyectos |
| `ProjectCard.astro` | Card individual con tilt 3D y hover-to-play |
| `Services.astro` | Lista de 3 oficios en formato editorial |
| `About.astro` | Portrait + manifiesto + estadísticas + bio |
| `Contact.astro` | Eyebrow, H2 gigante, 3 columnas de contacto, footer con reloj |
| `FloatingContact.astro` | Botón circular abajo a la derecha con panel desplegable |
| `StaggeredHeadline.astro` | Texto con animación letra-por-letra (cascada) |

## 7. SEO — decisiones y configuración

- **Meta tags:** Open Graph (Facebook/LinkedIn/WhatsApp), Twitter Cards, canonical,
  description única por página.
- **JSON-LD:** schema.org/Person con datos de contacto, redes sociales y
  ubicación. Ayuda a Google a entender que es el sitio personal de Fran.
- **Sitemap:** generado automáticamente por `@astrojs/sitemap` al hacer build.
- **Robots:** permite indexación completa, apunta al sitemap.
- **Performance:** Astro genera HTML estático puro + un único script JS de
  ~5KB. Las fuentes se cargan con preconnect. Las imágenes con loading="lazy".
- **Pendiente para producción:**
  - Reemplazar `og-image.jpg` placeholder por una imagen real 1200x630px
  - Subir favicon SVG personalizado a `/public/favicon.svg`
  - Confirmar URL final en `astro.config.mjs` y `src/data/site.ts`

## 8. Analytics y tracking

- **Pendiente.** Recomendado:
  - **Plausible** (recomendado por privacidad y simplicidad)
  - **GA4** (gratis pero más invasivo)

Se agregarán en el `<head>` de `Layout.astro` cuando el cliente decida.

## 9. Cómo correr el proyecto

### Primera vez

```powershell
npm install
```

### Desarrollo

```powershell
npm run dev
```

El sitio queda corriendo en http://localhost:4321 con hot-reload.

### Build de producción

```powershell
npm run build
```

Genera la carpeta `dist/` con el sitio estático listo para subir a cualquier CDN.

### Vista previa del build

```powershell
npm run preview
```

## 10. Deploy y hosting

**Recomendado: Vercel** (más simple, deploy automático desde GitHub):

1. Subir el repo a GitHub
2. Conectar el repo en vercel.com → Import Project
3. Vercel detecta Astro automáticamente
4. Cada push a `main` deploya en producción
5. Configurar dominio personalizado en Vercel → Settings → Domains

**Alternativa: Netlify** (mismo flujo) o **Cloudflare Pages** (más rápido en
algunas regiones).

## 11. Mantenimiento (guía para el cliente / Fran)

Casi todo el contenido se edita en un solo archivo: **`src/data/site.ts`**.

| Para cambiar... | Buscá en `src/data/site.ts` |
|---|---|
| Proyectos del reel | `PROJECTS` |
| Clientes del marquee | `CLIENTS` |
| Servicios | `SERVICES` |
| Estadísticas (años, premios) | `STATS` |
| Email, teléfono, WhatsApp | `CONTACT` |
| Dirección del estudio | `CONTACT.studio` |
| Redes sociales | `CONTACT.social` |
| Meta tags / SEO | `SITE_META` |

**Para reemplazar un video o imagen:**
1. Subir el archivo a `public/projects/01.mp4` (o similar)
2. En `PROJECTS`, cambiar el `img` y `video` por `/projects/01.mp4`

**Para cambiar el texto del hero:**
- Buscar `src/components/Hero.astro` y editar las líneas con "Planos que",
  "contienen su" y "aliento."

## 12. Decisiones de diseño y copy

- **Tono editorial:** español formal pero cálido, sin tecnicismos. Voz
  cinematográfica, contención narrativa, oficio sobre exhibicionismo.
- **Color base:** negro carbón (#0A0A0A) — evoca sala de cine.
- **Tipografía:** Playfair Display (serif editorial) + Inter (UI) + JetBrains
  Mono (meta data). Tres familias = tres jerarquías claras.
- **Animaciones:** todas son sutiles y cinemáticas. Easing
  `cubic-bezier(.2,.7,.2,1)` o `cubic-bezier(.77,0,.18,1)` — nunca lineal,
  nunca bouncy.
- **Sin border-radius en las cards de proyecto:** los bordes cuadrados evocan
  un marco de cine.
- **Cursor personalizado:** punto + anillo con label dinámico (VIEW, PLAY).
  Solo en desktop con mouse — en touch se restaura el nativo.

## 13. Errores frecuentes y soluciones

**El cursor personalizado no aparece en mobile:**
- Es intencional. Los dispositivos touch (`pointer: coarse`) restauran el
  cursor nativo automáticamente.

**Los videos no se reproducen al hacer hover:**
- Algunos navegadores bloquean autoplay si el sitio no es HTTPS. En producción
  con HTTPS funciona. En `localhost` también.

**El loader aparece todas las veces:**
- Es decorativo. Si querés desactivarlo permanentemente, borrar `<Loader />`
  de `src/pages/index.astro`.

**Los proyectos están en orden incorrecto:**
- El orden lo define el array `PROJECTS` en `src/data/site.ts`. Cambiá el orden
  de los objetos en el array para reordenarlos en la página.

---

## Setup de integraciones del formulario y la agenda

El formulario y el botón "Agendar reunión" necesitan dos cuentas externas
(ambas gratis) para funcionar en producción. Mientras no se configuren, el
sitio se ve perfecto pero el formulario tira error al enviar y Calendly
muestra un mensaje propio.

### 1. Web3Forms (formulario → email de Fran)

1. Entrar a https://web3forms.com/
2. Ingresar el email donde Fran quiere recibir las consultas
3. Llega un email con un **Access Key** (formato UUID, ej:
   `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
4. Abrir `src/data/site.ts` y reemplazar el placeholder de
   `INTEGRATIONS.web3formsKey` por la key real
5. Pushear el cambio → Vercel deploya solo → formulario funcionando

**Por qué Web3Forms y no otra cosa:** gratis sin límite mensual, no requiere
backend, soporta envío AJAX (no recarga la página), antispam con honeypot
incluido, los datos solo pasan por su servidor antes de llegar al mail.

### 2. Cal.com (agenda inline)

Elegimos Cal.com sobre Calendly porque:
- Plan gratis sin branding "Powered by..." (Calendly lo pone)
- Open source, eventos ilimitados en plan free
- Mejor personalización visual del widget embebido

Pasos:

1. Crear cuenta gratis en https://cal.com/ con el mismo mail de Fran
2. Configurar un tipo de evento (sugerencia: "Consulta — 30 minutos",
   recurrente, con bloques horarios disponibles)
3. Copiar el link público del evento (formato `https://cal.com/usuario/evento`)
4. Abrir `src/data/site.ts` y pegarlo en `INTEGRATIONS.calcomLink`.
   El código acepta tanto la URL completa como sólo `usuario/evento`.
5. Pushear → Vercel deploya → el calendario aparece **embebido inline**
   en la sección de contacto, con tema oscuro y el verde de marca aplicado
   como brand color via `Cal("ui", { cssVarsPerTheme: ... })`.

El widget se carga **lazy** vía IntersectionObserver: el loader de Cal.com
sólo inyecta su script de embed cuando el visitante se acerca al calendario
al scrollear (rootMargin 200px), sin afectar el initial paint.

**Si más adelante querés cambiar Cal.com por otro servicio** (Calendly,
TidyCal, SavvyCal), reemplazar la función `initCalcomInline` en
`src/scripts/main.ts` por la API del servicio nuevo. El div en
`ContactForm.astro` puede quedar igual (sólo cambia el id si hace falta).

---

## Pendientes a resolver con el cliente

1. **Assets reales:** Fran tiene que entregar:
   - 1 video para el hero (paisaje urbano contemplativo, ~10-20s, < 5MB)
   - 7 videos de proyecto (uno por cada entry en `PROJECTS`)
   - 7 imágenes poster (mismo aspect ratio que cada video)
   - 1 portrait personal (4:5, blanco y negro o se aplica `grayscale`)
   - 1 OG image (1200x630px, idealmente con la "F" del logo y un still del reel)

2. **Datos reales:** reemplazar en `src/data/site.ts`:
   - Lista completa de proyectos
   - Lista real de clientes
   - Email, teléfono, WhatsApp, dirección
   - URLs de redes sociales
   - Coordenadas si la base no es Barcelona

3. **Dominio:** confirmar el dominio final para actualizar `SITE_META.url` y
   `astro.config.mjs`.

4. **Mini panel de admin:** decidir si se quiere implementar después del MVP.
   Opciones evaluadas: Decap CMS (recomendado), Sanity, Astro DB custom.

---

## Changelog

### 2026-05-13 — Inicialización del proyecto

- Proyecto creado con Astro 5 + Tailwind CSS v4 + TypeScript estricto
- Portado el prototipo HTML de Claude Design a componentes Astro
- Implementadas todas las interacciones cliente (cursor, tilt, hover-play,
  reveals, marquee, reloj en vivo, panel flotante) en vanilla TS
- Configurado SEO completo: meta tags, Open Graph, Twitter Cards, JSON-LD
  schema.org/Person, sitemap automático, robots.txt
- Estructura de datos tipada en `src/data/site.ts` lista para conectar a un
  CMS o mini panel de admin en el futuro
- `documentacion.md` generado automáticamente con WebAgent v1.0
