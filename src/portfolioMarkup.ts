export const portfolioMarkup = `<div class="content">
    <!-- NAV -->
    <nav id="nav">
      <a href="#" class="nav-logo">
        <img src="/symbol.png" alt="Faiq Hilman">
        <span>Faiq Hilman</span>
      </a>
      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#education">Education</a>
      </div>
      <a href="#contact" class="nav-cta">Let's Talk</a>
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
        <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      </button>
    </nav>
    
    <!-- HERO -->
    <section class="hero" id="hero">
      <div class="hero-grid"></div>
      <div class="hero-content">
        <div class="hero-overline">
          <span class="hero-overline-line"></span>
          Forward Deployed AI Engineer
        </div>
        <h1 class="hero-h1">Engineering the <em>Future,</em><br>Grounded in Faith</h1>
        <p class="hero-tagline">The dots only connect looking backwards. Move forward anyway.</p>
        <p class="hero-desc">
          AI engineer who ships production GenAI systems to enterprise customers. 
          Application lead for 3 AI products on a RM 10M+ platform serving 30,000+ users.
        </p>
        <div class="hero-links">
          <a href="mailto:faiqhilman97@gmail.com" class="hero-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Email
          </a>
          <a href="https://faiqhilman.my" target="_blank" class="hero-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
            Website
          </a>
          <a href="https://linkedin.com/in/faiqhilman" target="_blank" class="hero-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://github.com/faiqhilman13" target="_blank" class="hero-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="tel:+60192713447" class="hero-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Phone
          </a>
        </div>
      </div>
      <div class="hero-scroll">
        <span>Scroll</span>
        <div class="hero-scroll-line"></div>
      </div>
    </section>
    
    <!-- ABOUT -->
    <section id="about">
      <div class="about-container">
        <div class="about-asymmetric">
          <div class="about-visual reveal">
            <div class="about-orb">
              <div class="about-orb-ring"></div>
              <div class="about-orb-ring"></div>
              <div class="about-orb-ring"></div>
              <div class="about-orb-inner"></div>
              <img src="/symbol.png" alt="Faiq Hilman" class="about-mark-img">
            </div>
          </div>
          <div class="about-content">
            <div class="section-label reveal">
              <span class="section-label-line"></span>
              About Me
            </div>
            <h2 class="section-title reveal">Building AI That<br><em style="font-style:italic;color:var(--amber)">Actually Ships</em></h2>
            <div class="about-text reveal">
              <p>
                I'm a <strong>Forward Deployed AI Engineer</strong> who specializes in building production GenAI systems 
                for enterprise customers. At EY, I've led the development of 3 AI products on a <strong>RM 10M+ platform</strong> 
                serving over <strong>30,000 users</strong> at a top-5 Bursa Malaysia-listed company.
              </p>
              <p>
                My expertise spans the full stack, from React/TypeScript frontends to Python/FastAPI backends, 
                .NET/C# systems, and PostgreSQL databases. I'm a specialist in <strong>multi-agent orchestration</strong>, 
                <strong>RAG pipelines</strong>, and translating complex AI capabilities into deployed business solutions.
              </p>
              <p>
                When I'm not building, I'm teaching. I've trained and enabled <strong>10+ engineers</strong> on 
                AI-assisted development workflows, measurably raising team throughput.
              </p>
            </div>
            <div class="about-stats reveal">
              <div class="about-stat">
                <div class="about-stat-value">RM 10M+</div>
                <div class="about-stat-label">Platform Value</div>
              </div>
              <div class="about-stat-sep"></div>
              <div class="about-stat">
                <div class="about-stat-value">30,000+</div>
                <div class="about-stat-label">Users Served</div>
              </div>
              <div class="about-stat-sep"></div>
              <div class="about-stat">
                <div class="about-stat-value">3</div>
                <div class="about-stat-label">AI Products Led</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- EXPERIENCE -->
    <section id="experience">
      <div class="section-inner">
        <div class="section-label reveal">
          <span class="section-label-line"></span>
          Work Experience
        </div>
        <h2 class="section-title reveal">Where I've <em style="font-style:italic;color:var(--amber)">Built</em></h2>
        
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-header">
              <div>
                <div class="timeline-company">NV5</div>
                <div class="timeline-role">AI Solutions Engineer</div>
              </div>
              <div class="timeline-date">Mar 2026 to Present</div>
            </div>
            <p class="timeline-desc">
              Building the operating foundation for NV5's APAC AI function, turning vague business requests into scoped AI automation projects with clear feasibility, ownership, and ROI logic.
            </p>
            <div class="timeline-highlights">
              <div class="timeline-highlight">
                Built the central knowledge base, opportunity assessment framework, workflow backlog, and intake/triage model to turn loosely defined ideas into scoped AI automation projects
              </div>
              <div class="timeline-highlight">
                Automated inspection-report generation from live SharePoint data and photo evidence, proving in ~2 hours what had been roadmap-scoped for 8 weeks; a Power Automate + Microsoft Graph workflow that turns field comments and images into editable Word reports, cutting a 3-4 hour engineer task per inspection
              </div>
              <div class="timeline-highlight">
                Reduced a days-long engineering data-prep bottleneck by combining OCR and ML classification for building-management screenshots and point tags; improved classification accuracy from 69.6% to 84.3%, processed 62 real-world screenshots into 1,640 candidate records, validated OCR extraction at ~85-94% acceptable accuracy
              </div>
              <div class="timeline-highlight">
                Shaped AI enablement strategy for ~96 nominated APAC AI champions across 8 countries, creating reusable training structures, prompt frameworks, and internal comms assets anchored to real workflow automation
              </div>
              <div class="timeline-highlight">
                Embedded with engineering and commissioning teams across APAC to identify high-friction workflows across inspection reporting, screenshot/OCR extraction, engineering data classification, and document automation
              </div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-header">
              <div>
                <div class="timeline-company">Radio Televisyen Malaysia (RTM)</div>
                <div class="timeline-role">Independent AI Consultant, Generative Media Production</div>
              </div>
              <div class="timeline-date">Mar 2026 to Present</div>
            </div>
            <p class="timeline-desc">
              Independently contracted by RTM to produce broadcast-quality generative AI video sequences for nationally televised and pilot programming.
            </p>
            <div class="timeline-highlights">
              <div class="timeline-highlight">
                Built repeatable AI media workflows with Seedance, Kling, and ChatGPT, turning producer briefs into cinematic prompts, scene iterations, and production-ready sequences under broadcast deadlines
              </div>
              <div class="timeline-highlight">
                Collaborated directly with RTM producers on DIA and NeuroIman, helping merge generative AI content creation with RTM's standard production workflows for broadcast content
              </div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-header">
              <div>
                <div class="timeline-company">Ernst & Young (EY)</div>
                <div class="timeline-role">Technology Consultant, AI Engineering</div>
              </div>
              <div class="timeline-date">Aug 2024 to Mar 2026</div>
            </div>
            <p class="timeline-desc">
              Application lead for 3 production AI systems on a RM 10M+ enterprise platform serving 30,000+ users 
              at a top-5 Bursa Malaysia-listed company. Delivered across React/TypeScript, .NET/C#, Python/FastAPI, 
              and PostgreSQL in a 100K+ LOC codebase.
            </p>
            <div class="timeline-highlights">
              <div class="timeline-highlight">
                Recovered a high-stakes executive demo under live review, redesigning the data schema and batch-processing 50+ candidates against 2 job descriptions in 2 hours to unlock a RM 400K milestone payment
              </div>
              <div class="timeline-highlight">
                Delivered a RM 2M+ talent-evaluation system combining LLM and ML scoring across 2,000+ candidates and 5 competency frameworks; shipped 6 weeks ahead of schedule by moving from 60% local completion to production in 3 days
              </div>
              <div class="timeline-highlight">
                Architected a reusable multi-agent integration framework using factory and strategy patterns, cutting new agent deployment from weeks to days and powering OCR, image analysis, compliance validation, and comparison agents over structured and unstructured inputs
              </div>
              <div class="timeline-highlight">
                Built a domain-specific AI assistant for Malaysia's electricity generation sector, integrating 19 critical data sources so operational teams could query fragmented infrastructure data through natural language
              </div>
              <div class="timeline-highlight">
                Drove AI-assisted engineering adoption across the team, training 10+ engineers on Claude Code, Codex, Cursor, and agentic workflows to improve delivery speed and engineering leverage
              </div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-header">
              <div>
                <div class="timeline-company">Cherengin Hills</div>
                <div class="timeline-role">Corporate Sales & Strategy Associate</div>
              </div>
              <div class="timeline-date">Jan 2021 to Jun 2022</div>
            </div>
            <p class="timeline-desc">
              Led corporate sales initiatives and strategic partnerships.
            </p>
            <div class="timeline-highlights">
              <div class="timeline-highlight">
                Secured corporate sales agreements, generating RM 80,000 in revenue
              </div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-header">
              <div>
                <div class="timeline-company">PricewaterhouseCoopers (PwC)</div>
                <div class="timeline-role">Assurance Associate</div>
              </div>
              <div class="timeline-date">Mar 2020 to Jul 2020</div>
            </div>
            <p class="timeline-desc">
              Financial audit and analytics role.
            </p>
            <div class="timeline-highlights">
              <div class="timeline-highlight">
                Performed analytics on financial statements; recovered $25,000+ in variances
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- PROJECTS -->
    <section id="projects">
      <div class="section-inner">
        <div class="section-label reveal">
          <span class="section-label-line"></span>
          Featured Projects
        </div>
        <h2 class="section-title reveal">What I've <em style="font-style:italic;color:var(--amber)">Built</em></h2>
        
        <div class="projects-mosaic">
          <div class="project-card reveal">
            <div class="project-corner"></div>
            <div class="project-bg-line"></div>
            <div class="project-header">
              <div class="project-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <a href="https://github.com/faiqhilman13/HospitalCanvas" target="_blank" class="project-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
            <h3 class="project-name">Health Canvas</h3>
            <p class="project-desc">
              AI clinical canvas built in 48 hours at a government-backed hackathon hosted by Malaysia's Ministry of Health, National AI Office, and AI Tinkerers KL. Placed Top 5 as the only solo developer among 150+ participants. RAG pipeline with FAISS vector search processing 15-page medical histories at 90%+ extraction accuracy. Stack: React, TypeScript, FastAPI, GPT-4.
            </p>
            <div class="project-tags">
              <span class="project-tag">RAG</span>
              <span class="project-tag">FAISS</span>
              <span class="project-tag">GPT-4</span>
              <span class="project-tag">React</span>
            </div>
            <div class="project-metrics">
              <div class="project-metric">
                <div class="project-metric-value">Top 5</div>
                <div class="project-metric-label">among 150+ participants</div>
              </div>
            </div>
          </div>
          
          <div class="project-card reveal">
            <div class="project-corner"></div>
            <div class="project-bg-line"></div>
            <div class="project-header">
              <div class="project-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <a href="#" target="_blank" class="project-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
            <h3 class="project-name">IlmuAI: Multilingual Islamic Knowledge RAG</h3>
            <p class="project-desc">
              Cited bilingual RAG system over 40k+ Islamic sources, parsing and embedding 250k+ knowledge chunks from Quran, hadith, fiqh, Tanzil.net XML, and OpenITI sources. Hybrid retrieval with pgvector + BM25, cross-encoder reranking, LLM-as-judge validation, streaming React UI, Docker Compose deployment on Hetzner VPS with Caddy.
            </p>
            <div class="project-tags">
              <span class="project-tag">RAG</span>
              <span class="project-tag">pgvector</span>
              <span class="project-tag">BM25</span>
              <span class="project-tag">Cross-encoder</span>
              <span class="project-tag">Docker</span>
            </div>
            <div class="project-metrics">
              <div class="project-metric">
                <div class="project-metric-value">250k+</div>
                <div class="project-metric-label">knowledge chunks</div>
              </div>
            </div>
          </div>
          
          <div class="project-card reveal">
            <div class="project-corner"></div>
            <div class="project-bg-line"></div>
            <div class="project-header">
              <div class="project-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <a href="https://github.com/faiqhilman13/LLM-Eval" target="_blank" class="project-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
            <h3 class="project-name">LLM Evaluation Framework</h3>
            <p class="project-desc">
              Evaluation harness comparing base models, API models, and QLoRA fine-tuned variants with LLM-as-judge scoring, reproducible A/B logging, and ~87% accuracy on domain-specific benchmarks. Fine-tuned TinyLlama-1.1B on Malay instruction data using a single 12GB GPU, lifting task accuracy from 20% to 75%.
            </p>
            <div class="project-tags">
              <span class="project-tag">LLM-as-Judge</span>
              <span class="project-tag">QLoRA</span>
              <span class="project-tag">Fine-tuning</span>
              <span class="project-tag">TinyLlama</span>
            </div>
            <div class="project-metrics">
              <div class="project-metric">
                <div class="project-metric-value">20% to 75%</div>
                <div class="project-metric-label">TinyLlama accuracy lift</div>
              </div>
            </div>
          </div>
          
          <div class="project-card reveal">
            <div class="project-corner"></div>
            <div class="project-bg-line"></div>
            <div class="project-header">
              <div class="project-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <a href="https://github.com/faiqhilman13/malaysia-agent" target="_blank" class="project-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
            <h3 class="project-name">Malaysia Agent Gateway</h3>
            <p class="project-desc">
              Malaysia-first agent operations platform for regulated workflows, exposing invoice, payment, approval, and compliance actions through CLI, HTTP API, MCP, and reusable agent skills. Stateful Python execution layer with autonomous workflow orchestration, approval gating, and event-driven payment ingestion. Adapters for LHDN MyInvois, CIDB, and halal compliance workflows.
            </p>
            <div class="project-tags">
              <span class="project-tag">MCP</span>
              <span class="project-tag">CLI</span>
              <span class="project-tag">LHDN MyInvois</span>
              <span class="project-tag">CIDB</span>
            </div>
            <div class="project-metrics">
              <div class="project-metric">
                <div class="project-metric-value">4</div>
                <div class="project-metric-label">compliance adapters</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- SKILLS -->
    <section id="skills">
      <div class="section-inner">
        <div class="section-label reveal">
          <span class="section-label-line"></span>
          Technical Skills
        </div>
        <h2 class="section-title reveal">How I <em style="font-style:italic;color:var(--amber)">Build</em></h2>
        
        <div class="skills-orbit">
          <div class="skills-grid">
            <div class="skill-category reveal">
              <h3 class="skill-category-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><path d="M22 2l-5 5"/><path d="M17 2h5v5"/></svg>
                AI / LLM Systems
              </h3>
              <div class="skill-list">
                <span class="skill-item">Multi-agent orchestration</span>
                <span class="skill-item">RAG pipelines</span>
                <span class="skill-item">Hybrid retrieval</span>
                <span class="skill-item">FAISS</span>
                <span class="skill-item">pgvector</span>
                <span class="skill-item">BM25</span>
                <span class="skill-item">Cross-encoder reranking</span>
                <span class="skill-item">LLM-as-judge</span>
                <span class="skill-item">Prompt engineering</span>
                <span class="skill-item">Guardrails</span>
                <span class="skill-item">QLoRA fine-tuning</span>
                <span class="skill-item">vLLM</span>
                <span class="skill-item">MCP</span>
              </div>
            </div>
            
            <div class="skill-category reveal">
              <h3 class="skill-category-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                Fullstack Engineering
              </h3>
              <div class="skill-list">
                <span class="skill-item">Node.js</span>
                <span class="skill-item">Next.js</span>
                <span class="skill-item">React</span>
                <span class="skill-item">React Native</span>
                <span class="skill-item">TypeScript</span>
                <span class="skill-item">Zustand</span>
                <span class="skill-item">TanStack Query</span>
                <span class="skill-item">Tailwind CSS</span>
                <span class="skill-item">Python</span>
                <span class="skill-item">FastAPI</span>
                <span class="skill-item">.NET / C#</span>
                <span class="skill-item">REST APIs</span>
                <span class="skill-item">CLI tooling</span>
                <span class="skill-item">Workflow design</span>
              </div>
            </div>
            
            <div class="skill-category reveal">
              <h3 class="skill-category-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                Data & ML
              </h3>
              <div class="skill-list">
                <span class="skill-item">ETL for XML/JSON/HTML/PDF</span>
                <span class="skill-item">Embeddings at scale</span>
                <span class="skill-item">scikit-learn</span>
                <span class="skill-item">XGBoost</span>
                <span class="skill-item">Hugging Face Transformers</span>
                <span class="skill-item">PEFT</span>
                <span class="skill-item">bitsandbytes</span>
                <span class="skill-item">TRL</span>
                <span class="skill-item">Evaluation harness design</span>
              </div>
            </div>
            
            <div class="skill-category reveal">
              <h3 class="skill-category-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
                Infrastructure
              </h3>
              <div class="skill-list">
                <span class="skill-item">PostgreSQL</span>
                <span class="skill-item">Prisma</span>
                <span class="skill-item">Redis</span>
                <span class="skill-item">Celery</span>
                <span class="skill-item">MongoDB</span>
                <span class="skill-item">Docker</span>
                <span class="skill-item">Docker Compose</span>
                <span class="skill-item">SQLite</span>
                <span class="skill-item">AWS Bedrock</span>
                <span class="skill-item">AWS S3</span>
                <span class="skill-item">AWS EC2</span>
                <span class="skill-item">AWS RDS</span>
                <span class="skill-item">CI/CD</span>
                <span class="skill-item">Hetzner VPS</span>
                <span class="skill-item">Caddy</span>
              </div>
            </div>
            
            <div class="skill-category reveal">
              <h3 class="skill-category-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 2 3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
                AI-Assisted Coding
              </h3>
              <div class="skill-list">
                <span class="skill-item">Claude Code</span>
                <span class="skill-item">Codex</span>
                <span class="skill-item">Cursor</span>
                <span class="skill-item">AI pair programming</span>
                <span class="skill-item">Prompt-driven debugging</span>
                <span class="skill-item">Codebase navigation with AI</span>
                <span class="skill-item">Test-assisted refactoring</span>
                <span class="skill-item">Developer training</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- EDUCATION -->
    <section id="education">
      <div class="section-inner">
        <div class="section-label reveal">
          <span class="section-label-line"></span>
          Education
        </div>
        <h2 class="section-title reveal">Where I <em style="font-style:italic;color:var(--amber)">Learned</em></h2>
        
        <div class="edu-path">
          <div class="edu-grid">
            <div class="edu-card reveal">
              <div class="edu-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div class="edu-degree">MSc Data Science</div>
              <div class="edu-school">City, University of London</div>
              <div class="edu-date">Sep 2022 to Jul 2024</div>
              <div class="edu-courses">
                <div class="edu-courses-label">Relevant Coursework</div>
                <div class="edu-courses-list">
                  <span class="edu-course">Data Visualization</span>
                  <span class="edu-course">Machine Learning</span>
                  <span class="edu-course">Principles of Data Science</span>
                  <span class="edu-course">Statistics</span>
                  <span class="edu-course">Big Data</span>
                  <span class="edu-course">Visual Analytics</span>
                  <span class="edu-course">Neural Computing</span>
                  <span class="edu-course">Semantics & Knowledge Graphs</span>
                </div>
              </div>
            </div>
            
            <div class="edu-card reveal">
              <div class="edu-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div class="edu-degree">Bachelor of Commerce</div>
              <div class="edu-school">University of Melbourne</div>
              <div class="edu-date">Jan 2017 to Dec 2019</div>
              <div class="edu-courses">
                <div class="edu-courses-label">Relevant Coursework</div>
                <div class="edu-courses-list">
                  <span class="edu-course">Corporate Finance</span>
                  <span class="edu-course">Investments</span>
                  <span class="edu-course">Derivatives</span>
                  <span class="edu-course">Quant Methods</span>
                  <span class="edu-course">Accounting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="section-label reveal" style="margin-top:var(--sp-16)">
          <span class="section-label-line"></span>
          Credentials & Certifications
        </div>
        <div class="credentials reveal">
          <div class="credential">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span class="credential-name">ISC2</span> <span>Certified in Cybersecurity</span>
          </div>
          <div class="credential">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span class="credential-name">Microsoft</span> <span>Security, Compliance and Identity Fundamentals</span>
          </div>
          <div class="credential">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span class="credential-name">Microsoft</span> <span>Azure Fundamentals</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CONTACT -->
    <section id="contact">
      <div class="section-inner">
        <h2 class="contact-title reveal">Let's Build<br><em>Something Great</em></h2>
        <p class="contact-subtitle reveal">
          I'm always interested in hearing about new opportunities, 
          challenging projects, or just connecting over shared interests in AI.
        </p>
        <div class="contact-links reveal">
          <a href="mailto:faiqhilman97@gmail.com" class="contact-link primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Get in Touch
          </a>
          <a href="https://linkedin.com/in/faiqhilman" target="_blank" class="contact-link secondary">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://github.com/faiqhilman13" target="_blank" class="contact-link secondary">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </section>
    
    <!-- FOOTER -->
    <footer>
      <p class="footer-text">
        Designed & Built by <span>Faiq Hilman</span> \u00b7 <span>2026</span>
      </p>
    </footer>
  </div>`;
