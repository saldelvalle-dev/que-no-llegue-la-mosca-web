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

## Poner los videos
1. Sube cada video a YouTube como **No listado**.
2. Copia su ID: lo que va después de `v=` en el link (por ejemplo, en `youtube.com/watch?v=abc123XYZ` el ID es `abc123XYZ`).
3. En `app.js`, arriba, pega el ID en `youtube: ""` del video que corresponda.
