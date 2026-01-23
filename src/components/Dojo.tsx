export const Dojo: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-crimson)]/10 via-transparent to-[var(--accent-gold)]/5" />

      <div className="container relative z-10">
        <div className="reveal glass-card p-8 md:p-12 border-[var(--accent-crimson)]/30">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <span className="section-tag">// Side Project</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Agentic
                <span className="text-[var(--accent-crimson)]"> Dojo</span>
              </h2>

              <p className="font-serif text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                A course on mastering the art of agentic coding. Learn to orchestrate AI agents,
                build production systems at the speed of thought, and transform how you approach
                software development.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'The Orchestrator mindset shift',
                  'Tools, context injection & decomposition systems',
                  'Live execution: frontend, backend, and deployment',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-[var(--text-secondary)]">
                    <span className="text-[var(--accent-crimson)] mt-1">
                      <span className="block w-1.5 h-1.5 bg-current" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://agenticdojo.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit Agentic Dojo
                <span className="material-icons text-base">arrow_forward</span>
              </a>
            </div>

            {/* Right - Visual */}
            <div className="relative">
              <div className="aspect-video bg-[var(--bg-elevated)] border border-[var(--border-subtle)] relative overflow-hidden">
                {/* Terminal-style mockup */}
                <div className="absolute inset-0 p-6">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[var(--accent-crimson)]" />
                    <div className="w-3 h-3 rounded-full bg-[var(--accent-gold)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>

                  <div className="font-mono text-sm space-y-2 text-[var(--text-secondary)]">
                    <p>
                      <span className="text-[var(--accent-crimson)]">$</span> claude-code init
                    </p>
                    <p className="text-[var(--text-muted)]">
                      Initializing agentic workflow...
                    </p>
                    <p>
                      <span className="text-[var(--accent-crimson)]">$</span> deploy --production
                    </p>
                    <p className="text-green-400">
                      Deployed in 3 minutes. 0 manual lines written.
                    </p>
                    <p className="animate-pulse">
                      <span className="text-[var(--accent-crimson)]">$</span>{' '}
                      <span className="inline-block w-2 h-4 bg-[var(--text-primary)]" />
                    </p>
                  </div>
                </div>

                {/* Decorative grid */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, var(--text-primary) 1px, transparent 1px),
                      linear-gradient(var(--text-primary) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-[var(--accent-crimson)] text-white font-mono text-xs uppercase tracking-wider px-4 py-2">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
