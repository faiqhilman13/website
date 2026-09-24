import { useEffect } from 'react';
import { portfolioMarkup } from './portfolioMarkup';
import type { HeroSceneHandle, Theme } from './heroScene';
import { constellationCentres, mulberry32 } from './chartArt';

const SVG_NS = 'http://www.w3.org/2000/svg';
const SECTIONS = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];

const readTheme = (): Theme => {
  try {
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be unavailable in private windows; the theme still applies for this visit.
  }
};

const svgEl = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>) => {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
  return el;
};

// A seeded, seamless 512px tile of printed stars for the Etherium backdrop.
function starTile(seed: number, count: number, near: boolean) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return 'none';
  const rand = mulberry32(seed);
  for (let i = 0; i < count; i++) {
    const x = 4 + rand() * (size - 8);
    const y = 4 + rand() * (size - 8);
    const big = near && rand() < 0.12;
    const r = big ? 1.1 + rand() * 0.7 : 0.4 + rand() * (near ? 0.7 : 0.5);
    const alpha = big ? 0.75 + rand() * 0.25 : 0.2 + rand() * 0.5;
    ctx.fillStyle = rand() < 0.2 ? `rgba(160, 232, 214, ${alpha})` : `rgba(240, 228, 196, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    if (big && rand() < 0.5) {
      ctx.strokeStyle = `rgba(240, 228, 196, ${alpha * 0.45})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(x - 4, y);
      ctx.lineTo(x + 4, y);
      ctx.moveTo(x, y - 4);
      ctx.lineTo(x, y + 4);
      ctx.stroke();
    }
  }
  return `url(${canvas.toDataURL('image/png')})`;
}

