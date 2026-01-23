export const Education: React.FC = () => {
  const education = [
    {
      institution: 'City, University of London',
      degree: 'MSc Data Science',
      period: '2022 — 2024',
      location: 'London, UK',
      icon: '獅', // Lion (UK symbol)
      coursework: ['Machine Learning', 'Neural Computing', 'Big Data', 'Visual Analytics', 'Knowledge Graphs'],
    },
    {
      institution: 'University of Melbourne',
      degree: 'Bachelor of Commerce',
      period: '2017 — 2019',
      location: 'Melbourne, AU',
      icon: '虎', // Tiger/Power
      coursework: ['Financial Analysis', 'M&A', 'Derivatives', 'Quantitative Methods', 'Investments'],
    },
  ];

  return (
    <section id="education" className="relative z-10 py-32">
      <div className="container">
        {/* Header */}
        <div className="mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-[var(--accent-crimson)] block mb-4">
            学歴 // TRAINING GROUNDS
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
            Academic
            <br />
            <span className="text-[var(--accent-crimson)] italic font-serif">Discipline</span>
          </h2>
        </div>

        {/* Education items - Scroll/Diploma style */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {education.map((edu, index) => (
            <div key={edu.institution} className="group relative">
              {/* Large kanji background */}
              <div className="absolute -top-8 -right-4 text-[10rem] font-bold text-[var(--border-subtle)] opacity-30 select-none pointer-events-none leading-none group-hover:text-[var(--accent-crimson)] group-hover:opacity-10 transition-all duration-700">
                {edu.icon}
              </div>

              {/* Content */}
              <div className="relative">
                {/* Period - diagonal badge */}
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-[var(--accent-crimson)]" />
                  <span className="font-mono text-xs tracking-[0.2em] text-[var(--accent-crimson)]">
                    {edu.period}
                  </span>
                </div>

                {/* Degree */}
                <h3 className="text-3xl font-bold mb-2 group-hover:text-[var(--accent-crimson)] transition-colors">
                  {edu.degree}
                </h3>

                {/* Institution */}
                <p className="text-xl text-[var(--text-secondary)] mb-2">
                  {edu.institution}
                </p>

                {/* Location */}
                <p className="font-mono text-sm text-[var(--text-muted)] mb-8">
                  {edu.location}
                </p>

                {/* Coursework - flowing tags */}
                <div className="relative">
                  <span className="font-mono text-xs tracking-[0.15em] text-[var(--text-muted)] block mb-4">
                    DISCIPLINES
                  </span>

                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {edu.coursework.map((course, i) => (
                      <span
                        key={course}
                        className="relative text-[var(--text-secondary)] text-sm group-hover:text-[var(--text-primary)] transition-colors"
                      >
                        {course}
                        {i < edu.coursework.length - 1 && (
                          <span className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-1 bg-[var(--accent-crimson)] rounded-full" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="mt-8 h-px bg-gradient-to-r from-[var(--accent-crimson)] via-[var(--border-subtle)] to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Evolution path */}
        <div className="mt-24 relative">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {['Finance', 'Data Science', 'AI/ML', 'Full-Stack'].map((phase, i, arr) => (
              <div key={phase} className="flex items-center gap-8">
                <span className="font-mono text-sm text-[var(--text-muted)] hover:text-[var(--accent-crimson)] transition-colors cursor-default">
                  {phase}
                </span>
                {i < arr.length - 1 && (
                  <div className="w-8 h-px bg-[var(--accent-crimson)] transform -rotate-12" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
