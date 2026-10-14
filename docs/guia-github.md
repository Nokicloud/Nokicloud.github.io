# Guía: subir el proyecto a GitHub y publicarlo

Pasos para subir este repositorio a GitHub y publicar la web con GitHub Pages. Hay dos formas de subir los archivos: desde el navegador, sin instalar nada, o con Git desde la terminal.

> **¿Ya tenías subida la versión anterior?** Salta al [apartado 6](#6-actualizar-un-repositorio-que-ya-tienes-subido).

## 1. Preparar la cuenta

1. Crea la cuenta en <https://github.com/signup> (por ejemplo, con el usuario `nokicloud`).
2. Para poner la foto de perfil, haz clic en tu avatar (arriba a la derecha) y entra en **Settings → Public profile → Profile picture → Edit → Upload a photo…**. Sube `docs/avatar-nokicloud.png` y ajusta el recorte.

## 2. Crear el repositorio vacío

1. Pulsa **+** (arriba a la derecha) → **New repository**.
2. **Repository name:** `nokicloud-web`. Si quieres que la web quede en `https://nokicloud.github.io/` sin subcarpeta, llámalo `nokicloud.github.io`.
3. **Description:** `Web de una tienda ficticia de reparación informática y administración de servidores (proyecto académico)`.
4. Marca **Public**. GitHub Pages es gratis en repositorios públicos.
5. **No** marques *Add a README*, *.gitignore* ni *license*, porque ya vienen en el proyecto.
6. Pulsa **Create repository**.

## 3A. Subir los archivos desde el navegador

1. Descomprime `nokicloud-web.zip` en tu ordenador.
2. En la página del repositorio vacío, pulsa el enlace **uploading an existing file**.
3. Abre la carpeta descomprimida, selecciona **todo su contenido** (no la carpeta en sí) y arrástralo a la página.
   - En Windows, activa *Vista → Elementos ocultos* para ver `.gitignore` y `.nojekyll`. En macOS, pulsa `Cmd + Shift + .`.
   - Arrastra las carpetas `assets`, `docs` y `scripts` enteras: GitHub respeta las subcarpetas (por ejemplo, `assets/fonts`).
4. Escribe un mensaje de commit, por ejemplo `Primera versión de la web`, y pulsa **Commit changes**.
5. Comprueba que en la raíz del repositorio aparecen los ocho archivos `.html` (`index.html`, `reparaciones.html`, `servidores.html`, `catalogo.html`, `seguimiento.html`, `nosotros.html`, `aviso-legal.html` y `404.html`), `README.md` y las carpetas `assets`, `docs` y `scripts`.

## 3B. Subir los archivos con Git

Necesitas tener Git instalado (<https://git-scm.com/downloads>). Desde la carpeta descomprimida:

```bash
git init
git add .
git commit -m "Primera versión de la web"
git branch -M main
git remote add origin https://github.com/nokicloud/nokicloud-web.git
git push -u origin main
```

Si GitHub te pide contraseña, no admite la de la cuenta: crea un token en **Settings → Developer settings → Personal access tokens** y úsalo como contraseña, o inicia sesión con GitHub Desktop.

## 4. Publicar con GitHub Pages

1. En el repositorio, entra en **Settings → Pages**.
2. En **Source**, elige **Deploy from a branch**.
3. Selecciona la rama `main` y la carpeta `/ (root)` y pulsa **Save**.
4. Espera uno o dos minutos y recarga la página. Aparecerá el enlace: `https://nokicloud.github.io/nokicloud-web/`.
5. Puedes ver el progreso en la pestaña **Actions** (un círculo amarillo mientras publica y un check verde cuando termina).

## 5. Últimos retoques (opcional)

- En la página principal del repositorio, pulsa el engranaje junto a **About** y pega el enlace de la web en **Website**.
- Añade *topics* como `html`, `css`, `javascript`, `github-pages` y `proyecto-academico`.
- En **Settings → General → Social preview** puedes subir `docs/banner.png` como imagen al compartir el enlace del repositorio.
- Si tu usuario no es `nokicloud`, cámbialo en los comandos y enlaces de esta guía.

## 6. Actualizar un repositorio que ya tienes subido

La versión nueva mantiene los archivos anteriores y añade otros: las páginas `reparaciones.html`, `servidores.html`, `catalogo.html`, `nosotros.html` y `aviso-legal.html`, los scripts `assets/js/catalogo.js` y `assets/js/datos-catalogo.js`, la carpeta `assets/fonts/` y las imágenes de `docs/`. No hay que borrar nada.

**Desde el navegador**

1. Descomprime el zip nuevo.
2. En la página del repositorio, pulsa **Add file → Upload files**.
3. Arrastra **todo el contenido** de la carpeta descomprimida. Los archivos con el mismo nombre se sustituyen y los nuevos se añaden.
4. Mensaje de commit, por ejemplo `Rediseño con estética editorial`, y **Commit changes**.

**Con Git**

Copia los archivos nuevos encima de tu carpeta local del repositorio (aceptando reemplazar) y ejecuta:

```bash
git add .
git commit -m "Rediseño con estética editorial"
git push
```

GitHub Pages se actualiza solo en uno o dos minutos. Comprueba que se abren todas las páginas del menú: Reparaciones, Servidores, Catálogo, Seguimiento y Nosotros. Si sigues viendo la versión antigua, recarga sin caché con `Ctrl + F5` (o `Cmd + Shift + R` en macOS).

## 7. Antes de entregar: rellenar la dirección y el mapa

En `nosotros.html`, sección *Dónde estamos*, hay marcadores entre corchetes (`[Calle y número]`, `[Código postal] [Ciudad]`…) y un recuadro que dice *Aquí irá el mapa*. Puedes editarlos desde el propio GitHub:

1. Abre `nosotros.html` en el repositorio y pulsa el lápiz (**Edit this file**).
2. Busca `placeholder` con `Ctrl + F` y cambia cada texto entre corchetes.
3. Para el mapa, sigue las instrucciones del comentario que hay justo encima del recuadro.
4. Pulsa **Commit changes**.
