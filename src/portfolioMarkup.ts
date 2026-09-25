import {
  armillary,
  comet,
  compassRose,
  constellationGlyph,
  crescentMoon,
  fleuron,
  graticule,
  heroFallback,
  icons,
  orbitPlanet,
  planetrise,
  planisphere,
  portPlanet,
  type PortPlanet,
  radiantSun,
  rhumbLines,
  seal,
  sharedDefs,
  spiralGalaxy,
} from './chartArt';

// External links open in a new tab; screen readers hear that from one shared note.
const external = 'target="_blank" rel="noopener noreferrer" aria-describedby="new-tab-note"';

/* ---------- Ports of call (experience) ---------- */

type LogEntry = {
  vessel: string;
  rank: string;
  from: string;
  to: string;
  underway?: boolean;
  planet: PortPlanet;
  remarks: string;
  highlights: string[];
  figures: Array<[label: string, value: string, note?: string]>;
};

const log: LogEntry[] = [
  {
    vessel: 'CitaGlobal',
    rank: 'System Architect',
    planet: 'relay',
    from: 'Aug 2026',
    to: 'Present',
    underway: true,
    remarks:
      'Driving AI systems architecture and delivery at CitaGlobal Telco within a 20+ subsidiary group, working with the CEO, General Manager, Finance, IT, Procurement and HR.',
    highlights: [
      'Built a natural-language AI agent for Odoo ERP and used it to migrate an eight-figure portfolio of 880 telecom projects into production in 3 days, saving five figures in vendor costs',
      'Cleaned the Excel source of truth, released to production in logged stages with rollback, and rebuilt the management dashboards in Odoo',
      'Building the group-wide HR platform with the HR team, approved for rollout to 500+ staff, covering leave, claims, appraisals and AI-assisted recruitment that ranks CVs with evidence-linked scoring',
      'Authored the group AI policy, covering model access, pricing, SLAs and acceptable use, approved group-wide, and set up the AI use-case register',
    ],
    figures: [
      ['Projects migrated', '880', 'in 3 days'],
      ['Portfolio value', '8 figures'],
      ['Vendor costs saved', '5 figures'],
      ['HR platform', '500+', 'staff, group-wide'],
    ],
  },
  {
    vessel: 'NV5',
    rank: 'AI Solutions Engineer',
    planet: 'moon',
    from: 'Mar 2026',
    to: 'Jun 2026',
    remarks:
      "Built NV5 APAC's AI operating model (knowledge base, opportunity framework, backlog and intake), turning business requests and field bottlenecks from engineering and commissioning teams into scoped automation projects with named owners and ROI logic.",
    highlights: [
      'Proved in 2 hours a Power Automate and Microsoft Graph workflow scoped at 8 weeks, converting live SharePoint comments and photos into editable inspection reports to replace a 3–4 hour engineer task per inspection',
      'Lifted classification accuracy on historical building-management point tags from 69.6% to 84.3% by combining OCR and ML, extracting 1,640 candidate records at 85–94% OCR accuracy under engineer review',
      'Designed hands-on AI training, prompt frameworks and communications for 90+ nominated AI champions across 8 APAC countries, focused on measurable workflow automation',
    ],
    figures: [
      ['Proven in', '2 hrs', 'scoped 8 wks'],
      ['Classification accuracy', '69.6% to 84.3%'],
      ['Candidate records', '1,640'],
      ['AI champions', '90+', '8 countries'],
    ],
  },
  {
    vessel: 'Radio Televisyen Malaysia (RTM)',
    rank: 'Independent AI Consultant, Generative Media Production',
    planet: 'mast',
    from: 'Mar 2026',
    to: 'Present',
    underway: true,
    remarks:
      "Produced broadcast-quality generative AI sequences that aired in Episode 3 of RTM's nationally televised DIA programme. Now storyboarding the NeuroIman pilot episodes for producer review.",
    highlights: [
      'Worked directly with RTM producers, building repeatable Seedance, Kling and ChatGPT workflows that generate each sequence from a brief in a few hours',
    ],
    figures: [
      ['Programmes', '2', 'DIA · NeuroIman'],
      ['Aired nationally', 'Ep 3', 'DIA'],
    ],
  },
  {
    vessel: 'EY',
    rank: 'Technology Consultant, AI Engineering',
    planet: 'giant',
    from: 'Aug 2024',
    to: 'Mar 2026',
    remarks:
      'Led 3 production AI applications on a RM 10M+ enterprise platform serving 30,000+ users at a top-5 Bursa Malaysia-listed company, personally building 70–90% of each and ranking top-3 contributor in a 100K+ LOC codebase across React/TypeScript, .NET/C#, Python/FastAPI and PostgreSQL.',
    highlights: [
      'Shipped a RM 2M+ talent-evaluation system to production 6 weeks early, going from 60% complete to deployed in 3 days, with LLM and ML scoring across 2,000+ candidates and 5 competency frameworks',
      'Unlocked a RM 400K milestone payment by rescuing a live executive demo, redesigning the data schema and evaluating 50+ candidates against 2 job descriptions in 2 hours; the client credited this with saving the project',
      'Delivered a platform-wide UI revamp in 9 days against a 5-week estimate and tripled file upload speeds through pipeline and API optimisation',
      'Cut new-agent deployment from weeks to days with a reusable multi-agent framework (factory and strategy patterns) powering a RAG chatbot over 40+ knowledge sources with OCR, image, compliance and comparison agents',
      "Built an AI assistant for Malaysia's electricity-generation sector, unifying 19 fragmented data sources behind natural-language queries",
      'Shipped a React Native iOS/Android app with streaming multi-agent chat, and owned CI/CD (AWS CodePipeline) and releases across 3 production systems with zero missed deadlines',
      'Drove agentic coding adoption, training 10+ engineers on Claude Code, Codex, Cursor and AI-assisted workflows',
    ],
    figures: [
      ['Platform', 'RM 10M+'],
      ['Users', '30,000+'],
      ['Milestone unlocked', 'RM 400K'],
      ['Evaluation system', 'RM 2M+'],
      ['Shipped early', '6 wks'],
    ],
  },
];

