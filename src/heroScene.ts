// The hero's brass map-orb. It rests closed, then unlocks: the rings align, the glyph
// band lights, the hemispheres part and an emerald star chart blooms around it, plotting
// six career fixes and a dashed course forward into the uncharted.

import * as THREE from 'three';
import {
  BlendFunction,
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  ToneMappingEffect,
  ToneMappingMode,
} from 'postprocessing';
import { mulberry32 } from './chartArt';

export type Theme = 'dark' | 'light';

export interface HeroSceneHandle {
  setTheme(theme: Theme): void;
  setJourney(journey: number, snap?: boolean): void;
  setCovered(covered: boolean): void;
  dispose(): void;
}

/* ---------- Constants ---------- */

const TAU = Math.PI * 2;
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const FOV = 32;
const TILT = 0.42;
const YAW0 = (42 * Math.PI) / 180;
const PITCH_LIMIT = (15 * Math.PI) / 180;
const IDLE_SPIN = 0.021;
const T_OPEN = 3.2;
const START_DELAY = 800;
const COVERED_FRAME_MS = 32;
const GAP = 0.06;
const PART = 0.22;
const TWIST = (30 * Math.PI) / 180;
const LABEL_ORDER = [5, 2, 6, 3, 4, 1, 0];

// Fix positions at the rest bearing, after yaw and before tilt.
const REST: Array<[number, number, number]> = [
  [-0.86, -0.55, 1.8],
  [0.13, -0.42, 2.1],
  [1.23, -0.26, 1.3],
  [1.48, -0.04, -0.42],
  [0.86, 0.24, -1.9],
  [-0.26, 0.52, -2.3],
  [2.0, 0.75, -5.2],
];

// The yaw that turns the mean bearing of some fixes to an azimuth, measured from the
// camera, positive to the right.
const faceYaw = (fixes: number[], azimuth: number) => {
  let sx = 0;
  let sz = 0;
  for (const i of fixes) {
    const [x, , z] = REST[i];
    const l = Math.hypot(x, z);
    sx += x / l;
    sz += z / l;
  }
  return YAW0 + (azimuth * Math.PI) / 180 - Math.atan2(sx, sz);
};

// Stations of the scroll journey, one per passage between section cards: where the orb
// sits (viewport fractions), how far the camera stands, the chart's tilt, the bearing it
// turns to and which fixes keep their labels. The first is the hero, placed by layout().
type Station = { x: number; y: number; dist: number; tilt: number; face: number | null; labels: number[] };
const STATIONS: Station[] = [
  { x: 0.62, y: 0.5, dist: 1, tilt: TILT, face: null, labels: [0, 1, 2, 3, 4, 5, 6] },
  { x: 0.5, y: 0.52, dist: 0.62, tilt: 0.3, face: null, labels: [] },
  { x: 0.5, y: 0.5, dist: 0.9, tilt: 0.5, face: faceYaw([2, 3, 4, 5], 0), labels: [2, 3, 4, 5] },
  { x: 0.5, y: 0.5, dist: 1.05, tilt: 1.15, face: null, labels: [] },
  { x: 0.5, y: 0.55, dist: 1.5, tilt: 0.85, face: null, labels: [] },
  { x: 0.5, y: 0.5, dist: 0.85, tilt: 0.45, face: faceYaw([0, 1], 0), labels: [0, 1] },
  { x: 0.4, y: 0.5, dist: 0.95, tilt: 0.55, face: faceYaw([6], 75), labels: [5, 6] },
];

type Box = { left: number; top: number; right: number; bottom: number };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const expoOut = (t: number) => (t >= 1 ? 1 : (1 - Math.pow(2, -10 * t)) / (1 - Math.pow(2, -10)));
const cubicOut = (t: number) => 1 - Math.pow(1 - t, 3);
const wrapAngle = (a: number) => a - TAU * Math.round(a / TAU);
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/* ---------- Shared GLSL ---------- */

const FADE_GLSL = /* glsl */ `
uniform vec2 uViewport;
uniform vec4 uFade;
uniform vec4 uFoot;
float screenFade() {
  vec2 uv = gl_FragCoord.xy / uViewport;
  float f = smoothstep(uFade.x, uFade.y, uv.x) * smoothstep(uFade.z, uFade.w, uv.y);
  vec2 outside = max(uFoot.xy - uv, uv - uFoot.zw);
  f *= mix(0.08, 1.0, smoothstep(0.0, 0.05, max(outside.x, outside.y)));
  return f * smoothstep(0.0, 0.05, 1.0 - uv.x) * smoothstep(0.0, 0.06, 1.0 - uv.y);
}
// Chart-label knockouts: line work breaks beneath each lettered label, as on a printed chart.
uniform vec4 uKnock[7];
uniform float uKnockA[7];
float knockout() {
  vec2 uv = gl_FragCoord.xy / uViewport;
  float soft = 0.006 * uViewport.y;
  float k = 1.0;
  for (int i = 0; i < 7; i++) {
    vec2 d = max(uKnock[i].xy - uv, uv - uKnock[i].zw) * uViewport;
    k = min(k, 1.0 - 0.9 * uKnockA[i] * smoothstep(soft, 0.0, max(d.x, d.y)));
  }
  return k;
}
`;

const NOISE_GLSL = /* glsl */ `
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + 17.1;
    a *= 0.5;
  }
  return v;
}
`;

/* ---------- Engraving: equirectangular mask → albedo, roughness and bump ---------- */

