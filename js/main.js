/* =========================================================
   YERSI CONTRERAS BEAUTY BRAND — interacciones
   Todo lo editable por el cliente está en CONFIG y SERVICES.
   ========================================================= */

const CONFIG = {
  // Número de WhatsApp con código de país, sin "+" ni espacios.  ⚠️ CAMBIAR
  whatsapp: "51900000000",
  // Horario: [abre, cierra] en horas 24h. 0 = domingo … 6 = sábado
  hours: { 0: [10, 15], 1: [9, 20], 2: [9, 20], 3: [9, 20], 4: [9, 20], 5: [9, 20], 6: [9, 21] },
};

// Servicios y precios (S/). Edita libremente.
const SERVICES = [
  { cat: "corte", icon: "✂", name: "Corte de autor", desc: "Asesoría de visagismo, lavado, corte personalizado y secado con forma.", price: 45, time: "60 min", tag: "Favorito" },
  { cat: "corte", icon: "✂", name: "Corte + Brushing", desc: "Corte a medida con brushing de salón para un acabado con volumen y brillo.", price: 60, time: "75 min" },
  { cat: "corte", icon: "✂", name: "Corte caballero / niño", desc: "Corte clásico o moderno con acabado y styling.", price: 25, time: "40 min" },
  { cat: "color", icon: "◐", name: "Balayage / Babylights", desc: "Iluminación natural a mano alzada, matiz incluido. Rubios luminosos y sanos.", price: 280, time: "4 h", tag: "Top ventas" },
  { cat: "color", icon: "◐", name: "Tinte completo", desc: "Color uniforme y duradero con productos profesionales de alta cobertura.", price: 120, time: "2 h" },
  { cat: "color", icon: "◐", name: "Color fantasía", desc: "Rojos, cobres, rosas y tonos de tendencia con técnica de protección de fibra.", price: 220, time: "3 h" },
  { cat: "tratamiento", icon: "❋", name: "Keratina / Alisado", desc: "Cabello liso, sin frizz y manejable por meses. Fórmula sin formol.", price: 250, time: "3 h", tag: "Nuevo" },
  { cat: "tratamiento", icon: "❋", name: "Botox capilar", desc: "Reparación profunda que rellena la fibra y devuelve suavidad y brillo.", price: 150, time: "2 h" },
  { cat: "tratamiento", icon: "❋", name: "Hidratación intensiva", desc: "Ritual de nutrición con masaje capilar para cabellos secos o teñidos.", price: 70, time: "60 min" },
  { cat: "estilo", icon: "✿", name: "Peinado de evento", desc: "Ondas, recogidos y semi-recogidos que duran toda la noche.", price: 80, time: "60 min" },
  { cat: "estilo", icon: "✿", name: "Maquillaje social", desc: "Make up profesional de larga duración, pestañas incluidas.", price: 90, time: "60 min" },
  { cat: "estilo", icon: "✿", name: "Paquete novia", desc: "Prueba previa, peinado y maquillaje el gran día. Atención a domicilio opcional.", price: 450, time: "Personalizado", tag: "Premium" },
  { cat: "estilo", icon: "✿", name: "Manicure & Pedicure", desc: "Uñas impecables: tradicional, gel o acrílicas con diseño.", price: 50, time: "75 min" },
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const waLink = (text = "") => `https://wa.me/${CONFIG.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;

/* ---------- Preloader ---------- */
window.addEventListener("load", () => setTimeout(() => $("#preloader").classList.add("is-done"), 350));
setTimeout(() => $("#preloader").classList.add("is-done"), 2500); // por si alguna imagen tarda

/* ---------- Nav ---------- */
const nav = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 30);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.classList.toggle("is-open", open);
  document.body.style.overflow = open ? "hidden" : "";
});
$$("a", links).forEach(a => a.addEventListener("click", () => {
  links.classList.remove("is-open"); toggle.classList.remove("is-open"); document.body.style.overflow = "";
}));

/* ---------- Enlaces de WhatsApp ---------- */
$$(".js-wa").forEach(a => {
  a.href = waLink("¡Hola Yersi Contreras Beauty Brand! Quisiera más información 💇‍♀️");
  a.target = "_blank"; a.rel = "noopener";
  if (!a.classList.contains("wa-float")) a.textContent = "+" + CONFIG.whatsapp.replace(/^(\d{2})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4");
});

/* ---------- Servicios ---------- */
const grid = $("#servicesGrid");
function renderServices(filter = "all") {
  grid.innerHTML = SERVICES
    .map((s, i) => ({ ...s, i }))
    .filter(s => filter === "all" || s.cat === filter)
    .map((s, k) => `
      <article class="svc" style="animation-delay:${k * 60}ms">
        ${s.tag ? `<span class="svc__tag">${s.tag}</span>` : ""}
        <span class="svc__icon">${s.icon}</span>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <div class="svc__foot">
          <div class="svc__price"><small>Desde</small><strong>S/ ${s.price}</strong><span class="svc__time">⏱ ${s.time}</span></div>
          <button class="svc__book" data-service="${s.i}">Reservar</button>
        </div>
      </article>`).join("");
}
renderServices();

$$(".tab").forEach(tab => tab.addEventListener("click", () => {
  $$(".tab").forEach(t => t.classList.remove("is-active"));
  tab.classList.add("is-active");
  renderServices(tab.dataset.filter);
}));

grid.addEventListener("click", e => {
  const btn = e.target.closest(".svc__book");
  if (!btn) return;
  $("#fService").value = btn.dataset.service;
  updateSummary();
  $("#reservar").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => $("#fName").focus({ preventScroll: true }), 700);
  toast(`✨ ${SERVICES[btn.dataset.service].name} seleccionado`);
});

/* ---------- Contadores del hero ---------- */
const counters = $$("[data-count]");
const countObs = new IntersectionObserver(entries => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    const end = +target.dataset.count, start = performance.now(), dur = 1600;
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      target.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString("es-PE");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countObs.unobserve(target);
  });
}, { threshold: .6 });
counters.forEach(c => countObs.observe(c));

/* ---------- Aparición al hacer scroll ---------- */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) { target.classList.add("is-visible"); revObs.unobserve(target); }
  });
}, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
$$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 80}ms`; revObs.observe(el); });

