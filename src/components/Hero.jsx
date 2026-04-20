import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, FileText, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 14, stiffness: 100 } }
};

const Hero = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Karachi'
  });

  return (
    <section id="about" className="hero-section">
      <div className="bg-grid"></div>
      <div className="glow glow-primary"></div>
      <div className="glow glow-secondary"></div>

      <motion.div className="hero-inner" initial="hidden" animate="show" variants={container}>
        <motion.div variants={item}>
          <div>
            <img id="profile" src="/Tayyab.png" alt="Tayyab Mehboob" />
          </div>
        </motion.div>

        <motion.div className="hero-content" variants={item}>
          
          {/* UPDATED: Two perfectly separated badges sitting side-by-side */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            
            {/* Badge 1: Available for Hire */}
            <div className="badge" style={{ margin: 0 }}>
              <span className="status-dot"></span>
              Available for Hire
            </div>

            {/* Badge 2: Live Clock */}
            <div className="badge" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e2e8f0' }}>
              <Clock size={14} />
              <span>{formattedTime} PKT</span>
            </div>

          </div>

          <motion.h1 className="hero-title" variants={item}>
            {PORTFOLIO_DATA.personal.role} <br />
            <span className="gradient-text"></span>
          </motion.h1>

          <motion.p className="hero-desc" variants={item}>
            {PORTFOLIO_DATA.personal.description}
          </motion.p>

          <motion.div className="hero-buttons" variants={item}>
            <a href="#projects" className="btn btn-primary">
              See My Work <ArrowRight size={18} />
            </a>
            
            <a 
              href="/Tayyab_Mehboob_MERN_Stack1.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              View Resume <FileText size={18} />
            </a>

            <a href="#contact" className="btn btn-secondary">
              Get in Touch <Mail size={18} />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;