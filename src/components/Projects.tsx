import { useState } from 'react';
import { projectsData } from '../data/projectsData';

export const Projects: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="relative z-10 py-32">
      <div className="container">
        {/* Editorial header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs tracking-[0.3em] text-[var(--accent-crimson)] block mb-4">
              作品集 // PORTFOLIO
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
              Forged in
              <br />
              <span className="text-[var(--accent-crimson)] italic font-serif">Production</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p className="text-[var(--text-secondary)] font-serif italic text-lg border-l-2 border-[var(--accent-crimson)] pl-6">
              Systems that ship, not prototypes that sit.
            </p>
          </div>
        </div>

        {/* Projects - Magazine spread layout */}
        <div className="space-y-32">
          {projectsData.map((project, index) => (
            <article
              key={project.title}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Large index number - background */}
              <div
                className="absolute -left-4 lg:left-0 top-0 font-bold text-[12rem] lg:text-[20rem] leading-none text-transparent pointer-events-none select-none transition-all duration-700"
                style={{
                  WebkitTextStroke: hoveredIndex === index ? '2px var(--accent-crimson)' : '1px var(--border-subtle)',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Content layout - alternating sides */}
              <div className={`grid lg:grid-cols-12 gap-8 relative z-10 ${
                index % 2 === 0 ? '' : 'lg:text-right'
              }`}>
                {/* Main content */}
                <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-6'}`}>
                  {/* Tag - diagonal slash */}
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-[var(--accent-crimson)] transform -rotate-45" />
                    <span className="font-mono text-xs tracking-[0.2em] text-[var(--accent-crimson)] uppercase">
                      {project.tag}
                    </span>
                  </div>

                  {/* Title - large and bold */}
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-[var(--accent-crimson)] transition-colors duration-500">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8 max-w-xl">
                    {project.description}
                  </p>

                  {/* Highlights - with slash markers */}
                  <div className="space-y-3 mb-8">
                    {project.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-4 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse lg:text-left'}`}
                      >
                        <span className="text-[var(--accent-crimson)] font-mono text-xs mt-1">//</span>
                        <p className="text-[var(--text-secondary)] text-sm">{highlight}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack - inline flow */}
                  <div className={`flex flex-wrap gap-x-4 gap-y-2 ${index % 2 === 0 ? '' : 'lg:justify-end'}`}>
                    {project.technologies.map((tech, i) => (
                      <span key={tech} className="text-[var(--text-muted)] font-mono text-xs">
                        {tech}
                        {i < project.technologies.length - 1 && (
                          <span className="ml-4 text-[var(--accent-crimson)]">/</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 mt-8 group/link"
                    >
                      <span className="font-mono text-sm text-[var(--text-primary)] group-hover/link:text-[var(--accent-crimson)] transition-colors">
                        View {project.linkLabel}
                      </span>
                      <div className="w-8 h-8 border border-[var(--border-subtle)] flex items-center justify-center group-hover/link:border-[var(--accent-crimson)] group-hover/link:bg-[var(--accent-crimson)] transition-all">
                        <span className="material-icons text-sm group-hover/link:text-white transition-colors">
                          arrow_forward
                        </span>
                      </div>
                    </a>
                  )}
                </div>

                {/* Side decoration - hexagon pattern */}
                <div className={`hidden lg:flex lg:col-span-4 items-center justify-center ${
                  index % 2 === 0 ? 'lg:col-start-9' : 'lg:col-start-1 lg:row-start-1'
                }`}>
                  <div className="relative w-48 h-48">
                    {/* Hexagonal frame */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <polygon
                        points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                        fill="none"
                        stroke={hoveredIndex === index ? 'var(--accent-crimson)' : 'var(--border-subtle)'}
                        strokeWidth="0.5"
                        className="transition-all duration-500"
                      />
                      <polygon
                        points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5"
                        fill="none"
                        stroke={hoveredIndex === index ? 'var(--accent-crimson)' : 'var(--border-subtle)'}
                        strokeWidth="0.3"
                        opacity="0.5"
                        className="transition-all duration-500"
                      />
                    </svg>

                    {/* Center content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`font-mono text-4xl font-bold transition-colors duration-500 ${
                        hoveredIndex === index ? 'text-[var(--accent-crimson)]' : 'text-[var(--text-muted)]'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horizontal rule - katana slash */}
              <div className="mt-16 relative">
                <div className="h-px bg-gradient-to-r from-[var(--accent-crimson)] via-[var(--border-subtle)] to-transparent" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--accent-crimson)]"
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                />
              </div>
            </article>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-20 flex justify-center">
          <a
            href="https://github.com/faiqhilman13"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-6"
          >
            <span className="w-16 h-px bg-[var(--border-subtle)] group-hover:bg-[var(--accent-crimson)] group-hover:w-24 transition-all" />
            <span className="font-mono text-sm tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--accent-crimson)] transition-colors">
              EXPLORE ALL REPOSITORIES
            </span>
            <span className="w-16 h-px bg-[var(--border-subtle)] group-hover:bg-[var(--accent-crimson)] group-hover:w-24 transition-all" />
          </a>
        </div>
      </div>
    </section>
  );
};
