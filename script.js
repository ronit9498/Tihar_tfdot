const root = document.body;
const scene = document.getElementById("scene");
const lightsSvg = document.getElementById("lights");
const strands = document.getElementById("strands");
const toggle = document.getElementById("switch");
const NS = "http://www.w3.org/2000/svg";
const BULB_COLORS = ["#ffc857", "#ffb43a", "#ffe9a8"];

function make(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  for (const key in attrs) el.setAttribute(key, attrs[key]);
  return el;
}

function rnd(i) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function curvePoint(p0, p1, p2, t) {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y
  };
}

function petals(group, count, inner, outer, width, offset) {
  const mid = (inner + outer) / 2;
  for (let i = 0; i < count; i++) {
    group.appendChild(make("path", {
      d: `M100 ${100 - inner} Q${100 + width} ${100 - mid} 100 ${100 - outer} Q${100 - width} ${100 - mid} 100 ${100 - inner}Z`,
      transform: `rotate(${(i * 360) / count + (offset || 0)} 100 100)`
    }));
  }
}

function circle(group, r, extra) {
  group.appendChild(make("circle", Object.assign({ cx: 100, cy: 100, r: r }, extra || {})));
}

function mandala(el) {
  const g = make("g", { class: "spin" });
  circle(g, 97, { "stroke-dasharray": "1 4" });
  circle(g, 92);
  petals(g, 24, 70, 91, 7);
  circle(g, 68);
  petals(g, 16, 46, 68, 10);
  circle(g, 44);
  petals(g, 8, 22, 44, 12);
  circle(g, 20);
  petals(g, 12, 6, 20, 4);
  circle(g, 5);
  el.appendChild(g);
}

function lotus(el) {
  const g = make("g", { class: "spin rev" });
  petals(g, 8, 14, 96, 26, 0);
  petals(g, 8, 14, 70, 16, 22.5);
  petals(g, 8, 14, 44, 10, 0);

  let star = "";
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    const r = i % 2 ? 18 : 40;
    star += (i ? "L" : "M") + (100 + r * Math.sin(angle)).toFixed(1) + " " + (100 - r * Math.cos(angle)).toFixed(1);
  }
  g.appendChild(make("path", { d: star + "Z" }));
  circle(g, 9);

  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 + Math.PI / 8;
    g.appendChild(make("circle", {
      cx: (100 + 98 * Math.sin(angle)).toFixed(1),
      cy: (100 - 98 * Math.cos(angle)).toFixed(1),
      r: 1.6
    }));
  }
  el.appendChild(g);
}

document.querySelectorAll(".mdl.l, .mdl.r").forEach(mandala);
lotus(document.querySelector(".mdl.c"));
mandala(document.getElementById("bgm"));

const DIYA =
  '<svg class="dy" viewBox="0 0 44 40">' +
  '<circle class="glow" cx="22" cy="16" r="16"/>' +
  '<path class="fl" d="M22 3C28 10 29 17 22 24C15 17 16 10 22 3Z"/>' +
  '<path class="bowl" d="M3 24Q22 26 41 24Q38 37 22 37Q6 37 3 24Z"/>' +
  "</svg>";
document.getElementById("diyos").innerHTML = DIYA.repeat(5);
document.getElementById("blessingDiya").innerHTML = DIYA;

let bulbCount = 0;

function addBulb(group, w, x, y) {
  bulbCount++;
  const bulb = make("g", { class: "bulb" });
  bulb.style.setProperty("--c", BULB_COLORS[bulbCount % 3]);
  bulb.style.setProperty("--d", Math.round(y * 1.1 + Math.abs(x - w / 2) * 0.6) + "ms");
  bulb.style.setProperty("--t", (-rnd(bulbCount) * 3).toFixed(1) + "s");
  bulb.appendChild(make("circle", { cx: x, cy: y + 9, r: 16, class: "bulb-glow-lg" }));
  bulb.appendChild(make("circle", { cx: x, cy: y + 9, r: 9, class: "bulb-glow-sm" }));
  bulb.appendChild(make("rect", { x: x - 2.5, y: y, width: 5, height: 4, rx: 1, class: "cap" }));
  bulb.appendChild(make("circle", { cx: x, cy: y + 9, r: 5, class: "glass" }));
  bulb.appendChild(make("circle", { cx: x - 1.6, cy: y + 7.4, r: 1.3, class: "shine" }));
  group.appendChild(bulb);
}

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

