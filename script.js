// ---------- Grab the things we need ----------
const scene   = document.getElementById("scene");
const svg     = document.getElementById("lights");
const strands = document.getElementById("strands");
const toggle  = document.getElementById("switch");
const NS = "http://www.w3.org/2000/svg";

// ---------- Small helpers ----------
function make(tag, attrs) {                 // create one SVG element
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

function rnd(i) {                           // repeatable "random" number between 0 and 1
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function curvePoint(p0, p1, p2, t) {        // a point on a curve (quadratic Bezier)
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y
  };
}

// ---------- Draw one bulb ----------
function addBulb(group, w, x, y) {
  const g = make("g", { class: "bulb" });
  // Bulbs near the top-centre light first, then the glow spreads outward and down
  const delay = Math.round(y * 1.1 + Math.abs(x - w / 2) * 0.6);
  g.style.setProperty("--d", delay + "ms");
  g.appendChild(make("circle",  { cx: x, cy: y + 5, r: 17, class: "halo" }));
  g.appendChild(make("ellipse", { cx: x, cy: y + 5, rx: 4.2, ry: 6, class: "core" }));
  group.appendChild(g);
}

// ---------- Draw a wire with bulbs along it ----------
function addStrand(group, w, p0, p1, p2, spacing) {
  group.appendChild(make("path", {
    class: "wire",
    d: `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`
  }));
  const length = Math.hypot(p2.x - p0.x, p2.y - p0.y) * 1.05;
  const count = Math.max(1, Math.floor(length / spacing));
  for (let k = 0; k < count; k++) {
    const p = curvePoint(p0, p1, p2, (k + 0.5) / count);
    addBulb(group, w, p.x, p.y);
  }
}

// ---------- Build all the lights ----------
let lastW = 0, lastH = 0;

function drawLights() {
  const w = scene.clientWidth;
  const h = scene.clientHeight;
  lastW = w; lastH = h;

  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  strands.innerHTML = "";

  const swags = Math.max(2, Math.round(w / 380));   // curved strings across the top
  const keepClear = Math.min(130, w * 0.22);         // empty space around the switch
  let id = 0;

  for (let i = 0; i < swags; i++) {
    const x0 = (i * w) / swags - 10;
    const x1 = ((i + 1) * w) / swags + 10;
    const sag = 60 + (i % 2) * 28;
    const p0 = { x: x0, y: -8 };
    const p1 = { x: (x0 + x1) / 2, y: -8 + 2 * sag };
    const p2 = { x: x1, y: -8 };

    addStrand(strands, w, p0, p1, p2, 34);

    // Strands that fall from the swag, down toward the bottom
    [0.2, 0.5, 0.8].forEach(function (t) {
      id++;
      const top = curvePoint(p0, p1, p2, t);
      if (Math.abs(top.x - w / 2) < keepClear) return;   // leave room for the switch

      const len = h * (0.5 + 0.45 * rnd(id)) - top.y;
      const bend1 = (rnd(id + 40) - 0.5) * 30;
      const bend2 = (rnd(id + 80) - 0.5) * 20;

      const drop = make("g", { class: "drop" });
      drop.style.transformOrigin = `${top.x}px ${top.y}px`;
      drop.style.setProperty("--dur", (5 + rnd(id + 7) * 3).toFixed(1) + "s");
      drop.style.animationDelay = (-rnd(id + 9) * 5).toFixed(1) + "s";

      addStrand(
        drop, w,
        { x: top.x, y: top.y },
        { x: top.x + bend1, y: top.y + len / 2 },
        { x: top.x + bend2, y: top.y + len },
        38
      );
      strands.appendChild(drop);
    });
  }
}

drawLights();

// Redraw if the window width really changes (ignore small phone address-bar jumps)
let timer;
window.addEventListener("resize", function () {
  clearTimeout(timer);
  timer = setTimeout(function () {
    if (scene.clientWidth !== lastW || Math.abs(scene.clientHeight - lastH) > 120) drawLights();
  }, 200);
});

// ---------- The switch ----------
toggle.addEventListener("click", function () {
  const on = !document.body.classList.contains("lit");
  document.body.classList.toggle("lit", on);
  toggle.setAttribute("aria-pressed", on);
  toggle.setAttribute("aria-label", on ? "Turn the lights off" : "Turn the lights on");
});
