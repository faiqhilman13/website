import { useState, useEffect } from 'react';

export const Hero: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Decorative grid lines - subtle */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `
          linear-gradient(90deg, var(--text-primary) 1px, transparent 1px),
          linear-gradient(var(--text-primary) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }} />

      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Status badge */}
          <div className={`reveal ${visible ? 'visible' : ''}`}>
            <div className="status-badge mb-8">
              <span className="pulse" />
              Available for Projects
            </div>
          </div>

          {/* Name */}
          <h1 className={`reveal delay-100 ${visible ? 'visible' : ''}`}>
            <span className="block font-mono text-sm text-[var(--text-muted)] uppercase tracking-[0.3em] mb-4">
              Senior Fullstack / AI Engineer
            </span>
            <span className="block text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em]">
              Faiq
              <br />
              <span className="text-[var(--accent-crimson)]">Hilman</span>
            </span>
          </h1>

          {/* Summary */}
          <p className={`reveal delay-200 font-serif text-xl md:text-2xl text-[var(--text-secondary)] mt-8 max-w-2xl leading-relaxed ${visible ? 'visible' : ''}`}>
            Applied AI Engineer shipping <span className="text-[var(--text-primary)]">production LLM systems</span> to enterprise customers.
            Application lead for 3 AI products on RM 10M+ platform serving{' '}
            <span className="text-[var(--accent-crimson)]">30,000+ users</span>.
          </p>

          {/* CTAs */}
          <div className={`reveal delay-300 flex flex-wrap gap-4 mt-12 ${visible ? 'visible' : ''}`}>
            <a href="#projects" className="btn-primary">
              View Work
              <span className="material-icons text-base">arrow_forward</span>
            </a>
            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </div>

          {/* Stats */}
          <div className={`reveal delay-400 grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-[var(--border-subtle)] ${visible ? 'visible' : ''}`}>
            <div className="stat-item">
              <span className="stat-value accent">30K+</span>
              <span className="stat-label">Users Served</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">RM 10M+</span>
              <span className="stat-label">Platform Value</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100K+</span>
              <span className="stat-label">LOC Codebase</span>
            </div>
            <div className="stat-item">
              <span className="stat-value accent">Top 5</span>
              <span className="stat-label">Gov Hackathon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--text-muted)] to-transparent" />
      </div>
    </section>
  );
};
