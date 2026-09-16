// Generar estrellas de fondo sin bloquear clics
const cantidadEstrellas = window.innerWidth < 600 ? 30 : 70;
for (let i = 0; i < cantidadEstrellas; i++) {
  let estrella = document.createElement("div");
  estrella.className = "estrella";
  estrella.style.position = "fixed";
  estrella.style.pointerEvents = "none"; // CRÍTICO: Evita que la estrella tape los clics
  estrella.style.top = Math.random() * window.innerHeight + "px";
  estrella.style.left = Math.random() * window.innerWidth + "px";
  estrella.style.zIndex = "1";
  document.body.appendChild(estrella);
}

// Sorpresa
function mostrarSorpresa() {
  const sorpresa = document.getElementById("sorpresa");
  if (sorpresa) sorpresa.style.display = "block";
}

// Carrusel automático con frases
let indice = 0;
const imagenes = document.querySelectorAll(".carrusel img");
const frases = [
  "Contigo todo es mejor 💕",
  "Eres mi alegría 🌹",
  "Siempre en mi corazón ✨",
  "Mi lugar favorito: a tu lado 💖",
  "Tu sonrisa ilumina mi día 🌼",
  "Cada instante contigo es único 💎",
  "Te pienso, te extraño, te amo 💘",
  "Eres mi razón de vivir 🌙"
];

function avanzarImagen() {
  if (!imagenes.length) return;
  imagenes[indice].classList.remove("active");
  indice = (indice + 1) % imagenes.length;
  imagenes[indice].classList.add("active");
  const fraseEl = document.getElementById("frase");
  if (fraseEl) fraseEl.innerHTML = frases[indice];
}

function retrocederImagen() {
  if (!imagenes.length) return;
  imagenes[indice].classList.remove("active");
  indice = (indice - 1 + imagenes.length) % imagenes.length;
  imagenes[indice].classList.add("active");
  const fraseEl = document.getElementById("frase");
  if (fraseEl) fraseEl.innerHTML = frases[indice];
}

// Swipe táctil en carrusel
let inicioX = 0;
const carrusel = document.querySelector(".carrusel");
if (carrusel) {
  carrusel.addEventListener("touchstart", e => inicioX = e.touches[0].clientX, { passive: true });
  carrusel.addEventListener("touchend", e => {
    let finX = e.changedTouches[0].clientX;
    if (inicioX - finX > 50) avanzarImagen();
    if (finX - inicioX > 50) retrocederImagen();
  });
}

// Cambio automático cada 3 segundos
setInterval(avanzarImagen, 3000);

// Corazones flotando
function crearCorazon() {
  const corazon = document.createElement("div");
  corazon.className = "corazon-flotante";
  corazon.innerHTML = "❤️";
  corazon.style.position = "fixed";
  corazon.style.pointerEvents = "none"; // CRÍTICO: No interfiere con toques/clics
  corazon.style.left = Math.random() * 90 + "vw";
  corazon.style.zIndex = "2";
  document.body.appendChild(corazon);

  let inicio = null;
  function animar(tiempo) {
    if (!inicio) inicio = tiempo;
    const progreso = (tiempo - inicio) / 6000;
    corazon.style.transform = `translateY(${(1 - progreso) * window.innerHeight}px)`;
    if (progreso < 1) {
      requestAnimationFrame(animar);
    } else {
      corazon.remove();
    }
  }
  requestAnimationFrame(animar);
}
setInterval(crearCorazon, window.innerWidth < 600 ? 1800 : 1000);

// Flores amarillas flotando
function crearFlor() {
  const flor = document.createElement("div");
  flor.className = "flor-amarilla";
  flor.innerHTML = "🌼";
  flor.style.position = "fixed";
  flor.style.pointerEvents = "none";
  flor.style.left = Math.random() * 90 + "vw";
  flor.style.zIndex = "2";
  document.body.appendChild(flor);
  setTimeout(() => { flor.remove(); }, 8000);
}
setInterval(crearFlor, 3000);

// Abrir tarjeta y lluvia
function lluviaSorpresa() {
  const overlay = document.getElementById("overlay");
  const mensajeFinal = document.getElementById("mensajeFinal");

  if (overlay) overlay.style.display = "block";
  if (mensajeFinal) mensajeFinal.style.display = "block";

  const esMovil = window.innerWidth < 600;
  const totalElementos = esMovil ? 25 : 50;

  for (let e = 0; e < totalElementos; e++) {
    setTimeout(() => {
      if (!mensajeFinal || mensajeFinal.style.display === "none") return;

      const t = document.createElement("div");
      t.className = "elemento-lluvia";
      t.style.position = "fixed";
      t.style.pointerEvents = "none"; // CRÍTICO: Evita bloqueo táctil
      t.style.left = Math.random() * 90 + "vw";
      t.style.zIndex = "999";
      
      const azar = Math.random();
      t.innerHTML = azar < 0.33 ? "❤️" : azar < 0.66 ? "✨" : "🌹";

      document.body.appendChild(t);

      setTimeout(() => { t.remove(); }, 6000);
    }, (esMovil ? 180 : 120) * e);
  }
}

// FUNCIÓN DE CIERRE (Obligatoria para que el botón funcione)
function cerrarMensaje() {
  const overlay = document.getElementById("overlay");
  const mensajeFinal = document.getElementById("mensajeFinal");

  // 1. Ocultar la tarjeta y el fondo de inmediato
  if (overlay) overlay.style.display = "none";
  if (mensajeFinal) mensajeFinal.style.display = "none";

  // 2. Permitir que la lluvia siga cayendo y eliminar los elementos 5 segundos después (5000 ms)
  setTimeout(() => {
    document.querySelectorAll(".elemento-lluvia").forEach(el => el.remove());
  }, 5000);
}