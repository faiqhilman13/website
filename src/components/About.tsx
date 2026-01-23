export const About: React.FC = () => {
  const expertise = [
    { label: 'Multi-Agent Systems', desc: 'Orchestrating AI agents for enterprise workflows' },
    { label: 'RAG Pipelines', desc: 'Hybrid retrieval with pgvector & BM25' },
    { label: 'Full-Stack AI', desc: 'React/TypeScript + Python/FastAPI' },
    { label: 'Cloud Deploy', desc: 'AWS Bedrock, CodePipeline, Docker' },
  ];

  return (
    <section id="about" className="relative z-10 py-32">
      {/* Diagonal accent line */}
      <div
        className="absolute left-0 top-1/4 w-1/3 h-px bg-gradient-to-r from-[var(--accent-crimson)] to-transparent"
        style={{ transform: 'rotate(-5deg)' }}
      />

      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left column - Statement */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs tracking-[0.3em] text-[var(--accent-crimson)] block mb-4">
              自己紹介 // INTRODUCTION
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-12">
              Building AI
              <br />
              <span className="text-[var(--accent-crimson)] italic font-serif">That Ships</span>
            </h2>

            {/* Manifesto-style text */}
            <div className="space-y-8 max-w-2xl">
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                <span className="text-[var(--text-primary)] font-semibold">2 years shipping production LLM systems</span> to
                enterprise customers. Technical backbone of an RM 10M+ AI program at EY.
              </p>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed border-l-2 border-[var(--accent-crimson)] pl-6">
                My work sits at the intersection of AI engineering and full-stack development—building
                multi-agent orchestration systems, RAG pipelines, and customer-facing solutions that
                <span className="text-[var(--accent-crimson)]"> actually get deployed</span>.
              </p>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Delivered &gt;80% of 3 production AI systems solo using agentic coding workflows.
                Top 3 contributor on a 100K+ LOC enterprise codebase.
              </p>
            </div>

            {/* Credentials - inline */}
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="font-mono text-xs text-[var(--text-muted)]">Credentials:</span>
              {['ISC2 Cybersecurity', 'MS Azure', 'MS Security'].map((cert, i) => (
                <span key={cert} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[var(--text-secondary)]">{cert}</span>
                  {i < 2 && <span className="text-[var(--accent-crimson)]">/</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Right column - Expertise grid */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <span className="font-mono text-xs tracking-[0.2em] text-[var(--text-muted)] block mb-8">
                CORE EXPERTISE
              </span>

              <div className="space-y-6">
                {expertise.map((item, index) => (
                  <div
                    key={item.label}
                    className="group relative pl-6"
                  >
                    {/* Vertical line with dot */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border-subtle)] group-hover:bg-[var(--accent-crimson)] transition-colors" />
                    <div className="absolute left-0 top-2 w-px h-px">
                      <div className="absolute -left-1 -top-1 w-2 h-2 bg-[var(--bg-void)] border border-[var(--border-subtle)] group-hover:border-[var(--accent-crimson)] group-hover:bg-[var(--accent-crimson)] transition-all" style={{ transform: 'rotate(45deg)' }} />
                    </div>

                    <h3 className="text-lg font-semibold mb-1 group-hover:text-[var(--accent-crimson)] transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* LLM models */}
              <div className="mt-12 pt-8 border-t border-[var(--border-subtle)]">
                <span className="font-mono text-xs tracking-[0.15em] text-[var(--text-muted)] block mb-4">
                  MODELS
                </span>
                <div className="flex flex-wrap gap-3">
                  {['Claude', 'GPT-4', 'Llama', 'Mistral', 'Qwen'].map((model) => (
                    <span
                      key={model}
                      className="px-3 py-1 font-mono text-xs text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-crimson)] hover:text-[var(--accent-crimson)] transition-colors cursor-default"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
