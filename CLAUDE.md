# Fran Framer — Portfolio Cineasta

```yaml
agente: "paginas-web"
```

## Contexto del proyecto

Sitio web one-pager para **Fran**, cineasta y director de fotografía con base en
Barcelona. Es una landing cinematográfica oscura en español con seis secciones:
Hero, marquee de clientes, grid de proyectos (the reel), servicios, sobre mí y
contacto.

El diseño fue creado por el usuario en **Claude Design** y exportado como
prototipo HTML. Esta implementación es la versión de producción.

## Stack

- **Framework:** Astro 5 (static site generator)
- **Estilos:** Tailwind CSS v4 (con `@theme` para tokens)
- **TypeScript:** modo estricto
- **Fuentes:** Playfair Display (serif), Inter (sans), JetBrains Mono (mono) — Google Fonts
- **Hosting recomendado:** Vercel o Netlify (deploy de carpeta `dist/`)

## Cómo correr el proyecto

```powershell
npm install      # solo la primera vez
npm run dev      # dev server en http://localhost:4321
npm run build    # genera dist/ con el sitio estático
npm run preview  # sirve el build local para verificación
```

## Cosas que el usuario va a querer editar

| Quiero cambiar... | Editá este archivo |
|---|---|
| Datos de proyectos (título, cliente, año, video, imagen) | `src/data/site.ts` → `PROJECTS` |
| Lista de clientes del marquee | `src/data/site.ts` → `CLIENTS` |
| Servicios | `src/data/site.ts` → `SERVICES` |
| Estadísticas del about | `src/data/site.ts` → `STATS` |
| Email, teléfono, WhatsApp, dirección | `src/data/site.ts` → `CONTACT` |
| Meta del sitio (título, OG image, URL) | `src/data/site.ts` → `SITE_META` |
| Texto del hero ("Planos que contienen su aliento.") | `src/components/Hero.astro` |
| Textos del about (bio, manifiesto) | `src/components/About.astro` |
| Bio breve bajo el hero | `src/components/Hero.astro` |
| Animaciones, colores, fuentes | `src/styles/global.css` |

## Mini panel de admin (futuro)

La estructura de datos en `src/data/site.ts` está pensada para conectarse a un
CMS o panel de admin más adelante. Opciones recomendadas cuando el usuario lo pida:

- **Decap CMS** (gratis, basado en Git, ideal para portfolios)
- **Sanity** (más potente, plan gratuito generoso)
- **Astro DB + endpoint SSR** (admin custom autenticado)

## Notas para el agente

- Los videos e imágenes son **placeholders** de Unsplash/Pexels. Fran tiene que
  entregar los assets reales para reemplazarlos.
- El cursor personalizado se desactiva automáticamente en dispositivos touch.
- Se respeta `prefers-reduced-motion` (no hay animaciones para usuarios que las
  quieran reducir).
- El loader es decorativo (porcentaje aleatorio). Si se quiere atar a la carga
  real de assets, ver función `initLoader()` en `src/scripts/main.ts`.
