import React, { useState } from 'react';
import { projectsData } from '../data/projectsData';
import { IconWrapper } from './IconsSvg';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const openProject = (index: number) => {
    setSelectedProject(index);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-20 bg-white">
      <div className="brutalist-section">
        {/* Brutalist Header */}
        <div className="text-center mb-16">
          <p className="text-sm italic text-gray-500 mb-2">(02 PROJECTS)</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-black mb-4">
            FEATURED <span className="text-yellow-300">PROJECTS</span>
          </h2>
          <div className="brutalist-accent-line mx-auto mb-8"></div>
          <p className="text-xl font-mono text-black max-w-3xl mx-auto">
            Showcasing production AI platforms and innovative solutions that deliver measurable business value.
          </p>
        </div>

        {/* Projects Grid - 3 Column */}
        <div className="brutalist-grid-3 gap-8 mb-16">
          {projectsData.slice(0, 3).map((project, index) => (
            <div key={index} className="brutalist-block brutalist-hover">
              <div className="mb-4">
                <IconWrapper emoji={project.icon} size={48} color="black" />
              </div>
              <h3 className="brutalist-subheading text-yellow-300">{project.title.toUpperCase()}</h3>
              <p className="font-mono text-sm mb-4">{project.shortDescription}</p>
              <div className="brutalist-accent-line-sm mb-4"></div>

              <div className="mb-6">
                <h4 className="text-sm font-bold uppercase mb-3">KEY FEATURES</h4>
                <ul className="space-y-2">
                  {project.keyFeatures?.slice(0, 3).map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <div className="h-2 w-2 mt-1 bg-yellow-300 mr-3"></div>
                      <span className="font-mono text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.outcome && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold uppercase mb-2">OUTCOME</h4>
                  <p className="font-mono text-xs leading-relaxed">{project.outcome}</p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-bold uppercase mb-2">TECH STACK</h4>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 4).map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="inline-block bg-yellow-300 text-black px-2 py-1 text-xs font-bold uppercase border border-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.github && (
                <div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-yellow-300 px-4 py-2 text-xs font-bold uppercase border-2 border-black hover:bg-yellow-300 hover:text-black transition-colors"
                  >
                    VIEW ON GITHUB
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Brutalist Project Modal */}
      {selectedProject !== null && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
          <div
            className="bg-white border-4 border-black p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto brutalist-hover"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold uppercase text-black">
                {projectsData[selectedProject].title}
              </h3>
              <button
                onClick={closeProject}
                className="bg-yellow-300 text-black px-4 py-2 font-bold hover:bg-yellow-400 transition-colors border-2 border-black"
                aria-label="Close"
              >
                X
              </button>
            </div>

            <div className="space-y-6">
              <p className="font-mono text-black">
                {projectsData[selectedProject].fullDescription}
              </p>

              {projectsData[selectedProject].keyFeatures && (
                <div>
                  <h4 className="text-lg font-bold uppercase mb-3 text-black">KEY FEATURES</h4>
                  <ul className="list-disc list-inside space-y-2 font-mono text-black">
                    {projectsData[selectedProject].keyFeatures.map((feature, fIndex) => (
                      <li key={fIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-lg font-bold uppercase mb-3 text-black">TECHNOLOGIES USED</h4>
                <div className="flex flex-wrap gap-2">
                  {projectsData[selectedProject].technologies.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="inline-block bg-yellow-300 text-black px-3 py-1 text-xs font-bold uppercase border-2 border-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {projectsData[selectedProject].outcome && (
                <div>
                  <h4 className="text-lg font-bold uppercase mb-3 text-black">OUTCOME</h4>
                  <p className="font-mono text-black">
                    {projectsData[selectedProject].outcome}
                  </p>
                </div>
              )}

              {projectsData[selectedProject].github && (
                <div>
                  <a
                    href={projectsData[selectedProject].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-yellow-300 px-4 py-2 text-sm font-bold uppercase border-2 border-black hover:bg-yellow-300 hover:text-black transition-colors"
                  >
                    VIEW ON GITHUB
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};