const portEntries = log
  .map(
    (entry, i) => `
        <li class="port${entry.underway ? ' is-underway' : ''}" data-port="${i}">
          <div class="port-mark">${portPlanet(entry.planet)}</div>
          <div class="port-body">
            <p class="port-date"><span class="port-from">${entry.from}</span> <span class="port-to">to ${entry.to}</span>${
              entry.underway ? '<span class="underway"><span class="lamp" aria-hidden="true"></span>Underway</span>' : ''
            }</p>
            <h3 class="port-name">${entry.vessel}</h3>
            <p class="port-rank">${entry.rank}</p>
            <p class="port-remarks">${entry.remarks}</p>
            <ul class="port-highlights">
              ${entry.highlights.map((item) => `<li>${item}</li>`).join('\n              ')}
            </ul>
            <dl class="port-figures">
              ${entry.figures
                .map(
                  ([label, value, note]) =>
                    `<div><dt>${label}</dt><dd><span class="figure">${value}</span>${note ? `<span class="figure-note">${note}</span>` : ''}</dd></div>`
                )
                .join('\n              ')}
            </dl>
          </div>
        </li>`
  )
  .join('');

/* ---------- Discoveries (projects) ---------- */

type Find = {
  title: string;
  href?: string;
  figure: string;
  figureNote: string;
  desc: string;
  tags: string[];
};

