import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';
import { motion } from 'framer-motion';

const list = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const card = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } }
};

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <div className="section-title">
          <h2>Selected Works</h2>
          <div className="underline-gradient"></div>
          <p className="section-subtitle">Recent projects showcasing Mobile, Web, and Full Stack expertise.</p>
        </div>

        <motion.div className="projects-grid" variants={list} initial="hidden" animate="show">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            /* We add a specific class (card-1, card-2) to cycle through gradients defined in CSS */
            <motion.div key={project.id} className={`project-card card-${index + 1}`} variants={card} whileHover={{ scale: 1.02, y: -6 }}>
              <div className="project-image-placeholder">
                <div className="placeholder-icon">
                   {project.icon}
                </div>
              </div>
              
              <div className="project-content">
                <div className="tags">
                  {project.tech.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                
                <div className="project-links">
                  <a href={project.links.demo} className="link-item">
                    View Demo <ExternalLink size={14} />
                  </a>
                  <a href={project.links.code} className="link-item">
                    Source Code <Github size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;