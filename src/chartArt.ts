// Engraved chart furniture, generated once as SVG strings for the portfolio markup.
// Every drawing here is authored geometry: rhumb lines, the planisphere, the compass
// rose, the certificate seals and the stroke icons share one hand.

export const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const n = (value: number) => +value.toFixed(2);
const TAU = Math.PI * 2;

/* ---------- Icons: one 1.5 stroke weight on a 24 grid ---------- */

const icon = (body: string, className = 'icon') =>
  `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const icons = {
  mail: icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
  globe: icon('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'),
  linkedin: icon(
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'
  ),
  github: icon(
    '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>'
  ),
  phone: icon(
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
  ),
  arrow: icon('<path d="M2 12 4 10 6 12 4 14Z"/><path d="M6 12h14"/><path d="M15 7l5 5-5 5"/>', 'icon icon-arrow'),
  external: icon('<path d="M7 17 17 7"/><path d="M9 7h8v8"/>', 'icon icon-external'),
  moon: icon('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>', 'icon moon'),
  sun: icon(
    '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
    'icon sun'
  ),
};

export const fleuron = `<svg class="fleuron" viewBox="0 0 48 12" aria-hidden="true" focusable="false"><path d="M24 2.5 27.5 6 24 9.5 20.5 6Z" fill="currentColor"/><path d="M18 6H9.5c-2.4 0-3.6-1.2-3.2-2.6.4-1.3 2.2-1.4 2.7-.2M30 6h8.5c2.4 0 3.6 1.2 3.2 2.6-.4 1.3-2.2 1.4-2.7.2" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`;

/* ---------- Shared gradients (referenced by id from every chart SVG) ---------- */

export const sharedDefs = `<svg class="svg-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>
<linearGradient id="g-brass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--brass-hi)"/><stop offset=".48" style="stop-color:var(--brass)"/><stop offset="1" style="stop-color:var(--brass-mid)"/></linearGradient>
<radialGradient id="g-brass-dome" cx=".38" cy=".32" r=".75"><stop offset="0" style="stop-color:var(--brass-hi)"/><stop offset=".55" style="stop-color:var(--brass)"/><stop offset="1" style="stop-color:var(--brass-lo)"/></radialGradient>
</defs></svg>`;

/* ---------- Portolan rhumb network behind the whole page ---------- */

export function rhumbLines(): string {
  const cx = 800;
  const cy = 500;
  const radius = 380;
  const reach = 2200;
  const roses: Array<[number, number]> = [[cx, cy]];
  for (let i = 0; i < 16; i++) {
    const a = (i * TAU) / 16;
    roses.push([cx + radius * Math.cos(a), cy + radius * Math.sin(a)]);
  }
  let winds = '';
  let halfWinds = '';
  for (const [x, y] of roses) {
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 8;
      const dx = Math.cos(a) * reach;
      const dy = Math.sin(a) * reach;
      const d = `M${n(x - dx)} ${n(y - dy)}L${n(x + dx)} ${n(y + dy)}`;
      if (k % 2 === 0) winds += d;
      else halfWinds += d;
    }
  }
  return `<svg class="rhumbs" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><path class="rhumbs-winds" d="${winds}"/><path class="rhumbs-half" d="${halfWinds}"/><circle class="rhumbs-circle" cx="${cx}" cy="${cy}" r="${radius}"/></svg>`;
}

/* ---------- Constellations: one per project ---------- */

type Constellation = {
  lines: string;
  faint?: string;
  stars: Array<[number, number, number]>;
};

const octagram = (() => {
  const r = 42;
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = -Math.PI / 2 + (i * TAU) / 8;
    return [n(Math.cos(a) * r), n(Math.sin(a) * r)] as [number, number];
  });
  const squareA = [0, 2, 4, 6].map((i) => pts[i]);
  const squareB = [1, 3, 5, 7].map((i) => pts[i]);
  const loop = (sq: Array<[number, number]>) => `M${sq.map(([x, y]) => `${x} ${y}`).join('L')}Z`;
  return {
    lines: loop(squareA) + loop(squareB),
    stars: [...pts.map(([x, y], i) => [x, y, i % 2 === 0 ? 2.6 : 2] as [number, number, number]), [0, 0, 3.4] as [number, number, number]],
  };
})();

const ecg: Array<[number, number]> = [
  [-62, 4], [-34, 4], [-24, -6], [-14, 4], [-6, 4], [0, -44], [8, 30], [16, 4], [30, 4], [42, -10], [54, 4],
];
const rising: Array<[number, number]> = [
  [-55, 35], [-35, 30], [-15, 18], [0, 2], [15, -15], [35, -30], [55, -38],
];

export const constellations: Constellation[] = [
  {
    lines: 'M0 0 0 -45M0 0 45 0M0 0 0 45M0 0 -45 0',
    faint: 'M0 -45A45 45 0 0 1 45 0A45 45 0 0 1 0 45A45 45 0 0 1 -45 0A45 45 0 0 1 0 -45',
    stars: [[0, 0, 3.8], [0, -45, 2.4], [45, 0, 2.4], [0, 45, 2.4], [-45, 0, 2.4]],
  },
  {
    lines: `M${ecg.map(([x, y]) => `${x} ${y}`).join('L')}`,
    stars: [[-62, 4, 2], [-24, -6, 2], [0, -44, 3.6], [8, 30, 2.6], [42, -10, 2.4], [54, 4, 2]],
  },
  octagram,
  {
    lines: `M${rising.map(([x, y]) => `${x} ${y}`).join('L')}`,
    faint: 'M-62 46H62M-62 46V-46',
    stars: rising.map(([x, y], i) => [x, y, i === rising.length - 1 ? 3.4 : 1.8 + i * 0.2] as [number, number, number]),
  },
];

export const constellationLabels = ['Agent Gateway', 'Health Canvas', 'IlmuAI', 'LLM Eval'];

const drawConstellation = (c: Constellation) =>
  `${c.faint ? `<path class="c-faint" d="${c.faint}"/>` : ''}<path class="c-lines" d="${c.lines}"/>${c.stars
    .map(([x, y, r]) => `<circle class="c-star" cx="${x}" cy="${y}" r="${r}"/>`)
    .join('')}`;

export const constellationGlyph = (index: number) =>
  `<svg class="find-glyph" viewBox="-72 -60 144 120" aria-hidden="true" focusable="false">${drawConstellation(constellations[index])}</svg>`;

/* ---------- Planisphere ---------- */

// Quadrant centres for the four constellations; the stage lays the finds out to match.
export const constellationCentres: Array<[number, number]> = [
  [-128, -112],
  [128, -112],
  [-128, 116],
  [128, 116],
];

export function planisphere(): string {
  const rand = mulberry32(0x5eed);
  let ticks = '';
  for (let d = 0; d < 360; d++) {
    const a = (d * Math.PI) / 180;
    const outer = d % 10 === 0 ? 286 : d % 5 === 0 ? 279 : 274;
    ticks += `M${n(Math.cos(a) * 270)} ${n(Math.sin(a) * 270)}L${n(Math.cos(a) * outer)} ${n(Math.sin(a) * outer)}`;
  }
  const numerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  const hours = numerals
    .map((label, i) => {
      const deg = -90 + i * 30;
      const a = (deg * Math.PI) / 180;
      const x = n(Math.cos(a) * 260);
      const y = n(Math.sin(a) * 260);
      return `<text class="p-hour" x="${x}" y="${y}" transform="rotate(${deg + 90} ${x} ${y})">${label}</text>`;
    })
    .join('');
  let meridians = '';
  for (let i = 0; i < 12; i++) {
    const a = (i * TAU) / 12;
    meridians += `M${n(Math.cos(a) * 18)} ${n(Math.sin(a) * 18)}L${n(Math.cos(a) * 250)} ${n(Math.sin(a) * 250)}`;
  }
  const keepClear = constellationCentres.map(([x, y]) => [x, y] as const);
  let stars = '';
  let placed = 0;
  while (placed < 180) {
    const r = Math.sqrt(rand()) * 244;
    const a = rand() * TAU;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (keepClear.some(([cx, cy]) => Math.hypot(x - cx, y - cy) < 62)) {
      continue;
    }
    const mag = rand();
    const radius = mag > 0.96 ? 1.9 : mag > 0.82 ? 1.3 : 0.8;
    stars += `<circle cx="${n(x)}" cy="${n(y)}" r="${radius}"/>`;
    placed++;
  }
  const groups = constellations
    .map(
      (c, i) =>
        `<g class="constellation" data-project="${i}" transform="translate(${constellationCentres[i][0]} ${constellationCentres[i][1]})"><circle class="c-halo" r="66"/>${drawConstellation(
          c
        )}<text class="c-label" y="${c === octagram ? 64 : 62}">${constellationLabels[i]}</text></g>`
    )
    .join('');
  const pole = 'M0 -9 2 -2 9 0 2 2 0 9 -2 2 -9 0 -2 -2Z';

  return `<svg class="planisphere" viewBox="-300 -300 600 600" role="img" aria-label="Planisphere charting four projects: Health Canvas, IlmuAI, LLM Evaluation Framework and Malaysia Agent Gateway">
