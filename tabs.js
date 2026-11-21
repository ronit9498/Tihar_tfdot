// Day cards (tab buttons + illustrations). Loaded before script.js.
document.getElementById("tabs").innerHTML = `
<button class="tab on" data-i="0" type="button">
  <svg viewBox="0 0 118 156" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2a0a2a"/>
        <stop offset=".5" stop-color="#9b2335"/>
        <stop offset="1" stop-color="#f0922b"/>
      </linearGradient>
    </defs>
    <rect width="118" height="156" fill="url(#sky1)"/>
    <circle cx="59" cy="78" r="42" fill="#ffc857" opacity=".25"/>
    <circle cx="59" cy="78" r="25" fill="#ffd77a"/>
    <g fill="#fff1d6">
      <circle cx="20" cy="18" r="1.2"/>
      <circle cx="44" cy="28" r="1"/>
      <circle cx="98" cy="20" r="1.3"/>
      <circle cx="84" cy="38" r="1"/>
    </g>
    <rect y="94" width="118" height="62" fill="#2a0a08"/>
    <rect x="8" y="80" width="10" height="16" fill="#2a0a08"/>
    <g fill="#120a0a">
      <polygon points="26,80 3,92 2,76"/>
      <ellipse cx="46" cy="78" rx="24" ry="13" transform="rotate(-6 46 78)"/>
      <ellipse cx="64" cy="70" rx="9" ry="8"/>
      <circle cx="72" cy="65" r="9"/>
      <rect x="40" y="88" width="2.2" height="7"/>
      <rect x="52" y="88" width="2.2" height="7"/>
    </g>
    <path d="M38 95 H45 M50 95 H57" stroke="#120a0a" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M79 62 L97 67 Q87 70 79 70Z" fill="#ffc857"/>
    <path d="M28 76 Q46 58 68 70 Q52 88 28 76Z" fill="#1d1414" stroke="#ffd77a" stroke-width=".9" stroke-opacity=".7"/>
    <path d="M36 76 Q46 70 58 72" stroke="#ffd77a" stroke-width=".6" stroke-opacity=".5" fill="none"/>
    <circle cx="75" cy="63" r="1.6" fill="#ffe9a8"/>
    <ellipse cx="98" cy="93" rx="13" ry="3.5" fill="#e8961a"/>
    <ellipse cx="98" cy="91.6" rx="10" ry="2.6" fill="#ffc857"/>
    <g fill="#fff1d6">
      <circle cx="94" cy="91" r="1"/>
      <circle cx="98" cy="90.6" r="1"/>
      <circle cx="102" cy="91" r="1"/>
    </g>
  </svg>
  <span class="lb"><span class="d">Day 1</span><span class="nm">Kaag Tihar</span></span>
</button>

<button class="tab" data-i="1" type="button">
  <svg viewBox="0 0 118 156" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a0c18"/>
        <stop offset="1" stop-color="#3a0610"/>
      </linearGradient>
    </defs>
    <rect width="118" height="156" fill="url(#bg2)"/>
    <g transform="translate(0 -16)">
      <circle cx="59" cy="62" r="40" fill="#ffc857" opacity=".12"/>
      <ellipse cx="59" cy="118" rx="30" ry="18" fill="#a8703a"/>
      <path d="M38 44 Q27 48 25 66 Q25 78 34 76 Q43 72 44 54Z" fill="#5a3216"/>
      <path d="M80 44 Q91 48 93 66 Q93 78 84 76 Q75 72 74 54Z" fill="#5a3216"/>
      <ellipse cx="59" cy="62" rx="23" ry="21" fill="#c98a4b"/>
      <path d="M59 42 Q64 56 62 66 H56 Q54 56 59 42Z" fill="#e0b078"/>
      <ellipse cx="59" cy="76" rx="12.5" ry="10" fill="#f0d3a8"/>
      <ellipse cx="49" cy="51" rx="3" ry="1.8" fill="#e0b078"/>
      <ellipse cx="69" cy="51" rx="3" ry="1.8" fill="#e0b078"/>
      <circle cx="49" cy="57" r="3.2" fill="#1a0e0a"/>
      <circle cx="69" cy="57" r="3.2" fill="#1a0e0a"/>
      <circle cx="50" cy="56" r="1" fill="#fff"/>
      <circle cx="70" cy="56" r="1" fill="#fff"/>
      <ellipse cx="59" cy="71" rx="5.5" ry="3.8" fill="#1a0e0a"/>
      <path d="M59 75 V79 M59 79 Q53 84 48 80 M59 79 Q65 84 70 80" stroke="#1a0e0a" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M55 82 Q59 95 63 82Z" fill="#e8788a"/>
      <path d="M59 83 V89" stroke="#c4566a" stroke-width=".8"/>
      <ellipse cx="59" cy="47" rx="2.8" ry="3.6" fill="#d6203a"/>
      <g fill="#ff9a1f">
        <circle cx="19" cy="88" r="6.2"/>
        <circle cx="42" cy="103" r="6.2"/>
        <circle cx="59" cy="107" r="6.2"/>
        <circle cx="76" cy="103" r="6.2"/>
        <circle cx="99" cy="88" r="6.2"/>
      </g>
      <g fill="#ffc857">
        <circle cx="30" cy="97" r="6.2"/>
        <circle cx="51" cy="106" r="6.2"/>
        <circle cx="67" cy="106" r="6.2"/>
        <circle cx="88" cy="97" r="6.2"/>
      </g>
      <g fill="#c2570a">
        <circle cx="19" cy="88" r="2.2"/>
        <circle cx="30" cy="97" r="2.2"/>
        <circle cx="42" cy="103" r="2.2"/>
        <circle cx="51" cy="106" r="2.2"/>
        <circle cx="59" cy="107" r="2.2"/>
        <circle cx="67" cy="106" r="2.2"/>
        <circle cx="76" cy="103" r="2.2"/>
        <circle cx="88" cy="97" r="2.2"/>
        <circle cx="99" cy="88" r="2.2"/>
      </g>
    </g>
  </svg>
  <span class="lb"><span class="d">Day 2</span><span class="nm">Kukur Tihar</span></span>
</button>

<button class="tab" data-i="2" type="button">
  <svg viewBox="0 0 118 156" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="bg3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5a0a14"/>
        <stop offset="1" stop-color="#2a0408"/>
      </linearGradient>
      <radialGradient id="glow3">
        <stop offset="0" stop-color="#ffc857" stop-opacity=".5"/>
        <stop offset="1" stop-color="#ffc857" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="118" height="156" fill="url(#bg3)"/>
    <g transform="translate(0 -14)">
      <circle cx="59" cy="64" r="50" fill="url(#glow3)"/>
      <path d="M8 116 V58 Q8 22 59 22 Q110 22 110 58 V116" fill="none" stroke="#ffc857" stroke-width="1.6" opacity=".55"/>
      <path d="M14 116 V58 Q14 28 59 28 Q104 28 104 58 V116" fill="none" stroke="#ffc857" stroke-width=".8" opacity=".35"/>
      <g stroke="#ffc857" stroke-width="1" opacity=".35" stroke-linecap="round">
        <line x1="59" y1="32" x2="59" y2="42"/>
        <line x1="59" y1="32" x2="59" y2="42" transform="rotate(30 59 64)"/>
        <line x1="59" y1="32" x2="59" y2="42" transform="rotate(60 59 64)"/>
        <line x1="59" y1="32" x2="59" y2="42" transform="rotate(90 59 64)"/>
        <line x1="59" y1="32" x2="59" y2="42" transform="rotate(120 59 64)"/>
        <line x1="59" y1="32" x2="59" y2="42" transform="rotate(150 59 64)"/>
        <line x1="59" y1="32" x2="59" y2="42" transform="rotate(180 59 64)"/>
        <line x1="59" y1="32" x2="59" y2="42" transform="rotate(210 59 64)"/>
        <line x1="59" y1="32" x2="59" y2="42" transform="rotate(240 59 64)"/>
        <line x1="59" y1="32" x2="59" y2="42" transform="rotate(270 59 64)"/>
        <line x1="59" y1="32" x2="59" y2="42" transform="rotate(300 59 64)"/>
        <line x1="59" y1="32" x2="59" y2="42" transform="rotate(330 59 64)"/>
      </g>
      <g transform="translate(59 106) scale(1 .38)">
        <circle r="25" fill="none" stroke="#ffc857" stroke-width="1.6" stroke-dasharray="1 3.5" stroke-linecap="round"/>
        <g fill="#d6203a">
          <ellipse cy="-14" rx="5" ry="11"/>
          <ellipse cy="-14" rx="5" ry="11" transform="rotate(90)"/>
          <ellipse cy="-14" rx="5" ry="11" transform="rotate(180)"/>
          <ellipse cy="-14" rx="5" ry="11" transform="rotate(270)"/>
        </g>
        <g fill="#ff9a1f">
          <ellipse cy="-14" rx="4.5" ry="10" transform="rotate(45)"/>
          <ellipse cy="-14" rx="4.5" ry="10" transform="rotate(135)"/>
          <ellipse cy="-14" rx="4.5" ry="10" transform="rotate(225)"/>
          <ellipse cy="-14" rx="4.5" ry="10" transform="rotate(315)"/>
        </g>
        <circle r="6" fill="#ffc857"/>
      </g>
      <path d="M31 74 Q59 80 87 74 Q82 98 59 98 Q36 98 31 74Z" fill="#e8961a" stroke="#ffc857" stroke-width="1"/>
      <ellipse cx="59" cy="74" rx="28" ry="5" fill="#ffc857"/>
      <path d="M59 36 C70 50 72 63 59 74 C46 63 48 50 59 36Z" fill="#ffe08a"/>
      <path d="M59 52 C64 60 64 66 59 72 C54 66 54 60 59 52Z" fill="#fffbe6"/>
      <g transform="translate(8 0)">
        <path d="M10 92 Q20 94 30 92 Q28 103 20 103 Q12 103 10 92Z" fill="#e8961a" stroke="#ffc857" stroke-width=".8"/>
        <path d="M20 80 C25 86 25 90 20 93 C15 90 15 86 20 80Z" fill="#ffe08a"/>
      </g>
      <g transform="translate(70 0)">
        <path d="M10 92 Q20 94 30 92 Q28 103 20 103 Q12 103 10 92Z" fill="#e8961a" stroke="#ffc857" stroke-width=".8"/>
        <path d="M20 80 C25 86 25 90 20 93 C15 90 15 86 20 80Z" fill="#ffe08a"/>
      </g>
    </g>
  </svg>
  <span class="lb"><span class="d">Day 3</span><span class="nm">Laxmi Puja</span></span>
</button>

<button class="tab" data-i="3" type="button">
  <svg viewBox="0 0 118 156" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="bg4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5a1a0c"/>
        <stop offset="1" stop-color="#2a0a08"/>
      </linearGradient>
    </defs>
    <rect width="118" height="156" fill="url(#bg4)"/>
    <g transform="translate(0 -14)">
      <g fill="none" stroke="#ffc857" stroke-width=".8" opacity=".4">
        <circle cx="59" cy="52" r="44"/>
        <circle cx="59" cy="52" r="36" stroke-dasharray="1.5 3"/>
        <ellipse cx="59" cy="18" rx="3.5" ry="8"/>
        <ellipse cx="59" cy="18" rx="3.5" ry="8" transform="rotate(45 59 52)"/>
        <ellipse cx="59" cy="18" rx="3.5" ry="8" transform="rotate(90 59 52)"/>
        <ellipse cx="59" cy="18" rx="3.5" ry="8" transform="rotate(135 59 52)"/>
        <ellipse cx="59" cy="18" rx="3.5" ry="8" transform="rotate(180 59 52)"/>
        <ellipse cx="59" cy="18" rx="3.5" ry="8" transform="rotate(225 59 52)"/>
        <ellipse cx="59" cy="18" rx="3.5" ry="8" transform="rotate(270 59 52)"/>
        <ellipse cx="59" cy="18" rx="3.5" ry="8" transform="rotate(315 59 52)"/>
      </g>
      <path d="M94 50 Q104 56 101 70" stroke="#7a4a2c" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <ellipse cx="101" cy="73" rx="2.8" ry="4.5" fill="#4a2a18"/>
      <g fill="#7a4a2c">
        <rect x="47" y="64" width="6" height="26" rx="2"/>
        <rect x="56" y="64" width="6" height="26" rx="2"/>
        <rect x="82" y="64" width="6" height="26" rx="2"/>
        <rect x="90" y="64" width="6" height="26" rx="2"/>
      </g>
      <g fill="#2a1608">
        <rect x="47" y="87" width="6" height="4" rx="1"/>
        <rect x="56" y="87" width="6" height="4" rx="1"/>
        <rect x="82" y="87" width="6" height="4" rx="1"/>
        <rect x="90" y="87" width="6" height="4" rx="1"/>
      </g>
      <ellipse cx="68" cy="56" rx="29" ry="16" fill="#8a5a3c"/>
      <ellipse cx="50" cy="43" rx="11" ry="9" fill="#8a5a3c"/>
      <ellipse cx="42" cy="56" rx="12" ry="11" fill="#8a5a3c"/>
      <ellipse cx="33" cy="62" rx="12" ry="9.5" fill="#9a6a48" transform="rotate(25 33 62)"/>
      <ellipse cx="24" cy="70" rx="7" ry="5.5" fill="#d9b48a" transform="rotate(25 24 70)"/>
      <circle cx="21" cy="71" r="1.2" fill="#3a1f12"/>
      <circle cx="22.5" cy="75" r="2" fill="none" stroke="#ffc857" stroke-width="1"/>
      <ellipse cx="40" cy="56" rx="6.5" ry="3" fill="#7a4a2c" transform="rotate(-35 40 56)"/>
      <path d="M36 53 C32 42 37 36 47 34" stroke="#fff1d6" stroke-width="3.6" fill="none" stroke-linecap="round"/>
      <circle cx="31" cy="59" r="1.7" fill="#1a0e0a"/>
      <ellipse cx="34" cy="54.5" rx="1.6" ry="2.2" fill="#d6203a"/>
      <rect x="56" y="40" width="24" height="20" rx="3" fill="#b3182a" stroke="#ffc857" stroke-width="1"/>
      <path d="M68 44 L74 50 L68 56 L62 50Z" fill="none" stroke="#ffc857" stroke-width=".8"/>
      <g fill="#ff9a1f">
        <circle cx="43" cy="47" r="3.6"/>
        <circle cx="41" cy="59" r="3.6"/>
        <circle cx="47" cy="69" r="3.6"/>
      </g>
      <g fill="#ffc857">
        <circle cx="41" cy="53" r="3.6"/>
        <circle cx="43" cy="65" r="3.6"/>
      </g>
    </g>
  </svg>
  <span class="lb"><span class="d">Day 4</span><span class="nm">Goru Tihar / Mha Puja</span></span>
</button>

<button class="tab" data-i="4" type="button">
  <svg viewBox="0 0 118 156" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="bg5" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a0c18"/>
        <stop offset="1" stop-color="#3a0610"/>
      </linearGradient>
      <radialGradient id="glow5">
        <stop offset="0" stop-color="#ffc857" stop-opacity=".35"/>
        <stop offset="1" stop-color="#ffc857" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="118" height="156" fill="url(#bg5)"/>
    <circle cx="59" cy="60" r="52" fill="url(#glow5)"/>
    <g fill="#ffd9a0" fill-opacity=".38">
      <circle cx="38" cy="24" r="6.5"/>
      <circle cx="38" cy="16" r="3"/>
      <path d="M38 31 C30 36 26 46 24 58 H52 C50 46 46 36 38 31Z"/>
      <circle cx="82" cy="24" r="6.5"/>
      <path d="M82 31 C90 34 94 44 95 58 H69 C70 44 74 34 82 31Z"/>
    </g>
    <path d="M44 38 Q60 34 77 21" stroke="#ffd9a0" stroke-opacity=".38" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="82" cy="19.5" r="1.4" fill="#d6203a"/>
    <g fill="#ff9a1f">
      <circle cx="76" cy="32" r="2"/>
      <circle cx="82" cy="35" r="2"/>
      <circle cx="88" cy="32" r="2"/>
    </g>
    <ellipse cx="59" cy="70" rx="29" ry="24" fill="#b3601a"/>
    <ellipse cx="59" cy="70" rx="27" ry="22" fill="#ffc857"/>
    <ellipse cx="59" cy="70" rx="23" ry="18.5" fill="#5a1a0c" stroke="#b3601a" stroke-width="1"/>
    <circle cx="59" cy="70" r="4.2" fill="#fff1d6"/>
    <circle cx="59" cy="60" r="3.6" fill="#d6203a"/>
    <circle cx="69.2" cy="63.8" r="3.6" fill="#ffe14d"/>
    <circle cx="71.7" cy="72.2" r="3.6" fill="#3a9b4a"/>
    <circle cx="64.6" cy="79" r="3.6" fill="#3b6fd6"/>
    <circle cx="53.4" cy="79" r="3.6" fill="#ec6aa5"/>
    <circle cx="46.3" cy="72.2" r="3.6" fill="#ff7a2f"/>
    <circle cx="48.8" cy="63.8" r="3.6" fill="#fff1d6"/>
  </svg>
  <span class="lb"><span class="d">Day 5</span><span class="nm">Bhai Tika</span></span>
</button>
`;