function engravingMaps(width: number, maxAnisotropy: number) {
  const W = width;
  const H = width / 2;
  const s = W / 2048;
  const rand = mulberry32(0xbfb401a5);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const yLat = (lat: number) => ((90 - lat) / 180) * H;
  const xLon = (lon: number) => (lon / 360) * W;
  const hline = (lat: number, w: number) => {
    ctx.lineWidth = w * s;
    ctx.beginPath();
    ctx.moveTo(0, yLat(lat));
    ctx.lineTo(W, yLat(lat));
    ctx.stroke();
  };

  for (const sign of [1, -1]) {
    // Tick band at 5–9°.
    for (let lon = 0; lon < 360; lon += 1.25) {
      const long = Math.round(lon / 1.25) % 4 === 0;
      ctx.lineWidth = (long ? 2.4 : 1.6) * s;
      ctx.beginPath();
      ctx.moveTo(xLon(lon), yLat(sign * 5.2));
      ctx.lineTo(xLon(lon), yLat(sign * (long ? 9 : 7.4)));
      ctx.stroke();
    }
    hline(sign * 9.6, 2.4);
    hline(sign * 11.4, 1.6);

    // Meander at 12–16°.
    const unit = 22 * s;
    const top = yLat(sign * 16);
    const bottom = yLat(sign * 12);
    const hgt = bottom - top;
    ctx.lineWidth = 2.2 * s;
    ctx.beginPath();
    for (let x = 0; x < W + unit; x += unit) {
      ctx.moveTo(x, bottom);
      ctx.lineTo(x, top);
      ctx.lineTo(x + unit * 0.72, top);
      ctx.lineTo(x + unit * 0.72, top + hgt * 0.68);
      ctx.lineTo(x + unit * 0.38, top + hgt * 0.68);
      ctx.lineTo(x + unit * 0.38, top + hgt * 0.36);
      ctx.moveTo(x, bottom);
      ctx.lineTo(x + unit, bottom);
    }
    ctx.stroke();
    hline(sign * 18, 3.2);

    // Meridians between cartouches, and half meridians above them.
    for (let k = 0; k < 8; k++) {
      ctx.lineWidth = 2.6 * s;
      ctx.beginPath();
      ctx.moveTo(xLon(k * 45), yLat(sign * 18));
      ctx.lineTo(xLon(k * 45), yLat(sign * 70));
      ctx.stroke();
      ctx.lineWidth = 1.8 * s;
      ctx.beginPath();
      ctx.moveTo(xLon(k * 45 + 22.5), yLat(sign * 57));
      ctx.lineTo(xLon(k * 45 + 22.5), yLat(sign * 70));
      ctx.stroke();
    }

    // Cartouches at 20–55° with engraved star figures.
    for (let k = 0; k < 8; k++) {
      const lon0 = k * 45 + 4;
      const lon1 = k * 45 + 41;
      const la0 = sign * 21;
      const la1 = sign * 54;
      const x0 = xLon(lon0);
      const x1 = xLon(lon1);
      const y0 = Math.min(yLat(la0), yLat(la1));
      const y1 = Math.max(yLat(la0), yLat(la1));
      const r = 10 * s;
      ctx.lineWidth = 2.6 * s;
      ctx.beginPath();
      ctx.roundRect(x0, y0, x1 - x0, y1 - y0, r);
      ctx.stroke();
      ctx.lineWidth = 1.4 * s;
      ctx.beginPath();
      ctx.roundRect(x0 + 7 * s, y0 + 7 * s, x1 - x0 - 14 * s, y1 - y0 - 14 * s, r * 0.6);
      ctx.stroke();

      const midLat = (la0 + la1) / 2;
      const stretch = 1 / Math.cos((Math.abs(midLat) * Math.PI) / 180);
      const cx = (x0 + x1) / 2;
      const cy = (y0 + y1) / 2;
      const span = Math.min((x1 - x0) / stretch, y1 - y0) * 0.36;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(stretch, 1);
      ctx.lineWidth = 1.5 * s;
      ctx.beginPath();
      ctx.arc(0, 0, span * 1.12, 0, TAU);
      ctx.stroke();
      const stars: Array<[number, number]> = [];
      const count = 4 + Math.floor(rand() * 3);
      for (let i = 0; i < count; i++) {
        const a = rand() * TAU;
        const d = span * (0.25 + rand() * 0.7);
        stars.push([Math.cos(a) * d, Math.sin(a) * d]);
      }
      stars.sort((p, q) => Math.atan2(p[1], p[0]) - Math.atan2(q[1], q[0]));
      ctx.lineWidth = 1.7 * s;
      ctx.beginPath();
      stars.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
      for (const [x, y] of stars) {
        ctx.beginPath();
        ctx.arc(x, y, (2.4 + rand() * 2.2) * s, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }

    hline(sign * 57, 2.4);
    hline(sign * 60, 3);

    // Guilloché between 60° and 70°.
    ctx.lineWidth = 1.3 * s;
    for (let phase = 0; phase < 4; phase++) {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2 * s) {
        const y = (yLat(sign * 60) + yLat(sign * 70)) / 2 + Math.sin((x / W) * TAU * 48 + (phase * Math.PI) / 2) * (yLat(sign * 60) - yLat(sign * 70)) * 0.36 * sign;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    hline(sign * 70, 3);

    // Polar rays and rings.
    for (let k = 0; k < 32; k++) {
      ctx.lineWidth = (k % 4 === 0 ? 3 : 1.8) * s;
      ctx.beginPath();
      ctx.moveTo(xLon(k * 11.25), yLat(sign * 72));
      ctx.lineTo(xLon(k * 11.25), yLat(sign * 86));
      ctx.stroke();
    }
    hline(sign * 72, 2.6);
    hline(sign * 80, 1.8);
    hline(sign * 86, 2.6);
  }

  // Pixel pass: box-blurred mask for the bump, then albedo and roughness.
  const src = ctx.getImageData(0, 0, W, H).data;
  const mask = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) mask[i] = src[i * 4] / 255;
  const blurred = boxBlur(boxBlur(mask, W, H, Math.max(1, Math.round(2 * s))), W, H, Math.max(1, Math.round(1 * s)));

  const albedo = new ImageData(W, H);
  const data = new ImageData(W, H);
  const p1 = rand() * TAU;
  const p2 = rand() * TAU;
  const p3 = rand() * TAU;
  for (let y = 0; y < H; y++) {
    const v = y / H;
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const u = x / W;
      const m = mask[i];
      const tarnish =
        0.94 +
        0.05 * Math.sin(u * TAU * 3 + v * 7 + p1) * Math.sin(v * 9 + p2) +
        0.035 * Math.sin(u * TAU * 7 + v * 13 + p3);
      const k = m * 0.78;
      albedo.data[i * 4] = (212 + (74 - 212) * k) * tarnish;
      albedo.data[i * 4 + 1] = (168 + (60 - 168) * k) * tarnish;
      albedo.data[i * 4 + 2] = (87 + (34 - 87) * k) * tarnish;
      albedo.data[i * 4 + 3] = 255;
      data.data[i * 4] = blurred[i] * 255;
      data.data[i * 4 + 1] = (0.3 + m * 0.35 + (1 - tarnish) * 0.6) * 255;
      data.data[i * 4 + 2] = 0;
      data.data[i * 4 + 3] = 255;
    }
  }

  const toTexture = (image: ImageData, srgb: boolean) => {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    c.getContext('2d')!.putImageData(image, 0, 0);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.anisotropy = maxAnisotropy;
    return texture;
  };

  return { albedo: toTexture(albedo, true), data: toTexture(data, false) };
}

function boxBlur(input: Float32Array, W: number, H: number, r: number) {
  const tmp = new Float32Array(W * H);
  const out = new Float32Array(W * H);
  const norm = 1 / (2 * r + 1);
  for (let y = 0; y < H; y++) {
    const row = y * W;
    let acc = 0;
    for (let k = -r; k <= r; k++) acc += input[row + ((k + W) % W)];
    for (let x = 0; x < W; x++) {
      tmp[row + x] = acc * norm;
      acc += input[row + ((x + r + 1) % W)] - input[row + ((x - r + W) % W)];
    }
  }
  for (let x = 0; x < W; x++) {
    let acc = 0;
    for (let k = -r; k <= r; k++) acc += tmp[Math.min(H - 1, Math.max(0, k)) * W + x];
    for (let y = 0; y < H; y++) {
      out[y * W + x] = acc * norm;
      acc += tmp[Math.min(H - 1, y + r + 1) * W + x] - tmp[Math.max(0, y - r) * W + x];
    }
  }
  return out;
}

/* ---------- Glyph band ---------- */

function runeTexture() {
  const W = 4096;
  const H = 128;
  const rand = mulberry32(0x5eed2026);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.fillRect(0, 10, W, 4);
  ctx.fillRect(0, H - 14, W, 4);

  const cell = 56;
  for (let x0 = 0; x0 + cell <= W; x0 += cell) {
    const cx = x0 + cell / 2;
    const top = 30;
    const bottom = H - 30;
    const mid = (top + bottom) / 2;
    ctx.beginPath();
    const kind = Math.floor(rand() * 5);
    if (kind === 0) {
      ctx.moveTo(cx, top);
      ctx.lineTo(cx, bottom);
      ctx.moveTo(cx - 12, mid - 8);
      ctx.lineTo(cx + 12, mid - 8);
    } else if (kind === 1) {
      ctx.arc(cx, mid, 13, 0, TAU);
      ctx.moveTo(cx, top);
      ctx.lineTo(cx, mid - 13);
    } else if (kind === 2) {
      ctx.moveTo(cx - 13, top);
      ctx.lineTo(cx, bottom);
      ctx.lineTo(cx + 13, top);
    } else if (kind === 3) {
      ctx.moveTo(cx - 12, bottom);
      ctx.lineTo(cx - 12, top + 6);
      ctx.quadraticCurveTo(cx, top - 8, cx + 12, top + 6);
      ctx.lineTo(cx + 12, bottom);
    } else {
      ctx.moveTo(cx, top);
      ctx.lineTo(cx + 13, mid);
      ctx.lineTo(cx, bottom);
      ctx.lineTo(cx - 13, mid);
      ctx.closePath();
    }
    ctx.stroke();
    if (rand() > 0.45) {
      ctx.beginPath();
      ctx.arc(cx + (rand() > 0.5 ? 16 : -16), rand() > 0.5 ? top + 4 : bottom - 4, 3.5, 0, TAU);
      ctx.fill();
    }
    if (rand() > 0.6) {
      ctx.beginPath();
      ctx.moveTo(cx - 14, bottom + 7);
      ctx.lineTo(cx + 14, bottom + 7);
      ctx.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

/* ---------- Knurled pole boss ---------- */

function knurledBoss() {
  const geometry = new THREE.CylinderGeometry(0.13, 0.155, 0.07, 72, 1);
  const pos = geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const r = Math.hypot(x, z);
    if (r < 0.01) continue;
    const a = Math.atan2(z, x);
    const k = 1 + 0.045 * Math.cos(a * 36);
    pos.setX(i, x * k);
    pos.setZ(i, z * k);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/* ---------- The scene ---------- */

export function createHeroScene(canvas: HTMLCanvasElement, hero: HTMLElement, initialTheme: Theme): HeroSceneHandle | null {
  const sky = canvas.parentElement as HTMLElement;
  const art = hero.querySelector<HTMLElement>('.hero-art');
  const nav = document.getElementById('nav');
  const copy = hero.querySelector<HTMLElement>('.hero-copy');
  const labelLayer = sky.querySelector<HTMLElement>('.chart-labels');
  const labels = Array.from(sky.querySelectorAll<HTMLElement>('.chart-label'));
  const toggle = hero.querySelector<HTMLButtonElement>('#orbToggle');
  const bearingOut = hero.querySelector<HTMLElement>('[data-readout="bearing"]');
  const fixesOut = hero.querySelector<HTMLElement>('[data-readout="fixes"]');
  const footItems = Array.from(hero.querySelectorAll<HTMLElement>('.hero-foot > *'));
  if (!copy || !labelLayer) return null;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false,
    });
  } catch {
    document.documentElement.classList.add('no-webgl');
    return null;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const stackedQuery = window.matchMedia('(max-width: 1099px)');
  let theme: Theme = initialTheme;

  renderer.toneMapping = THREE.NoToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const disposables: Array<{ dispose(): void }> = [];
  const track = <T extends { dispose(): void }>(item: T) => {
    disposables.push(item);
    return item;
  };

  /* ----- Camera, scene graph ----- */

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.set(0, 0.9, 9.4);
  camera.lookAt(0, 0, 0);

  const tiltGroup = new THREE.Group();
  const spinGroup = new THREE.Group();
  scene.add(tiltGroup);
  tiltGroup.add(spinGroup);

  /* ----- Environment ----- */

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  const envGeoms: THREE.BufferGeometry[] = [];
  const envMats: THREE.Material[] = [];
  const addEnv = (mesh: THREE.Mesh) => {
    envGeoms.push(mesh.geometry);
    envMats.push(mesh.material as THREE.Material);
    envScene.add(mesh);
    return mesh;
  };
  addEnv(new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.008, 0.007, 0.006), side: THREE.BackSide })));
  const panel = (w: number, h: number, pos: [number, number, number], color: [number, number, number]) => {
    const mesh = addEnv(new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(...color), side: THREE.DoubleSide })));
    mesh.position.set(...pos);
    mesh.lookAt(0, 0, 0);
  };
  panel(8, 4, [-4, 5, 6], [6, 3.4, 1.2]);
  panel(3, 6, [6, 1, -5], [0.4, 2.2, 2]);
  panel(6, 3, [-6, -3, -2], [0.9, 0.4, 2]);
  panel(1.2, 1.2, [2, 6, 4], [10, 8, 5]);
  const floor = addEnv(new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 0.18, 0.08), side: THREE.DoubleSide })));
  floor.position.y = -6;
  floor.rotation.x = -Math.PI / 2;
  const envTarget = pmrem.fromScene(envScene, 0.02);
  const envMap = envTarget.texture;
  track(envTarget);
  envGeoms.forEach((g) => g.dispose());
  envMats.forEach((m) => m.dispose());
  pmrem.dispose();

  const keyLight = new THREE.DirectionalLight(0xffd9a0, 2.2);
  keyLight.position.set(-4, 5, 6);
  const rimLight = new THREE.DirectionalLight(0x5fe3c8, 1.6);
  rimLight.position.set(5, 1.5, -6);
  scene.add(keyLight, rimLight);

  /* ----- Orb ----- */

  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const maps = engravingMaps(small ? 1024 : 2048, maxAniso);
  track(maps.albedo);
  track(maps.data);

  const brassOuter = track(
    new THREE.MeshStandardMaterial({
      map: maps.albedo,
      roughnessMap: maps.data,
      bumpMap: maps.data,
      bumpScale: -1.2,
      metalness: 1,
      roughness: 1,
      envMap,
    })
  );
  const brassInner = track(
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(0.5, 0.33, 0.13),
      metalness: 0.85,
      roughness: 0.5,
      envMap,
      envMapIntensity: 0.25,
      side: THREE.BackSide,
    })
  );
  const brassPlain = track(
    new THREE.MeshStandardMaterial({ color: new THREE.Color(0.66, 0.42, 0.13), metalness: 1, roughness: 0.28, envMap })
  );

  const hemisphere = (upper: boolean) => {
    const geometry = track(new THREE.SphereGeometry(1, 128, 48, 0, TAU, upper ? 0 : Math.PI / 2 + GAP, Math.PI / 2 - GAP));
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const uv = geometry.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) uv.setY(i, 1 - Math.acos(Math.max(-1, Math.min(1, pos.getY(i)))) / Math.PI);
    const group = new THREE.Group();
    group.add(new THREE.Mesh(geometry, brassOuter), new THREE.Mesh(geometry, brassInner));
    const rim = new THREE.Mesh(track(new THREE.TorusGeometry(Math.cos(GAP), 0.014, 10, 160)), brassPlain);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = (upper ? 1 : -1) * Math.sin(GAP);
    group.add(rim);
    const boss = new THREE.Mesh(track(knurledBoss()), brassPlain);
    boss.position.y = upper ? 1.01 : -1.01;
    const finial = new THREE.Mesh(track(new THREE.SphereGeometry(0.055, 20, 12)), brassPlain);
    finial.position.y = upper ? 1.07 : -1.07;
    group.add(boss, finial);
    return group;
  };
  const upperHalf = hemisphere(true);
  const lowerHalf = hemisphere(false);

  const runes = track(runeTexture());
  const bandUniforms = {
    uRunes: { value: runes },
    uLit: { value: 0 },
    uTime: { value: 0 },
    uGlow: { value: new THREE.Vector3(0.3, 3.2, 1.4) },
    uBase: { value: new THREE.Vector3(0.05, 0.035, 0.02) },
  };
  const bandMaterial = track(
    new THREE.ShaderMaterial({
      uniforms: bandUniforms,
      side: THREE.DoubleSide,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uRunes;
        uniform float uLit;
        uniform float uTime;
        uniform vec3 uGlow;
        uniform vec3 uBase;
        varying vec2 vUv;
        void main() {
          float glyph = texture2D(uRunes, vec2(vUv.x * 2.0, vUv.y)).r;
          float lit = 1.0 - smoothstep(uLit - 0.12, uLit, vUv.x);
          float front = exp(-pow((vUv.x - uLit) * 28.0, 2.0)) * step(0.001, uLit) * step(uLit, 1.05);
          float pulse = 0.86 + 0.14 * sin(uTime * 2.2 + vUv.x * 50.0);
          vec3 col = uBase + glyph * vec3(0.16, 0.1, 0.04);
          col += glyph * uGlow * (lit * pulse + front * 1.6);
          col *= gl_FrontFacing ? 1.0 : 0.45;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
  );
  const band = new THREE.Mesh(track(new THREE.CylinderGeometry(0.96, 0.96, 0.13, 256, 1, true)), bandMaterial);

  const ringA = new THREE.Mesh(track(new THREE.TorusGeometry(1.16, 0.016, 12, 200)), brassPlain);
  const ringB = new THREE.Mesh(track(new THREE.TorusGeometry(1.2, 0.012, 12, 200)), brassPlain);
  const ringRestA = new THREE.Euler(Math.PI / 2 + 0.55, 0.2, 0.35);
  const ringRestB = new THREE.Euler(Math.PI / 2 - 0.45, -0.5, -0.6);

  const coreMaterial = track(new THREE.MeshBasicMaterial({ color: new THREE.Color(0, 0, 0) }));
  const core = new THREE.Mesh(track(new THREE.SphereGeometry(0.35, 32, 16)), coreMaterial);
  const cageMaterial = track(new THREE.LineBasicMaterial({ color: new THREE.Color(0, 0, 0) }));
  const cage = new THREE.LineSegments(track(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.5, 1))), cageMaterial);
  const coreLight = new THREE.PointLight(new THREE.Color(0.3, 1, 0.6), 0, 3, 2);

  const orb = new THREE.Group();
  orb.add(upperHalf, lowerHalf, band, ringA, ringB, core, cage, coreLight);
  spinGroup.add(orb);

  /* ----- Hologram ----- */

  const shared = {
    uViewport: { value: new THREE.Vector2(1, 1) },
    uFade: { value: new THREE.Vector4(-1, 0, 0, 0.1) },
    uFoot: { value: new THREE.Vector4(2, 2, -2, -2) },
    uKnock: { value: Array.from({ length: 7 }, () => new THREE.Vector4(2, 2, -2, -2)) },
    uKnockA: { value: new Array(7).fill(0) as number[] },
    uTime: { value: 0 },
    uLight: { value: theme === 'light' ? 1 : 0 },
    uReveal: { value: 0 },
    uDpr: { value: renderer.getPixelRatio() },
    uPointDist: { value: 9.4 },
  };
  const holoMaterials: THREE.ShaderMaterial[] = [];
  const holo = (params: THREE.ShaderMaterialParameters) => {
    const material = track(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending,
        ...params,
      })
    );
    holoMaterials.push(material);
    return material;
  };
  const holoGroup = new THREE.Group();
  spinGroup.add(holoGroup);

  const rest = REST.map(([x, y, z]) => new THREE.Vector3(x, y, z).applyAxisAngle(Y_AXIS, -YAW0));

  // Galaxy of twinkling points.
  {
    const rand = mulberry32(0x0a11a3);
    const count = small ? 900 : 1500;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const seed = new Float32Array(count);
    const warm = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      let r: number;
      let a: number;
      if (rand() < 0.7) {
        r = 1.3 + Math.pow(rand(), 0.7) * 3.3;
        a = Math.floor(rand() * 3) * (TAU / 3) + r * 1.6 + (rand() - 0.5) * 0.7;
      } else {
        r = 1.2 + rand() * 3.7;
        a = rand() * TAU;
      }
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (rand() + rand() + rand() - 1.5) * 0.09 * (1 + r * 0.1);
      pos[i * 3 + 2] = Math.sin(a) * r;
      size[i] = rand() < 0.06 ? 4 + rand() * 2.5 : 1.4 + rand() * 2;
      seed[i] = rand() * 100;
      warm[i] = rand() < 0.15 ? 1 : 0;
    }
    const geometry = track(new THREE.BufferGeometry());
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    geometry.setAttribute('aWarm', new THREE.BufferAttribute(warm, 1));
    const material = holo({
      uniforms: { ...shared },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uReveal;
        uniform float uDpr;
        uniform float uPointDist;
        uniform float uLight;
        attribute float aSize;
        attribute float aSeed;
        attribute float aWarm;
        varying float vAlpha;
        varying float vWarm;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float r = length(position.xz);
          float reveal = smoothstep(uReveal * 5.2, uReveal * 5.2 - 0.7, r);
          float twinkle = 0.55 + 0.45 * sin(uTime * (0.8 + fract(aSeed) * 2.2) + aSeed);
          // Printed on ivory a star cannot fade into the ground and still read, so by day
          // it only dims, and it is drawn larger to carry its halo.
          vAlpha = reveal * mix(twinkle, 0.62 + 0.38 * twinkle, uLight) * smoothstep(5.0, 3.6, r);
          vWarm = aWarm;
          gl_PointSize = aSize * mix(1.0, 1.6, uLight) * uDpr * (uPointDist / max(-mv.z, 0.5 * uPointDist)) * (0.8 + 0.2 * twinkle);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        ${FADE_GLSL}
        uniform float uLight;
        varying float vAlpha;
        varying float vWarm;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float fade = vAlpha * screenFade() * knockout();
          if (uLight > 0.5) {
            // Day: an ink point in a soft verdigris halo, the hologram's glow as it reads on paper.
            float core = 1.0 - smoothstep(0.13, 0.24, d);
            float halo = (1.0 - smoothstep(0.1, 0.5, d)) * 0.42;
            vec3 ink = mix(vec3(0.0, 0.085, 0.05), vec3(0.085, 0.042, 0.018), vWarm);
            vec3 glow = mix(vec3(0.02, 0.4, 0.21), vec3(0.46, 0.27, 0.07), vWarm);
            gl_FragColor = vec4(mix(glow, ink, core), max(core, halo) * fade);
            return;
          }
          float a = smoothstep(0.5, 0.12, d) * fade;
          gl_FragColor = vec4(mix(vec3(0.12, 1.3, 0.62), vec3(1.4, 1.15, 0.7), vWarm), a);
        }
      `,
    });
    holoGroup.add(new THREE.Points(geometry, material));
  }

  // Polar grid on the equatorial plane, with a graduated limb and light spill.
  const gridUniforms = { ...shared, uOpen: { value: 0 } };
  {
    const material = holo({
      uniforms: gridUniforms,
      side: THREE.DoubleSide,
      vertexShader: /* glsl */ `
        varying vec2 vP;
        void main() { vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        ${FADE_GLSL}
        uniform float uReveal;
        uniform float uLight;
        uniform float uOpen;
        varying vec2 vP;
        float lineAA(float coord, float period, float width) {
          float d = abs(fract(coord / period + 0.5) - 0.5) * period;
          float w = fwidth(coord);
          return 1.0 - smoothstep(width * w, (width + 1.0) * w, d);
        }
        void main() {
          float r = length(vP);
          float th = atan(vP.y, vP.x);
          float rings = lineAA(r, 0.5, 0.3) * 0.45 + lineAA(r, 1.0, 0.5) * 0.55;
          float arc = th * r;
          float spokeStep = 3.14159265 / 12.0;
          float spokes = (1.0 - smoothstep(0.6, 1.6, abs(fract(th / spokeStep + 0.5) - 0.5) * spokeStep * r / fwidth(arc))) * 0.22;
          float ticksBand = step(3.88, r) * step(r, 4.08);
          float tickStep = 3.14159265 / 36.0;
          float ticks = ticksBand * (1.0 - smoothstep(0.5, 1.5, abs(fract(th / tickStep + 0.5) - 0.5) * tickStep * r / fwidth(arc)));
          float limbRing = (1.0 - smoothstep(0.5, 1.5, abs(r - 4.0) / fwidth(r))) + (1.0 - smoothstep(0.5, 1.5, abs(r - 4.12) / fwidth(r))) * 0.6;
          float bounds = smoothstep(1.02, 1.3, r) * smoothstep(4.9, 4.3, r);
          float g = max(max(rings, spokes) * smoothstep(4.0, 1.2, r), max(ticks, limbRing) * 0.9) * bounds;
          float front = uReveal * 5.2;
          float reveal = smoothstep(front, front - 0.5, r);
          float edge = exp(-pow((r - front) * 4.0, 2.0)) * step(0.02, uReveal) * step(uReveal, 0.98);
          float spill = exp(-(r - 1.0) * 2.4) * smoothstep(0.96, 1.08, r) * uOpen;
          if (uLight > 0.5) {
            // Day chart: the same lines in verdigris ink at full strength, with the unit rings
            // and the limb haloed in soft emerald, which is how the hologram's glow reads on ivory.
            float px = max(fwidth(r), 1e-4);
            float unitD = abs(fract(r + 0.5) - 0.5) / px;
            float limbD = (r - 4.06) / px;
            float glow = (exp(-unitD * unitD / 32.0) * 0.55 * smoothstep(4.0, 1.2, r) + exp(-limbD * limbD / 110.0)) * bounds * reveal;
            float fade = smoothstep(4.9, 3.5, r);
            float ink = (g * reveal * 0.62 + edge * 0.14 * fade) * knockout();
            float halo = (glow * 0.2 + edge * 0.34 * fade) * knockout() + spill * 0.16;
            float a = 1.0 - (1.0 - ink) * (1.0 - halo);
            vec3 col = mix(vec3(0.03, 0.4, 0.21), vec3(0.01, 0.075, 0.05), clamp(ink / max(a, 1e-4), 0.0, 1.0));
            gl_FragColor = vec4(col, a * screenFade());
            return;
          }
          float a = ((g * reveal * 0.34 + edge * 0.32 * smoothstep(4.9, 3.5, r)) * knockout() + spill * 0.3) * screenFade();
          gl_FragColor = vec4(0.08, 1.0, 0.45, a);
        }
      `,
    });
    const grid = new THREE.Mesh(track(new THREE.PlaneGeometry(10, 10)), material);
    grid.rotation.x = -Math.PI / 2;
    holoGroup.add(grid);
  }

  // Orbit loops with fresnel planets.
  const planets: Array<{ mesh: THREE.Mesh; radius: number; speed: number; phase: number; tilt: THREE.Group }> = [];
  {
    const lineMaterial = holo({
      uniforms: { ...shared },
      vertexShader: /* glsl */ `
        varying float vR;
        void main() { vR = length(position.xz); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        ${FADE_GLSL}
        uniform float uReveal;
        uniform float uLight;
        varying float vR;
        void main() {
          float a = smoothstep(uReveal * 5.2, uReveal * 5.2 - 0.4, vR) * mix(0.32, 0.6, uLight) * screenFade() * knockout();
          gl_FragColor = vec4(mix(vec3(0.1, 1.1, 0.5), vec3(0.0, 0.13, 0.065), uLight), a);
        }
      `,
    });
    const planetMaterial = holo({
      uniforms: { ...shared },
      vertexShader: /* glsl */ `
        varying vec3 vN;
        varying vec3 vV;
        varying float vR;
        void main() {
          vec4 world = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          vR = length(world.xz);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vN = normalize(normalMatrix * normal);
          vV = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        ${FADE_GLSL}
        uniform float uReveal;
        uniform float uLight;
        varying vec3 vN;
        varying vec3 vV;
        varying float vR;
        void main() {
          float rim = pow(1.0 - abs(dot(vN, vV)), 2.2);
          float a = (0.05 + rim * 0.7) * step(0.35, uReveal) * screenFade();
          gl_FragColor = vec4(mix(vec3(0.2, 1.6, 0.8), vec3(0.0, 0.16, 0.07), uLight), clamp(a, 0.0, 1.0));
        }
      `,
    });
    const specs: Array<[number, number, number, number]> = [
      [1.9, 8, 0.045, 0.19],
      [2.8, -5, 0.06, -0.12],
      [3.6, 12, 0.04, 0.08],
    ];
    specs.forEach(([radius, incline, planetR, speed], i) => {
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k < 256; k++) {
        const a = (k / 256) * TAU;
        pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
      }
      const tilt = new THREE.Group();
      tilt.rotation.x = (incline * Math.PI) / 180;
      tilt.rotation.y = i * 1.1;
      tilt.add(new THREE.LineLoop(track(new THREE.BufferGeometry().setFromPoints(pts)), lineMaterial));
      const mesh = new THREE.Mesh(track(new THREE.SphereGeometry(planetR, 24, 16)), planetMaterial);
      tilt.add(mesh);
      holoGroup.add(tilt);
      planets.push({ mesh, radius, speed, phase: i * 2.1, tilt });
    });
  }

  // Course line (fix 0 → 5) and the dashed line forward into the uncharted.
  const courseCurve = new THREE.CatmullRomCurve3(rest.slice(0, 6));
  const lengths = courseCurve.getLengths(500);
  const fixU = [0, 1, 2, 3, 4, 5].map((i) => lengths[100 * i] / lengths[500]);
  const courseUniforms = { ...shared, uDraw: { value: 0 } };
  {
    const material = holo({
      uniforms: courseUniforms,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        ${FADE_GLSL}
        uniform float uDraw;
        uniform float uLight;
        varying vec2 vUv;
        void main() {
          if (vUv.x > uDraw || uDraw <= 0.0) discard;
          float head = exp(-pow((uDraw - vUv.x) * 40.0, 2.0)) * step(uDraw, 0.999);
          vec3 dark = vec3(0.3, 2.4, 1.1) + head * vec3(1.5, 3.0, 2.0);
          vec3 light = vec3(0.0, 0.16, 0.07) + head * vec3(0.03, 0.36, 0.18);
          gl_FragColor = vec4(mix(dark, light, uLight), (0.9 + head * 0.1) * screenFade() * knockout());
        }
      `,
    });
    holoGroup.add(new THREE.Mesh(track(new THREE.TubeGeometry(courseCurve, 240, 0.014, 8, false)), material));
  }
  const forwardUniforms = { ...shared, uForward: { value: 0 } };
  {
    const mid = rest[5].clone().add(rest[6]).multiplyScalar(0.5).add(new THREE.Vector3(0, 0.8, 0));
    const curve = new THREE.CatmullRomCurve3([rest[5], mid, rest[6]]);
    const material = holo({
      uniforms: forwardUniforms,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        ${FADE_GLSL}
        uniform float uForward;
        uniform float uLight;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          if (vUv.x > uForward || uForward <= 0.0) discard;
          if (fract(vUv.x * 18.0 - uTime * 0.35) > 0.55) discard;
          gl_FragColor = vec4(mix(vec3(0.25, 2.0, 0.95), vec3(0.0, 0.16, 0.07), uLight), 0.85 * screenFade() * knockout());
        }
      `,
    });
    holoGroup.add(new THREE.Mesh(track(new THREE.TubeGeometry(curve, 120, 0.011, 6, false)), material));
  }

  // Drop lines, plane rings and fix heads.
  const fixUniforms = { ...shared, uFixVis: { value: new Array(7).fill(0) as number[] } };
  {
    const drop: number[] = [];
    const dropFix: number[] = [];
    const dropT: number[] = [];
    const ring: number[] = [];
    const ringFix: number[] = [];
    const ringT: number[] = [];
    rest.forEach((p, i) => {
      drop.push(p.x, p.y, p.z, p.x, 0, p.z);
      dropFix.push(i, i);
      dropT.push(0, Math.abs(p.y));
      for (let k = 0; k < 24; k++) {
        const a0 = (k / 24) * TAU;
        const a1 = ((k + 1) / 24) * TAU;
        ring.push(p.x + Math.cos(a0) * 0.08, 0, p.z + Math.sin(a0) * 0.08, p.x + Math.cos(a1) * 0.08, 0, p.z + Math.sin(a1) * 0.08);
        ringFix.push(i, i);
        ringT.push(-1, -1);
      }
    });
    const geometry = track(new THREE.BufferGeometry());
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([...drop, ...ring], 3));
    geometry.setAttribute('aFix', new THREE.Float32BufferAttribute([...dropFix, ...ringFix], 1));
    geometry.setAttribute('aT', new THREE.Float32BufferAttribute([...dropT, ...ringT], 1));
    const material = holo({
      uniforms: fixUniforms,
      vertexShader: /* glsl */ `
        uniform float uFixVis[7];
        attribute float aFix;
        attribute float aT;
        varying float vVis;
        varying float vT;
        void main() {
          vVis = uFixVis[int(aFix + 0.5)];
          vT = aT;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        ${FADE_GLSL}
        uniform float uLight;
        varying float vVis;
        varying float vT;
        void main() {
          if (vT >= 0.0 && fract(vT / 0.07) > 0.5) discard;
          gl_FragColor = vec4(mix(vec3(0.1, 1.2, 0.55), vec3(0.0, 0.16, 0.07), uLight), vVis * 0.75 * screenFade() * knockout());
        }
      `,
    });
    holoGroup.add(new THREE.LineSegments(geometry, material));

    const heads = track(new THREE.BufferGeometry());
    heads.setAttribute('position', new THREE.Float32BufferAttribute(rest.flatMap((p) => [p.x, p.y, p.z]), 3));
    heads.setAttribute('aFix', new THREE.Float32BufferAttribute([0, 1, 2, 3, 4, 5, 6], 1));
    heads.setAttribute('aKind', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 1, 2], 1));
    const headMaterial = holo({
      uniforms: fixUniforms,
      vertexShader: /* glsl */ `
        uniform float uFixVis[7];
        uniform float uDpr;
        attribute float aFix;
        attribute float aKind;
        varying float vVis;
        varying float vKind;
        void main() {
          vVis = uFixVis[int(aFix + 0.5)];
          vKind = aKind;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (aKind > 1.5 ? 26.0 : 22.0) * uDpr;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        ${FADE_GLSL}
        uniform float uLight;
        uniform float uTime;
        varying float vVis;
        varying float vKind;
        void main() {
          vec2 p = gl_PointCoord - 0.5;
          float d = length(p);
          float a;
          if (vKind > 1.5) {
            float l1 = abs(p.x - p.y) * 0.7071;
            float l2 = abs(p.x + p.y) * 0.7071;
            a = (1.0 - smoothstep(0.03, 0.06, min(l1, l2))) * step(d, 0.36);
          } else {
            float ring = 1.0 - smoothstep(0.03, 0.06, abs(d - 0.24));
            float dot = 1.0 - smoothstep(0.07, 0.1, d);
            a = max(ring, dot);
            if (vKind > 0.5) {
              float k = fract(uTime * 0.6);
              a = max(a, (1.0 - smoothstep(0.02, 0.05, abs(d - (0.24 + k * 0.24)))) * (1.0 - k));
            }
          }
          vec3 dark = vec3(0.5, 2.6, 1.4);
          vec3 light = vec3(0.0, 0.16, 0.07);
          gl_FragColor = vec4(mix(dark, light, uLight), a * vVis * screenFade());
        }
      `,
    });
    const headPoints = new THREE.Points(heads, headMaterial);
    headPoints.renderOrder = 2;
    holoGroup.add(headPoints);
  }

  /* ----- Background sheet ----- */

  const bgUniforms = {
    uViewport: shared.uViewport,
    uTime: shared.uTime,
    uDpr: shared.uDpr,
    uLight: shared.uLight,
    uBase: { value: new THREE.Vector3() },
    uInvert: { value: theme === 'light' ? 0 : 1 },
    uDrift: { value: 0 },
  };
  const bgMaterial = track(
    new THREE.ShaderMaterial({
      uniforms: bgUniforms,
      depthTest: false,
      depthWrite: false,
      vertexShader: /* glsl */ `
        void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        uniform vec2 uViewport;
        uniform float uTime;
        uniform float uDpr;
        uniform float uLight;
        uniform vec3 uBase;
        uniform float uInvert;
        uniform float uDrift;
        ${NOISE_GLSL}
        vec3 inverseNeutral(vec3 y) {
          float ym = min(y.r, min(y.g, y.b));
          float m = ym < 0.04 ? sqrt(ym / 6.25) : ym + 0.04;
          return y + (m - ym);
        }
        void main() {
          vec3 col = uBase;
          float aspect = uViewport.x / uViewport.y;
          vec2 q = gl_FragCoord.xy / uViewport;
          vec2 qa = vec2(q.x * aspect, q.y);
          vec2 qd = qa - vec2(0.0, uDrift);
          float n1 = fbm(qd * 2.2 + vec2(uTime * 0.004, 0.0));
          float n2 = fbm(qd * 1.7 + vec2(5.2, uTime * 0.003));
          float haze1 = smoothstep(0.42, 0.8, n1) * smoothstep(1.0, 0.1, distance(qa, vec2(aspect * 0.8, 0.78)));
          float haze2 = smoothstep(0.45, 0.85, n2) * smoothstep(1.0, 0.1, distance(qa, vec2(aspect * 0.42, 0.14)));
          vec2 g = (gl_FragCoord.xy - vec2(0.0, uDrift * uViewport.y)) / (30.0 * uDpr);
          vec2 id = floor(g);
          vec2 f = fract(g) - 0.5;
          float h = hash(id);
          vec2 o = vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5;
          float mag = hash(id + 1.3);
          if (uLight < 0.5) {
            // Night: a breath of cobalt and gold on the obsidian, and faint starlight.
            col += vec3(0.0015, 0.0024, 0.0072) * haze1 + vec3(0.01, 0.006, 0.0015) * haze2;
            if (h > 0.93) {
              float d = length(f - o * 0.6);
              float s = (1.0 - smoothstep(0.02, 0.07, d)) * (0.25 + 0.75 * mag);
              col += vec3(0.8, 0.74, 0.58) * s * 0.3 * (0.7 + 0.3 * sin(uTime * 1.1 + h * 40.0));
            }
          } else {
            // Day: the same haze as a verdigris bloom and sepia foxing on the ivory, and the
            // stars printed in ink. The brightest carry four engraved rays; about a quarter
            // are verdigris and breathe, the rest are sepia and hold still.
            col = mix(col, vec3(0.2, 0.5, 0.4), haze1 * 0.09);
            col = mix(col, vec3(0.6, 0.42, 0.24), haze2 * 0.11);
            if (h > 0.9) {
              vec2 p = (f - o * 0.6) * 30.0;
              float rad = 0.6 + 1.3 * mag;
              float s = 1.0 - smoothstep(rad - 0.6, rad + 0.6, length(p));
              if (mag > 0.8) {
                float len = 3.5 + 25.0 * (mag - 0.8);
                float rayX = (1.0 - smoothstep(0.25, 0.85, abs(p.y))) * smoothstep(len, 0.0, abs(p.x));
                float rayY = (1.0 - smoothstep(0.25, 0.85, abs(p.x))) * smoothstep(len, 0.0, abs(p.y));
                s = max(s, max(rayX, rayY));
              }
              float verd = step(0.74, hash(id + 5.5));
              float breathe = mix(1.0, 0.62 + 0.38 * sin(uTime * 1.1 + h * 40.0), verd);
              vec3 ink = mix(vec3(0.05, 0.032, 0.018), vec3(0.01, 0.19, 0.105), verd);
              col = mix(col, ink, s * (0.32 + 0.42 * mag) * breathe);
            }
          }
          if (uInvert > 0.5) col = inverseNeutral(col);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
  );
  const background = new THREE.Mesh(track(new THREE.PlaneGeometry(2, 2)), bgMaterial);
  background.frustumCulled = false;
  background.renderOrder = -1;
  scene.add(background);

  const readSheetColor = () => {
    const probe = document.createElement('canvas');
    probe.width = probe.height = 1;
    const pctx = probe.getContext('2d');
    if (!pctx) return;
    pctx.fillStyle = getComputedStyle(document.body).backgroundColor;
    pctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = pctx.getImageData(0, 0, 1, 1).data;
    const c = new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
    bgUniforms.uBase.value.set(c.r, c.g, c.b);
  };

  /* ----- Composer ----- */

  const dprNow = renderer.getPixelRatio();
  const composer = new EffectComposer(renderer, {
    multisampling: Math.min(dprNow >= 1.5 ? 2 : 4, renderer.capabilities.maxSamples),
    frameBufferType: THREE.HalfFloatType,
  });
  composer.addPass(new RenderPass(scene, camera));
  const darkPass = new EffectPass(
    camera,
    new BloomEffect({
      blendFunction: BlendFunction.ADD,
      luminanceThreshold: 0.9,
      luminanceSmoothing: 0.2,
      mipmapBlur: true,
      intensity: 1.1,
      radius: 0.7,
    }),
    new ToneMappingEffect({ mode: ToneMappingMode.NEUTRAL })
  );
  const lightPass = new EffectPass(camera, new ToneMappingEffect({ mode: ToneMappingMode.LINEAR }));
  composer.addPass(darkPass);
  composer.addPass(lightPass);
  darkPass.renderToScreen = true;
  lightPass.renderToScreen = true;
  darkPass.dithering = true;
  lightPass.dithering = true;

  /* ----- State ----- */

  let W = 1;
  let H = 1;
  let stacked = false;
  let open = false;
  let tl = reducedMotion ? 0 : 0;
  let yaw = YAW0;
  let pitch = 0;
  let yawVel = 0;
  let dragging = false;
  let userTouched = false;
  let raf = 0;
  let last = 0;
  let covered = false;
  let disposed = false;
  let lost = false;
  let time = 0;
  let orbX = 0;
  let orbY = 0;
  let orbR = 1;
  let obstacles: Box[] = [];
  let footDoc: Box | null = null;
  let navH = 64;
  let baseDist = 10;
  let heroX = STATIONS[0].x;
  let heroY = STATIONS[0].y;
  const heroFade = new THREE.Vector4(0, 0.05, 0, 0.06);
  const passageFade = new THREE.Vector4(0, 0.05, 0, 0.06);
  let jTarget = 0;
  let jNow = 0;
  const pose = { tilt: TILT, face: 0, faceW: 0 };
  const labelWeight = new Array(7).fill(1) as number[];
  let openNow = 0;
  const labelSize = labels.map(() => ({ w: 0, h: 0 }));
  const labelState = labels.map(() => ({ opacity: 0, left: false, x: -1, y: -1, shown: -1 }));
  let bearingText = '';
  let fixesText = '';
  const projected = new THREE.Vector3();
  const worldFix = rest.map(() => new THREE.Vector3());
  const headObj = new THREE.Object3D();
  holoGroup.add(headObj);

  const applyTheme = () => {
    const light = theme === 'light';
    darkPass.enabled = !light;
    lightPass.enabled = light;
    shared.uLight.value = light ? 1 : 0;
    bgUniforms.uInvert.value = light ? 0 : 1;
    for (const material of holoMaterials) material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    bandUniforms.uGlow.value.set(...((light ? [0.02, 0.35, 0.18] : [0.3, 3.2, 1.4]) as [number, number, number]));
    keyLight.intensity = light ? 1.4 : 2.2;
    rimLight.intensity = light ? 0.8 : 1.6;
    brassOuter.envMapIntensity = light ? 0.7 : 1;
    brassPlain.envMapIntensity = light ? 0.7 : 1;
    readSheetColor();
  };

  /* ----- Layout ----- */

  const contentRect = (el: Element) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const rect = range.getBoundingClientRect();
    range.detach();
    return rect;
  };

  const measureLabels = () => {
    labels.forEach((label, i) => {
      labelSize[i].w = label.offsetWidth;
      labelSize[i].h = label.offsetHeight;
    });
  };

  // Poses the camera for the current point of the journey: the orb's screen position,
  // distance and tilt are blended between the two stations either side of it.
  const place = () => {
    const k0 = Math.min(STATIONS.length - 1, Math.max(0, Math.floor(jNow)));
    const k1 = Math.min(STATIONS.length - 1, k0 + 1);
    const f = clamp01(jNow - k0);
    const a = STATIONS[k0];
    const b = STATIONS[k1];
    const at = (k: number, key: 'x' | 'y') => (k === 0 ? (key === 'x' ? heroX : heroY) : stacked ? (key === 'x' ? 0.5 : 0.46) : STATIONS[k][key]);
    const px = THREE.MathUtils.lerp(at(k0, 'x'), at(k1, 'x'), f) * W;
    const py = THREE.MathUtils.lerp(at(k0, 'y'), at(k1, 'y'), f) * H;
    const dist = baseDist * THREE.MathUtils.lerp(a.dist, b.dist, f);

    pose.tilt = THREE.MathUtils.lerp(a.tilt, b.tilt, f);
    if (a.face !== null && b.face !== null) {
      pose.face = a.face + wrapAngle(b.face - a.face) * f;
      pose.faceW = 1;
    } else if (a.face !== null || b.face !== null) {
      pose.face = (a.face ?? b.face) as number;
      pose.faceW = a.face !== null ? 1 - f : f;
    } else pose.faceW = 0;
    for (let i = 0; i < labelWeight.length; i++) {
      labelWeight[i] = THREE.MathUtils.lerp(a.labels.includes(i) ? 1 : 0, b.labels.includes(i) ? 1 : 0, f);
    }
    shared.uFade.value.lerpVectors(k0 === 0 ? heroFade : passageFade, k1 === 0 ? heroFade : passageFade, f);
    bgUniforms.uDrift.value = jNow * 0.3;

    // An off-centre view: a virtual frame centred on the orb, cropped to the canvas.
    const fw = 2 * Math.max(px, W - px);
    const fh = 2 * Math.max(py, H - py);
    camera.aspect = fw / fh;
    camera.zoom = H / fh;
    camera.setViewOffset(fw, fh, fw / 2 - px, fh / 2 - py, W, H);
    camera.position.set(0, 0.9 * (dist / 9.4), dist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  };

  const layout = () => {
    const rect = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    stacked = stackedQuery.matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    composer.setSize(W, H, false);
    const buffer = renderer.getDrawingBufferSize(new THREE.Vector2());
    shared.uViewport.value.copy(buffer);
    shared.uDpr.value = dpr;
    navH = nav?.offsetHeight ?? 64;

    labelLayer.classList.toggle('is-compact', stacked && W < 640);
    measureLabels();

    // Keep-outs for the labels, in page coordinates: the hero copy and its foot.
    const sy = window.scrollY;
    const toPage = (r: DOMRect): Box => ({ left: r.left, top: r.top + sy, right: r.right, bottom: r.bottom + sy });
    const rects: Box[] = [];
    let copyRight = 0;
    if (!stacked) {
      for (const child of Array.from(copy.children)) {
        const r = child.classList.contains('bearings') || child.classList.contains('plate-link') ? child.getBoundingClientRect() : contentRect(child);
        if (r.width > 0) {
          rects.push(toPage(r));
          copyRight = Math.max(copyRight, r.right);
        }
      }
    } else {
      const r = copy.getBoundingClientRect();
      if (r.width > 0) rects.push({ ...toPage(r), top: r.top + sy - 40 });
    }
    const foot: Box = { left: W, top: Infinity, right: 0, bottom: -Infinity };
    for (const item of footItems) {
      const r = item.getBoundingClientRect();
      if (r.width > 0) {
        rects.push(toPage(r));
        if (!stacked && r.left > W * 0.5) {
          foot.left = Math.min(foot.left, r.left - 16);
          foot.top = Math.min(foot.top, r.top + sy - 12);
          foot.right = Math.max(foot.right, r.right + 16);
          foot.bottom = Math.max(foot.bottom, r.bottom + sy + 12);
        }
      }
    }
    obstacles = rects;
    footDoc = foot.right > foot.left ? foot : null;

    const aspect = W / H;
    if (stacked) {
      baseDist = Math.max(9.4, 8.6 / aspect);
      const band = art?.offsetHeight || H * 0.55;
      heroX = 0.5;
      heroY = Math.min(0.5, (band + navH) / 2 / H);
      heroFade.set(0, 0.05, 0, 0.06);
    } else {
      baseDist = 10.2 * Math.max(1, 1.7 / aspect, 1300 / W);
      heroX = Math.min(0.8, Math.max(0.55, (copyRight + (W - copyRight) * 0.33) / W));
      heroY = 0.5;
      const cr = copyRight / W;
      heroFade.set(cr - 0.01, cr + 0.12, 0.02, 0.1);
    }
    shared.uPointDist.value = Math.max(9.4, 0.87 * baseDist);
    place();
  };

  // The dimmed patch under the hero's readout, which scrolls away with the hero.
  const footKeepOut = () => {
    const sy = window.scrollY;
    if (footDoc && footDoc.bottom > sy) {
      shared.uFoot.value.set(footDoc.left / W, 1 - (footDoc.bottom - sy) / H, footDoc.right / W, 1 - (footDoc.top - sy) / H);
    } else {
      shared.uFoot.value.set(2, 2, -2, -2);
    }
  };

  /* ----- Labels ----- */

  const hitsOrb = (l: number, t: number, r: number, b: number) => {
    const reach = orbR * 0.92;
    const part = orbR * 0.2 * openNow;
    const dx = Math.max(l - orbX, 0, orbX - r);
    const dy = Math.max(t - (orbY + part), 0, orbY - part - b);
    return Math.hypot(dx, dy) < reach;
  };
  const overlaps = (l: number, t: number, r: number, b: number, o: Box) =>
    l < o.right && r > o.left && t < o.bottom && b > o.top;

  const fadeAt = (x: number, y: number) => {
    const f = shared.uFade.value;
    const u = x / W;
    const v = 1 - y / H;
    return smoothstep(f.x, f.y, u) * smoothstep(f.z, f.w, v) * smoothstep(0, 0.05, 1 - u) * smoothstep(0, 0.06, 1 - v);
  };

  const updateLabels = (dt: number, fixVis: number[]) => {
    let changed = false;
    tiltGroup.updateMatrixWorld(true);
    const camPos = camera.position;
    const toFix = new THREE.Vector3();
    const screen: Array<[number, number]> = [];
    rest.forEach((p, i) => {
      headObj.position.copy(p);
      headObj.updateMatrixWorld(true);
      worldFix[i].setFromMatrixPosition(headObj.matrixWorld);
      projected.copy(worldFix[i]).project(camera);
      screen.push([((projected.x + 1) / 2) * W, ((1 - projected.y) / 2) * H]);
    });
    projected.set(0, 0, 0).project(camera);
    orbX = ((projected.x + 1) / 2) * W;
    orbY = ((1 - projected.y) / 2) * H;
    const d = camPos.length();
    const focal = H / 2 / Math.tan((FOV * Math.PI) / 360);
    orbR = (focal * 1) / Math.sqrt(Math.max(0.01, d * d - 1));

    const sy = window.scrollY;
    const placed: Box[] = [];
    const pointRects = screen.map(([x, y], i) => (fixVis[i] > 0.5 ? { left: x - 7, top: y - 7, right: x + 7, bottom: y + 7 } : null));
    const k = 1 - Math.exp(-dt * 9);

    for (const i of LABEL_ORDER) {
      const label = labels[i];
      if (!label) continue;
      const state = labelState[i];
      const [x, y] = screen[i];
      const { w, h } = labelSize[i];

      // Occlusion by the orb along the view ray.
      toFix.copy(worldFix[i]).sub(camPos);
      const len = toFix.length();
      toFix.divideScalar(len);
      const tc = -camPos.dot(toFix);
      const miss = Math.sqrt(Math.max(0, camPos.lengthSq() - tc * tc));
      const occluded = tc < len ? smoothstep(0.92, 1.12, miss) : 1;

      const base = fixVis[i] * labelWeight[i] * occluded * fadeAt(x, y);
      const fits = (left: boolean) => {
        const l = left ? x - w - 2 : x + 12;
        const r = left ? x - 12 : x + w + 2;
        const t = y - 11;
        const b = y - 9 + h;
        if (l < 10 || r > W - 10 || t < navH + 6 || b > H - 10) return false;
        if (hitsOrb(l, t, r, b)) return false;
        for (const o of obstacles) if (overlaps(l, t + sy, r, b + sy, o)) return false;
        for (const o of placed) if (overlaps(l, t, r, b, o)) return false;
        for (let j = 0; j < pointRects.length; j++) {
          const pr = pointRects[j];
          if (j !== i && pr && overlaps(l, t, r, b, pr)) return false;
        }
        return true;
      };
      const preferLeft = x + w + 16 > W - 20;
      let side: boolean | null = null;
      if (base > 0.02) {
        if (fits(state.left)) side = state.left;
        else if (fits(!state.left)) side = !state.left;
        if (side === null && fits(preferLeft)) side = preferLeft;
      }
      let target = side === null ? 0 : base;
      if (side !== null && side !== state.left) {
        if (state.opacity < 0.04) state.left = side;
        else target = 0;
      }
      if (state.opacity > 0.02 || target > 0) {
        const l = state.left ? x - w - 2 : x + 12;
        placed.push({ left: l, top: y - 11, right: l + w + 14, bottom: y - 9 + h });
      }
      if (Math.abs(target - state.opacity) >= 0.003) changed = true;
      state.opacity += (target - state.opacity) * k;
      if (Math.abs(target - state.opacity) < 0.003) state.opacity = target;

      const ox = Math.round(x * 2) / 2;
      const oy = Math.round((y - 10) * 2) / 2;
      if (ox !== state.x || oy !== state.y) {
        label.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
        state.x = ox;
        state.y = oy;
      }
      const shown = Math.round(state.opacity * 100) / 100;
      if (shown !== state.shown) {
        label.style.opacity = String(shown);
        state.shown = shown;
      }
      label.classList.toggle('is-left', state.left);

      // The lettering box, without the leader tick.
      const kl = state.left ? ox - w - 3 : ox + 13;
      const kr = state.left ? ox - 13 : ox + w + 3;
      shared.uKnock.value[i].set(kl / W, 1 - (oy + h + 1) / H, kr / W, 1 - (oy - 1) / H);
      shared.uKnockA.value[i] = shown;
    }
    return changed;
  };

  /* ----- Frame ----- */

  const step = (dt: number) => {
    time += dt;
    shared.uTime.value = reducedMotion ? 2 : time;
    bandUniforms.uTime.value = shared.uTime.value;

    const target = open ? T_OPEN : 0;
    let moving = false;
    if (jNow !== jTarget) {
      jNow = reducedMotion ? jTarget : jNow + (jTarget - jNow) * (1 - Math.exp(-dt * 3.2));
      if (Math.abs(jTarget - jNow) < 0.0005) jNow = jTarget;
      place();
      moving = true;
    }
    footKeepOut();
    if (reducedMotion) {
      tl = target;
    } else if (tl !== target) {
      tl = open ? Math.min(T_OPEN, tl + dt) : Math.max(0, tl - dt * 2);
      moving = true;
    }

    const ringsP = expoOut(seg(tl, 0, 0.6));
    const litP = expoOut(seg(tl, 0.4, 1.2));
    const openP = expoOut(seg(tl, 1.0, 1.6));
    const revealP = expoOut(seg(tl, 1.3, 2.4));
    const drawP = cubicOut(seg(tl, 1.8, 2.8));
    const fwdP = expoOut(seg(tl, 2.6, 3.2));
    openNow = openP;

    ringA.rotation.set(
      THREE.MathUtils.lerp(ringRestA.x, Math.PI / 2, ringsP),
      THREE.MathUtils.lerp(ringRestA.y, 0, ringsP),
      THREE.MathUtils.lerp(ringRestA.z, 0, ringsP)
    );
    ringB.rotation.set(
      THREE.MathUtils.lerp(ringRestB.x, Math.PI / 2, ringsP),
      THREE.MathUtils.lerp(ringRestB.y, 0, ringsP),
      THREE.MathUtils.lerp(ringRestB.z, 0, ringsP)
    );
    bandUniforms.uLit.value = litP * 1.12;
    upperHalf.position.y = PART * openP;
    lowerHalf.position.y = -PART * openP;
    upperHalf.rotation.y = TWIST * openP * 0.66;
    lowerHalf.rotation.y = -TWIST * openP * 0.34;

    const light = theme === 'light';
    const glow = openP * (0.85 + 0.15 * Math.sin(shared.uTime.value * 1.7));
    coreMaterial.color.setRGB(...((light ? [0.05, 0.5, 0.25] : [0.3, 3.0, 1.4]) as [number, number, number])).multiplyScalar(glow);
    cageMaterial.color.setRGB(...((light ? [0.04, 0.35, 0.18] : [0.2, 1.8, 0.85]) as [number, number, number])).multiplyScalar(openP);
    core.visible = cage.visible = openP > 0.002;
    coreLight.intensity = openP * (light ? 1.2 : 2.4);
    cage.rotation.y = shared.uTime.value * 0.25;
    cage.rotation.x = shared.uTime.value * 0.11;

    shared.uReveal.value = revealP;
    gridUniforms.uOpen.value = openP;
    courseUniforms.uDraw.value = drawP;
    forwardUniforms.uForward.value = fwdP;
    const drawS = drawP * 1.02;
    const fixVis = fixUniforms.uFixVis.value;
    for (let i = 0; i < 6; i++) fixVis[i] = drawP > 0 ? smoothstep(fixU[i], fixU[i] + 0.02, drawS) : 0;
    fixVis[6] = smoothstep(0.9, 1, fwdP);
    holoGroup.visible = revealP > 0.001;

    for (const planet of planets) {
      const a = planet.phase + shared.uTime.value * planet.speed;
      planet.mesh.position.set(Math.cos(a) * planet.radius, 0, Math.sin(a) * planet.radius);
    }

    // Yaw: drag inertia easing into a slow idle spin once the chart is open. A station
    // with a bearing reels the chart round to it instead.
    if (!dragging) {
      const idle = open && !reducedMotion ? IDLE_SPIN * (1 - pose.faceW) : 0;
      yawVel += (idle - yawVel) * (1 - Math.exp(-dt * 2.5));
      if (Math.abs(yawVel - idle) > 0.0005) moving = true;
      yaw += yawVel * dt;
      if (pose.faceW > 0.001) {
        const miss = wrapAngle(pose.face - yaw);
        yaw += miss * (reducedMotion ? pose.faceW : 1 - Math.exp(-dt * 2.4 * pose.faceW));
        if (Math.abs(miss) > 0.001) moving = true;
      }
      if (Math.abs(pitch) > 0.0005) {
        pitch *= Math.exp(-dt * 3);
        moving = true;
      } else pitch = 0;
    }
    spinGroup.rotation.y = yaw;
    tiltGroup.rotation.x = pose.tilt + pitch;

    const labelsMoving = updateLabels(dt, fixVis);

    const deg = Math.round((((yaw * 180) / Math.PI) % 360) + 360) % 360;
    const b = `${String(deg).padStart(3, '0')}°`;
    if (b !== bearingText && bearingOut) {
      bearingOut.textContent = b;
      bearingText = b;
    }
    const plotted = fixVis.slice(0, 6).filter((v) => v > 0.5).length;
    const f = `${plotted}/6`;
    if (f !== fixesText && fixesOut) {
      fixesOut.textContent = f;
      fixesText = f;
    }

    const alive = open && !reducedMotion;
    return moving || dragging || labelsMoving || alive;
  };

  const render = () => {
    composer.render();
  };

  const frame = (now: number) => {
    raf = 0;
    if (disposed || lost) return;
    // Under a card the chart only shows through at 30%: half the frame rate is plenty.
    if (covered && now - last < COVERED_FRAME_MS) {
      raf = requestAnimationFrame(frame);
      return;
    }
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    const active = step(dt);
    render();
    if (active) raf = requestAnimationFrame(frame);
  };

  const invalidate = () => {
    if (raf || disposed || lost) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };

  const setOpen = (value: boolean) => {
    open = value;
    toggle?.setAttribute('aria-pressed', String(value));
    invalidate();
  };

  /* ----- Interaction ----- */

  let downX = 0;
  let downY = 0;
  let lastX = 0;
  let lastY = 0;
  let lastMove = 0;
  let dragVel = 0;
  let moved = false;
  let pointerId = -1;

  const overOrb = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return Math.hypot(e.clientX - rect.left - orbX, e.clientY - rect.top - orbY) < orbR * 1.3;
  };

  const onDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    pointerId = e.pointerId;
    downX = lastX = e.clientX;
    downY = lastY = e.clientY;
    lastMove = performance.now();
    moved = false;
    dragVel = 0;
    dragging = true;
    userTouched = true;
    canvas.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging || e.pointerId !== pointerId) {
      canvas.style.cursor = overOrb(e) ? 'pointer' : '';
      return;
    }
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (!moved && Math.hypot(e.clientX - downX, e.clientY - downY) > 5) {
      moved = true;
      canvas.classList.add('is-dragging');
    }
    if (moved) {
      const now = performance.now();
      const dts = Math.max(0.008, (now - lastMove) / 1000);
      yaw += dx * 0.005;
      pitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitch + dy * 0.003));
      dragVel = dragVel * 0.6 + ((dx * 0.005) / dts) * 0.4;
      lastMove = now;
      invalidate();
    }
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const onUp = (e: PointerEvent) => {
    if (!dragging || e.pointerId !== pointerId) return;
    dragging = false;
    canvas.classList.remove('is-dragging');
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    if (!moved) {
      if (e.type === 'pointerup' && overOrb(e)) setOpen(!open);
    } else if (!reducedMotion && performance.now() - lastMove < 80) {
      yawVel = Math.max(-2, Math.min(2, dragVel));
    }
    invalidate();
  };
  const onLeave = () => {
    if (!dragging) canvas.style.cursor = '';
  };
  const onToggle = () => {
    userTouched = true;
    setOpen(!open);
  };

  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  canvas.addEventListener('pointerleave', onLeave);
  toggle?.addEventListener('click', onToggle);

  /* ----- Lifecycle ----- */

  const onVisibility = () => {
    if (!document.hidden) invalidate();
  };
  document.addEventListener('visibilitychange', onVisibility);

  const relayout = () => {
    if (disposed || lost) return;
    layout();
    step(0);
    render();
    invalidate();
  };
  const ro = new ResizeObserver(relayout);
  ro.observe(sky);
  ro.observe(hero);

  let fontsCancelled = false;
  document.fonts?.ready.then(() => {
    if (!fontsCancelled) relayout();
  });

  const onLost = () => {
    lost = true;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    document.documentElement.classList.add('no-webgl');
  };
  canvas.addEventListener('webglcontextlost', onLost);

  applyTheme();
  layout();
  if (reducedMotion) {
    open = true;
    tl = T_OPEN;
    toggle?.setAttribute('aria-pressed', 'true');
  }
  step(0);
  render();

  const startTimer = reducedMotion
    ? 0
    : window.setTimeout(() => {
        if (!userTouched) setOpen(true);
      }, START_DELAY);
  invalidate();

  return {
    setTheme(next: Theme) {
      theme = next;
      applyTheme();
      step(0);
      render();
      invalidate();
    },
    setJourney(value: number, snap = false) {
      jTarget = value;
      if (snap) {
        jNow = value;
        place();
      }
      invalidate();
    },
    setCovered(value: boolean) {
      if (covered === value) return;
      covered = value;
      invalidate();
    },
    dispose() {
      disposed = true;
      fontsCancelled = true;
      window.clearTimeout(startTimer);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('webglcontextlost', onLost);
      toggle?.removeEventListener('click', onToggle);
      canvas.classList.remove('is-dragging');
      canvas.style.cursor = '';
      labels.forEach((label) => {
        label.style.opacity = '';
        label.style.transform = '';
        label.classList.remove('is-left');
      });
      disposables.forEach((item) => item.dispose());
      composer.dispose();
      renderer.dispose();
    },
  };
}
