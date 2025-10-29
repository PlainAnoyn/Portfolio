import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SiddharthaLogo from '../assets/Siddhartha .png';
import ItahariLogo from '../assets/Itahari international collage.png';
import LondonMetLogo from '../assets/londonmet-logo.svg';

// Import tech images
import CSSImage from '../assets/tech/css.png';
import FigmaImage from '../assets/tech/figma.png';
import GitImage from '../assets/tech/git.png';
import HTMLImage from '../assets/tech/html.png';
import JavaScriptImage from '../assets/tech/javascript.png';
import MongoDBImage from '../assets/tech/mongodb.png';
import NodeJSImage from '../assets/tech/nodejs.png';
import ReactJSImage from '../assets/tech/reactjs.png';
import TailwindImage from '../assets/tech/tailwind.png';
import ThreeJSImage from '../assets/tech/threejs.svg';
import TypeScriptImage from '../assets/tech/typescript.png';
import DockerImage from '../assets/tech/docker.png';
// Certificates
import CertPython from '../assets/Certificates/CertificateOfCompletion_Python Essential Training.png';
import CertGithubActions from '../assets/Certificates/CertificateOfCompletion_Practical GitHub Actions.png';
import CertJava11 from '../assets/Certificates/CertificateOfCompletion_Learning Java 11.png';
import CertDatabaseIntro from "../assets/Certificates/CertificateOfCompletion_Database Foundations Intro to Databases.png";
import CertNetworkSecurity from "../assets/Certificates/CertificateOfCompletion_IT Security Foundations Network Security.png";
import CertNetworkTroubleshooting from "../assets/Certificates/CertificateOfCompletion_Learning Network Troubleshooting Practical Network Diagnostics and Solutions.png";
import CertNetworkAdminCore from "../assets/Certificates/CertificateOfCompletion_Network Administration Build Core Skills for Network Management and Security.png";