let lastWidth = 0;
let lastHeight = 0;

function drawLights() {
  const w = scene.clientWidth;
  const h = scene.clientHeight;
  lastWidth = w;
  lastHeight = h;
  bulbCount = 0;
  lightsSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  strands.innerHTML = "";

  const swags = Math.max(2, Math.round(w / 380));
  const keepClear = w * 0.3;
  let id = 0;

  for (let i = 0; i < swags; i++) {
    const x0 = (i * w) / swags - 10;
    const x1 = ((i + 1) * w) / swags + 10;
    const sag = 44 + (i % 2) * 20;
    const p0 = { x: x0, y: -8 };
    const p1 = { x: (x0 + x1) / 2, y: -8 + 2 * sag };
    const p2 = { x: x1, y: -8 };

    addStrand(strands, w, p0, p1, p2, 30);

    [0.15, 0.85].forEach(function (t) {
      id++;
      const top = curvePoint(p0, p1, p2, t);
      if (Math.abs(top.x - w / 2) < keepClear) return;

      const len = 50 + rnd(id) * 80;
      const bend1 = (rnd(id + 40) - 0.5) * 20;
      const bend2 = (rnd(id + 80) - 0.5) * 14;

      const drop = make("g", { class: "drop" });
      drop.style.transformOrigin = `${top.x}px ${top.y}px`;
      drop.style.setProperty("--dur", (5 + rnd(id + 7) * 3).toFixed(1) + "s");
      drop.style.animationDelay = (-rnd(id + 9) * 5).toFixed(1) + "s";

      addStrand(
        drop, w,
        { x: top.x, y: top.y },
        { x: top.x + bend1, y: top.y + len / 2 },
        { x: top.x + bend2, y: top.y + len },
        32
      );
      strands.appendChild(drop);
    });
  }
}

drawLights();

const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");
const SPARK_COLORS = ["#ffc857", "#ff9a1f", "#fff1d6", "#ffb43a"];
let W = 0;
let H = 0;
let sparks = [];
let rockets = [];
let animating = false;
let timers = [];

function sizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  W = scene.clientWidth;
  H = scene.clientHeight;
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
sizeCanvas();

let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    sizeCanvas();
    if (scene.clientWidth !== lastWidth || scene.clientHeight !== lastHeight) drawLights();
  }, 120);
});

function pickColor() {
  return SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
}

function later(fn, ms) {
  timers.push(setTimeout(fn, ms));
}

function burst(x, y) {
  const colorA = pickColor();
  const colorB = pickColor();
  for (let i = 0; i < 30; i++) {
    const angle = (Math.PI * 2 * i) / 30;
    const speed = 1 + Math.random() * 1.5;
    sparks.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.017 + Math.random() * 0.01,
      color: i % 2 ? colorA : colorB,
      gravity: 0.03
    });
  }
}

function launchRocket(fraction) {
  rockets.push({
    x: W * fraction,
    y: H - 175,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -(6 + Math.random() * 1.2),
    targetY: H * (0.12 + Math.random() * 0.2)
  });
  startAnimation();
}

function lightAnar(fraction) {
  const x = W * fraction;
  let ticks = 0;
  const timer = setInterval(function () {
    for (let i = 0; i < 4; i++) {
      sparks.push({
        x: x,
        y: H - 185,
        vx: (Math.random() - 0.5) * 1.4,
        vy: -(2.5 + Math.random() * 2.5),
        life: 1,
        decay: 0.03,
        color: Math.random() < 0.5 ? "#ffc857" : "#fff1d6",
        gravity: 0.09
      });
    }
    startAnimation();
    if (++ticks > 24) clearInterval(timer);
  }, 45);
  timers.push(timer);
}

