/* ¡Que no llegue la mosca! · página del proyecto */

const CARTAS = [
  { num: "02", cat: "papel", nombre: "Periódico", nivel: "F", texto: "Es papel. Se recicla para hacer papel nuevo." },
  { num: "06", cat: "papel", nombre: "Tubo de cartón del papel higiénico", nivel: "I", texto: "Es cartón limpio, aunque venga del baño." },
  { num: "07", cat: "papel", nombre: "Caja de cereal vacía", nivel: "I", texto: "Es cartón. Sácale la bolsa de adentro." },
  { num: "08", cat: "papel", nombre: "Caja de zapatos", nivel: "I", texto: "Es cartón y se puede reciclar." },
  { num: "09", cat: "papel", nombre: "Caja de pizza limpia", nivel: "P", texto: "Es cartón sin grasa. Limpia, sí se recicla." },
  { num: "12", cat: "plastico", nombre: "Botella de refresco vacía", nivel: "F", texto: "Es plástico. Vacíala y enjuágala." },
  { num: "14", cat: "plastico", nombre: "Envase de yogur limpio", nivel: "F", texto: "Es plástico. Enjuágalo para no ensuciar lo demás." },
  { num: "17", cat: "plastico", nombre: "Tapa de botella", nivel: "I", texto: "Es plástico duro. Aunque es chiquita, se recicla." },
  { num: "19", cat: "plastico", nombre: "Botella de aceite vacía y limpia", nivel: "P", texto: "Es plástico. Solo se recicla si no tiene aceite." },
  { num: "20", cat: "plastico", nombre: "Bolsa del súper", nivel: "P", texto: "Es plástico que se recicla. ¡Mejor úsala muchas veces!" },
  { num: "21", cat: "organico", nombre: "Cáscara de plátano", nivel: "F", texto: "Es fruta. Se descompone y se vuelve abono." },
  { num: "24", cat: "organico", nombre: "Pan duro", nivel: "F", texto: "Es comida. Se descompone y se vuelve abono." },
  { num: "25", cat: "organico", nombre: "Hojas secas", nivel: "I", texto: "Vienen de un árbol. Regresan a la tierra." },
  { num: "27", cat: "organico", nombre: "Tortilla dura", nivel: "I", texto: "Es de maíz, una planta. Se descompone." },
  { num: "30", cat: "organico", nombre: "Servilleta de papel usada", nivel: "P", texto: "Es papel sucio de comida. Ya no se recicla: se descompone." },
  { num: "31", cat: "norec", nombre: "Bolsa de papas fritas", nivel: "F", texto: "Tiene plástico y metal pegados. No se separan." },
  { num: "34", cat: "norec", nombre: "Papel higiénico usado", nivel: "F", texto: "Se usó en el cuerpo. Por higiene, no se recicla." },
  { num: "37", cat: "norec", nombre: "Plumón gastado", nivel: "I", texto: "Tiene plástico, tinta y fieltro pegados. No se separan." },
  { num: "38", cat: "norec", nombre: "Goma de borrar gastada", nivel: "I", texto: "Es de hule mezclado. No se recicla." },
  { num: "39", cat: "norec", nombre: "Chicle masticado", nivel: "P", texto: "¡No es comida! Es una goma que no se descompone." },
];

const CAT = {
  papel: { nombre: "Papel y cartón", color: "#F2C75C", icono: "i-papel" },
  plastico: { nombre: "Plástico", color: "#1F5FA8", icono: "i-plastico" },
  organico: { nombre: "Orgánicos", color: "#6CC24A", icono: "i-organico" },
  norec: { nombre: "No reciclables", color: "#FF6720", icono: "i-norec" },
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const LLEGADA = 14;

/* ---------- portada: la mosca vuela por su ruta y llega junto al bote ---------- */
(function vuelo() {
  const ruta = document.getElementById("ruta");
  const mosca = document.getElementById("vuelo-mosca");
  if (!ruta || !mosca) return;
  const L = ruta.getTotalLength();
  const pon = (t) => {
    const p = ruta.getPointAtLength(L * t);
    const q = ruta.getPointAtLength(Math.min(L, L * t + 1));
    const giro = Math.max(-18, Math.min(18, Math.atan2(q.y - p.y, q.x - p.x) * 57.3 / 4));
    mosca.setAttribute("transform", `translate(${p.x},${p.y}) rotate(${giro})`);
  };
  if (reduceMotion) { pon(1); return; }
  const dur = 2600, t0 = performance.now() + 300;
  const ease = (x) => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  pon(0);
  function paso(now) {
    const x = Math.min(1, Math.max(0, (now - t0) / dur));
    pon(ease(x));
    if (x < 1) requestAnimationFrame(paso);
  }
  requestAnimationFrame(paso);
})();

/* ---------- el camino de la mosca: progreso de lectura ---------- */
(function camino() {
  const cont = document.querySelector(".camino__puntos");
  const mosca = document.querySelector(".camino__mosca");
  for (let i = 0; i <= LLEGADA; i++) cont.appendChild(document.createElement("span"));
  const puntos = [...cont.children];
  let pendiente = false;
  function actualizar() {
    pendiente = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    mosca.style.setProperty("--p", p.toFixed(4));
    const paso = Math.round(p * LLEGADA);
    puntos.forEach((el, i) => el.classList.toggle("paso", i < paso));
  }
  addEventListener("scroll", () => { if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); } }, { passive: true });
  addEventListener("resize", actualizar);
  actualizar();
})();

