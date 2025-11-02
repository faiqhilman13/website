import React, { useEffect, useRef } from 'react';
import PixelBlast from './PixelBlast';

export const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heading.classList.add('animate-brutalist');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 w-screen left-1/2 -translate-x-1/2">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.5}
          pixelSizeJitter={0.6}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.8}
          liquid
          liquidStrength={0.18}
          liquidRadius={1.3}
          liquidWobbleSpeed={5}
          speed={0.7}
          edgeFade={0.15}
          transparent
        />
      </div>
      <div className="relative z-10">
        {/* Brutalist Navigation */}
        <nav className="brutalist-nav">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-2xl font-bold tracking-tighter uppercase">FAIQ</div>
          <div className="flex space-x-4">
            <a href="#experience" className="hover:underline hover:text-yellow-300 text-xs uppercase">EXPERIENCE</a>
            <a href="#projects" className="hover:underline hover:text-yellow-300 text-xs uppercase">PROJECTS</a>
            <a href="#skills" className="hover:underline hover:text-yellow-300 text-xs uppercase">SKILLS</a>
            <a href="#education" className="hover:underline hover:text-yellow-300 text-xs uppercase">EDUCATION</a>
            <a href="#contact" className="hover:underline hover:text-yellow-300 text-xs uppercase">CONTACT</a>
          </div>
        </div>
      </nav>

      <main className="brutalist-section pt-12">
        {/* Brutalist Hero Section */}
        <div className="brutalist-grid mb-16">
          <div className="md:col-span-7">
            <h1 ref={headingRef} className="brutalist-heading mb-6 opacity-0">
              UNAPOLOGETIC<br/>
              AI SYSTEMS
            </h1>
            <div className="brutalist-accent-line mb-8"></div>
            <p className="brutalist-text mb-8">
              Building enterprise GenAI platforms, distributed systems, and intelligent workflows.
              Production Engineer at EY delivering 30K+ user systems with raw, uncompromising code.
            </p>
            <a href="#projects" className="brutalist-button">
              EXPLORE WORK
            </a>
          </div>
          <div className="md:col-span-5 brutalist-card brutalist-hover">
            <div className="aspect-square bg-yellow-300 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-black text-9xl font-bold">AI</div>
              </div>
            </div>
          </div>
        </div>

        {/* Brutalist Content Blocks */}
        <div className="brutalist-grid-3">
          <div className="brutalist-block brutalist-hover-reverse">
            <h2 className="brutalist-subheading">RAW POWER</h2>
            <p className="mb-4">Production AI systems. 30,000+ users. Enterprise scale.</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>
          <div className="brutalist-block brutalist-hover">
            <h2 className="brutalist-subheading">BOLD MOVES</h2>
            <p className="mb-4">GenAI platforms. Distributed systems. Fullstack solutions.</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>
          <div className="brutalist-block brutalist-hover-reverse">
            <h2 className="brutalist-subheading">PURE CODE</h2>
            <p className="mb-4">React .NET Python. AWS infrastructure. Cybersecurity.</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};