/* ---------- Antes / Después ---------- */
const ba = $("#ba"), baRange = $("#baRange");
baRange.addEventListener("input", () => ba.style.setProperty("--pos", baRange.value + "%"));

/* ---------- Slider de opiniones ---------- */
const track = $("#sliderTrack"), dotsWrap = $("#sliderDots");
const reviews = $$(".review", track);
let slide = 0, timer;
const perView = () => (innerWidth <= 600 ? 1 : innerWidth <= 1024 ? 2 : 3);
const pages = () => reviews.length - perView() + 1;
function buildDots() {
  dotsWrap.innerHTML = Array.from({ length: pages() }, (_, i) => `<button aria-label="Opinión ${i + 1}" data-i="${i}"></button>`).join("");
  goTo(Math.min(slide, pages() - 1));
}
function goTo(i) {
  slide = (i + pages()) % pages();
  const w = reviews[0].getBoundingClientRect().width + 19.2; // ancho + gap
  track.style.transform = `translateX(${-slide * w}px)`;
  $$("button", dotsWrap).forEach((d, k) => d.classList.toggle("is-active", k === slide));
}
const autoplay = () => { clearInterval(timer); timer = setInterval(() => goTo(slide + 1), 5000); };
dotsWrap.addEventListener("click", e => { if (e.target.dataset.i) { goTo(+e.target.dataset.i); autoplay(); } });
let touchX = 0;
track.addEventListener("touchstart", e => (touchX = e.touches[0].clientX), { passive: true });
track.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) { goTo(slide + (dx < 0 ? 1 : -1)); autoplay(); }
});
window.addEventListener("resize", buildDots);
buildDots(); autoplay();