<circle class="p-field" r="250"/>
<g class="p-grid"><circle r="60"/><circle r="120"/><circle r="180"/><circle r="240"/><path d="${meridians}"/></g>
<circle class="p-ecliptic" cx="0" cy="40" r="190"/>
<g class="p-stars">${stars}</g>
<path class="p-pole" d="${pole}"/>
<g class="p-limb"><circle r="286"/><circle r="270"/><circle r="250"/><path d="${ticks}"/></g>
<g class="p-hours">${hours}</g>
${groups}
</svg>`;
}

/* ---------- Compass rose for the contact sheet ---------- */

const kite = (deg: number, length: number, half: number, cls: string) => {
  const a = ((deg - 90) * Math.PI) / 180;
  const tip = [Math.cos(a) * length, Math.sin(a) * length];
  const left = [Math.cos(a - Math.PI / 2) * half, Math.sin(a - Math.PI / 2) * half];
  const right = [Math.cos(a + Math.PI / 2) * half, Math.sin(a + Math.PI / 2) * half];
  return `<path class="${cls}-light" d="M0 0L${n(left[0])} ${n(left[1])}L${n(tip[0])} ${n(tip[1])}Z"/><path class="${cls}-dark" d="M0 0L${n(right[0])} ${n(right[1])}L${n(tip[0])} ${n(tip[1])}Z"/>`;
};

export function compassRose(): string {
  let quarter = '';
  for (let i = 0; i < 16; i++) {
    const deg = 11.25 + i * 22.5;
    const a = ((deg - 90) * Math.PI) / 180;
    quarter += `M0 0L${n(Math.cos(a) * 66)} ${n(Math.sin(a) * 66)}`;
  }
  let ticks = '';
  for (let d = 0; d < 360; d += 2) {
    const a = (d * Math.PI) / 180;
    const inner = d % 10 === 0 ? 171 : 175;
    ticks += `M${n(Math.cos(a) * inner)} ${n(Math.sin(a) * inner)}L${n(Math.cos(a) * 180)} ${n(Math.sin(a) * 180)}`;
  }
  let points = '';
  for (let i = 0; i < 8; i++) points += kite(22.5 + i * 45, 82, 9, 'r-half');
  for (let i = 0; i < 4; i++) points += kite(45 + i * 90, 112, 14, 'r-inter');
  for (let i = 0; i < 4; i++) points += kite(i * 90, 150, 18, 'r-card');
  const letters = [
    ['N', 0, -158],
    ['E', 160, 0],
    ['S', 0, 160],
    ['W', -160, 0],
  ]
    .map(([l, x, y]) => `<text class="r-letter" x="${x}" y="${y}">${l}</text>`)
    .join('');

  return `<svg class="rose" viewBox="-200 -200 400 400" aria-hidden="true" focusable="false">