function App() {
  useEffect(() => {
    const html = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let theme = readTheme();
    html.setAttribute('data-theme', theme);

    const nav = document.getElementById('nav');
    const main = document.getElementById('main');
    const hero = document.getElementById('hero');
    const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement | null;
    const themeToggle = document.getElementById('themeToggle');
    const starsFar = document.querySelector<HTMLElement>('.etherium-stars--far');
    const starsNear = document.querySelector<HTMLElement>('.etherium-stars--near');
    const leaders = document.querySelector<SVGSVGElement>('svg.leaders');
    const planisphere = document.querySelector<SVGSVGElement>('.planisphere-wrap svg');
    const rose = document.querySelector<SVGSVGElement>('svg.rose');
    const needle = rose?.querySelector<SVGGElement>('.rose-needle') ?? null;
    const contactTitle = document.getElementById('contact-title');
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-links a'));
    const ports = Array.from(document.querySelectorAll<HTMLElement>('.port'));
    const orrery = document.querySelector<HTMLElement>('.orrery');
    const orbits = Array.from(document.querySelectorAll<HTMLElement>('.orbit'));

    // The WebGL scene loads in its own chunk so the chart text paints first.
    let scene: HeroSceneHandle | null = null;
    let disposed = false;
    if (canvas && hero) {
      import('./heroScene')
        .then(({ createHeroScene }) => {
          if (disposed) return;
          scene = createHeroScene(canvas, hero, theme);
          scene?.setJourney(journey, true);
          scene?.setCovered(covered);
        })
        .catch(() => html.classList.add('no-webgl'));
    }

    /* ----- Theme ----- */

    const labelTheme = () =>
      themeToggle?.setAttribute('aria-label', theme === 'light' ? 'Switch to night chart' : 'Switch to day chart');
    labelTheme();
    const onThemeToggle = () => {
      theme = theme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', theme);
      saveTheme(theme);
      labelTheme();
      scene?.setTheme(theme);
    };
    themeToggle?.addEventListener('click', onThemeToggle);

    /* ----- Etherium stars ----- */

    html.style.setProperty('--stars-a', starTile(0x51a2, 150, false));
    html.style.setProperty('--stars-b', starTile(0x7e11, 46, true));

    /* ----- Journey: section cards pass over the fixed star chart ----- */

    // Between sections the page opens onto the sky and the chart swings to its next
    // station; each section is a card that rises over the sky and lifts away again.
    const passages = Array.from(document.querySelectorAll<HTMLElement>('main > .passage'));
    const cards = Array.from(document.querySelectorAll<HTMLElement>('main > .sheet'));
    const chartSheet = hero?.querySelector<HTMLElement>('.chart-sheet') ?? null;
    const stackedHero = window.matchMedia('(max-width: 1099px)');
    let passageSpans: Array<[number, number]> = [];
    let cardSpans: Array<[number, number]> = [];
    let journey = 0;
    let covered = false;

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const measureJourney = () => {
      const origin = (main?.getBoundingClientRect().top ?? 0) + window.scrollY;
      passageSpans = passages.map((passage) => [origin + passage.offsetTop, passage.offsetHeight]);
      cardSpans = cards.map((card) => [origin + card.offsetTop, origin + card.offsetTop + card.offsetHeight]);
      updateJourney();
    };

    const updateJourney = () => {
      const y = window.scrollY;
      const V = window.innerHeight;
      // Each passage turns the chart one station: it starts as the card before it begins
      // to lift away and arrives just as the next card starts to rise.
      let j = 0;
      for (const [top, height] of passageSpans) {
        const t = clamp01((y - top + 0.7 * V) / Math.max(height - 0.3 * V, 0.3 * V));
        j += t * t * (3 - 2 * t);
      }
      // On wide screens the hero text sits on the open sky beside the orb; it dissolves
      // as you leave so it never drifts across the orb. Stacked, it rides its own ground.
      if (chartSheet && !reducedMotion) {
        const fade = stackedHero.matches ? 0 : clamp01((y - 0.08 * V) / (0.42 * V));
        chartSheet.style.opacity = fade > 0 ? (1 - fade).toFixed(3) : '';
        chartSheet.style.visibility = fade >= 1 ? 'hidden' : '';
      }
      let covering = false;
      const navH = nav?.offsetHeight ?? 0;
      cardSpans.forEach(([top, bottom], i) => {
        const card = cards[i];
        const t = top - y;
        const b = bottom - y;
        if (t <= navH + 1 && b >= V && card.offsetWidth >= window.innerWidth * 0.7) covering = true;
        if (reducedMotion) return;
        const enter = clamp01((V - t) / (0.6 * V));
        const leave = clamp01((0.5 * V - b) / (0.5 * V));
        if (enter > 0 && enter < 1) {
          card.style.willChange = 'transform';
          card.style.transformOrigin = '50% 0';
          card.style.transform = `scale(${(0.94 + 0.06 * easeOut(enter)).toFixed(4)})`;
          card.style.opacity = '';
        } else if (leave > 0 && leave < 1) {
          const e = easeOut(leave);
          card.style.willChange = 'transform, opacity';
          card.style.transformOrigin = '50% 100%';
          card.style.transform = `scale(${(1 - 0.06 * e).toFixed(4)})`;
          card.style.opacity = (1 - e).toFixed(3);
        } else if (card.style.transform) {
          card.style.willChange = card.style.transformOrigin = card.style.transform = card.style.opacity = '';
        }
      });
      if (j !== journey) {
        journey = j;
        scene?.setJourney(j);
      }
      if (covering !== covered) {
        covered = covering;
        html.classList.toggle('sky-covered', covering);
        scene?.setCovered(covering);
      }
    };

    /* ----- Ports of call: a port lights as the course reaches it ----- */

    let portLines: number[] = [];
    const measurePorts = () => {
      portLines = ports.map((port) => {
        const planet = port.querySelector('.port-planet') ?? port;
        const r = planet.getBoundingClientRect();
        return r.top + window.scrollY + r.height / 2;
      });
      updatePorts();
    };
    const updatePorts = () => {
      const line = window.scrollY + window.innerHeight * 0.6;
      ports.forEach((port, i) => port.classList.toggle('is-reached', reducedMotion || line >= (portLines[i] ?? Infinity)));
    };

    /* ----- Orrery: each skill set strung around its planet's orbit ----- */

    const layoutOrrery = () => {
      const setOrbit = (on: boolean) => orbits.forEach((row) => row.classList.toggle('is-orbit', on));
      if (!orbits.length || !window.matchMedia('(min-width: 1000px)').matches) return setOrbit(false);
      setOrbit(true);
      const placed: Array<[HTMLElement, Record<string, number>]> = [];
      for (const row of orbits) {
        const W = row.clientWidth;
        const H = row.clientHeight;
        const cx = W / 2;
        const cy = H / 2;
        const rx = W * 0.49;
        const ry = H * 0.31;
        const span = rx * 1.8;
        const arc = (px: number) => ry * Math.sqrt(Math.max(0, 1 - ((px - cx) / rx) ** 2));
        const items = Array.from(row.querySelectorAll<HTMLElement>('.orbit-items li'));
        const sizes = items.map((li) => [li.offsetWidth, li.offsetHeight]);
        const total = sizes.reduce((sum, [w]) => sum + w, 0);
        let split = 0;
        let best = Infinity;
        for (let k = 0, acc = 0; k <= items.length; acc += sizes[k]?.[0] ?? 0, k++) {
          if (Math.abs(total - 2 * acc) < best) {
            best = Math.abs(total - 2 * acc);
            split = k;
          }
        }
        for (const [from, to, above] of [
          [0, split, true],
          [split, items.length, false],
        ] as Array<[number, number, boolean]>) {
          const count = to - from;
          if (!count) continue;
          const widths = sizes.slice(from, to).reduce((sum, [w]) => sum + w, 0);
          if (widths + 22 * (count - 1) > span) return setOrbit(false);
          const gap = count > 1 ? Math.min(55, (span - widths) / (count - 1)) : 0;
          let left = cx - (widths + gap * (count - 1)) / 2;
          for (let k = from; k < to; k++) {
            const [w, h] = sizes[k];
            const edge = arc(Math.min(Math.max(cx, left), left + w));
            const top = above ? cy - edge - 8 - h : cy + edge + 8;
            if (top < 0 || top + h > H) return setOrbit(false);
            const dot = (above ? cy - arc(left + w / 2) : cy + arc(left + w / 2)) - top;
            placed.push([
              items[k],
              {
                '--x': left,
                '--y': top,
                '--dot-y': dot,
                '--stem-y': above ? h + 3 : dot + 4.5,
                '--stem-h': Math.max(0, above ? dot - h - 7.5 : -dot - 7.5),
              },
            ]);
            left += w + gap;
          }
        }
      }
      for (const [el, vars] of placed) for (const [key, value] of Object.entries(vars)) el.style.setProperty(key, `${value.toFixed(1)}px`);
    };

    const orbitObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-seen');
          orbitObserver.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    if (!reducedMotion && orrery) {
      orrery.classList.add('is-armed');
      orbits.forEach((row) => orbitObserver.observe(row));
    }

    /* ----- Scroll ----- */

    let scrollRaf = 0;
    const onScrollFrame = () => {
      scrollRaf = 0;
      const y = window.scrollY;
      nav?.classList.toggle('scrolled', y > 24);
      if (!reducedMotion) {
        if (starsFar) starsFar.style.transform = `translate3d(0, ${-((y * 0.04) % 512)}px, 0)`;
        if (starsNear) starsNear.style.transform = `translate3d(0, ${-((y * 0.1) % 512)}px, 0)`;
      }
      updateJourney();
      updatePorts();
    };
    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(onScrollFrame);
    };
    onScrollFrame();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ----- Compass needle ----- */

    let needleSet = false;
    const aimNeedle = () => {
      if (!rose || !needle) return;
      const r = rose.getBoundingClientRect();
      if (!r.width) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (!contactTitle) return;
      const t = contactTitle.getBoundingClientRect();
      const tx = t.left + t.width / 2;
      const ty = t.top + t.height / 2;
      const angle = (Math.atan2(ty - cy, tx - cx) * 180) / Math.PI + 90;
      needle.style.setProperty('--needle', `${angle.toFixed(1)}deg`);
      if (!needleSet) {
        needleSet = true;
        rose.classList.add('is-set');
      }
    };

    /* ----- Current section ----- */

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          html.dataset.section = id;
          for (const link of navLinks) {
            if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          }
          if (id === 'contact') aimNeedle();
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    for (const id of ['hero', ...SECTIONS]) {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    }

    /* ----- Planisphere leaders and linked highlighting ----- */

    const finds = Array.from(document.querySelectorAll<HTMLElement>('article.find[data-project]'));
    const constellations = Array.from(document.querySelectorAll<SVGGElement>('g.constellation[data-project]'));
    const leaderGroups = new Map<string, SVGGElement>();

    const buildLeaders = () => {
      leaderGroups.clear();
      if (!leaders || !planisphere) return;
      leaders.replaceChildren();
      if (!window.matchMedia('(min-width: 1181px)').matches || getComputedStyle(leaders).display === 'none') return;
      const box = leaders.getBoundingClientRect();
      const p = planisphere.getBoundingClientRect();
      const scale = Math.min(p.width, p.height) / 600;
      const pcx = p.left + p.width / 2 - box.left;
      const pcy = p.top + p.height / 2 - box.top;
      leaders.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);

      finds.forEach((find) => {
        const i = Number(find.dataset.project);
        const centre = constellationCentres[i];
        const title = find.querySelector('.find-title');
        if (!centre || !title) return;
        const cx = pcx + centre[0] * scale;
        const cy = pcy + centre[1] * scale;
        const range = document.createRange();
        range.selectNodeContents(title);
        const line = range.getClientRects()[0] ?? title.getBoundingClientRect();
        const t = title.getBoundingClientRect();
        const toRight = t.left + t.width / 2 - box.left > cx;
        const ex = toRight ? t.left - box.left - 12 : Math.min(t.right, line.right) - box.left + 12;
        const ey = line.top - box.top + line.height / 2;
        const elbowX = ex + (toRight ? -26 : 26);
        const angle = Math.atan2(ey - cy, elbowX - cx);
        const sx = cx + Math.cos(angle) * 66 * scale;
        const sy = cy + Math.sin(angle) * 66 * scale;
        const group = svgEl('g', { 'data-project': i });
        group.append(
          svgEl('path', { class: 'leader', d: `M${sx.toFixed(1)} ${sy.toFixed(1)}L${elbowX.toFixed(1)} ${ey.toFixed(1)}L${ex.toFixed(1)} ${ey.toFixed(1)}` }),
          svgEl('circle', { class: 'leader-end', cx: ex.toFixed(1), cy: ey.toFixed(1), r: 2.5 })
        );
        if (find.classList.contains('is-lit')) group.classList.add('is-lit');
        leaders.append(group);
        leaderGroups.set(String(i), group);
      });
    };

    const light = (project: string, on: boolean) => {
      finds.find((f) => f.dataset.project === project)?.classList.toggle('is-lit', on);
      constellations.find((c) => c.dataset.project === project)?.classList.toggle('is-lit', on);
      leaderGroups.get(project)?.classList.toggle('is-lit', on);
    };
    const linkListeners: Array<[Element, string, EventListener]> = [];
    for (const el of [...finds, ...constellations]) {
      const project = (el as HTMLElement).dataset.project ?? '';
      const on = () => light(project, true);
      const off = (event: Event) => {
        if (event.type === 'focusout' && el.contains((event as FocusEvent).relatedTarget as Node | null)) return;
        light(project, false);
      };
      for (const [type, fn] of [
        ['pointerenter', on],
        ['pointerleave', off],
        ['focusin', on],
        ['focusout', off],
      ] as Array<[string, EventListener]>) {
        el.addEventListener(type, fn);
        linkListeners.push([el, type, fn]);
      }
    }

    /* ----- Layout-dependent drawing ----- */

    let layoutRaf = 0;
    const relayout = () => {
      if (layoutRaf) return;
      layoutRaf = requestAnimationFrame(() => {
        layoutRaf = 0;
        layoutOrrery();
        measureJourney();
        measurePorts();
        buildLeaders();
        if (needleSet) aimNeedle();
      });
    };
    relayout();
    const resizeObserver = new ResizeObserver(relayout);
    if (main) resizeObserver.observe(main);
    let fontsCancelled = false;
    document.fonts?.ready.then(() => {
      if (!fontsCancelled) relayout();
    });

    /* ----- In-page anchors ----- */

    const anchorListeners: Array<{ anchor: HTMLAnchorElement; handler: (event: MouseEvent) => void }> = [];
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      const handler = (event: MouseEvent) => {
        if (anchor.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey) return;
        const href = anchor.getAttribute('href');
        if (!href) return;
        const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth';
        if (href === '#') {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior });
          return;
        }
        const target = document.querySelector<HTMLElement>(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior, block: 'start' });
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        history.replaceState(null, '', href);
      };
      anchor.addEventListener('click', handler);
      anchorListeners.push({ anchor, handler });
    });

    return () => {
      disposed = true;
      fontsCancelled = true;
      scene?.dispose();
      themeToggle?.removeEventListener('click', onThemeToggle);
      window.removeEventListener('scroll', onScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (layoutRaf) cancelAnimationFrame(layoutRaf);
      sectionObserver.disconnect();
      orbitObserver.disconnect();
      resizeObserver.disconnect();
      for (const [el, type, fn] of linkListeners) el.removeEventListener(type, fn);
      anchorListeners.forEach(({ anchor, handler }) => anchor.removeEventListener('click', handler));
      leaders?.replaceChildren();
      cards.forEach((card) => (card.style.willChange = card.style.transformOrigin = card.style.transform = card.style.opacity = ''));
      html.classList.remove('sky-covered');
      if (chartSheet) chartSheet.style.opacity = chartSheet.style.visibility = '';
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: portfolioMarkup }} />;
}

export default App;
