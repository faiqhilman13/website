import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="brutalist-section">
        {/* Brutalist Header */}
        <div className="text-center mb-16">
          <p className="text-sm italic text-gray-500 mb-2">(ABOUT ME)</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-black mb-4">
            UNAPOLOGETIC <span className="text-yellow-300">ENGINEER</span>
          </h2>
          <div className="brutalist-accent-line mx-auto mb-8"></div>
          <p className="text-xl font-mono text-black max-w-3xl mx-auto">
            Technology Consultant with cross-domain expertise spanning AI, cybersecurity, and fullstack development.
          </p>
        </div>

        {/* About Grid */}
        <div className="brutalist-grid mb-16">
          {/* Profile Card */}
          <div className="md:col-span-4">
            <div className="brutalist-card brutalist-hover">
              <div className="aspect-square bg-yellow-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-black text-6xl font-bold text-center px-4">
                    Faiq Hilman
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="md:col-span-8">
            <div className="brutalist-block brutalist-hover">
              <h3 className="brutalist-subheading text-yellow-300">ENGINEERING PROFILE</h3>
              <div className="brutalist-accent-line-sm mb-6"></div>

              <div className="space-y-4 mb-6">
                <p className="font-mono">
                  Technology Consultant at EY building enterprise GenAI platforms for 30,000+ user organizations.
                  Cross-functional expertise spanning AI/ML Engineering, Fullstack Development, and Cybersecurity.
                  Finance background providing strategic business value translation for complex technical solutions.
                </p>

                <div className="brutalist-grid-3">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-yellow-300">30K+</h4>
                    <p className="font-mono text-xs">USERS SERVED</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-yellow-300">4+</h4>
                    <p className="font-mono text-xs">PRODUCTION SYSTEMS</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-yellow-300">90%+</h4>
                    <p className="font-mono text-xs">ACCURACY RATE</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-bold uppercase mb-3">KEY EXPERTISE</h4>
                <div className="space-y-2">
                  <p className="font-mono text-sm">
                    <span className="font-bold">AI/ML:</span> GenAI platforms, RAG systems, LLM integration
                  </p>
                  <p className="font-mono text-sm">
                    <span className="font-bold">FULLSTACK:</span> React.js, .NET, Python, AWS infrastructure
                  </p>
                  <p className="font-mono text-sm">
                    <span className="font-bold">SECURITY:</span> Enterprise security, compliance, OT cybersecurity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Journey */}
        <div className="brutalist-grid-3 mb-8">
          <div className="brutalist-block brutalist-hover-reverse">
            <h4 className="text-lg font-bold uppercase mb-2">CURRENT ROLE</h4>
            <p className="font-mono text-sm mb-3">EY Consulting</p>
            <p className="font-mono text-sm mb-3">Technology Consultant</p>
            <p className="font-mono text-sm mb-3">Aug 2024 - Present</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>

          <div className="brutalist-block brutalist-hover">
            <h4 className="text-lg font-bold uppercase mb-2">EDUCATION</h4>
            <p className="font-mono text-sm mb-3">MSc Data Science</p>
            <p className="font-mono text-sm mb-3">City University London</p>
            <p className="font-mono text-sm mb-3">BCom University of Melbourne</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>

          <div className="brutalist-block brutalist-hover-reverse">
            <h4 className="text-lg font-bold uppercase mb-2">SKILLS EVOLUTION</h4>
            <p className="font-mono text-sm mb-3">Finance → Data Science</p>
            <p className="font-mono text-sm mb-3">→ Cybersecurity → AI/ML</p>
            <p className="font-mono text-sm mb-3">→ Fullstack Development</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="brutalist-grid-3 mb-16">
          <div className="brutalist-block brutalist-hover">
            <h3 className="brutalist-subheading text-yellow-300">ENTERPRISE AI</h3>
            <div className="brutalist-accent-line-sm mb-4"></div>
            <p className="font-mono text-sm mb-2">Production systems design</p>
            <p className="font-mono text-sm mb-2">Microservices architecture</p>
            <p className="font-mono text-sm mb-2">30K+ user scaling</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>

          <div className="brutalist-block brutalist-hover-reverse">
            <h3 className="brutalist-subheading text-yellow-300">FULLSTACK DEV</h3>
            <div className="brutalist-accent-line-sm mb-4"></div>
            <p className="font-mono text-sm mb-2">React.js frontends</p>
            <p className="font-mono text-sm mb-2">.NET backends</p>
            <p className="font-mono text-sm mb-2">Python data systems</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>

          <div className="brutalist-block brutalist-hover">
            <h3 className="brutalist-subheading text-yellow-300">SECURITY</h3>
            <div className="brutalist-accent-line-sm mb-4"></div>
            <p className="font-mono text-sm mb-2">Enterprise security</p>
            <p className="font-mono text-sm mb-2">Compliance frameworks</p>
            <p className="font-mono text-sm mb-2">OT cybersecurity</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a href="#contact" className="brutalist-button">
            DISCUSS COLLABORATION
          </a>
        </div>
      </div>
    </section>
  );
};