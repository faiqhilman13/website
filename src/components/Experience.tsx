import { useState } from 'react';
import { experienceData } from '../data/experienceData';

export const Experience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="experience" className="relative z-10 py-32 overflow-hidden">
      {/* Diagonal slice background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, transparent 40%, rgba(220, 38, 38, 0.03) 40%, rgba(220, 38, 38, 0.03) 60%, transparent 60%)`
        }}
      />

      <div className="container relative">
        {/* Section header - asymmetric */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-[var(--accent-crimson)] block mb-4">
              履歴書 // CAREER PATH
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
              Battle
              <br />
              <span className="text-[var(--accent-crimson)] italic font-serif">Records</span>
            </h2>
          </div>

          {/* Vertical timeline indicator */}
          <div className="flex items-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[var(--accent-crimson)]" />
            <span className="font-mono text-sm text-[var(--text-muted)]">
              {String(activeIndex + 1).padStart(2, '0')} / {String(experienceData.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Main content - Katana slash layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0">

          {/* Left: Timeline navigation - vertical blade */}
          <div className="lg:col-span-4 relative">
            {/* The blade line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-crimson)] via-[var(--border-subtle)] to-transparent" />

            <div className="space-y-2 pl-8">
              {experienceData.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`group w-full text-left relative transition-all duration-500 ${
                    activeIndex === index ? 'pl-4' : 'pl-0'
                  }`}
                >
                  {/* Active indicator - blade tip */}
                  <div
                    className={`absolute -left-8 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                      activeIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="w-4 h-4 rotate-45 border-t-2 border-r-2 border-[var(--accent-crimson)]" />
                  </div>

                  {/* Company block */}
                  <div
                    className={`py-6 border-b border-[var(--border-subtle)] transition-all duration-300 ${
                      activeIndex === index
                        ? 'border-[var(--accent-crimson)]'
                        : 'hover:border-[var(--text-muted)]'
                    }`}
                  >
                    <span className={`font-mono text-xs tracking-wider transition-colors ${
                      activeIndex === index ? 'text-[var(--accent-crimson)]' : 'text-[var(--text-muted)]'
                    }`}>
                      {exp.period}
                    </span>
                    <h3 className={`text-2xl font-bold mt-2 transition-colors ${
                      activeIndex === index ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                    }`}>
                      {exp.company}
                    </h3>
                    <p className={`text-sm mt-1 transition-colors ${
                      activeIndex === index ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'
                    }`}>
                      {exp.role}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Content display - the cut reveals */}
          <div className="lg:col-span-8 lg:pl-16 relative">
            {/* Diagonal cut decoration */}
            <div
              className="absolute -left-4 top-0 bottom-0 w-8 hidden lg:block"
              style={{
                background: `linear-gradient(135deg, transparent 49%, var(--bg-void) 49%, var(--bg-void) 51%, transparent 51%)`
              }}
            />

            {experienceData.map((exp, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  activeIndex === index
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'
                }`}
              >
                {/* Location tag - floating */}
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-[var(--accent-crimson)]/10 border-l-2 border-[var(--accent-crimson)]">
                  <span className="font-mono text-xs tracking-wider text-[var(--accent-crimson)]">
                    {exp.location}
                  </span>
                </div>

                {/* Highlights - staggered blocks */}
                <div className="space-y-6">
                  {exp.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="group relative"
                      style={{
                        marginLeft: `${(i % 3) * 20}px`,
                        animationDelay: `${i * 100}ms`
                      }}
                    >
                      {/* Strike-through decoration on hover */}
                      <div className="absolute -left-6 top-1/2 w-4 h-px bg-[var(--accent-crimson)] opacity-0 group-hover:opacity-100 transition-opacity" />

                      <p className="text-[var(--text-secondary)] leading-relaxed pl-4 border-l border-[var(--border-subtle)] group-hover:border-[var(--accent-crimson)] group-hover:text-[var(--text-primary)] transition-all">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech stack - scattered tags */}
                <div className="mt-12 relative">
                  <span className="font-mono text-xs tracking-[0.2em] text-[var(--text-muted)] block mb-4">
                    ARSENAL
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={tech}
                        className="relative px-3 py-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-crimson)] transition-colors cursor-default"
                        style={{
                          transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (Math.random() * 2)}deg)`
                        }}
                      >
                        {/* Corner cuts */}
                        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--border-subtle)]" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--border-subtle)]" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
