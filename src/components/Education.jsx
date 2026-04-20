import React from 'react';
import { GraduationCap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';

const Education = () => {
  return (
    <section className="education-section">
      <div className="edu-container">
        <div className="edu-icon-box">
          <GraduationCap size={40} />
        </div>
        <div className="edu-details">
           <h3>Education</h3>
           {PORTFOLIO_DATA.education.map((edu, idx) => (
             <div key={idx}>
               <div className="edu-degree">{edu.degree}</div>
               <div className="edu-school">{edu.school}</div>
               <div className="edu-year">{edu.year}</div>
               <p className="edu-desc">{edu.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Education;