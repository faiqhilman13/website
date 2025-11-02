import React, { useState } from 'react';
import { skillsData } from '../data/skillsData';
import { IconWrapper } from './IconsSvg';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="brutalist-section">
        {/* Brutalist Header */}
        <div className="text-center mb-16">
          <p className="text-sm italic text-gray-500 mb-2">(03 TECHNICAL SKILLS)</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-black mb-4">
            TECHNICAL <span className="text-yellow-300">SKILLS</span>
          </h2>
          <div className="brutalist-accent-line mx-auto mb-8"></div>
          <p className="text-xl font-mono text-black max-w-3xl mx-auto">
            Comprehensive expertise spanning enterprise AI, fullstack development, and cybersecurity.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="brutalist-grid-2 gap-8 mb-16">
          {Object.entries(skillsData).map(([categoryId, category]) => (
            <div
              key={categoryId}
              className={`brutalist-block brutalist-hover ${
                activeCategory === categoryId ? 'bg-black text-white' : ''
              }`}
            >
              <div className="brutalist-subheading text-yellow-300 mb-2">
                <IconWrapper emoji={category.icon} size={40} color="black" />
              </div>
              <h4 className="text-lg font-bold uppercase mb-3">{category.title}</h4>
              <p className="font-mono text-sm mb-4">{category.description}</p>
              <div className="brutalist-accent-line-sm mb-4"></div>

              <div
                className={`transition-all duration-300 ${
                  activeCategory === categoryId ? 'max-h-96 overflow-y-auto' : 'max-h-24 overflow-hidden'
                }`}
              >
                <ul className="space-y-2">
                  {category.skills.slice(0, activeCategory === categoryId ? undefined : 4).map((skill, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 mt-1 bg-yellow-300 mr-3"></div>
                      <span className="font-mono text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => toggleCategory(categoryId)}
                className="mt-4 text-xs font-bold uppercase border-2 border-black px-3 py-1 hover:bg-yellow-300 hover:text-black transition-colors"
              >
                {activeCategory === categoryId ? 'SHOW LESS' : 'SHOW MORE'}
              </button>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="brutalist-block brutalist-hover">
          <h3 className="brutalist-subheading text-yellow-300">PROFESSIONAL CERTIFICATIONS</h3>
          <div className="brutalist-accent-line-sm mb-6"></div>

          <div className="brutalist-grid-3">
            <div className="brutalist-block brutalist-hover-reverse">
              <h4 className="text-lg font-bold uppercase mb-2">ISC2</h4>
              <p className="font-mono text-sm mb-3">Certified in Cybersecurity</p>
              <p className="font-mono text-xs">Industry-recognized cybersecurity knowledge and skills validation</p>
              <div className="brutalist-accent-line-sm"></div>
            </div>

            <div className="brutalist-block brutalist-hover">
              <h4 className="text-lg font-bold uppercase mb-2">MICROSOFT</h4>
              <p className="font-mono text-sm mb-3">Security, Compliance & Identity</p>
              <p className="font-mono text-xs">Cloud-based and Microsoft services security foundation</p>
              <div className="brutalist-accent-line-sm"></div>
            </div>

            <div className="brutalist-block brutalist-hover-reverse">
              <h4 className="text-lg font-bold uppercase mb-2">MICROSOFT</h4>
              <p className="font-mono text-sm mb-3">Azure Fundamentals</p>
              <p className="font-mono text-xs">Cloud concepts, services, workloads, security, and privacy</p>
              <div className="brutalist-accent-line-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};