const finds: Find[] = [
  {
    title: 'Malaysia Agent Gateway',
    href: 'https://github.com/faiqhilman13/malaysia-agent',
    figure: '4',
    figureNote: 'agent interfaces',
    desc: 'Built a Malaysia-focused agent platform exposing invoice, payment, approval and compliance workflows through CLI, HTTP API, MCP and reusable agent skills. Implemented stateful Python orchestration, approval gates, event-driven payment ingestion and adapters for LHDN MyInvois, CIDB and halal-compliance workflows.',
    tags: ['MCP', 'CLI', 'LHDN MyInvois', 'CIDB'],
  },
  {
    title: 'Health Canvas',
    href: 'https://github.com/faiqhilman13/HospitalCanvas',
    figure: 'Top 5',
    figureNote: 'among 150+ participants',
    desc: "Placed Top 5 as the only solo developer among 150+ participants at a hackathon backed by Malaysia's Ministry of Health, National AI Office and AI Tinkerers KL. Built an AI clinical canvas in 48 hours using React, TypeScript, FastAPI, FAISS and GPT-4, processing 15-page medical histories with 90%+ extraction accuracy through RAG.",
    tags: ['RAG', 'FAISS', 'GPT-4', 'React'],
  },
  {
    title: 'IlmuAI: Multilingual Islamic Knowledge RAG System',
    figure: '250,000+',
    figureNote: 'knowledge chunks',
    desc: 'Built and deployed a cited bilingual RAG system over 40,000+ Islamic sources, embedding 250,000+ chunks from the Quran, hadith and fiqh. Implemented pgvector and BM25 hybrid retrieval, cross-encoder reranking, LLM-as-judge validation, a streaming React UI and Docker/Caddy deployment on Hetzner.',
    tags: ['RAG', 'pgvector', 'BM25', 'Cross-encoder', 'Docker'],
  },
  {
    title: 'LLM Evaluation Framework',
    href: 'https://github.com/faiqhilman13/LLM-Eval',
    figure: '20% to 75%',
    figureNote: 'TinyLlama accuracy lift',
    desc: 'Built an evaluation framework for base, API and QLoRA models with LLM-as-judge scoring, reproducible A/B logs and 87% accuracy on domain benchmarks. Fine-tuned TinyLlama-1.1B on Malay instruction data on a single 12GB GPU, raising task accuracy from 20% to 75%.',
    tags: ['LLM-as-Judge', 'QLoRA', 'Fine-tuning', 'TinyLlama'],
  },
];

const findBlocks = finds
  .map(
    (find, i) => `
        <article class="find" data-project="${i}" aria-labelledby="find-${i}-title">
          ${constellationGlyph(i)}
          <h3 id="find-${i}-title" class="find-title">${
            find.href
              ? `<a href="${find.href}" ${external}>${find.title}${icons.external}</a>`
              : find.title
          }</h3>
          <p class="find-figure"><span class="figure">${find.figure}</span> ${find.figureNote}</p>
          <p class="find-desc">${find.desc}</p>
          <ul class="find-tags">${find.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>
        </article>`
  )
  .join('');

/* ---------- Orrery (skills) ---------- */

const holds: Array<[string, string[]]> = [
  [
    'AI &amp; LLM',
    ['Multi-agent orchestration', 'RAG', 'pgvector', 'BM25', 'Reranking', 'LLM-as-judge', 'Guardrails', 'Prompt engineering', 'MCP', 'QLoRA fine-tuning', 'Local LLMs'],
  ],
  [
    'Machine Learning &amp; Data',
    ['PyTorch', 'Hugging Face Transformers', 'PEFT', 'TRL', 'bitsandbytes', 'scikit-learn', 'XGBoost', 'pandas', 'NumPy', 'Embeddings', 'ETL', 'Statistics'],
  ],
  [
    'Software Engineering',
    ['Python', 'TypeScript', 'JavaScript', 'React', 'React Native', 'HTML / CSS', 'Node.js', 'FastAPI', '.NET / C#', 'SQL', 'REST APIs', 'SSE streaming'],
  ],
  [
    'Cloud &amp; Infrastructure',
    ['AWS Bedrock', 'AWS CodePipeline', 'AWS EC2', 'AWS S3', 'AWS RDS', 'Azure', 'Docker', 'CI/CD', 'Hetzner VPS', 'Caddy', 'PostgreSQL', 'Redis', 'Celery', 'MongoDB', 'SQLite'],
  ],
  [
    'Enterprise Systems',
    ['Odoo 19 (JSON-2 API)', 'ERP integration', 'Microsoft 365', 'SharePoint', 'Power Automate', 'Microsoft Graph'],
  ],
  [
    'Agentic Development',
    ['Claude Code', 'Codex', 'Cursor', 'Agentic coding workflows', 'Test-driven refactoring', 'Team training'],
  ],
];

const orbitRows = holds
  .map(
    ([title, items], i) => `
        <div class="orbit" data-orbit="${i}">
          <svg class="orbit-ring" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><ellipse cx="50" cy="50" rx="49" ry="31" vector-effect="non-scaling-stroke"/></svg>
          <div class="orbit-head">
            ${orbitPlanet(i)}
            <h3 id="orbit-${i}" class="orbit-title">${title}</h3>
            <span class="orbit-count" aria-hidden="true">${items.length} bodies</span>
          </div>
          <ul class="orbit-items" aria-labelledby="orbit-${i}">
            ${items.map((item, k) => `<li style="--i:${k}">${item}</li>`).join('')}
          </ul>
        </div>`
  )
  .join('');