<circle class="r-ring" r="190"/><circle class="r-ring" r="180"/><circle class="r-ring" r="171"/>
<path class="r-ticks" d="${ticks}"/>
<circle class="r-ring r-ring-inner" r="124"/><circle class="r-ring r-ring-inner" r="120"/>
<path class="r-quarter" d="${quarter}"/>
${points}
${letters}
<g class="rose-needle"><path class="r-needle-a" d="M0 -138 7 0H-7Z"/><path class="r-needle-b" d="M0 138 7 0H-7Z"/></g>
<circle class="r-hub" r="8"/><circle class="r-pin" r="2.5"/>
</svg>`;
}

/* ---------- Certificate seals ---------- */

export function seal(monogram: string, ringText: string, key: string): string {
  let beads = '';
  for (let i = 0; i < 48; i++) {
    const a = (i * TAU) / 48;
    beads += `<circle cx="${n(Math.cos(a) * 52.5)}" cy="${n(Math.sin(a) * 52.5)}" r="1.25"/>`;
  }
  const ring = `${ringText} · ${ringText} · `;
  return `<svg class="seal-art" viewBox="-60 -60 120 120" aria-hidden="true" focusable="false">
<defs><path id="seal-path-${key}" d="M -45 0 A 45 45 0 1 1 45 0 A 45 45 0 1 1 -45 0"/></defs>
<circle class="seal-disc" r="57"/>
<g class="seal-beads">${beads}</g>
<circle class="seal-line" r="49"/><circle class="seal-line" r="36"/><circle class="seal-line seal-line-fine" r="33"/>
<text class="seal-ring"><textPath href="#seal-path-${key}" textLength="282" lengthAdjust="spacing">${ring}</textPath></text>
<text class="seal-mono" y="1">${monogram}</text>
</svg>`;
}

/* ---------- Static chart for browsers without WebGL ---------- */

export function heroFallback(): string {
  const fixes: Array<[number, number]> = [
    [170, 372],
    [240, 408],
    [352, 398],
    [452, 346],
    [470, 262],
    [408, 196],
  ];
  const course = `M${fixes.map(([x, y]) => `${x} ${y}`).join('L')}`;
  return `<svg class="hero-fallback" viewBox="0 0 600 520" aria-hidden="true" focusable="false">
