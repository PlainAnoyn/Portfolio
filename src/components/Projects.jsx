import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function ProjectCube({ color, position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/project1.jpg',
      link: '#',
      github: '#',
      color: '#667eea',
    },
    {
      title: '3D Portfolio Website',
      description: 'An interactive portfolio website featuring Three.js animations and immersive 3D experiences. Custom shaders and particle systems.',
      technologies: ['Three.js', 'React', 'WebGL', 'GSAP'],
      image: '/project2.jpg',
      link: '#',
      github: '#',
      color: '#764ba2',
    },
    {
      title: 'AI Chat Application',
      description: 'A real-time chat application with AI-powered responses. Built with React, Socket.io, and OpenAI API integration.',
      technologies: ['React', 'Socket.io', 'OpenAI', 'Express'],
      image: '/project3.jpg',
      link: '#',
      github: '#',
      color: '#f093fb',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      technologies: ['React', 'Firebase', 'DnD Kit', 'Tailwind'],
      image: '/project4.jpg',
      link: '#',
      github: '#',
      color: '#4facfe',
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h2 className="display-4 fw-bold text-white mb-4">
            My <span className="gradient-text text-glow">Projects</span>
          </h2>
          <p className="lead text-muted">
            Here are some of the projects I've worked on. Each one represents a unique challenge 
            and showcases different aspects of my development skills.
          </p>
        </motion.div>

        <div className="row g-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="col-lg-6 col-md-12"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="card card-custom border-0 h-100"
              >
                <div className="card-body p-4">
                  {/* Project Header */}
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                      <h3 className="h4 fw-bold text-white mb-2">{project.title}</h3>
                      <div className="w-25 h-1 bg-gradient rounded"></div>
                    </div>
                    <div className="d-flex gap-2">
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.link}
                        className="btn btn-outline-primary btn-sm cursor-target"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="View Live"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.github}
                        className="btn btn-outline-secondary btn-sm"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="View Code"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-muted mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="badge badge-custom"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Three.js Preview */}
                  <div className="card card-custom border-0 overflow-hidden" style={{ height: '200px' }}>
                    <div className="card-body p-0">
                      <Canvas camera={{ position: [0, 0, 3] }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <ProjectCube color={project.color} position={[0, 0, 0]} />
                        <ProjectCube color={project.color} position={[1, 0, 0]} />
                        <ProjectCube color={project.color} position={[0, 1, 0]} />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                      </Canvas>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-5"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary btn-lg cursor-target"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 