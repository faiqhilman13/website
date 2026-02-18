import { useEffect, type ReactNode } from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { Education } from '../components/Education';
import { Dojo } from '../components/Dojo';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

interface VariationLayoutProps {
  themeClass: string;
  background: ReactNode;
  hero?: ReactNode;
  mainClassName?: string;
}

export const VariationLayout: React.FC<VariationLayoutProps> = ({
  themeClass,
  background,
  hero,
  mainClassName,
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)] antialiased relative overflow-x-hidden ${themeClass}`}
    >
      {background}

      <Navigation />
      <main className={`relative z-10 ${mainClassName ?? ''}`.trim()}>
        {hero ?? <Hero />}
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Dojo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