/* ---------- Commissions (education) ---------- */

const certificates = [
  {
    degree: 'MSc Data Science',
    school: 'City, University of London',
    dates: 'Sep 2022 to Jul 2024',
    coords: '51°32′N 0°06′W',
    courses: ['Machine Learning', 'Statistics', 'Big Data', 'Neural Computing', 'Knowledge Graphs'],
  },
  {
    degree: 'Bachelor of Commerce',
    school: 'University of Melbourne',
    dates: 'Jan 2017 to Dec 2019',
    coords: '37°48′S 144°58′E',
    courses: ['Corporate Finance', 'Investments', 'Derivatives', 'Accounting'],
  },
];

const certificateBlocks = certificates
  .map(
    (cert, i) => `
          <article class="cert" aria-labelledby="cert-${i}">
            <span class="cert-corner" aria-hidden="true"></span><span class="cert-corner" aria-hidden="true"></span><span class="cert-corner" aria-hidden="true"></span><span class="cert-corner" aria-hidden="true"></span>
            <h3 id="cert-${i}" class="cert-degree">${cert.degree}</h3>
            <p class="cert-school">${cert.school}</p>
            <p class="cert-meta"><span class="cert-dates">${cert.dates}</span><span class="cert-coords" aria-hidden="true">${cert.coords}</span></p>
            <p class="cert-label" id="cert-${i}-courses">Relevant Coursework</p>
            <ul class="cert-courses" aria-labelledby="cert-${i}-courses">${cert.courses.map((course) => `<li>${course}</li>`).join('')}</ul>
          </article>`
  )
  .join('');

const seals = [
  { issuer: 'ISC2', name: 'Certified in Cybersecurity', mono: 'ISC<tspan class="seal-sup" dy="-8">2</tspan>', ring: 'ISC2 CERTIFIED', key: 'isc2' },
  { issuer: 'Microsoft', name: 'Security, Compliance and Identity Fundamentals', mono: 'MS', ring: 'MICROSOFT CERTIFIED', key: 'sci' },
  { issuer: 'Microsoft', name: 'Azure Fundamentals', mono: 'MS', ring: 'MICROSOFT CERTIFIED', key: 'azure' },
];

const sealItems = seals
  .map(
    (item) => `
          <li class="seal">
            ${seal(item.mono, item.ring, item.key)}
            <p class="seal-caption"><span class="seal-issuer">${item.issuer}</span> <span class="seal-name">${item.name}</span></p>
          </li>`
  )
  .join('');

/* ---------- Hero chart labels (projected by the orb scene) ---------- */

// [place, note, shorter place for the compact phone chart]
const fixes: Array<[string, string, string?]> = [
  ['Melbourne', 'B.Com · 2017–19'],
  ['City, Univ. of London', 'MSc Data Science · 2022–24', 'City, London'],
  ['EY', 'AI engineering · 2024–26'],
  ['NV5', 'AI solutions · 2026'],
  ['RTM', 'Generative media · 2026'],
  ['CitaGlobal', 'Underway · 2026'],
];

const chartLabels =
  fixes
    .map(
      ([place, note, short], i) =>
        `<p class="chart-label" data-fix="${i}"><span class="chart-label-place">${
          short ? `<span class="chart-label-full">${place}</span><span class="chart-label-short">${short}</span>` : place
        }</span><span class="chart-label-note">${note}</span></p>`
    )
    .join('') + '<p class="chart-label chart-label--uncharted" data-fix="6"><span class="chart-label-place">Uncharted</span></p>';

