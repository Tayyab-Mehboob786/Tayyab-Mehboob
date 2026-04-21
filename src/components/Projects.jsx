import React, { useState } from 'react'; // Added useState
import { ExternalLink, Github, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectLink = (e, link) => {
    if (link === "#") {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <div className="section-title">
          <h2>Selected Works</h2>
          <div className="underline-gradient"></div>
          <p className="section-subtitle">Recent projects showcasing Mobile, Web, and Full Stack expertise.</p>
        </div>

        <div className="projects-grid">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className={`project-card card-${index + 1}`} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="project-image-placeholder">
                <div className="placeholder-icon">{project.icon}</div>
              </div>
              
              <div className="project-content">
                <div className="tags">
                  {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-links">
                  <a href={project.links.demo} className="link-item" onClick={(e) => handleProjectLink(e, project.links.demo)}>
                    View Demo <ExternalLink size={14} />
                  </a>
                  <a href={project.links.code} className="link-item" onClick={(e) => handleProjectLink(e, project.links.code)}>
                    Source Code <Github size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- CUSTOM MODAL (Pop-up) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>🚧 Project Coming Soon!</h3>
              </div>
              <p>This Project is Under Development. Stay tuned!</p>
              <button className="modal-btn" onClick={() => setIsModalOpen(false)}>OKAY</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;