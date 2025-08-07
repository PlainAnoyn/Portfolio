import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const skills = [
    { name: "React.js", icon: "⚛️", level: 90 },
    { name: "JavaScript", icon: "🟨", level: 85 },
    { name: "TypeScript", icon: "🔷", level: 80 },
    { name: "Node.js", icon: "🟢", level: 85 },
    { name: "Python", icon: "🐍", level: 75 },
    { name: "Three.js", icon: "🎨", level: 80 },
    { name: "HTML/CSS", icon: "🎨", level: 95 },
    { name: "Git", icon: "📝", level: 85 }
  ];

  const technologies = [
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Vue.js", icon: "🟢", category: "Frontend" },
    { name: "Angular", icon: "🔴", category: "Frontend" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "Express.js", icon: "⚡", category: "Backend" },
    { name: "MongoDB", icon: "🍃", category: "Database" },
    { name: "PostgreSQL", icon: "🐘", category: "Database" },
    { name: "Docker", icon: "🐳", category: "DevOps" },
    { name: "AWS", icon: "☁️", category: "Cloud" },
    { name: "Firebase", icon: "🔥", category: "Backend" },
    { name: "Three.js", icon: "🎨", category: "3D" },
    { name: "Framer Motion", icon: "🎭", category: "Animation" }
  ];

  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Led development of scalable web applications using React, Node.js, and cloud technologies.",
      icon: "💼"
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions",
      period: "2020 - 2022",
      description: "Built responsive user interfaces and implemented modern design patterns.",
      icon: "🎨"
    },
    {
      title: "Junior Developer",
      company: "StartUp Hub",
      period: "2019 - 2020",
      description: "Developed features for web applications and collaborated with cross-functional teams.",
      icon: "🚀"
    }
  ];

  const education = [
    {
      institution: "Tribhuvan University",
      degree: "Bachelors of Science in Computer Science",
      period: "March 2021 - April 2025",
      location: "New Summit College, Shantinagar, Kathmandu",
      logo: "🎓" // Will be replaced with actual logo
    },
    {
      institution: "Arniko College",
      degree: "+2 Science",
      period: "August 2018 - December 2020",
      location: "Biratnagar, Morang",
      logo: "📚" // Will be replaced with actual logo
    }
  ];

  const certifications = [
    {
      title: "Full Stack Web Development",
      issuer: "FreeCodeCamp",
      date: "2023",
      description: "Comprehensive certification covering HTML, CSS, JavaScript, React, Node.js, and databases.",
      logo: "🏆"
    },
    {
      title: "React Developer Certification",
      issuer: "Meta (Facebook)",
      date: "2023",
      description: "Advanced React concepts including hooks, context, state management, and performance optimization.",
      logo: "⚛️"
    },
    {
      title: "JavaScript Algorithms and Data Structures",
      issuer: "FreeCodeCamp",
      date: "2022",
      description: "In-depth study of JavaScript fundamentals, ES6+, algorithms, and data structures.",
      logo: "💻"
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="row"
        >
          <div className="col-lg-12 text-center mb-5">
            <motion.h2 variants={itemVariants} className="display-4 fw-bold text-white mb-3">
              About <span className="gradient-text">Me</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="lead text-gray-400">
              Passionate developer creating innovative digital experiences
            </motion.p>
          </div>
        </motion.div>

        <div className="row g-5">
          {/* Skills Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-lg-12"
          >
            <motion.div 
              variants={itemVariants} 
              className="card-wrapper position-relative"
            >
              <div className="card card-custom border-0 h-100">
              <div className="card-body p-4">
                <motion.h3 
                  variants={itemVariants}
                  className="h4 fw-bold text-white mb-4 d-flex align-items-center"
                >
                  <span className="gradient-text me-3 fs-2">💪</span> 
                  <span>Skills & Expertise</span>
                </motion.h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className="skill-item"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          duration: 0.5, 
                          delay: index * 0.1 
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      <div className="d-flex align-items-center mb-2 p-3 rounded skill-header">
                        <motion.span 
                          className="me-3 fs-3 skill-icon"
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.2,
                            transition: { duration: 0.5 }
                          }}
                        >
                          {skill.icon}
                        </motion.span>
                        <span className="text-white fw-medium fs-6">{skill.name}</span>
                        <motion.span 
                          className="ms-auto text-muted fw-bold"
                          initial={{ opacity: 0 }}
                          whileInView={{ 
                            opacity: 1,
                            transition: { delay: index * 0.1 + 0.5 }
                          }}
                          viewport={{ once: true }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="progress skill-progress position-relative">
                        <motion.div
                          className="progress-bar"
                          initial={{ width: 0 }}
                          whileInView={{ 
                            width: `${skill.level}%`,
                            transition: { 
                              duration: 1.5, 
                              delay: index * 0.1 + 0.3,
                              ease: "easeOut"
                            }
                          }}
                          viewport={{ once: true }}
                          style={{
                            background: `linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`,
                            boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
                          }}
                        ></motion.div>
                        <motion.div
                          className="progress-glow"
                          initial={{ opacity: 0 }}
                          whileInView={{ 
                            opacity: 1,
                            transition: { delay: index * 0.1 + 1.5 }
                          }}
                          viewport={{ once: true }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Experience Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="row mt-5"
        >
          <div className="col-lg-12">
            <motion.h2 variants={itemVariants} className="h2 fw-bold text-white mb-4 text-center">
              <span className="gradient-text">💼 Work</span> Experience
            </motion.h2>
            <div className="row g-4">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="col-lg-4 col-md-6"
                >
                  <div className="card card-custom border-0 h-100">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-3">
                        <span className="me-3 fs-3">{exp.icon}</span>
                        <div>
                          <h5 className="text-white fw-bold mb-1">{exp.title}</h5>
                          <p className="text-muted mb-0">{exp.company}</p>
                        </div>
                      </div>
                      <p className="text-muted small mb-3">{exp.period}</p>
                      <p className="text-gray-400 small">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="row mt-5"
        >
          <div className="col-lg-12">
            <motion.h2 variants={itemVariants} className="h2 fw-bold text-white mb-4 text-center">
              🎓 Education
            </motion.h2>
            <div className="education-timeline">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="education-item d-flex align-items-start mb-5"
                >
                  {/* Logo */}
                  <div className="education-logo me-4 flex-shrink-0">
                    <div className="logo-container">
                      <span className="fs-1">{edu.logo}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="education-content flex-grow-1">
                    <h4 className="text-white fw-bold mb-1">{edu.institution}</h4>
                    <h5 className="text-muted mb-2">{edu.degree}</h5>
                    <p className="text-muted small mb-1">{edu.period}</p>
                    <p className="text-gray-400 small mb-0">{edu.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certification Section - Simplified */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="row mt-5"
        >
          <div className="col-lg-12">
            <motion.h2 variants={itemVariants} className="h2 fw-bold text-white mb-4 text-center">
              📜 My Certifications
            </motion.h2>
            <div className="row g-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="col-lg-4 col-md-6"
                >
                  <div className="card card-custom border-0 h-100">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-3">
                        <span className="me-3 fs-3">{cert.logo}</span>
                        <div>
                          <h5 className="text-white fw-bold mb-1">{cert.title}</h5>
                          <p className="text-muted mb-0">{cert.issuer}</p>
                        </div>
                      </div>
                      <p className="text-muted small mb-3">{cert.date}</p>
                      <p className="text-gray-400 small">{cert.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 