export const portfolioMarkup = `<div class="content">
  <a class="skip-link" href="#main">Skip to content</a>
  ${sharedDefs}

  <div class="etherium" aria-hidden="true">
    <div class="etherium-nebula"></div>
    <div class="etherium-stars etherium-stars--far"></div>
    <div class="etherium-stars etherium-stars--near"></div>
    ${rhumbLines()}
  </div>

  <div class="sky" aria-hidden="true">
    <canvas id="hero-canvas"></canvas>
    <div class="chart-labels">${chartLabels}</div>
  </div>

  <nav id="nav" class="running-head" aria-label="Primary">
    <a href="#" class="nav-logo">
      <img src="/symbol-192.webp" alt="" width="36" height="36">
      <span>Faiq Hilman</span>
    </a>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#education">Education</a></li>
    </ul>
    <div class="nav-actions">
      <button class="theme-toggle" id="themeToggle" type="button" aria-label="Switch to day chart">
        ${icons.moon}${icons.sun}
      </button>
      <a href="#contact" class="nav-cta">Let's Talk</a>
    </div>
  </nav>

  <main id="main" tabindex="-1">
    <section class="hero" id="hero" aria-labelledby="hero-title">
      <div class="chart-sheet">
        <div class="hero-art" aria-hidden="true">${heroFallback()}</div>
        <div class="hero-copy">
          <h1 id="hero-title" class="hero-heading"><span class="hero-title">Engineering the<br><em>Future,</em><br>Grounded in Faith</span><span class="hero-signature"><span>Faiq Hilman</span>${fleuron}<span>AI Systems Architect</span></span></h1>
          <p class="hero-motto">The dots only connect looking backwards. Move forward anyway.</p>
          <p class="hero-brief">AI systems architect delivering production AI, ERP automation and LLM systems. Led applications on a RM 10M+ platform serving 30,000+ users and built an AI agent that migrated 880 projects into Odoo in 3 days.</p>
          <a href="#projects" class="plate-link"><span class="plate-link-text">Explore selected work</span>${icons.arrow}</a>
          <ul class="bearings" aria-label="Contact">
            <li><a href="mailto:faiqhilman97@gmail.com">${icons.mail}Email</a></li>
            <li><a href="https://faiqhilman.my" ${external}>${icons.globe}Website</a></li>
            <li><a href="https://linkedin.com/in/faiqhilman" ${external}>${icons.linkedin}LinkedIn</a></li>
            <li><a href="https://github.com/faiqhilman13" ${external}>${icons.github}GitHub</a></li>
            <li><a href="tel:+60192713447">${icons.phone}Phone</a></li>
          </ul>
        </div>
        <div class="hero-foot">
          <div class="scale" aria-hidden="true">
            <span class="scale-title">Scale of years</span>
            <span class="scale-bar"></span>
            <span class="scale-marks"><span>2017</span><span>2020</span><span>2023</span><span>2026</span></span>
          </div>
          <button id="orbToggle" class="orb-toggle" type="button" aria-pressed="false"><span class="lamp" aria-hidden="true"></span>Star chart</button>
          <dl class="hero-readout" aria-hidden="true">
            <div><dt>Bearing</dt><dd data-readout="bearing">042°</dd></div>
            <div><dt>Fixes plotted</dt><dd data-readout="fixes">0/6</dd></div>
          </dl>
        </div>
      </div>
    </section>

    <div class="passage" data-station="1" aria-hidden="true"></div>

    <section id="about" class="sheet" aria-labelledby="about-title">
      <div class="sheet-art" aria-hidden="true">${armillary()}${comet('about')}</div>
      <div class="sheet-inner about">
        <h2 id="about-title" class="sheet-title">Building AI That<br><em>Actually Ships</em></h2>
        <div class="about-copy">
          <p>I'm an <strong>AI systems architect</strong> and engineer delivering production AI, ERP automation and LLM systems across consulting and enterprise environments. I've led applications on a <strong>RM 10M+ platform</strong> serving <strong>30,000+ users</strong>, shipped a <strong>RM 2M+</strong> talent-evaluation system six weeks early, and built an AI agent that migrated <strong>880 projects</strong> into Odoo production in three days.</p>
          <p>I work full-stack across Python/FastAPI, React/TypeScript, .NET/C# and PostgreSQL, deploy on AWS, Azure and my own VPS, and specialise in <strong>RAG</strong>, <strong>multi-agent orchestration</strong>, and <strong>LLM evaluation</strong>: translating complex AI capabilities into deployed business systems.</p>
          <p>When I'm not building, I'm teaching. An early adopter of agentic coding, I've trained <strong>10+ engineers</strong> on Claude Code, Codex and Cursor, and designed AI training for <strong>90+ AI champions</strong> across 8 countries.</p>
        </div>
        <aside class="plate" aria-labelledby="plate-title">
          <span class="rivet" aria-hidden="true"></span><span class="rivet" aria-hidden="true"></span><span class="rivet" aria-hidden="true"></span><span class="rivet" aria-hidden="true"></span>
          <img src="/symbol-192.webp" alt="" class="plate-seal" width="64" height="64" loading="lazy" decoding="async">
          <h3 id="plate-title" class="plate-title">Particulars</h3>
          <dl class="particulars">
            <div><dt>Platform value</dt><dd>RM 10M+</dd></div>
            <div><dt>Users served</dt><dd>30,000+</dd></div>
            <div><dt>Projects migrated</dt><dd>880</dd></div>
          </dl>
        </aside>
      </div>
    </section>

    <div class="passage" data-station="2" aria-hidden="true"></div>

    <section id="experience" class="sheet" aria-labelledby="experience-title">
      <div class="sheet-art" aria-hidden="true">${graticule()}${comet('log')}</div>
      <div class="sheet-inner">
        <h2 id="experience-title" class="sheet-title">Where I've <em>Built</em></h2>
        <ol class="ports">${portEntries}
        </ol>
        <p class="ports-earlier">${fleuron}<span>Earlier: <span class="ports-earlier-name">PricewaterhouseCoopers (PwC)</span>, <em>Assurance Associate</em>, <span class="ports-earlier-date">Mar 2020 to Jul 2020</span>, where trend analytics on financial statements led to the recovery of US$25,000+ in variances.</span></p>
      </div>
    </section>

    <div class="passage" data-station="3" aria-hidden="true"></div>

    <section id="projects" class="sheet" aria-labelledby="projects-title">
      <div class="sheet-art" aria-hidden="true">${spiralGalaxy()}</div>
      <div class="sheet-inner">
        <h2 id="projects-title" class="sheet-title">What I've <em>Built</em></h2>
        <div class="planisphere-stage">
          <div class="planisphere-wrap">${planisphere()}</div>
          <svg class="leaders" aria-hidden="true" focusable="false"></svg>${findBlocks}
        </div>
      </div>
    </section>

    <div class="passage" data-station="4" aria-hidden="true"></div>

    <section id="skills" class="sheet" aria-labelledby="skills-title">
      <div class="sheet-art" aria-hidden="true">${radiantSun()}</div>
      <div class="sheet-inner">
        <h2 id="skills-title" class="sheet-title">How I <em>Build</em></h2>
        <div class="orrery">${orbitRows}
        </div>
      </div>
    </section>

    <div class="passage" data-station="5" aria-hidden="true"></div>

    <section id="education" class="sheet" aria-labelledby="education-title">
      <div class="sheet-art" aria-hidden="true">${crescentMoon()}</div>
      <div class="sheet-inner">
        <h2 id="education-title" class="sheet-title">Where I <em>Learned</em></h2>
        <div class="certs">${certificateBlocks}
        </div>
        <h3 class="seals-title">Credentials &amp; Certifications</h3>
        <ul class="seals">${sealItems}
        </ul>
      </div>
    </section>

    <div class="passage" data-station="6" aria-hidden="true"></div>

    <section id="contact" class="sheet" aria-labelledby="contact-title">
      <div class="sheet-art" aria-hidden="true">${planetrise()}</div>
      <div class="sheet-inner contact">
        <div class="contact-copy">
          <h2 id="contact-title" class="contact-title">Let's Build<br><em>Something Great</em></h2>
          <p class="contact-subtitle">I'm always interested in hearing about new opportunities, challenging projects, or just connecting over shared interests in AI.</p>
          <div class="contact-links">
            <a href="mailto:faiqhilman97@gmail.com" class="plate-link contact-link primary">${icons.mail}<span class="plate-link-text">Get in Touch</span></a>
            <a href="https://linkedin.com/in/faiqhilman" ${external} class="rope-link contact-link secondary">${icons.linkedin}LinkedIn</a>
            <a href="https://github.com/faiqhilman13" ${external} class="rope-link contact-link secondary">${icons.github}GitHub</a>
          </div>
        </div>
        <div class="rose-wrap">${compassRose()}</div>
      </div>
    </section>
  </main>

  <footer class="colophon">
    <p class="footer-text">Designed &amp; Built by <span>Faiq Hilman</span> · <span>2026</span></p>
  </footer>
  <span id="new-tab-note" hidden>Opens in a new tab</span>
</div>`;
