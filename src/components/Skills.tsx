import { useState, useEffect } from 'react';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [typedText, setTypedText] = useState('');

  const skillCategories = [
    {
      command: 'ai --systems',
      title: 'AI & LLM Systems',
      skills: [
        { name: 'Multi-agent orchestration', level: 95 },
        { name: 'RAG pipelines (pgvector + BM25)', level: 90 },
        { name: 'Cross-encoder reranking', level: 85 },
        { name: 'Prompt engineering', level: 95 },
        { name: 'Guardrail implementation', level: 88 },
        { name: 'Semantic chunking', level: 85 },
      ],
    },
    {
      command: 'stack --frontend',
      title: 'Frontend & Full-Stack',
      skills: [
        { name: 'React / React Native', level: 92 },
        { name: 'TypeScript', level: 90 },
        { name: 'Zustand / TanStack Query', level: 85 },
        { name: 'SSE streaming', level: 88 },
        { name: 'Real-time interfaces', level: 85 },
      ],
    },
    {
      command: 'stack --backend',
      title: 'Backend & Data',
      skills: [
        { name: 'FastAPI / Python', level: 92 },
        { name: '.NET / C#', level: 85 },
        { name: 'PostgreSQL / pgvector', level: 88 },
        { name: 'Redis', level: 82 },
        { name: 'ETL pipelines', level: 85 },
      ],
    },
    {
      command: 'infra --cloud',
      title: 'Infrastructure',
      skills: [
        { name: 'AWS Bedrock / S3 / EC2', level: 88 },
        { name: 'CodePipeline CI/CD', level: 85 },
        { name: 'Docker / Compose', level: 90 },
        { name: 'VPS deployment', level: 85 },
      ],
    },
  ];

  const models = ['Claude 4.0', 'GPT-4', 'Llama', 'Mistral', 'Qwen'];

  // Typing effect for command
  useEffect(() => {
    const command = skillCategories[activeCategory].command;
    setTypedText('');

    let i = 0;
    const interval = setInterval(() => {
      if (i <= command.length) {
        setTypedText(command.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [activeCategory]);

  return (
    <section id="skills" className="relative z-10 py-32">
      <div className="container">
        {/* Header */}
        <div className="mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-[var(--accent-crimson)] block mb-4">
            技術 // CAPABILITIES
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
            Technical
            <br />
            <span className="text-[var(--accent-crimson)] italic font-serif">Arsenal</span>
          </h2>
        </div>

        {/* Terminal-style interface */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Command palette - left side */}
          <div className="lg:col-span-4 space-y-2">
            {skillCategories.map((category, index) => (
              <button
                key={category.command}
                onClick={() => setActiveCategory(index)}
                className={`w-full text-left px-4 py-3 font-mono text-sm transition-all duration-300 relative overflow-hidden ${
                  activeCategory === index
                    ? 'text-[var(--accent-crimson)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {/* Active indicator line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent-crimson)] transition-all duration-300 ${
                    activeCategory === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Prompt symbol */}
                <span className={`mr-2 transition-colors ${
                  activeCategory === index ? 'text-[var(--accent-crimson)]' : 'text-[var(--text-muted)]'
                }`}>
                  {activeCategory === index ? '>' : '$'}
                </span>

                {category.command}
              </button>
            ))}
          </div>

          {/* Output display - right side */}
          <div className="lg:col-span-8">
            {/* Terminal window */}
            <div className="border border-[var(--border-subtle)] bg-[rgba(10,10,11,0.8)]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)]">
                <div className="w-3 h-3 rounded-full bg-[var(--accent-crimson)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--accent-gold)]" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 font-mono text-xs text-[var(--text-muted)]">
                  skills.sh — faiq@dojo
                </span>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm">
                {/* Command line */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[var(--accent-crimson)]">→</span>
                  <span className="text-green-400">faiq</span>
                  <span className="text-[var(--text-muted)]">in</span>
                  <span className="text-[var(--accent-crimson)]">~/skills</span>
                  <span className="text-[var(--text-muted)]">$</span>
                  <span className="text-[var(--text-primary)]">{typedText}</span>
                  <span className="w-2 h-4 bg-[var(--accent-crimson)] animate-pulse" />
                </div>

                {/* Output */}
                <div className="space-y-1 mb-8">
                  <p className="text-[var(--text-muted)]">
                    Scanning {skillCategories[activeCategory].title.toLowerCase()}...
                  </p>
                  <p className="text-green-400">
                    Found {skillCategories[activeCategory].skills.length} capabilities
                  </p>
                </div>

                {/* Skills output - ASCII-style bars */}
                <div className="space-y-4">
                  {skillCategories[activeCategory].skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[var(--text-muted)]">{skill.level}%</span>
                      </div>

                      {/* Progress bar - ASCII style */}
                      <div className="flex items-center gap-1">
                        <span className="text-[var(--accent-crimson)]">[</span>
                        <div className="flex-1 h-1 bg-[var(--bg-elevated)] relative overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--accent-crimson)] to-[var(--accent-gold)] transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-[var(--accent-crimson)]">]</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cursor at end */}
                <div className="mt-8 flex items-center gap-2">
                  <span className="text-[var(--accent-crimson)]">→</span>
                  <span className="text-green-400">faiq</span>
                  <span className="text-[var(--text-muted)]">$</span>
                  <span className="w-2 h-4 bg-[var(--text-muted)] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LLM Models - floating badges */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent" />
            <span className="font-mono text-xs tracking-[0.2em] text-[var(--text-muted)]">
              LLM EXPERIENCE
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent" />
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {models.map((model, i) => (
              <div
                key={model}
                className="group relative"
                style={{ transform: `translateY(${(i % 2) * 8}px)` }}
              >
                {/* Hexagonal badge */}
                <div className="relative px-6 py-3">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 120 50"
                    preserveAspectRatio="none"
                  >
                    <polygon
                      points="10,0 110,0 120,25 110,50 10,50 0,25"
                      fill="none"
                      stroke="var(--border-subtle)"
                      strokeWidth="1"
                      className="group-hover:stroke-[var(--accent-crimson)] transition-colors"
                    />
                  </svg>
                  <span className="relative font-mono text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent-crimson)] transition-colors">
                    {model}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