<ellipse class="hf-disc" cx="300" cy="290" rx="270" ry="120"/>
<ellipse class="hf-disc hf-disc-inner" cx="300" cy="290" rx="190" ry="84"/>
<path class="hf-course" d="${course}"/>
<path class="hf-forward" d="M408 196Q470 130 560 70"/>
${fixes.map(([x, y]) => `<circle class="hf-fix" cx="${x}" cy="${y}" r="5"/>`).join('')}
<circle class="hf-orb" cx="300" cy="250" r="98" fill="url(#g-brass-dome)"/>
<ellipse class="hf-band" cx="300" cy="250" rx="98" ry="14"/>
<ellipse class="hf-ring" cx="300" cy="250" rx="42" ry="112"/>
<ellipse class="hf-ring" cx="300" cy="250" rx="118" ry="30" transform="rotate(-18 300 250)"/>
</svg>`;
}

/* ---------- Engraved bodies: the ports of call and the orrery ---------- */

type Body = {
  r: number;
  seed: number;
  shade?: number; // width of the shadowed crescent, as a fraction of r
  sun?: number; // direction the light comes from, in degrees
  step?: number;
  bands?: number[]; // latitude bands, -1 to 1
  meridians?: number[]; // meridian half-widths, as fractions of r
  craters?: number;
  stipple?: number;
};

// A sphere engraved the way a chart-maker cuts one: limb, bands or meridians, and a
// shadowed crescent laid in with parallel hatching that doubles up toward the limb.
function engravedBody(b: Body): string {
  const { r } = b;
  const rand = mulberry32(b.seed);
  const shade = (b.shade ?? 0.6) * r;
  const step = b.step ?? Math.max(2, r / 13);
  let hatch = '';
  let row = 0;
  for (let y = -r + step / 4; y < r; y += step / 2, row++) {
    const a = Math.sqrt(r * r - y * y);
    const end = Math.min(a, (row % 2 ? shade * 0.55 : shade) - a);
    if (end + a > 0.8) hatch += `M${n(-a)} ${n(y)}L${n(end)} ${n(y)}`;
  }
  let lines = '';
  for (const v of b.bands ?? []) {
    const y = v * r;
    const a = Math.sqrt(r * r - y * y);
    lines += `M${n(-a)} ${n(y)}A${n(a)} ${n(a * 0.2)} 0 0 0 ${n(a)} ${n(y)}`;
  }
  for (const m of b.meridians ?? []) {
    const w = n(m * r);
    lines += `M0 ${-r}A${w} ${r} 0 0 0 0 ${r}A${w} ${r} 0 0 0 0 ${-r}`;
  }
  const lit = (x: number, y: number, pad: number) =>
    x * x + y * y < (r - pad) ** 2 && (x - shade) ** 2 + y * y < (r - pad) ** 2;
  let craters = '';
  for (let k = 0, tries = 0; k < (b.craters ?? 0) && tries < 400; tries++) {
    const cr = r * (0.06 + rand() * 0.1);
    const t = rand() * TAU;
    const d = Math.sqrt(rand()) * r;
    const x = Math.cos(t) * d;
    const y = Math.sin(t) * d;
    if (!lit(x, y, cr * 1.3)) continue;
    craters += `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(cr)}" ry="${n(cr * 0.86)}"/><path d="M${n(x + cr * 0.2)} ${n(y - cr * 0.62)}A${n(cr * 0.64)} ${n(cr * 0.64)} 0 0 1 ${n(x + cr * 0.2)} ${n(y + cr * 0.62)}"/>`;
    k++;
  }
  let dots = '';
  for (let k = 0; k < (b.stipple ?? 0); k++) {
    const t = rand() * TAU;
    const d = Math.sqrt(rand()) * r;
    const x = Math.cos(t) * d;
    const y = Math.sin(t) * d;
    const depth = r - Math.hypot(x - shade, y);
    if (!lit(x, y, 1.2) || rand() > Math.exp(-depth / (r * 0.3))) continue;
    dots += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(0.45 + rand() * 0.5)}"/>`;
  }
  return `<circle class="eb-base" r="${r}"/><circle class="eb-dome" r="${r}" fill="url(#g-brass-dome)"/>${
    lines ? `<path class="eb-line" d="${lines}"/>` : ''
  }<g transform="rotate(${b.sun ?? -38})"><path class="eb-hatch" d="${hatch}"/>${craters ? `<g class="eb-crater">${craters}</g>` : ''}${
    dots ? `<g class="eb-dot">${dots}</g>` : ''
  }</g><circle class="eb-limb" r="${r}"/>`;
}

