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

let bulbCount = 0;

function addBulb(group, w, x, y) {
  bulbCount++;
  const bulb = make("g", {});
  bulb.style.setProperty("--c", BULB_COLORS[bulbCount % 3]);
  bulb.style.setProperty("--d", Math.round(y * 1.1 + Math.abs(x - w / 2) * 0.6) + "ms");
  bulb.style.setProperty("--t", (-rnd(bulbCount) * 3).toFixed(1) + "s");
  bulb.appendChild(make("circle", { cx: x, cy: y + 9, r: 16, class: "h1" }));
  bulb.appendChild(make("circle", { cx: x, cy: y + 9, r: 9, class: "h2" }));
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

function drawLights() {
  const w = scene.clientWidth;
  const h = scene.clientHeight;
  lastWidth = w;
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
let sparks = [];
let rockets = [];
let animating = false;
let timers = [];

function sizeCanvas() {
  canvas.width = scene.clientWidth;
  canvas.height = scene.clientHeight;
}
sizeCanvas();

window.addEventListener("resize", function () {
  sizeCanvas();
  if (scene.clientWidth !== lastWidth) drawLights();
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
    x: canvas.width * fraction,
    y: canvas.height - 175,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -(6 + Math.random() * 1.2),
    targetY: canvas.height * (0.12 + Math.random() * 0.2)
  });
  startAnimation();
}

function lightAnar(fraction) {
  const x = canvas.width * fraction;
  let ticks = 0;
  const timer = setInterval(function () {
    for (let i = 0; i < 4; i++) {
      sparks.push({
        x: x,
        y: canvas.height - 185,
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const DAYS = [
  {
    title: "Day 1 · Kaag Tihar",
    intro: "Tihar starts with the crow. Crows are believed to be messengers of Yama, the god of death, and their loud caws are said to bring sadness. Feeding them is a way to keep sorrow away from the home.",
    points: [
      ["What people do", "Put out rice, sweets and grains on rooftops and windowsills in the morning. Many homes begin cleaning and lighting the first lamps in the evening."],
      ["What you will see", "Crows gathering around plates of food, and fresh marigold garlands being prepared for the days ahead."],
      ["Why it matters", "It shows respect for every living creature and asks for peace and good news in the home."]
    ]
  },
  {
    title: "Day 2 · Kukur Tihar",
    intro: "Dogs are honored as loyal friends and as guardians linked to Yama. This day is also known as Narak Chaturdashi, when many people light lamps in the evening.",
    points: [
      ["What people do", "Put a red tika on the dog’s forehead, hang a marigold garland around its neck, and offer a special meal. Street dogs are fed too."],
      ["What you will see", "Dogs wearing bright garlands, with families and children fussing over them."],
      ["Why it matters", "It is a way to say thank you for loyalty, protection and friendship."]
    ]
  },
  {
    title: "Day 3 · Laxmi Puja",
    intro: "The main day of Tihar. Goddess Laxmi, the goddess of wealth and good fortune, is welcomed into every home.",
    points: [
      ["In the morning", "Cows are worshipped as Gai Tihar, with a tika, garlands and fresh grass, because the cow stands for prosperity."],
      ["In the evening", "Homes and shops are cleaned, doors and windows are left open, and rows of lamps and lights are lit. A path of rangoli in colored powder leads from the door to the puja room to guide Laxmi in."],
      ["What you will see", "Bright houses, rangoli at the doorways, and groups of children singing Bhailo and Deusi from house to house."],
      ["Why it matters", "People believe a clean, bright home invites wealth and good luck for the year."]
    ]
  },
  {
    title: "Day 4 · Goru Tihar / Mha Puja",
    intro: "A day to thank those who give strength to the family. The ox is honored for its hard work in the fields, and in the Newar community people begin the new year by worshipping themselves.",
    points: [
      ["Goru Tihar", "Oxen get a tika, garlands and good food. Some families also make a small hill from cow dung and worship it as Govardhan Puja."],
      ["Mha Puja", "In the Newar community, people draw a mandala and worship their own body and soul with offerings and lamps. “Mha” means body or self. It is also the first day of Nepal Sambat, the Newar new year."],
      ["What you will see", "Mandalas drawn in colored powder, plates of offerings, and rows of diyos in the evening."],
      ["Why it matters", "It reminds people to value hard work, good health and a fresh start."]
    ]
  },
  {
    title: "Day 5 · Bhai Tika",
    intro: "The last day celebrates the bond between sisters and brothers. It comes from the story of Yamuna, who put a tika on her brother Yama and asked that brothers be protected from death.",
    points: [
      ["What sisters do", "Draw a circle of oil around their brother, put a seven-colored tika on his forehead and hang a garland of makhamali flowers that stay fresh for a long time. They offer sweets, fruits and nuts and pray for his long life."],
      ["What brothers do", "Give gifts and blessings in return, and the whole family shares a feast."],
      ["What you will see", "Colorful tikas on foreheads, plates of sweets and fruits, and relatives visiting each other’s homes."],
      ["Why it matters", "It strengthens family ties and ends Tihar with love and togetherness."]
    ]
  }
];

const tabs = document.querySelectorAll("#tabs .tab");
const detail = document.getElementById("detail");

function showDay(index) {
  tabs.forEach(function (tab, i) {
    tab.classList.toggle("on", i === index);
  });

  const day = DAYS[index];
  detail.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = day.title;

  const intro = document.createElement("p");
  intro.textContent = day.intro;

  const list = document.createElement("ul");
  day.points.forEach(function (point) {
    const item = document.createElement("li");
    const label = document.createElement("span");
    label.className = "lab";
    label.textContent = point[0];
    item.appendChild(label);
    item.appendChild(document.createTextNode(point[1]));
    list.appendChild(item);
  });

  detail.append(title, intro, list);
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    showDay(Number(tab.dataset.i));
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
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
