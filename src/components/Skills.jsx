import React from 'react';
import { PORTFOLIO_DATA } from '../data';
import { motion } from 'framer-motion';

const list = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const item = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 140, damping: 16 } }
};

const Skills = () => {
  // SAFEGUARD: Check if the new category data actually exists
  const categories = PORTFOLIO_DATA?.skillCategories;

  // If the data is missing, show an error message INSTEAD of crashing to a black screen
  if (!categories || !Array.isArray(categories)) {
    return (
      <section id="skills" className="section-padding">
        <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
          <h2 style={{ color: '#e03e2d' }}>Oops! Data Missing</h2>
          <p style={{ color: '#e2e8f0', marginTop: '1rem' }}>
            The Skills section is looking for `skillCategories` in your data.js file, but can't find it. 
            Make sure you saved data.js!
          </p>
        </div>
      </section>
    );
  }

  // If data exists, render the categories safely
  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <div className="section-title">
          <h2>Tech Stack</h2>
          <div className="underline-gradient"></div>
          <p className="section-subtitle">
            The tools and technologies I use to build robust applications.
          </p>
        </div>

        <div className="skills-categories-container">
          {categories.map((categoryData, index) => (
            <div key={index} className="skill-category-block" style={{ marginBottom: '3rem' }}>
              
              <h3 
                style={{ 
                  fontSize: '1.5rem', 
                  color: '#e2e8f0', 
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '0.5rem',
                  display: 'inline-block'
                }}
              >
                {categoryData.category}
              </h3>

              <motion.div 
                className="skills-grid" 
                variants={list} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* SAFEGUARD: Only map skills if the skills array exists for this category */}
                {categoryData.skills && categoryData.skills.map((skill, idx) => (
                  <motion.div 
                    key={idx} 
                    className="skill-card" 
                    variants={item} 
                    whileHover={{ scale: 1.03 }}
                  >
                    {skill.icon && (
                      <div className="skill-icon">
                        {skill.icon}
                      </div>
                    )}
                    <div>
                      <div className="skill-name" style={{ fontWeight: '500' }}>
                        {skill.name}
                      </div>
                      {skill.level && (
                        <div className="skill-level">{skill.level}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;