// The near (lower) or far (upper) half of a ring seen edge-on.
const ringHalf = (rx: number, ry: number, near: boolean) => `M${-rx} 0A${rx} ${n(ry)} 0 0 ${near ? 0 : 1} ${rx} 0`;

const rings = (radii: number[], flat: number, near: boolean) =>
  radii.map((rx) => `<path class="pm-ring${near ? '' : ' pm-ring-back'}" d="${ringHalf(rx, rx * flat, near)}"/>`).join('');

export type PortPlanet = 'relay' | 'mast' | 'giant' | 'moon';

export function portPlanet(kind: PortPlanet): string {
  let far = '';
  let body = '';
  let near = '';
  if (kind === 'relay') {
    // CitaGlobal: a brass globe inside an emerald holographic ring of relay satellites, underway
    body = engravedBody({ r: 42, seed: 0x5e01, shade: 0.5, bands: [-0.62, -0.32, 0, 0.32, 0.62], meridians: [0.38, 0.74] });
    const sats = [0.45, 1.15, 2.2]
      .map((a, k) => `<circle class="pm-sat" cx="${n(64 * Math.cos(a))}" cy="${n(16 * Math.sin(a))}" r="${k === 1 ? 3 : 2.2}"/>`)
      .join('');
    far = `<g transform="rotate(-16)"><path class="pm-holo pm-holo-back" d="${ringHalf(64, 16, false)}"/></g>`;
    near = `<g transform="rotate(-16)"><path class="pm-holo" d="${ringHalf(64, 16, true)}"/>${sats}</g><circle class="pm-halo" r="50"/>`;
  } else if (kind === 'mast') {
    // RTM: a world with a mast on its limb, broadcasting
    body = engravedBody({ r: 38, seed: 0x7a11, shade: 0.55, bands: [-0.5, 0.05, 0.5], stipple: 90 });
    const deg = -58;
    const a = (deg * Math.PI) / 180;
    const tx = Math.cos(a) * 54;
    const ty = Math.sin(a) * 54;
    const waves = [9, 16, 23]
      .map((wr, k) => {
        const a0 = ((deg - 48) * Math.PI) / 180;
        const a1 = ((deg + 48) * Math.PI) / 180;
        return `<path class="pm-wave" style="--k:${k}" d="M${n(tx + Math.cos(a0) * wr)} ${n(ty + Math.sin(a0) * wr)}A${wr} ${wr} 0 0 1 ${n(tx + Math.cos(a1) * wr)} ${n(ty + Math.sin(a1) * wr)}"/>`;
      })
      .join('');
    near = `<path class="pm-mast" d="M${n(Math.cos(a) * 38)} ${n(Math.sin(a) * 38)}L${n(tx)} ${n(ty)}"/><circle class="pm-tip" cx="${n(tx)}" cy="${n(ty)}" r="2.4"/>${waves}<circle class="pm-halo" r="46"/>`;
  } else if (kind === 'giant') {
    // EY: a ringed giant
    body = engravedBody({ r: 40, seed: 0xe7e7, shade: 0.62, bands: [-0.74, -0.5, -0.24, 0.06, 0.34, 0.6] });
    far = `<g transform="rotate(-14)">${rings([76, 68, 57], 0.26, false)}</g>`;
    near = `<g transform="rotate(-14)">${rings([76, 68, 57], 0.26, true)}</g>`;
  } else {
    // NV5: a cratered moon, surveyed
    body = engravedBody({ r: 40, seed: 0xc4e2, shade: 0.72, craters: 7, stipple: 80 });
  }
  return `<svg class="port-planet" viewBox="-80 -80 160 160" aria-hidden="true" focusable="false"><circle class="pm-approach" r="66"/>${far}${body}${near}</svg>`;
}

