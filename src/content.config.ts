/**
 * @archivo    content.config.ts
 * @modulo     Astro Content Collections
 * @descripcion Define la colección "projects" que alimenta el grid de la
 *              home y la página /trabajos. Cada proyecto es un archivo JSON
 *              en src/content/projects/ — ese formato es el que el panel
 *              Decap CMS puede crear, editar y borrar.
 *
 *              Los campos de layout (span/ratio) NO viven acá: son
 *              uniformes y se aplican en ProjectCard. Fran sólo edita
 *              contenido real (título, categoría, video, etc.).
 * @actualizado 2026-05-14
 */
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  // Carga todos los .json de src/content/projects/
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    /** Título del proyecto */
    title: z.string(),
    /** Cliente o marca */
    client: z.string(),
    /** Año */
    year: z.string(),
    /** Rol de Fran (ej: "Dirección · Edición") */
    role: z.string(),
    /** Etiquetas/píldoras (1-2 recomendado) */
    tags: z.array(z.string()).default([]),
    /** Categoría — debe estar en PROJECT_CATEGORIES (site.ts) */
    category: z.string(),
    /** Si aparece también en el grid destacado de la home */
    featured: z.boolean().default(false),
    /** Orden de aparición (menor = primero). Empate → por título */
    order: z.number().default(0),
    /** Imagen poster (path subido por Decap, ej: /uploads/foo.jpg, o URL) */
    poster: z.string(),
    /** URL del video que se reproduce en hover (MP4 directo o URL) */
    video: z.string(),
    /** Link externo al proyecto completo (Vimeo/YouTube) — opcional */
    href: z.string().optional(),
  }),
});

export const collections = { projects };