function startAnimation() {
  if (!animating) {
    animating = true;
    requestAnimationFrame(frame);
  }
}

function frame() {
  ctx.clearRect(0, 0, W, H);

  rockets = rockets.filter(function (r) {
    r.x += r.vx;
    r.y += r.vy;
    sparks.push({ x: r.x, y: r.y + 6, vx: 0, vy: 0.4, life: 0.6, decay: 0.06, color: "#ffc857", gravity: 0 });
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fff1d6";
    ctx.fillRect(r.x - 1.5, r.y - 5, 3, 10);
    if (r.y <= r.targetY) {
      burst(r.x, r.y);
      return false;
    }
    return true;
  });

  sparks = sparks.filter(function (p) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.life -= p.decay;
    if (p.life <= 0) return false;
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
    ctx.fill();
    return true;
  });

  ctx.globalAlpha = 1;
  if (sparks.length || rockets.length) requestAnimationFrame(frame);
  else animating = false;
}

function startShow() {
  const positions = [0.18, 0.78, 0.45, 0.9, 0.1, 0.62, 0.32, 0.5, 0.85, 0.25];
  positions.forEach(function (x, i) {
    later(function () { launchRocket(x); }, i * 230);
  });
  later(function () { lightAnar(0.14); }, 450);
  later(function () { lightAnar(0.86); }, 1150);
  later(function () { lightAnar(0.5); }, 1750);
}

function stopShow() {
  timers.forEach(function (t) {
    clearTimeout(t);
    clearInterval(t);
  });
  timers = [];
  rockets = [];
  sparks = [];
  ctx.clearRect(0, 0, W, H);
}

const DAYS = [
  {
    name: "Kaag Tihar",
    tagline: "The day of the crows",
    sections: [
      { h: "About the day", p: "Tihar begins by honoring the crow. In traditional belief, crows are messengers of Yama, the god of death, and their cawing is said to signal sadness or bad news. Feeding them is a way to ask for peace and good news at home." },
      { h: "Traditions", list: [
        "Offering rice, sweets and grains on rooftops and windowsills in the morning.",
        "Cleaning the home and lighting the first lamps in the evening."
      ] },
      { h: "Significance", p: "A gesture of respect for every living creature and a hope for a peaceful household." }
    ]
  },
  {
    name: "Kukur Tihar",
    tagline: "The day of the dogs",
    sections: [
      { h: "About the day", p: "Dogs are honored as loyal companions and guardians, and in tradition are linked with Yama. The day often coincides with Narak Chaturdashi, when many families light lamps in the evening." },
      { h: "Traditions", list: [
        "Putting a red tika on the dog’s forehead.",
        "Hanging a marigold garland around its neck.",
        "Offering a special meal, including to street dogs."
      ] },
      { h: "Significance", p: "A thank-you for loyalty, protection and friendship." }
    ]
  },
  {
    name: "Laxmi Puja",
    tagline: "The festival of lights and prosperity",
    sections: [
      { h: "About the day", p: "The main day of Tihar. It begins with Gai Tihar in the morning and ends with Laxmi Puja in the evening, when Goddess Laxmi is welcomed into the home." },
      { h: "Morning: Gai Tihar", p: "Cows are worshipped with a tika, garlands and fresh grass, as a symbol of prosperity." },
      { h: "Evening: Laxmi Puja", p: "Homes and shops are cleaned, doors are left open, and rows of diyos and lights are lit to welcome Laxmi." },
      { h: "Traditions", list: [
        "Lighting oil lamps and candles.",
        "Making rangoli from the doorway to the puja room.",
        "Performing Laxmi Puja.",
        "Singing Bhailo and Deusi from house to house."
      ] },
      { h: "Significance", p: "A celebration of prosperity, happiness and good fortune." }
    ]
  },
  {
    name: "Goru Tihar / Mha Puja",
    tagline: "Gratitude for strength, and a fresh start",
    sections: [
      { h: "About the day", p: "Two separate traditions fall on this day, celebrated by different communities." },
      { h: "Goru Tihar", p: "Oxen are honored for their work in the fields with a tika, garlands and good food. Some families also make a small hill of cow dung and worship it as Govardhan Puja." },
      { h: "Mha Puja", p: "A distinct Newar tradition. “Mha” means body or self. People draw a mandala in colored powder and worship and purify themselves with offerings and lamps. It is also the first day of Nepal Sambat, the Newar new year." },
      { h: "Significance", p: "Goru Tihar values hard work and gratitude. Mha Puja celebrates self-purification, health and new beginnings." }
    ]
  },
  {
    name: "Bhai Tika",
    tagline: "The bond between sisters and brothers",
    sections: [
      { h: "About the day", p: "The last day of Tihar. It is linked to the story of Yamuna, who put a tika on her brother Yama and asked that brothers be protected from death." },
      { h: "Traditions", list: [
        "Sisters pour a line of oil around their brother, put a seven-colored tika on his forehead and hang a garland of makhamali flowers.",
        "The garland’s flowers stay fresh for a long time, a symbol of long life.",
        "Sisters offer sweets, fruits and nuts; brothers give gifts and blessings in return.",
        "Families gather for a feast."
      ] },
      { h: "The seven-colored tika", p: "The tika is made with seven colors. People often describe them as a wish for a long, protected and prosperous life for the brother. Meanings vary by family and region." },
      { h: "Significance", p: "It celebrates the bond between sisters and brothers and ends Tihar with love and togetherness." }
    ]
  }
];

