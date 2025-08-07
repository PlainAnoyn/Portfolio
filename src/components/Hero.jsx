import React, { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function Model3D({ scrollProgress }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/low_poly_man_working_at_a_table_with_a_laptop/scene.gltf');
  const { actions } = useAnimations(animations, group);
  const modelRef = useRef();

  // Facing left: -Math.PI/2, facing right: Math.PI/2
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = lerp(-Math.PI / 2, Math.PI / 2, scrollProgress);
      group.current.position.y = -3.5;
      group.current.position.x = 2.5; // Move model to the right edge
    }
  });

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction.reset().play();
    }
  }, [actions]);

  return (
    <group ref={group}>
      <primitive 
        ref={modelRef}
        object={scene} 
        scale={[0.8, 0.8, 0.8]}
      />
    </group>
  );
}

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
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

  // Typing animation state
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const toRotate = ["Bipesh Karki"];
  const period = 1500; // Pause time

  const tick = useCallback(() => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setTypingSpeed(100);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(prev => prev + 1);
      setTypingSpeed(150);
    }
  }, [text, isDeleting, loopNum, toRotate, period]);

  useEffect(() => {
    const ticker = setInterval(tick, typingSpeed);
    return () => clearInterval(ticker);
  }, [tick, typingSpeed]);

  // Track scroll progress (0 = top, 1 = 1 viewport height scrolled)
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Clamp progress between 0 and 1 for the first viewport height
      setScrollProgress(Math.min(scrollY / vh, 1));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create floating particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 6,
  }));

  // Stats counting animation
  const [stats, setStats] = useState({
    experience: 0,
    projects: 0,
    clients: 0
  });

  useEffect(() => {
    const targetStats = {
      experience: 5,
      projects: 50,
      clients: 20
    };

    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increments = {
      experience: targetStats.experience / steps,
      projects: targetStats.projects / steps,
      clients: targetStats.clients / steps
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setStats({
        experience: Math.min(Math.round(increments.experience * currentStep), targetStats.experience),
        projects: Math.min(Math.round(increments.projects * currentStep), targetStats.projects),
        clients: Math.min(Math.round(increments.clients * currentStep), targetStats.clients)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="section relative overflow-hidden">
      {/* Floating Particles */}
      <div className="hero-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="row align-items-center" style={{ minHeight: '60vh' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="col-lg-6 col-md-12"
          >
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div variants={itemVariants} className="mb-4">
                <span className="badge badge-custom mb-3 px-4 py-3 fs-4 fw-bold">
                  👋 Hello, I'm
                </span>
                <motion.h1 
                  variants={itemVariants}
                  className="display-1 fw-bold text-white mb-3"
                >
                  <span className="gradient-text text-glow">{text}</span>
                  <span className="blinking-caret">|</span>
                </motion.h1>
              </motion.div>
              
              <motion.h2 
                variants={itemVariants}
                className="h2 text-gray-300 fw-medium mb-4"
              >
                Full Stack Developer & Creative Coder
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="lead text-gray-400 mb-5"
              >
                I create immersive digital experiences using cutting-edge technologies. 
                Specializing in React, Three.js, and modern web development.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="d-flex flex-wrap gap-3 mb-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-lg"
                >
                  View My Work
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-secondary btn-lg"
                >
                  Download CV
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Three.js Canvas with 3D Model */}
          <motion.div 
            variants={itemVariants}
            className="col-lg-6 col-md-12"
          >
            <div className="position-relative" style={{ height: '700px' }}>
              <Canvas 
                camera={{ position: [0, 5, 25], fov: 25 }}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />
                
                <Suspense fallback={null}>
                  <Model3D scrollProgress={scrollProgress} />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        </div>

        {/* Stats Section - Centered Below Both */}
        <motion.div 
          variants={itemVariants}
          className="row justify-content-center mt-3"
        >
          <div className="col-lg-8 col-md-10">
            <div className="row g-4">
              <div className="col-4 text-center">
                <div className="card card-custom border-0 p-3">
                  <div className="card-body text-center">
                    <div className="display-6 fw-bold gradient-text mb-2">{stats.experience}+</div>
                    <div className="text-muted small">Years Experience</div>
                  </div>
                </div>
              </div>
              <div className="col-4 text-center">
                <div className="card card-custom border-0 p-3">
                  <div className="card-body text-center">
                    <div className="display-6 fw-bold gradient-text mb-2">{stats.projects}+</div>
                    <div className="text-muted small">Projects Completed</div>
                  </div>
                </div>
              </div>
              <div className="col-4 text-center">
                <div className="card card-custom border-0 p-3">
                  <div className="card-body text-center">
                    <div className="display-6 fw-bold gradient-text mb-2">{stats.clients}+</div>
                    <div className="text-muted small">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 