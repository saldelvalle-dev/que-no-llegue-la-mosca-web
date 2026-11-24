# Página web · ¡Que no llegue la mosca!

Página estática: `index.html`, `styles.css`, `app.js` y la carpeta `img/`. No necesita instalar nada.

## Verla en tu computadora
```bash
python3 -m http.server 8080 --directory web
```
y abre http://localhost:8080

## Publicarla gratis en Vercel
1. Crea un repositorio en GitHub (por ejemplo `que-no-llegue-la-mosca-web`) y sube el contenido de esta carpeta `web/`.
2. En vercel.com: **Add New → Project**, elige ese repositorio.
3. Framework Preset: **Other**. Root Directory: la raíz del repositorio. Sin comando de build.
4. **Deploy**. El link queda como `que-no-llegue-la-mosca-web.vercel.app` (se puede cambiar en Settings → Domains).

Cada vez que se suba un cambio al repositorio, Vercel la vuelve a publicar sola.

## El video
El promo de 1 minuto está en `video/promo.mp4` (con su portada `video/promo-portada.jpg`) y se reproduce directo en la página, sin YouTube.
Para cambiarlo, reemplaza `video/promo.mp4` por la nueva versión con el mismo nombre y súbelo al repositorio.
