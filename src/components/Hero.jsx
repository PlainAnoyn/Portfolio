import React, { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import Galaxy from './Galaxy';

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

  // Convert stats object to array for mapping
  const statsArray = [
    { label: 'Years Experience', value: stats.experience },
    { label: 'Projects Completed', value: stats.projects },
    { label: 'Happy Clients', value: stats.clients }
  ];

  return (
    <section id="home" className="section relative overflow-hidden">
      {/* Galaxy Background */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
        />
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
                <span className="badge badge-custom mb-3 px-4 py-3 fs-4 fw-bold" data-aos="fade-down" data-aos-delay="200">
                  👋 Hello, I'm
                </span>
                <motion.h1 
                  variants={itemVariants}
                  className="display-1 fw-bold text-white mb-3"
                  data-aos="fade-up" 
                  data-aos-delay="400"
                >
                  <span className="gradient-text text-glow">{text}</span>
                  <span className="blinking-caret">|</span>
                </motion.h1>
              </motion.div>
              
              <motion.h2 
                variants={itemVariants}
                className="h2 text-gray-300 fw-medium mb-4"
                data-aos="fade-up" 
                data-aos-delay="600"
              >
                Full Stack Developer & Creative Coder
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="lead text-gray-400 mb-5"
                data-aos="fade-up" 
                data-aos-delay="800"
              >
                I create immersive digital experiences using cutting-edge technologies. 
                Specializing in React, Three.js, and modern web development.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="d-flex flex-wrap gap-3 mb-3"
                data-aos="fade-up" 
                data-aos-delay="1000"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-lg cursor-target"
                >
                  View My Work
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-secondary btn-lg cursor-target"
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
            data-aos="fade-left" 
            data-aos-delay="600"
            data-aos-duration="1200"
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
          data-aos="fade-up" 
          data-aos-delay="1200"
          data-aos-duration="1000"
        >
          <div className="col-lg-8 col-md-10">
            <div className="row g-4">
              {statsArray.map((stat, index) => (
                <div key={stat.label} className="col-md-4">
                  <div 
                    className="text-center p-4 rounded glass-effect"
                    data-aos="zoom-in" 
                    data-aos-delay={1400 + (index * 200)}
                    data-aos-duration="800"
                  >
                    <div className="display-6 fw-bold gradient-text mb-2">{stat.value}+</div>
                    <div className="text-gray-400 fw-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 