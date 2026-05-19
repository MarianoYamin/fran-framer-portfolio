# 🎬 Manual de uso — Web de Fran Framer

> Guía simple para Fran. No necesitás saber nada de programación.
> Si algo no funciona o tenés una duda, hablale a Mariano.

**Última actualización:** 18/05/2026

---

## 📑 Índice

1. [Links importantes](#1-links-importantes)
2. [Cómo entrar al panel de administración](#2-cómo-entrar-al-panel-de-administración)
3. [Cómo funciona la web (lo básico)](#3-cómo-funciona-la-web-lo-básico)
4. [Agregar un proyecto nuevo](#4-agregar-un-proyecto-nuevo)
5. [Editar un proyecto existente](#5-editar-un-proyecto-existente)
6. [Borrar un proyecto](#6-borrar-un-proyecto)
7. [El interruptor "Destacado" (home vs archivo)](#7-el-interruptor-destacado)
8. [Sobre las imágenes y los videos](#8-sobre-las-imágenes-y-los-videos)
9. [El formulario de contacto y el calendario](#9-el-formulario-de-contacto-y-el-calendario)
10. [Qué SÍ podés cambiar y qué NO desde el panel](#10-qué-sí-y-qué-no)
11. [Si algo sale mal](#11-si-algo-sale-mal)

---

## 1. Links importantes

| Qué | Link |
|---|---|
| 🌐 **Tu web (lo que ve el público)** | https://fran-framer-portfolio.vercel.app |
| 📂 **Página de todos tus trabajos** | https://fran-framer-portfolio.vercel.app/trabajos |
| 🔐 **Panel de administración (para vos)** | https://fran-framer-portfolio.vercel.app/admin |

Guardá estos links. El **/admin** es tu lugar de trabajo: desde ahí cargás,
editás y borrás proyectos.

---

## 2. Cómo entrar al panel de administración

La **primera vez**:

1. Te va a llegar un mail de **GitHub** (asunto tipo *"Mariano invited you
   to collaborate"*). Abrilo y click en **"Accept invitation"**.
   (Si no lo ves, miralo en https://github.com/notifications)
2. Andá a 👉 **https://fran-framer-portfolio.vercel.app/admin**
3. Click en **"Login with GitHub"**
4. Autorizá la app **"Fran Framer CMS"** (botón verde "Authorize")
5. Listo, entrás al panel

De ahí en más, cada vez que quieras entrar: vas a `/admin` y ya estás
adentro (o con un click en "Login with GitHub").

> 💡 Si te aparece un error la primera vez, apretá **Ctrl + Shift + R**
> (refresca la página ignorando lo guardado) y reintentá.

---

## 3. Cómo funciona la web (lo básico)

Tu web tiene **una sola lista de proyectos**. Esa lista alimenta dos lugares:

- **La home** (pantalla principal) → muestra solo los proyectos que marcás
  como **"Destacado"**.
- **La página /trabajos** → muestra **TODOS** los proyectos, agrupados por
  categoría (Cortometraje, Videoclip, etc.).

Cuando guardás un cambio en el panel, **la web se actualiza sola en
aproximadamente 30 segundos**. No tenés que hacer nada más. Refrescá la
página después de medio minuto y vas a ver el cambio.

---

## 4. Agregar un proyecto nuevo

1. Entrá al panel (`/admin`)
2. En la colección **"Proyectos"**, click en **"New Proyecto"** (arriba a
   la derecha)
3. Completá los campos:

| Campo | Qué poner |
|---|---|
| **Título** | El nombre del proyecto |
| **Cliente / Marca** | Para quién fue. Si es personal: tu nombre o "Autoeditado" |
| **Año** | El año, 4 dígitos (ej: 2026) |
| **Tu rol** | Ej: `Dirección · Edición` (el · se hace con Alt+0183 o copialo de otro) |
| **Categoría** | Elegí del menú: Cortometraje, Videoclip, Video para YouTube, Pieza de marca, Podcast, o Cobertura de evento deportivo |
| **Etiquetas** | 1 o 2 palabras cortas que se muestran como “píldoras” (ej: 4K, Documental). Click en "Add etiquetas" para agregar cada una |
| **Destacado en la home** | Activalo si querés que además aparezca en la pantalla principal (ver sección 7) |
| **Orden** | Un número. Menor = aparece primero. Si no sabés, dejá 0 |
| **Imagen (poster)** | Subí la foto del proyecto (ver sección 8) |
| **Video (link)** | El link del video que se reproduce al pasar el mouse (ver sección 8) |
| **Link al proyecto completo** | Opcional. A dónde lleva al hacer click en la card (tu video en YouTube/Vimeo) |

4. Cuando terminaste, click en **"Publish"** (arriba) → **"Publish now"**
5. Esperá ~30 segundos y revisá la web

---

## 5. Editar un proyecto existente

1. Entrá al panel (`/admin`)
2. En **"Proyectos"** vas a ver la lista de todos
3. Click en el que querés cambiar
4. Modificá lo que necesites
5. **"Publish"** → **"Publish now"**
6. ~30 segundos y está actualizado en la web

---

## 6. Borrar un proyecto

1. Entrá al proyecto que querés eliminar (igual que para editar)
2. Arriba de todo, click en el menú **"⋯"** (tres puntitos) o el botón
   **"Delete entry"**
3. Confirmá
4. ~30 segundos y desaparece de la web

> 🛟 **Tranquilo:** aunque borres algo, queda guardado en el historial.
> Si te arrepentís o borraste el equivocado, avisale a Mariano que lo
> puede recuperar.

---

## 7. El interruptor "Destacado"

Este es el concepto más importante. Cada proyecto tiene un interruptor
**"Destacado en la home"**:

| Interruptor | Dónde aparece ese proyecto |
|---|---|
| ✅ **Activado** | En la **home** (grilla principal) **Y** en **/trabajos** |
| ⬜ **Apagado** | **Solo** en **/trabajos** (en su categoría) |

**Ejemplos de lo que podés hacer:**

- *Quiero sumar un proyecto al archivo pero que NO esté en la portada:*
  creás el proyecto y dejás "Destacado" **apagado**.
- *Quiero cambiar cuál se ve en la home:* activá "Destacado" en el nuevo
  y apagalo en el viejo. Los dos siguen existiendo en /trabajos, solo
  cambia cuál se muestra en la portada.
- *Quiero que un proyecto del archivo pase a la portada:* abrilo y
  activá "Destacado".

La página **/trabajos siempre muestra todo**. El interruptor solo decide
si además se ve en la home.

---

## 8. Sobre las imágenes y los videos

### 📷 Imagen (poster)

Es la foto fija que se ve antes de pasar el mouse. Subila directo desde el
panel (botón para elegir archivo). Recomendado: **horizontal**, buena
calidad. El panel la guarda sola.

### 🎥 Video (el detalle importante)

El campo **"Video (link)"** es el clip que se reproduce cuando alguien
pasa el mouse por encima de la card.

⚠️ **Tiene que ser un link directo a un archivo `.mp4`** (que termine en
`.mp4`). **Un link de la página de YouTube o Vimeo NO sirve** para ese
efecto, porque esos son páginas, no archivos de video.

Tenés dos caminos:

1. **Si tenés clips cortos en .mp4:** subí cada clip corto (5-10 seg,
   livianito) a algún lado que te dé link directo, y pegá ese link.
2. **Si solo tenés tus videos en YouTube/Vimeo:** poné el link de
   YouTube/Vimeo en el campo **"Link al proyecto completo"** (ese sí
   acepta links de YouTube/Vimeo). El video de hover lo coordinás con
   Mariano — hay forma de armar clipcitos cortos.

> 💬 **Si tenés dudas con esto, hablá con Mariano antes de cargar muchos
> proyectos.** Es el único punto que tiene una vuelta de tuerca.

---

## 9. El formulario de contacto y el calendario

Estas dos cosas ya están en la web, en la sección de contacto (abajo de
todo):

- **Formulario:** cuando alguien lo completa, te llega un mail a
  **franframer.creative@gmail.com** con todos los datos (nombre, email,
  teléfono si lo pusieron, tipo de proyecto y mensaje). No tenés que
  hacer nada, llega solo a tu casilla.
- **Calendario (Cal.com):** está conectado a tu cuenta de Cal.com
  (evento "reunión 30 minutos"). Cuando alguien reserva un horario, te
  llega la confirmación a tu mail y se agenda en tu calendario. Para
  cambiar tus horarios disponibles, lo hacés desde tu cuenta de Cal.com
  (https://cal.com), no desde acá.

> Si el formulario todavía no te llega al mail, es porque falta un último
> paso de activación de Web3Forms — coordinalo con Mariano.

---

## 10. Qué SÍ y qué NO

### ✅ Lo que SÍ podés cambiar vos desde el panel (/admin)

- Agregar / editar / borrar **proyectos** (todo lo de las secciones de
  arriba)

### 🔧 Lo que NO está en el panel (pedíselo a Mariano)

Estos textos están en el código, no en el panel. Si querés cambiarlos,
pasale a Mariano el texto nuevo y él lo actualiza en minutos:

- El título grande del inicio ("El encuadre exacto donde vive tu
  historia")
- La descripción debajo del título
- La sección "Servicios" (Creación, Dirección y Grabación, etc.)
- La sección "Sobre mí" (tu bio, las estadísticas como "100+ Reels")
- Datos de contacto (email, teléfono, WhatsApp, redes sociales)
- Colores, tipografía, animaciones
- Las categorías disponibles para los proyectos

No es que no se pueda — simplemente esos cambios los hace Mariano (son
rápidos), no van por el panel.

---

## 11. Si algo sale mal

1. **El cambio no aparece en la web:** esperá 1 minuto completo y
   refrescá con **Ctrl + Shift + R**. Vercel tarda ~30 seg en publicar.
2. **No puedo entrar al panel / me da error:** Ctrl + Shift + R y
   reintentá el login. Si sigue, fijate que aceptaste la invitación de
   GitHub (sección 2).
3. **Borré algo sin querer:** no entres en pánico, está en el historial.
   Avisale a Mariano con el nombre del proyecto y lo recupera.
4. **Cualquier otra cosa rara:** sacale captura de pantalla a lo que ves
   (con el error completo) y mandásela a Mariano. Con eso lo resuelve
   rápido.

---

*Web desarrollada para Fran Framer · Córdoba, Argentina · 2026*
