import { 
  Code, 
  Server, 
  Database, 
  Cpu, 
  Smartphone, 
  Layout, 
  GitBranch, 
  Coffee, 
  FileCode, 
  HelpCircle, 
  User 
} from 'lucide-react';
import React from 'react';

// Icons from react-icons used in skill/project lists
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaJava, FaGithub, FaLightbulb, FaUsers, FaComments, FaSync } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiExpress, SiMongodb, SiCplusplus, SiPostman, SiNetlify } from 'react-icons/si';
import { TbDeviceMobile, TbApi, TbCpu } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';

export const PORTFOLIO_DATA = {
  personal: {
    name: "Tayyab Mehboob",
    role: "MERN Stack Developer",
    tagline: "Building responsive web apps & mobile solutions.",
    description: "Computer Science graduate with a strong foundation in Object-Oriented Programming, Data Structures & Algorithms, and database systems. Hands-on experience developing scalable web and mobile applications using the MERN Stack (React.js, Node.js, Express.js, MongoDB). Skilled in REST API development, debugging, and performance optimization with a problem-solving mindset."
  },
  skillCategories: [
    {
      category: "Frontend",
      skills: [
        { name: "HTML", icon: <FaHtml5 size={24} color="#E34F26" /> },
        { name: "CSS", icon: <FaCss3Alt size={24} color="#1572B6" /> },
        { name: "Tailwind", icon: <SiTailwindcss size={24} color="#06B6D4" /> },
        { name: "JavaScript", icon: <SiJavascript size={24} color="#F7DF1E" /> },
        { name: "React.js", icon: <FaReact size={24} color="#61DAFB" /> }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs size={24} color="#339933" /> },
        { name: "Express.js", icon: <SiExpress size={24} color="#ffffff" /> }
      ]
    },
    {
      category: "Mobile Development",
      skills: [
        { name: "React Native", icon: <TbDeviceMobile size={24} color="#61DAFB" /> }
      ]
    },
    {
      category: "Databases",
      skills: [
        { name: "MongoDB", icon: <SiMongodb size={24} color="#47A248" /> }
      ]
    },
    {
      category: "Programming Languages",
      skills: [
        { name: "C++", icon: <SiCplusplus size={24} color="#00599C" /> },
        { name: "Java", icon: <FaJava size={24} color="#007396" /> },
        { name: "Assembly", icon: <TbCpu size={24} color="#A8B9CC" /> }
      ]
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "Git/GitHub", icon: <FaGithub size={24} color="#ffffff" /> },
        { name: "REST APIs", icon: <TbApi size={24} color="#009688" /> },
        { name: "VS Code", icon: <VscVscode size={24} color="#007ACC" /> },
        { name: "Postman", icon: <SiPostman size={24} color="#FF6C37" /> },
        { name: "Netlify", icon: <SiNetlify size={24} color="#00C7B7" /> }
      ]
    },
    {
      category: "Soft Skills",
      skills: [
        { name: "Problem-Solving", icon: <FaLightbulb size={24} color="#F59E0B" /> },
        { name: "Teamwork", icon: <FaUsers size={24} color="#3B82F6" /> },
        { name: "Communication", icon: <FaComments size={24} color="#10B981" /> },
        { name: "Adaptability", icon: <FaSync size={24} color="#8B5CF6" /> }
      ]
    }
  ],
  experience: [
    {
      company: "DataTricks",
      role: "Co-Founder",
      period: "June 2024 - Present",
      logo: "/DataTricks.jpg",
      desc: [
        "Leading strategic development and technical vision for the organization.",
        "Collaborating on full-stack solutions and managing software project lifecycles.",
        "Driving innovation in software services within the local tech ecosystem"
      ]
    },
    {
      company: "CodeAlpha",
      role: "Frontend Web Developer",
      period: "July 2024 - September 2024",
      logo: "/CodeAlpha.jpg",
      desc: [
        "Developed responsive user interfaces using modern frontend technologies.",
        "Collaborated with the development team to implement clean and efficient code.",
        "Focused on performance optimization and cross-browser compatibility."
      ]
    },
     ],
  education: [
    {
      degree: "Bachelor's in Computer Science",
      school: "Quaid-e-Azam University",
      year: "2022-2026",
      desc: "Focusing on Software Engineering, Data Structures, and Web/Mobile Development."
    }
  ],
  projects: [
    { 
      id: 1,
      title: "Salah Activity Tracker", 
      desc: "Mobile app for tracking prayers, streaks, and analytics with personalized AI guidance.",
      tech: ["React Native", "MongoDB", "Node.js"],
      links: { demo: "#", code: "#" },
      icon: <Smartphone size={48} />
    },
    {
      id: 2,
      title: "Cricket Platform",
      desc: "Full-stack cricket info platform with live match API integration and dashboards[cite: 26, 27].",
      tech: ["MERN Stack", "Auth", "Node.js"],
      links: { demo: "#", code: "https://github.com/Tayyab-Mehboob786/Cricket-website" },
      icon: <Layout size={48} />
    },
    {
      id: 3,
      title: "Tic-Tac-Toe Game",
      desc: "Fully functional 2-player game demonstrating clean logic and DOM manipulation.",
      tech: ["HTML", "CSS", "JavaScript"],
      links: { demo: "https://66b48be8cf2c55c9844fac8f--splendorous-heliotrope-ceacc6.netlify.app/", code: "https://github.com/Tayyab-Mehboob786/Tic-Tac-Toe" },
      icon: <Code size={48} />
    },
    {
      id: 4,
      title: "Quiz Website",
      desc: "Multi-category quiz platform featuring dynamic DOM manipulation and score tracking.",
      tech: ["JavaScript", "DOM", "CSS"],
      links: { demo: "https://chic-muffin-7c7d3d.netlify.app/", code: "https://github.com/Tayyab-Mehboob786/Quiz-App" },
      icon: <HelpCircle size={48} />
    },
    {
      id: 5,
      title: "Personal Portfolio",
      desc: "Clean and responsive portfolio showcasing projects and technical skills.",
      tech: ["React", "CSS", "Responsive"],
      links: { demo: "#", code: "#" },
      icon: <User size={48} />
    }
  ]
};