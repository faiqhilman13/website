import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Leadership } from './components/Leadership';
import { Education } from './components/Education';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="min-h-screen text-black font-sans antialiased relative overflow-x-hidden bg-white">
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Leadership />
        <Education />
        <Contact />
      </main>
    </div>
  );
}

export default App;