const tabs = document.querySelectorAll("#tabs .tab");
const detail = document.getElementById("day-panel");

tabs.forEach(function (tab, i) {
  tab.id = "day-tab-" + i;
  tab.setAttribute("role", "tab");
  tab.setAttribute("aria-controls", "day-panel");
});

function showDay(index) {
  tabs.forEach(function (tab, i) {
    tab.classList.toggle("on", i === index);
    tab.setAttribute("aria-selected", i === index ? "true" : "false");
    tab.setAttribute("tabindex", i === index ? "0" : "-1");
  });
  detail.setAttribute("aria-labelledby", "day-tab-" + index);

  const day = DAYS[index];
  detail.innerHTML = "";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Day " + (index + 1);
  const title = document.createElement("h3");
  title.textContent = day.name;
  const tagline = document.createElement("p");
  tagline.className = "tagline";
  tagline.textContent = day.tagline;
  detail.append(eyebrow, title, tagline);

  day.sections.forEach(function (s) {
    const sec = document.createElement("div");
    sec.className = "sec";
    const head = document.createElement("h4");
    head.textContent = s.h;
    sec.appendChild(head);
    if (s.p) {
      const p = document.createElement("p");
      p.textContent = s.p;
      sec.appendChild(p);
    }
    if (s.list) {
      const ul = document.createElement("ul");
      s.list.forEach(function (t) {
        const li = document.createElement("li");
        li.textContent = t;
        ul.appendChild(li);
      });
      sec.appendChild(ul);
    }
    detail.appendChild(sec);
  });
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    showDay(Number(tab.dataset.i));
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  });
});

tabs.forEach(function (tab, index) {
  tab.addEventListener("keydown", function (event) {
    let nextIndex = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    showDay(nextIndex);
    tabs[nextIndex].focus();
  });
});

showDay(0);

toggle.addEventListener("click", function () {
  const on = !root.classList.contains("lit");
  root.classList.toggle("lit", on);
  toggle.setAttribute("aria-pressed", on);
  toggle.setAttribute("aria-label", on ? "Turn the lights off" : "Turn the lights on");

  stopShow();
  if (on && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    later(startShow, 2300);
  }
});