/* ---------- sección activa en la barra ---------- */
(function navActiva() {
  const enlaces = [...document.querySelectorAll(".barra__nav a")];
  const secciones = enlaces.map((a) => document.querySelector(a.getAttribute("href")));
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        enlaces.forEach((a) => a.classList.toggle("activo", a.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secciones.forEach((s) => s && io.observe(s));
})();

/* ---------- galería de las 20 tarjetas ---------- */
(function galeria() {
  const g = document.getElementById("galeria");
  CARTAS.forEach((c) => {
    const img = document.createElement("img");
    img.src = `img/tarjetas/${c.num}.jpg`;
    img.alt = c.nombre;
    img.loading = "lazy";
    img.width = 280; img.height = 280;
    g.appendChild(img);
  });
})();

/* ---------- pruébalo: la demo jugable ---------- */
(function demo() {
  const tarjeta = document.getElementById("tarjeta");
  const img = document.getElementById("tarjeta-img");
  const reverso = document.getElementById("tarjeta-reverso");
  const aviso = document.getElementById("aviso");
  const otra = document.getElementById("otra");
  const botes = [...document.querySelectorAll(".bote")];
  const aciertosEl = document.getElementById("aciertos");
  const pista = document.getElementById("pista");

  for (let i = 0; i <= LLEGADA; i++) {
    const li = document.createElement("li");
    li.setAttribute("aria-label", i === LLEGADA ? "Llegada" : `Lugar ${i}`);
    pista.appendChild(li);
  }
  const lugares = [...pista.children];

  let mazo = [], actual = null, aciertos = 0, mosca = 0, terminado = false;

  function barajar() {
    mazo = CARTAS.slice();
    for (let i = mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
  }
  function moverMosca() {
    lugares.forEach((li, i) => li.classList.toggle("aqui", i === mosca));
  }
  function pintarReverso(c) {
    const k = CAT[c.cat];
    reverso.innerHTML = `
      <svg class="reverso__bote" viewBox="0 0 120 140" style="color:${k.color}"><use href="#bote"/><use href="#${k.icono}" x="31" y="45" width="58" height="58"/></svg>
      <div class="reverso__nombre">${c.nombre}</div>
      <div class="reverso__cat">${k.nombre}</div>
      <div class="reverso__texto">${c.texto}</div>`;
  }
  function siguiente() {
    if (!mazo.length) barajar();
    actual = mazo.pop();
    tarjeta.classList.remove("volteada", "salida");
    img.src = `img/tarjetas/${actual.num}.jpg`;
    img.alt = `Tarjeta: ${actual.nombre}`;
    pintarReverso(actual);
    botes.forEach((b) => { b.disabled = false; b.classList.remove("elegido", "correcto", "atenuado"); });
    aviso.textContent = "";
    aviso.className = "prueba__aviso";
    otra.hidden = true;
    if (!reduceMotion) { tarjeta.classList.remove("entra"); void tarjeta.offsetWidth; tarjeta.classList.add("entra"); }
  }
  function reiniciar() {
    aciertos = 0; mosca = 0; terminado = false;
    aciertosEl.textContent = 0;
    otra.textContent = "Otra tarjeta";
    barajar(); moverMosca(); siguiente();
  }
  botes.forEach((b) => b.addEventListener("click", () => {
    if (!actual || terminado) return;
    const elegido = b.dataset.cat;
    botes.forEach((x) => {
      x.disabled = true;
      if (x === b) x.classList.add("elegido");
      else if (x.dataset.cat === actual.cat) x.classList.add("correcto");
      else x.classList.add("atenuado");
    });
    tarjeta.classList.add("volteada");
    if (elegido === actual.cat) {
      aciertos++;
      aciertosEl.textContent = aciertos;
      aviso.textContent = "¡Bien! Va en " + CAT[actual.cat].nombre.toLowerCase() + ".";
      aviso.className = "prueba__aviso bien";
    } else {
      mosca = Math.min(LLEGADA, mosca + 1);
      moverMosca();
      aviso.textContent = `No era ahí: va en ${CAT[actual.cat].nombre.toLowerCase()}. La mosca avanza.`;
      aviso.className = "prueba__aviso mal";
    }
    if (mosca >= LLEGADA) {
      terminado = true;
      aviso.textContent = "La mosca llegó. Pierden todos.";
      otra.textContent = "Jugar otra vez";
    }
    otra.hidden = false;
    otra.focus({ preventScroll: true });
  }));
  otra.addEventListener("click", () => {
    if (terminado) { reiniciar(); return; }
    if (reduceMotion) { siguiente(); return; }
    tarjeta.classList.add("salida");
    setTimeout(siguiente, 420);
  });
  reiniciar();
})();
