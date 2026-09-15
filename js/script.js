


// Generar estrellas
const cantidadEstrellas = window.innerWidth < 600 ? 40 : 100;
for(let i=0; i<cantidadEstrellas; i++){
  let estrella = document.createElement("div");
  estrella.className = "estrella";
  estrella.style.top = Math.random()*window.innerHeight+"px";
  estrella.style.left = Math.random()*window.innerWidth+"px";
  document.body.appendChild(estrella);
}

// Sorpresa
function mostrarSorpresa() {
  document.getElementById("sorpresa").style.display = "block";
}

// Carrusel automático con frases
let indice = 0;
const imagenes = document.querySelectorAll(".carrusel img");
const frases=[
  "Contigo todo es mejor 💕",
  "Eres mi alegría 🌹",
  "Siempre en mi corazón ✨",
  "Mi lugar favorito: a tu lado 💖",
  "Tu sonrisa ilumina mi día 🌼",
  "Cada instante contigo es único 💎",
  "Te pienso, te extraño, te amo 💘",
  "Eres mi razón de vivir 🌙"
];

// Funciones para swipe táctil
function avanzarImagen() {
  imagenes[indice].classList.remove("active");
  indice = (indice + 1) % imagenes.length;
  imagenes[indice].classList.add("active");
  document.getElementById("frase").innerHTML = frases[indice];
}

function retrocederImagen() {
  imagenes[indice].classList.remove("active");
  indice = (indice - 1 + imagenes.length) % imagenes.length;
  imagenes[indice].classList.add("active");
  document.getElementById("frase").innerHTML = frases[indice];
}

// Swipe táctil
let inicioX = 0;
const carrusel = document.querySelector(".carrusel");
carrusel.addEventListener("touchstart", e => inicioX = e.touches[0].clientX);
carrusel.addEventListener("touchend", e => {
  let finX = e.changedTouches[0].clientX;
  if (inicioX - finX > 50) avanzarImagen();   // swipe izquierda
  if (finX - inicioX > 50) retrocederImagen(); // swipe derecha
});

// Cambio automático cada 3 segundos
setInterval(avanzarImagen, 3000);


// Corazones flotando
function crearCorazon() {
  const corazon = document.createElement("div");
  corazon.className = "corazon-flotante";
  corazon.innerHTML = "❤️";
  corazon.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(corazon);

  let inicio = null;
  function animar(tiempo) {
    if (!inicio) inicio = tiempo;
    const progreso = (tiempo - inicio) / 6000;
    corazon.style.transform = `translateY(${(1 - progreso) * window.innerHeight}px)`;
    if (progreso < 1) requestAnimationFrame(animar);
    else corazon.remove();
  }
  requestAnimationFrame(animar);
}
setInterval(crearCorazon, window.innerWidth < 600 ? 1500 : 800);

// Flores amarillas flotando
function crearFlor() {
  const flor = document.createElement("div");
  flor.className = "flor-amarilla";
  flor.innerHTML = "🌼";
  flor.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(flor);
  setTimeout(() => { flor.remove(); }, 8000);
}
setInterval(crearFlor, 2500);

function lluviaSorpresa() {
  // Muestra inmediatamente el mensaje y su fondo
  document.getElementById("overlay").style.display = "block";
  document.getElementById("mensajeFinal").style.display = "block";

  // Genera la lluvia de elementos al instante
  for (let e = 0; e < 50; e++) {
    setTimeout(() => {
      const t = document.createElement("div");
      t.style.position = "fixed";
      t.style.left = Math.random() * window.innerWidth + "px";
      t.style.top = Math.random() * window.innerHeight + "px";
      t.style.fontSize = "28px";
      t.style.zIndex = "999"; // Detrás de la tarjeta, delante del overlay
      t.style.animation = "flotar 6s linear infinite";
      t.innerHTML = Math.random() > 0.5 ? "❤️" : "✨";

      document.body.appendChild(t);

      setTimeout(() => {
        t.remove();
      }, 6000);
    }, 80 * e);
  }
}