export function orbitPlanet(index: number): string {
  const start = [20, 140, 250, 60, 310][index] ?? 0;
  let far = '';
  let body = '';
  let near = '';
  if (index === 0) {
    body = engravedBody({ r: 25, seed: 0xa101, step: 3.4, shade: 0.5, bands: [-0.45, 0, 0.45], meridians: [0.5] });
    far = `<g transform="rotate(-20)"><path class="pm-holo pm-holo-back" d="${ringHalf(40, 10, false)}"/></g>`;
    near = `<g transform="rotate(-20)"><path class="pm-holo" d="${ringHalf(40, 10, true)}"/></g>`;
  } else if (index === 1) {
    body = engravedBody({ r: 27, seed: 0xa102, step: 3.4, shade: 0.6, bands: [-0.66, -0.36, -0.08, 0.2, 0.48, 0.72] });
  } else if (index === 2) {
    body = engravedBody({ r: 25, seed: 0xa103, step: 3.4, shade: 0.5, bands: [-0.5, 0, 0.5], meridians: [0.3, 0.7], stipple: 30 });
  } else if (index === 3) {
    body = engravedBody({ r: 22, seed: 0xa104, step: 3.4, shade: 0.6, bands: [-0.3, 0.3] });
    far = `<g transform="rotate(16)">${rings([42, 35], 0.24, false)}</g>`;
    near = `<g transform="rotate(16)">${rings([42, 35], 0.24, true)}</g>`;
  } else {
    body = engravedBody({ r: 22, seed: 0xa105, step: 3.4, shade: 0.74, craters: 4, stipple: 40 });
  }
  return `<svg class="orbit-glyph" viewBox="-60 -60 120 120" aria-hidden="true" focusable="false"><circle class="op-orbit" r="50"/><g class="op-moon" style="--start:${start}deg"><circle cx="50" cy="0" r="4.2"/></g>${far}${body}${near}</svg>`;
}

/* ---------- Sheet plates: one large engraving behind each section ---------- */

const plate = (name: string, viewBox: string, body: string, fit = '') =>
  `<svg class="art art-${name}" viewBox="${viewBox}"${fit ? ` preserveAspectRatio="${fit}"` : ''} aria-hidden="true" focusable="false">${body}</svg>`;

