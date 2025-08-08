import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

const About = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewCertificate = (cert) => {
    setSelectedCertificate(cert);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCertificate(null);
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

  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2023 - Present',
      location: 'Remote',
      description: 'Leading development of modern web applications using React, Node.js, and cloud technologies. Implemented responsive designs and optimized performance.',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'],
      icon: '💼'
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Creations',
      period: '2022 - 2023',
      location: 'Kathmandu, Nepal',
      description: 'Specialized in creating responsive and interactive user interfaces with React and Three.js. Collaborated with design teams to implement pixel-perfect designs.',
      technologies: ['React', 'Three.js', 'CSS3', 'JavaScript', 'Figma'],
      icon: '🎨'
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Hub',
      period: '2021 - 2022',
      location: 'Remote',
      description: 'Contributed to various projects involving web development and 3D graphics programming. Developed features for client applications and maintained code quality.',
      technologies: ['JavaScript', 'HTML/CSS', 'Git', 'Three.js', 'Node.js'],
      icon: '🚀'
    }
  ];

  const education = [
    {
      institution: "London Metropolitan University",
      degree: "BSc (Hons) Computer Science",
      period: "2023 - Present",
      location: "Affiliated through Itahari International College",
      logo: LondonMetLogo,
      description: "Pursuing Bachelor's degree in Computer Science with focus on software development and modern technologies."
    },
    {
      institution: "Itahari International College",
      degree: "BSc (Hons) Computer Science",
      period: "2023 - Present",
      location: "Itahari, Nepal",
      logo: ItahariLogo,
      description: "Studying Computer Science with emphasis on programming, web development, and software engineering."
    },
    {
      institution: "Siddhartha Boarding Secondary School",
      degree: "+2 Management (Computer Science)",
      period: "2021 - 2023",
      location: "Nepal",
      logo: SiddharthaLogo,
      description: "Completed higher secondary education with focus on computer science and management studies."
    }
  ];

  const certifications = [
    {
      name: 'React Development',
      issuer: 'Meta',
      date: '2024',
      icon: '⚛️',
      description: 'Advanced React development and modern web applications',
      image: null // Will be replaced with actual certificate image
    },
    {
      name: 'Three.js Mastery',
      issuer: 'Three.js Academy',
      date: '2024',
      icon: '🎮',
      description: '3D web development and interactive graphics',
      image: null
    },
    {
      name: 'Full Stack Development',
      issuer: 'MERN Stack',
      date: '2023',
      icon: '🔄',
      description: 'Complete web development with MongoDB, Express, React, Node.js',
      image: null
    },
    {
      name: 'UI/UX Design',
      issuer: 'Google',
      date: '2023',
      icon: '🎨',
      description: 'User interface and experience design principles',
      image: null
    },
    {
      name: 'JavaScript Algorithms',
      issuer: 'FreeCodeCamp',
      date: '2023',
      icon: '💻',
      description: 'Advanced JavaScript algorithms and data structures',
      image: null
    },
    {
      name: 'Python Programming',
      issuer: 'Coursera',
      date: '2023',
      icon: '🐍',
      description: 'Python programming and software development',
      image: null
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
                    data-aos="fade-right"
                  >
                    <span className="gradient-text me-3 fs-2">💪</span>
                    <span>Skills & Expertise</span>
                  </motion.h3>
                  <div className="space-y-4">
                    <div className="row g-4 justify-content-center">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          variants={itemVariants}
                          className="col-lg-2 col-md-3 col-sm-4 col-6"
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
                          data-aos="zoom-in"
                          data-aos-delay={index * 100}
                          data-aos-duration="800"
                        >
                          <div className="skill-icon-clean text-center p-3">
                            <div className="skill-icon-octagon mb-2">
                              <img src={skill.image} alt={skill.name} className="img-fluid" style={{ maxHeight: '40px', width: 'auto' }} />
                            </div>
                            <h6 className="text-white mb-0 small">{skill.name}</h6>
                          </div>
                        </motion.div>
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
                                <h6 className="text-primary mb-1">{exp.company}</h6>
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
                    variants={itemVariants}
                    className="h4 fw-bold text-white mb-4 d-flex align-items-center"
                    data-aos="fade-right"
                  >
                    <span className="gradient-text me-3 fs-2">🏆</span>
                    <span>Certifications</span>
                  </motion.h3>
                  <div className="row g-4">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={cert.name}
                        variants={itemVariants}
                        className="col-lg-4 col-md-6"
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
                                className="certificate-image w-100 rounded"
                                style={{ height: '200px', objectFit: 'cover' }}
                              />
                            ) : (
                              <div className="certificate-placeholder d-flex align-items-center justify-content-center rounded"
                                   style={{ 
                                     height: '200px', 
                                     background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                                     border: '2px dashed rgba(102, 126, 234, 0.3)'
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
                              <span className="badge bg-primary">{cert.date}</span>
                            </div>
                            <p className="text-primary mb-2 fw-medium">{cert.issuer}</p>
                            <p className="text-gray-400 small mb-3">{cert.description}</p>
                            
                            {/* Certificate Actions */}
                            <div className="certificate-actions d-flex gap-2">
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleViewCertificate(cert)}
                              >
                                <i className="fas fa-eye me-1"></i> View
                              </button>
                              <button className="btn btn-sm btn-outline-secondary">
                                <i className="fas fa-download me-1"></i> Download
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
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
              <button className="btn-close btn-close-white" onClick={closeModal}></button>
            </div>
            <div className="certificate-modal-body">
              {selectedCertificate.image ? (
                <img 
                  src={selectedCertificate.image} 
                  alt={`${selectedCertificate.name} certificate`}
                  className="certificate-modal-image w-100 rounded"
                />
              ) : (
                <div className="certificate-modal-placeholder d-flex align-items-center justify-content-center rounded"
                     style={{ 
                       height: '400px', 
                       background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                       border: '2px dashed rgba(102, 126, 234, 0.3)'
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
                  <p className="text-primary mb-1 fw-medium">{selectedCertificate.issuer}</p>
                  <p className="text-muted mb-0">{selectedCertificate.description}</p>
                </div>
                <span className="badge bg-primary fs-6">{selectedCertificate.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;