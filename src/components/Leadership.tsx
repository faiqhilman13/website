import React from 'react';
import { leadershipData } from '../data/leadershipData';

export const Leadership: React.FC = () => {
  return (
    <section id="leadership" className="py-20 bg-white">
      <div className="brutalist-section">
        {/* Brutalist Header */}
        <div className="text-center mb-16">
          <p className="text-sm italic text-gray-500 mb-2">(LEADERSHIP EXPERIENCE)</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-black mb-4">
            LEADERSHIP <span className="text-yellow-300">ROLES</span>
          </h2>
          <div className="brutalist-accent-line mx-auto mb-8"></div>
          <p className="text-xl font-mono text-black max-w-3xl mx-auto">
            Organizational leadership experience managing teams, budgets, and strategic initiatives.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="brutalist-grid-4 mb-16">
          {leadershipData.map((role, index) => (
            <div key={index} className="brutalist-block brutalist-hover">
              <div className="aspect-video bg-black text-white relative p-6">
                <div className="absolute top-3 left-3">
                  <span className="inline-block bg-yellow-300 text-black text-xs font-bold uppercase px-2 py-1">
                    LEADERSHIP
                  </span>
                </div>
                <div className="flex items-center justify-center h-full">
                  <h3 className="text-xl font-bold uppercase text-center">
                    {role.position}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-lg font-bold uppercase mb-1 text-yellow-300">
                    {role.organization}
                  </h4>
                  <p className="font-mono text-sm mb-2">
                    {role.period} • {role.location}
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="text-sm font-bold uppercase mb-3">KEY ACHIEVEMENTS</h5>
                  <ul className="space-y-2">
                    {role.achievements.map((achievement, aIndex) => (
                      <li key={aIndex} className="flex items-start">
                        <div className="h-2 w-2 mt-1 bg-yellow-300 mr-3"></div>
                        <span className="font-mono text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {role.skills && (
                  <div>
                    <h5 className="text-sm font-bold uppercase mb-3">LEADERSHIP SKILLS</h5>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, sIndex) => (
                        <span
                          key={sIndex}
                          className="inline-block bg-yellow-300 text-black px-3 py-1 text-xs font-bold uppercase border-2 border-black"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Impact Summary */}
        <div className="brutalist-grid-3 mb-16">
          <div className="brutalist-block brutalist-hover-reverse">
            <h4 className="text-lg font-bold uppercase mb-2">TEAM MANAGEMENT</h4>
            <p className="font-mono text-sm mb-3">45-member team managed</p>
            <p className="font-mono text-sm mb-3">$52,000 USD budget</p>
            <p className="font-mono text-sm mb-3">1,100+ active members</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>

          <div className="brutalist-block brutalist-hover">
            <h4 className="text-lg font-bold uppercase mb-2">FINANCIAL IMPACT</h4>
            <p className="font-mono text-sm mb-3">RM13,000 raised</p>
            <p className="font-mono text-sm mb-3">42 sponsors secured</p>
            <p className="font-mono text-sm mb-3">New club record</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>

          <div className="brutalist-block brutalist-hover-reverse">
            <h4 className="text-lg font-bold uppercase mb-2">RECOGNITION</h4>
            <p className="font-mono text-sm mb-3">Best Camp Award</p>
            <p className="font-mono text-sm mb-3">UMSU Award night</p>
            <p className="font-mono text-sm mb-3">Excellence in leadership</p>
            <div className="brutalist-accent-line-sm"></div>
          </div>
        </div>

        {/* Leadership Evolution */}
        <div className="text-center">
          <div className="inline-block bg-black text-white px-8 py-4">
            <h4 className="text-lg font-bold uppercase mb-2">LEADERSHIP EVOLUTION</h4>
            <div className="brutalist-accent-line-sm mx-auto mb-3"></div>
            <p className="font-mono text-sm">
              Student Leadership → Corporate Strategy → Enterprise Consulting
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};