export function armillary(): string {
  let ticks = '';
  for (let d = 0; d < 360; d += 5) {
    const a = (d * Math.PI) / 180;
    const inner = d % 15 === 0 ? 258 : 266;
    ticks += `M${n(Math.cos(a) * inner)} ${n(Math.sin(a) * inner)}L${n(Math.cos(a) * 280)} ${n(Math.sin(a) * 280)}`;
  }
  let zodiac = '';
  for (let d = 0; d < 360; d += 7.5) {
    const a = (d * Math.PI) / 180;
    zodiac += `M${n(Math.cos(a) * 252)} ${n(Math.sin(a) * 90)}L${n(Math.cos(a) * 268)} ${n(Math.sin(a) * 110)}`;
  }
  const R = 262;
  const k = 0.23;
  const tropic = 0.41;
  const polar = 1.16;
  const latitude = (phi: number, cls = '') =>
    [-1, 1]
      .map(
        (s) =>
          `<ellipse${cls ? ` class="${cls}"` : ''} cy="${n(s * R * Math.sin(phi))}" rx="${n(R * Math.cos(phi))}" ry="${n(R * Math.cos(phi) * k)}"/>`
      )
      .join('');
  return plate(
    'armillary',
    '-340 -340 680 680',
    `<circle r="280"/><circle r="258"/><path d="${ticks}"/>
<g transform="rotate(-23.5)"><path d="M0 -334V334"/><circle class="a-solid" cy="-334" r="7"/><circle class="a-solid" cy="334" r="7"/>
<ellipse rx="${R}" ry="${n(R * k)}"/>${latitude(tropic, 'a-dash')}${latitude(polar)}<ellipse rx="96" ry="${R}"/><ellipse rx="204" ry="${R}"/></g>
<g transform="rotate(14)"><ellipse rx="268" ry="110"/><ellipse rx="252" ry="90"/><path d="${zodiac}"/></g>
<circle class="a-solid" r="46"/><ellipse rx="20" ry="46"/><ellipse rx="37" ry="46"/><ellipse rx="46" ry="11"/><circle r="46"/>`
  );
}

export function graticule(): string {
  const px = 1500;
  const py = -1400;
  let parallels = '';
  for (let k = 0; k < 16; k++) parallels += `<circle${k % 2 ? ' class="a-dash"' : ''} cx="${px}" cy="${py}" r="${1500 + k * 120}"/>`;
  let meridians = '';
  for (let deg = 94; deg <= 140; deg += 3) {
    const a = (deg * Math.PI) / 180;
    meridians += `M${n(px + Math.cos(a) * 1500)} ${n(py + Math.sin(a) * 1500)}L${n(px + Math.cos(a) * 3600)} ${n(py + Math.sin(a) * 3600)}`;
  }
  return plate('graticule', '0 0 1200 1600', `<path class="a-faint" d="${meridians}"/><g class="a-faint">${parallels}</g>`, 'xMidYMid slice');
}

export function comet(key: string): string {
  const rand = mulberry32(0xc0e7);
  let tail = '';
  for (let i = 0; i < 7; i++) {
    const spread = (i - 3) * 8;
    tail += `M372 40Q${n(230 + rand() * 20)} ${n(64 + spread)} ${n(14 + rand() * 30)} ${n(150 + spread * 2.6)}`;
  }
  return plate(
    'comet',
    '0 0 400 200',
    `<defs><linearGradient id="comet-fade-${key}" gradientUnits="userSpaceOnUse" x1="372" y1="40" x2="40" y2="160"><stop offset="0" style="stop-color:currentColor"/><stop offset="1" style="stop-color:currentColor;stop-opacity:0"/></linearGradient></defs>
<path d="${tail}" stroke="url(#comet-fade-${key})"/><circle class="a-glow" cx="372" cy="40" r="15"/><circle class="a-dot" cx="372" cy="40" r="4.5"/>`
  );
}

