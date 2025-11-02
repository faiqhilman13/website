import React, { useState } from 'react';
import { experienceData } from '../data/experienceData';

export const Experience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="brutalist-section">
        {/* Brutalist Header */}
        <div className="text-center mb-16">
          <p className="text-sm italic text-gray-500 mb-2">(01 EXPERIENCE)</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-black mb-4">
            PROFESSIONAL <span className="text-yellow-300">EXPERIENCE</span>
          </h2>
          <div className="brutalist-accent-line mx-auto mb-8"></div>
          <p className="text-xl font-mono text-black max-w-3xl mx-auto">
            Building production AI systems and delivering enterprise solutions that make measurable impact.
          </p>
        </div>

        {/* Experience Cards - Expandable */}
        <div className="space-y-6 mb-16">
          {experienceData.map((exp, index) => (
            <div key={index} className="brutalist-block brutalist-hover cursor-pointer" onClick={() => toggleExpand(index)}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="brutalist-subheading text-yellow-300">{exp.company.toUpperCase()}</h3>
                  <p className="text-lg font-mono mb-1">{exp.role.toUpperCase()}</p>
                  <p className="text-sm font-mono mb-1">{exp.period} • {exp.location}</p>
                </div>
                <div className="text-3xl ml-4">
                  {expandedIndex === index ? '−' : '+'}
                </div>
              </div>

              {expandedIndex === index && (
                <div className="mt-6">
                  <div className="brutalist-accent-line-sm mb-6"></div>
                  <div className="space-y-3 mb-6">
                    {exp.responsibilities.map((resp, rIndex) => (
                      <p key={rIndex} className="font-mono text-sm leading-relaxed">
                        • {resp}
                      </p>
                    ))}
                  </div>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase mb-3">TECHNOLOGIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, tIndex) => (
                          <span
                            key={tIndex}
                            className="inline-block bg-yellow-300 text-black px-3 py-1 text-xs font-bold uppercase border-2 border-black"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};