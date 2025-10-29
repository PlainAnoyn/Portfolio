import React, { useEffect, useState } from 'react';
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

function ImageCarousel({ images, alt, fit = 'cover' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images]);

  if (!images || images.length === 0) return null;

  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="position-relative mb-4 rounded overflow-hidden" style={{ height: '260px' }}>
      <img
        src={images[currentIndex]}
        alt={alt}
        className="img-fluid w-100 h-100"
        style={{ objectFit: fit, backgroundColor: fit === 'contain' ? 'rgba(0,0,0,0.3)' : undefined }}
        loading="lazy"
      />
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className="btn btn-sm btn-dark position-absolute"
            style={{ top: '50%', left: '8px', transform: 'translateY(-50%)', opacity: 0.75 }}
            onClick={goPrev}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="btn btn-sm btn-dark position-absolute"
            style={{ top: '50%', right: '8px', transform: 'translateY(-50%)', opacity: 0.75 }}
            onClick={goNext}
          >
            ›
          </button>
          <div className="position-absolute d-flex gap-1" style={{ bottom: '8px', left: '50%', transform: 'translateX(-50%)' }}>
            {images.map((_, i) => (
              <span
                key={i}
                style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === currentIndex ? '#fff' : 'rgba(255,255,255,0.5)' }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      images: [
        '/projects/CozyPlates/cozyplate.png',
        '/projects/CozyPlates/Cozy plates 2.png',
        '/projects/CozyPlates/Cozyplate 1.png',
        '/projects/CozyPlates/cozyplate 3.png'
      ],
      link: '#',
      github: '#',
      color: '#667eea',
    },
    {
      title: '3D Portfolio Website',
      description: 'An interactive portfolio website featuring Three.js animations and immersive 3D experiences. Custom shaders and particle systems.',
      technologies: ['Three.js', 'React', 'WebGL', 'GSAP'],
      images: [
        '/projects/DamiChha/1761751757578.jpg',
        '/projects/DamiChha/1761751757593.jpg',
        '/projects/DamiChha/1761751757604.jpg',
        '/projects/DamiChha/1761751757622.jpg',
        '/projects/DamiChha/1761751757636.jpg'
      ],
      imageFit: 'contain',
      link: '#',
      github: '#',
      color: '#764ba2',
    },
    {
      title: 'AI Chat Application',
      description: 'A real-time chat application with AI-powered responses. Built with React, Socket.io, and OpenAI API integration.',
      technologies: ['React', 'Socket.io', 'OpenAI', 'Express'],
      images: [
        '/projects/PathFinder/Screenshot from 2025-10-29 20-39-34.png',
        '/projects/PathFinder/Screenshot from 2025-10-29 20-39-44.png',
        '/projects/PathFinder/Screenshot from 2025-10-29 20-40-44.png',
        '/projects/PathFinder/Screenshot from 2025-10-29 20-41-22.png'
      ],
      link: '#',
      github: '#',
      color: '#f093fb',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      technologies: ['React', 'Firebase', 'DnD Kit', 'Tailwind'],
      images: [
        '/projects/Shangrila/Screenshot from 2025-10-29 20-53-57.png',
        '/projects/Shangrila/Screenshot from 2025-10-29 20-54-10.png',
        '/projects/Shangrila/Screenshot from 2025-10-29 20-54-18.png',
        '/projects/Shangrila/Screenshot from 2025-10-29 20-54-26.png'
      ],
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
                  </div>

                  {/* Project Images Carousel */}
                  {project.images && (
                    <ImageCarousel images={project.images} alt={`${project.title} preview`} fit={project.imageFit || 'cover'} />
                  )}

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
                  {/* <div style={{ height: '200px' }}>
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
                  </div> */}
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
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/PlainAnoyn"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg cursor-target"
          >
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 