/* ---------- Horario: día actual y abierto/cerrado ---------- */
(function hours() {
  const now = new Date(), day = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  const li = $(`#hoursList li[data-day="${day}"]`);
  if (li) li.classList.add("is-today");
  const [open, close] = CONFIG.hours[day] || [];
  const status = $("#openStatus");
  if (open !== undefined && h >= open && h < close) {
    status.textContent = `Abierto ahora · cierra a las ${close}:00`;
    status.classList.add("is-open");
  } else {
    status.textContent = "Cerrado ahora · reserva y te confirmamos";
    status.classList.add("is-closed");
  }
})();

/* ---------- Formulario de reservas ---------- */
const form = $("#bookingForm"), fService = $("#fService"), fDate = $("#fDate"), fTime = $("#fTime");
fService.insertAdjacentHTML("beforeend", SERVICES.map((s, i) => `<option value="${i}">${s.name} — S/ ${s.price}</option>`).join(""));

const pad = n => String(n).padStart(2, "0");
const toISO = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
fDate.min = toISO(new Date());

function fillTimes() {
  fTime.innerHTML = '<option value="">Elige la hora</option>';
  if (!fDate.value) return;
  const d = new Date(fDate.value + "T00:00");
  const [open, close] = CONFIG.hours[d.getDay()];
  const isToday = fDate.value === toISO(new Date());
  const nowH = new Date().getHours() + new Date().getMinutes() / 60;
  for (let t = open; t < close; t += 0.5) {
    if (isToday && t <= nowH + 0.5) continue;
    const hh = Math.floor(t), mm = t % 1 ? "30" : "00";
    const label = `${hh > 12 ? hh - 12 : hh}:${mm} ${hh >= 12 ? "pm" : "am"}`;
    fTime.insertAdjacentHTML("beforeend", `<option value="${label}">${label}</option>`);
  }
  if (fTime.options.length === 1) fTime.insertAdjacentHTML("beforeend", '<option value="" disabled>Sin horarios hoy, elige otro día</option>');
}
fDate.addEventListener("change", () => { fillTimes(); updateSummary(); });
form.addEventListener("input", updateSummary);
form.addEventListener("change", updateSummary);

function updateSummary() {
  const box = $("#formSummary");
  const s = SERVICES[fService.value];
  if (!s) { box.hidden = true; return; }
  const date = fDate.value ? new Date(fDate.value + "T00:00").toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" }) : "fecha por elegir";
  box.hidden = false;
  box.innerHTML = `Tu reserva: <strong>${s.name}</strong> · ${date}${fTime.value ? " · " + fTime.value : ""} · desde <strong>S/ ${s.price}</strong>`;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  let ok = true;
  $$("[required]", form).forEach(el => {
    const valid = el.checkValidity() && el.value.trim() !== "";
    el.closest(".field").classList.toggle("has-error", !valid);
    if (!valid) ok = false;
  });
  if (!ok) { toast("Completa los campos marcados 💕"); return; }

  const data = Object.fromEntries(new FormData(form));
  const s = SERVICES[data.service];
  const date = new Date(data.date + "T00:00").toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" });
  const msg =
`¡Hola Yersi Contreras Beauty Brand! ✨ Quiero reservar una cita:

👤 Nombre: ${data.name}
📱 Celular: ${data.phone}
💇‍♀️ Servicio: ${s.name} (desde S/ ${s.price})
📅 Fecha: ${date}
🕐 Hora: ${data.time}${data.notes ? `\n📝 Comentarios: ${data.notes}` : ""}`;

  window.open(waLink(msg), "_blank");
  toast("¡Listo! Te llevamos a WhatsApp para confirmar 💬");
  form.reset(); fillTimes(); updateSummary();
});
$$("input, select", form).forEach(el => el.addEventListener("input", () => el.closest(".field").classList.remove("has-error")));
$("#fPhone").addEventListener("input", e => (e.target.value = e.target.value.replace(/\D/g, "").slice(0, 9)));

/* ---------- Toast ---------- */
let toastT;
function toast(text) {
  const t = $("#toast");
  t.textContent = text; t.classList.add("is-show");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("is-show"), 3000);
}

/* ---------- Año del footer ---------- */
$("#year").textContent = new Date().getFullYear();