export function spiralGalaxy(): string {
  const rand = mulberry32(0x6a1a);
  const b = Math.log(12) / (2.6 * Math.PI);
  let dots = '';
  let spines = '';
  for (let arm = 0; arm < 3; arm++) {
    const turn = (arm * TAU) / 3;
    for (let i = 0; i < 180; i++) {
      const theta = rand() * 2.6 * Math.PI;
      const r = 40 * Math.exp(b * theta);
      const jitter = 8 + r * 0.14;
      const x = Math.cos(theta + turn) * r + (rand() - 0.5) * jitter;
      const y = Math.sin(theta + turn) * r + (rand() - 0.5) * jitter;
      dots += `<circle cx="${n(x)}" cy="${n(y)}" r="${rand() < 0.06 ? 2.2 : n(0.7 + rand() * 0.8)}"/>`;
    }
    let d = '';
    for (let k = 0; k <= 64; k++) {
      const theta = (k / 64) * 2.6 * Math.PI;
      const r = 40 * Math.exp(b * theta);
      d += `${k ? 'L' : 'M'}${n(Math.cos(theta + turn) * r)} ${n(Math.sin(theta + turn) * r)}`;
    }
    spines += d;
  }
  return plate('galaxy', '-500 -500 1000 1000', `<path class="a-faint" d="${spines}"/><g class="a-dots">${dots}</g><circle class="a-dash" r="30"/><circle r="12"/>`);
}

export function radiantSun(): string {
  let rays = '';
  let flames = '';
  const count = 32;
  for (let i = 0; i < count; i++) {
    const a = (i * TAU) / count;
    if (i % 2 === 0) {
      const w = 0.045;
      rays += `M${n(Math.cos(a - w) * 150)} ${n(Math.sin(a - w) * 150)}L${n(Math.cos(a) * 480)} ${n(Math.sin(a) * 480)}L${n(Math.cos(a + w) * 150)} ${n(Math.sin(a + w) * 150)}`;
    } else {
      for (let k = 0; k <= 28; k++) {
        const t = k / 28;
        const r = 150 + t * 260;
        const off = Math.sin(t * Math.PI * 5) * 0.03 * (1 - t * 0.5);
        flames += `${k ? 'L' : 'M'}${n(Math.cos(a + off) * r)} ${n(Math.sin(a + off) * r)}`;
      }
    }
  }
  let rings = '';
  for (let r = 18; r <= 118; r += 14) rings += `<circle class="a-faint" r="${r}"/>`;
  return plate('sun', '-500 -500 1000 1000', `<circle r="140"/><circle r="130"/>${rings}<path d="${rays}"/><path class="a-faint" d="${flames}"/><circle class="a-dash" r="300"/>`);
}

export function crescentMoon(): string {
  return plate(
    'moon',
    '-250 -250 500 500',
    `<circle class="a-dash" r="238"/>${engravedBody({ r: 214, seed: 0x3005, shade: 1.42, sun: 150, step: 9, craters: 5, stipple: 160 })}`
  );
}

export function planetrise(): string {
  const R = 1100;
  const cy = 1250;
  const rand = mulberry32(0x71a2);
  let bands = '';
  for (const y of [214, 262, 322, 396, 480, 580, 690]) {
    const a = Math.sqrt(R * R - (y - cy) ** 2);
    bands += `M${n(-a)} ${y}Q0 ${n(y + a * 0.09)} ${n(a)} ${y}`;
  }
  let hatch = '';
  for (let y = 156; y < 760; y += 7) {
    const a = Math.sqrt(R * R - (y - cy) ** 2);
    hatch += `M${n(-a)} ${y}L${n(-a + a * (0.16 + rand() * 0.05))} ${y}`;
  }
  const moon = `<g transform="translate(930 300) rotate(-12)">${rings([124, 106], 0.24, false)}<g transform="rotate(12)">${engravedBody({
    r: 58,
    seed: 0x71a3,
    shade: 0.6,
    step: 5,
    bands: [-0.52, -0.12, 0.3],
  })}</g>${rings([124, 106], 0.24, true)}</g>`;
  return plate(
    'planet',
    '-1000 0 2000 760',
    `<circle class="a-dash" cy="${cy}" r="${R + 70}"/><circle class="a-faint" cy="${cy}" r="${R + 34}"/>
<circle class="a-solid" cy="${cy}" r="${R}"/><path d="${bands}"/><path class="a-faint" d="${hatch}"/><circle cy="${cy}" r="${R}"/>${moon}`,
    'xMidYMax slice'
  );
}