const About = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const handleViewCertificate = (cert) => {
    setSelectedCertificate(cert);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCertificate(null);
  };

  const handleViewMoreToggle = () => {
    const newShowAllState = !showAllCertificates;
    setShowAllCertificates(newShowAllState);
    
    // If we're hiding certificates (View Less), scroll back to certificates section
    if (!newShowAllState) {
      setTimeout(() => {
        const certificatesSection = document.getElementById('certifications-section');
        if (certificatesSection) {
          certificatesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100); // Small delay to let the animation start
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const skills = [
    {
      name: 'CSS',
      image: CSSImage,
      category: 'Styling'
    },
    {
      name: 'Figma',
      image: FigmaImage,
      category: 'Design'
    },
    {
      name: 'Git',
      image: GitImage,
      category: 'Version Control'
    },
    {
      name: 'HTML',
      image: HTMLImage,
      category: 'Markup'
    },
    {
      name: 'JavaScript',
      image: JavaScriptImage,
      category: 'Programming'
    },
    {
      name: 'MongoDB',
      image: MongoDBImage,
      category: 'Database'
    },
    {
      name: 'Node.js',
      image: NodeJSImage,
      category: 'Backend'
    },
    {
      name: 'React.js',
      image: ReactJSImage,
      category: 'Frontend'
    },
    {
      name: 'Tailwind',
      image: TailwindImage,
      category: 'CSS Framework'
    },
    {
      name: 'Three.js',
      image: ThreeJSImage,
      category: '3D Graphics'
    },
    {
      name: 'TypeScript',
      image: TypeScriptImage,
      category: 'Programming'
    }
  ];

  const techStack = [
    {
      name: 'React.js',
      image: ReactJSImage,
      description: 'JavaScript library for building user interfaces',
      category: 'Frontend Framework'
    },
    {
      name: 'Node.js',
      image: NodeJSImage,
      description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
      category: 'Runtime Environment'
    },
    {
      name: 'TypeScript',
      image: TypeScriptImage,
      description: 'Strongly typed programming language that builds on JavaScript',
      category: 'Programming Language'
    },
    {
      name: 'Tailwind CSS',
      image: TailwindImage,
      description: 'Utility-first CSS framework for rapid UI development',
      category: 'Styling'
    },
    {
      name: 'MongoDB',
      image: MongoDBImage,
      description: 'NoSQL database for flexible, document-based data storage',
      category: 'Database'
    },
    {
      name: 'Figma',
      image: FigmaImage,
      description: 'Collaborative design tool',
      category: 'Design'
    },
    {
      name: 'Docker',
      image: DockerImage,
      description: 'Platform for developing, shipping, and running applications in containers',
      category: 'DevOps'
    },
    {
      name: 'Three.js',
      image: ThreeJSImage,
      description: 'WebGL library for creating 3D graphics in browsers',
      category: '3D Graphics'
    }
  ];

  const experience = [
    {
      title: 'Web Developer & UX/UI Developer',
      company: 'Internship (3 months)',
      period: '3 months',
      location: 'Kathmandu, Nepal',
      description: 'Completed a 3-month internship specializing in web development and UX/UI design. Worked on creating responsive web interfaces, implementing user-centered designs, and ensuring optimal user experiences across different devices.',
      technologies: ['React', 'JavaScript', 'CSS', 'Figma', 'Git', 'UI/UX'],
      icon: '🎓'
    },
    {
      title: 'Independent Full Stack Developer',
      company: 'Self-Driven Projects',
      period: '5+ years',
      location: 'Remote',
      description: 'Built diverse projects across multiple platforms including full-stack web applications, mobile apps, responsive websites, and desktop applications. Delivered end-to-end solutions including CozyPlates, DamiChha, PathFinder, and Shangrila, focusing on modern architectures and user experiences.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Mobile Development', 'Desktop Apps', 'Three.js', 'Tailwind', 'Framer Motion'],
      icon: '🚀'
    }
  ];

  const education = [
    {
      institution: "London Metropolitan University",
      degree: "BSc (Hons) Computer Science",
      period: "2022 - 2025",
      location: "Affiliated through Itahari International College",
      logo: LondonMetLogo,
      description: "Pursuing Bachelor's degree in Computer Science with focus on software development and modern technologies."
    },
    {
      institution: "Itahari International College",
      degree: "BSc (Hons) Computer Science",
      period: "2022 - 2025",
      location: "Itahari, Nepal",
      logo: ItahariLogo,
      description: "Studying Computer Science with emphasis on programming, web development, and software engineering."
    },
    {
      institution: "Siddhartha Boarding Secondary School",
      degree: "+2 Management (Computer Science)",
      period: "2020 - 2022",
      location: "Nepal",
      logo: SiddharthaLogo,
      description: "Completed higher secondary education with focus on computer science and management studies."
    }
  ];

  const certifications = [
    {
      name: 'Python Essential Training',
      issuer: 'LinkedIn Learning',
      date: 'July 2023',
      icon: '🐍',
      description: 'Python concepts and best practices for writing clean, efficient code.',
      image: CertPython
    },
    {
      name: 'Practical GitHub Actions',
      issuer: 'LinkedIn Learning',
      date: 'August 2025',
      icon: '🛠️',
      description: 'Automating CI/CD workflows using GitHub Actions for modern development.',
      image: CertGithubActions
    },
    {
      name: 'Learning Java 11',
      issuer: 'LinkedIn Learning',
      date: 'April 2023',
      icon: '☕',
      description: 'Java 11 fundamentals, syntax, and object-oriented programming concepts.',
      image: CertJava11
    },
    {
      name: 'Database Foundations: Intro to Databases',
      issuer: 'LinkedIn Learning',
      date: 'April 2023',
      icon: '🗄️',
      description: 'Relational database concepts, schemas, and querying basics.',
      image: CertDatabaseIntro
    },
    {
      name: 'IT Security Foundations: Network Security',
      issuer: 'LinkedIn Learning',
      date: 'August 2023',
      icon: '🔐',
      description: 'Fundamentals of network security, threats, and defensive strategies.',
      image: CertNetworkSecurity
    },
    {
      name: 'Learning Network Troubleshooting',
      issuer: 'LinkedIn Learning',
      date: 'August 2023',
      icon: '🧰',
      description: 'Practical diagnostics and solutions for common network issues.',
      image: CertNetworkTroubleshooting
    },
    {
      name: 'Network Administration: Core Skills',
      issuer: 'LinkedIn Learning',
      date: 'August 2023',
      icon: '🌐',
      description: 'Core administration skills for secure and reliable network management.',
      image: CertNetworkAdminCore
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
            <motion.h2 variants={itemVariants} className="display-4 fw-bold text-white mb-3" data-aos="fade-down">
              About <span className="gradient-text">Me</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="lead text-gray-400" data-aos="fade-up" data-aos-delay="200">
              Passionate developer creating innovative digital experiences
            </motion.p>
          </div>
        </motion.div>

        <div className="row g-5">


          {/* Tech Stack Section */}
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
                    data-aos="fade-right"
                  >
                    <span className="gradient-text me-3 fs-2">⚡</span>
                    <span>Tech Stack</span>
                  </motion.h3>
                  
                  {/* Horizontal Scrolling Container */}
                  <div className="tech-stack-container">
                    <div className="tech-stack-scroll">
                      {/* First set of items */}
                      {techStack.map((tech, index) => (
                        <motion.div
                          key={`first-${tech.name}`}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.5,
                              delay: index * 0.1
                            }
                          }}
                          viewport={{ once: true }}
                          className="tech-card"
                          data-aos="zoom-in"
                          data-aos-delay={index * 100}
                          data-aos-duration="800"
                        >
                          <div className="tech-card-inner">
                            {/* Tech Icon */}
                            <div className="tech-icon">
                              <img src={tech.image} alt={tech.name} className="tech-image" />
                            </div>
                            
                            {/* Tech Name */}
                            <h6 className="tech-name">{tech.name}</h6>
                            
                            {/* Tech Description - shows on hover */}
                            <p className="tech-description">{tech.description}</p>
                            
                            {/* Tech Category - shows on hover */}
                            <span className="tech-category">{tech.category}</span>
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Duplicate set for seamless loop - no animations for performance */}
                      {techStack.map((tech, index) => (
                        <div
                          key={`second-${tech.name}`}
                          className="tech-card"
                        >
                          <div className="tech-card-inner">
                            {/* Tech Icon */}
                            <div className="tech-icon">
                              <img src={tech.image} alt={tech.name} className="tech-image" />
                            </div>
                            
                            {/* Tech Name */}
                            <h6 className="tech-name">{tech.name}</h6>
                            
                            {/* Tech Description - shows on hover */}
                            <p className="tech-description">{tech.description}</p>
                            
                            {/* Tech Category - shows on hover */}
                            <span className="tech-category">{tech.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Work Experience Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-lg-12 mt-5"
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
                    data-aos="fade-right"
                  >
                    <span className="gradient-text me-3 fs-2">💼</span>
                    <span>Work Experience</span>
                  </motion.h3>
                  <div className="experience-timeline">
                    {experience.map((exp, index) => (
                      <motion.div
                        key={exp.title}
                        variants={itemVariants}
                        className="experience-item"
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
                        data-aos="fade-left"
                        data-aos-delay={index * 100}
                        data-aos-duration="800"
                      >
                        <div className="experience-card p-4 rounded mb-4">
                          <div className="experience-header mb-3">
                            <div className="d-flex align-items-center mb-2">
                              <div className="experience-icon me-3">
                                <span className="fs-3">{exp.icon}</span>
                              </div>
                              <div>
                                <h5 className="text-white mb-1 fw-bold">{exp.title}</h5>
                                <h6 className="mb-1" style={{color: 'var(--accent-color)'}}>{exp.company}</h6>
                              </div>
                            </div>
                            <div className="experience-meta d-flex align-items-center gap-3 mb-3">
                              <span className="text-muted small">
                                <i className="fas fa-calendar me-1"></i>
                                {exp.period}
                              </span>
                              <span className="text-muted small">
                                <i className="fas fa-map-marker-alt me-1"></i>
                                {exp.location}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-400 mb-0">{exp.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-lg-12 mt-5"
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
                    data-aos="fade-right"
                  >
                    <span className="gradient-text me-3 fs-2">🎓</span>
                    <span>Education</span>
                  </motion.h3>
                  <div className="education-timeline">
                    {education.map((edu, index) => (
                      <motion.div
                        key={edu.institution}
                        variants={itemVariants}
                        className="education-item"
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
                        data-aos="fade-left"
                        data-aos-delay={index * 100}
                        data-aos-duration="800"
                      >
                        <div className="row align-items-center">
                          <div className="col-md-2">
                            <div className="logo-container">
                              <img 
                                src={edu.logo} 
                                alt={`${edu.institution} logo`} 
                                loading="lazy"
                                className="img-fluid" 
                                style={{ maxHeight: '50px', width: 'auto' }} 
                              />
                            </div>
                          </div>
                          <div className="col-md-10">
                            <h5 className="text-white mb-1">{edu.degree}</h5>
                            <p className="text-muted mb-2">{edu.period}</p>
                            <p className="text-gray-400 mb-0">{edu.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-lg-12 mt-5"
          >
            <motion.div
              variants={itemVariants}
              className="card-wrapper position-relative"
            >
              <div className="card card-custom border-0 h-100">
                <div className="card-body p-4">
                  <motion.h3
                    id="certifications-section"
                    variants={itemVariants}
                    className="h4 fw-bold text-white mb-4 d-flex align-items-center"
                    data-aos="fade-right"
                  >
                    <span className="gradient-text me-3 fs-2">🏆</span>
                    <span>Certifications</span>
                  </motion.h3>
                  <motion.div layout className="row g-4" id="certificates-grid">
                    <AnimatePresence mode="popLayout">
                      {(showAllCertificates ? certifications : certifications.slice(0, 3)).map((cert, index) => (
                        <motion.div
                          key={cert.name}
                          layout
                          variants={itemVariants}
                          className="col-lg-4 col-md-6"
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0, 
                            scale: 1,
                            transition: {
                              duration: 0.4,
                              delay: index * 0.08,
                              ease: "easeOut"
                            }
                          }}
                          exit={{ 
                            opacity: 0, 
                            y: -20, 
                            scale: 0.95,
                            transition: {
                              duration: 0.3,
                              ease: "easeIn"
                            }
                          }}
                          data-aos="zoom-in"
                          data-aos-delay={index * 100}
                          data-aos-duration="800"
                        >
                        <div className="certification-card p-4 rounded h-100 position-relative overflow-hidden">
                          {/* Certificate Image Placeholder */}
                          <div className="certificate-image-container mb-3">
                            {cert.image ? (
                              <img 
                                src={cert.image} 
                                alt={`${cert.name} certificate`}
                                loading="lazy"
                                className="certificate-image w-100 rounded"
                                style={{ height: '200px', objectFit: 'cover' }}
                              />
                            ) : (
                              <div className="certificate-placeholder d-flex align-items-center justify-content-center rounded"
                                   style={{ 
                                     height: '200px', 
                                                     background: 'linear-gradient(135deg, rgba(245, 197, 66, 0.1), rgba(35, 41, 70, 0.1))',
                border: '2px dashed rgba(245, 197, 66, 0.3)'
                                   }}>
                                <div className="text-center">
                                  <div className="fs-1 mb-2">{cert.icon}</div>
                                  <small className="text-muted">Certificate Image</small>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Certificate Content */}
                          <div className="certificate-content">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <h5 className="text-white mb-0 fw-bold">{cert.name}</h5>
                              <span className="badge" style={{backgroundColor: 'var(--accent-color)', color: 'var(--primary-color)'}}>{cert.date}</span>
                            </div>
                            <p className="mb-2 fw-medium" style={{color: 'var(--accent-color)'}}>{cert.issuer}</p>
                            <p className="text-gray-400 small mb-3">{cert.description}</p>
                            
                            {/* Certificate Actions */}
                            <div className="certificate-actions d-flex gap-2">
                              <button 
                                className="btn btn-sm btn-outline-primary cursor-target"
                                onClick={() => handleViewCertificate(cert)}
                              >
                                <i className="fas fa-eye me-1"></i> View
                              </button>
                              <button className="btn btn-sm btn-outline-secondary cursor-target">
                                <i className="fas fa-download me-1"></i> Download
                              </button>
                            </div>
                          </div>
                        </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                  {certifications.length > 3 && (
                    <motion.div 
                      className="text-center mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <motion.button
                        type="button"
                        className="btn btn-outline-primary px-4 py-2 cursor-target"
                        onClick={handleViewMoreToggle}
                        aria-expanded={showAllCertificates}
                        aria-controls="certificates-grid"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 5px 15px rgba(245, 197, 66, 0.3)",
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ 
                          scale: 0.98,
                          transition: { duration: 0.1 }
                        }}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.span
                          key={showAllCertificates ? 'less' : 'more'}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {showAllCertificates ? (
                            <>
                              <i className="fas fa-chevron-up me-2"></i>
                              View less
                            </>
                          ) : (
                            <>
                              <i className="fas fa-chevron-down me-2"></i>
                              View more ({certifications.length - 3} more)
                            </>
                          )}
                        </motion.span>
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showModal && selectedCertificate && (
        <div className="certificate-modal-overlay" onClick={closeModal}>
          <div className="certificate-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="certificate-modal-header">
              <h4 className="text-white mb-0">{selectedCertificate.name}</h4>
                              <button className="btn-close btn-close-white cursor-target" onClick={closeModal}></button>
            </div>
            <div className="certificate-modal-body">
              {selectedCertificate.image ? (
                <img 
                  src={selectedCertificate.image} 
                  alt={`${selectedCertificate.name} certificate`}
                  loading="eager"
                  className="certificate-modal-image w-100 rounded"
                />
              ) : (
                <div className="certificate-modal-placeholder d-flex align-items-center justify-content-center rounded"
                     style={{ 
                       height: '400px', 
                                       background: 'linear-gradient(135deg, rgba(245, 197, 66, 0.1), rgba(35, 41, 70, 0.1))',
                border: '2px dashed rgba(245, 197, 66, 0.3)'
                     }}>
                  <div className="text-center">
                    <div className="fs-1 mb-3">{selectedCertificate.icon}</div>
                    <h5 className="text-white mb-2">{selectedCertificate.name}</h5>
                    <p className="text-muted">Certificate image will be displayed here</p>
                  </div>
                </div>
              )}
            </div>
            <div className="certificate-modal-footer">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 fw-medium" style={{color: 'var(--accent-color)'}}>{selectedCertificate.issuer}</p>
                  <p className="text-muted mb-0">{selectedCertificate.description}</p>
                </div>
                <span className="badge fs-6" style={{backgroundColor: 'var(--accent-color)', color: 'var(--primary-color)'}}>{selectedCertificate.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;