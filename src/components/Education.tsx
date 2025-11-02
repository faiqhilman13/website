import React from 'react';
import { educationData } from '../data/educationData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="brutalist-section">
        {/* Brutalist Header */}
        <div className="text-center mb-16">
          <p className="text-sm italic text-gray-500 mb-2">(04 EDUCATION)</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-black mb-4">
            ACADEMIC <span className="text-yellow-300">BACKGROUND</span>
          </h2>
          <div className="brutalist-accent-line mx-auto mb-8"></div>
          <p className="text-xl font-mono text-black max-w-3xl mx-auto">
            Formal education spanning data science, finance, and business analytics.
          </p>
        </div>

        {/* Education Grid */}
        <div className="brutalist-grid-2 mb-16">
          {educationData.map((edu, index) => (
            <div key={index} className="brutalist-block brutalist-hover">
              <h3 className="brutalist-subheading text-yellow-300">{edu.institution}</h3>
              <p className="text-lg font-mono mb-2">{edu.degree}</p>
              <p className="font-mono text-sm mb-3">{edu.period} • {edu.location}</p>
              <div className="brutalist-accent-line-sm mb-4"></div>

              <div className="space-y-3 mb-4">
                <p className="font-mono text-sm">
                  <span className="font-bold">COURSEWORK:</span> {edu.coursework}
                </p>
              </div>

              {edu.achievements && (
                <div className="mt-4">
                  <h4 className="text-lg font-bold uppercase mb-3">LEADERSHIP ROLES</h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, aIndex) => (
                      <li key={aIndex} className="flex items-start">
                        <div className="h-2 w-2 mt-1 bg-yellow-300 mr-3"></div>
                        <span className="font-mono text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Academic Journey Summary */}
        <div className="brutalist-grid-3 mb-16">
          <div className="brutalist-block brutalist-hover-reverse">
            <h4 className="text-lg font-bold uppercase mb-2">DATA SCIENCE</h4>
            <p className="font-mono text-sm mb-3">City University London</p>
            <p className="font-mono text-sm mb-3">MSc Data Science</p>
            <p className="font-mono text-sm mb-3">Machine Learning • Neural Networks</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>

          <div className="brutalist-block brutalist-hover">
            <h4 className="text-lg font-bold uppercase mb-2">FINANCE FOCUS</h4>
            <p className="font-mono text-sm mb-3">University of Melbourne</p>
            <p className="font-mono text-sm mb-3">Bachelor of Commerce</p>
            <p className="font-mono text-sm mb-3">M&A • Derivatives • Financial Analysis</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>

          <div className="brutalist-block brutalist-hover-reverse">
            <h4 className="text-lg font-bold uppercase mb-2">EVOLUTION</h4>
            <p className="font-mono text-sm mb-3">Finance → Data Science</p>
            <p className="font-mono text-sm mb-3">→ AI/ML • Cybersecurity</p>
            <p className="font-mono text-sm mb-3">→ Fullstack Development</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};