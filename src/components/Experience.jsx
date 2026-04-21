import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';

const Experience = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="container">
        {/* Header matched to Tech Stack styling with white text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          {/* Heading is now white to match your Tech Stack section */}
          <h2>Experience</h2>
          <div className="underline-gradient"></div>
          <p className="section-subtitle">
            Professional roles at DataTricks and CodeAlpha.
          </p>
        </motion.div>

        <div className="experience-timeline">
          {PORTFOLIO_DATA.experience.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="experience-item"
            >
              <div className="experience-card">
                <div className="exp-card-header">
                  {/* Company Logo Box */}
                  <div className="exp-logo-box">
                    {exp.logo ? (
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`} 
                        className="experience-logo"
                        onError={(e) => {
                          e.target.style.display = 'none'; // Fallback if image fails
                        }}
                      />
                    ) : (
                      <Briefcase size={24} color="var(--primary)" />
                    )}
                  </div>
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <h4 className="exp-company">{exp.company}</h4>
                  </div>
                </div>

                <div className="exp-meta">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <ul className="exp-bullets">
                  {exp.desc.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;