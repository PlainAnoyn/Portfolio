import React, { Suspense, useRef, useEffect, lazy, useMemo, useState, createContext, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import TargetCursor from './components/TargetCursor';
import Footer from './components/Footer';





// Scroll Context for centralized scroll management
const ScrollContext = createContext(0);

export function ScrollProvider({ children }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={scrollProgress}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScrollProgress = () => useContext(ScrollContext);

// Lazy load components
const Navigation = lazy(() => import('./components/Navigation'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-border" style={{color: 'var(--accent-color)'}} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// Advanced Shooting Stars with Trails
function ShootingStarTrails() {
  const groupRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 8 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      ],
      velocity: [
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03
      ],
      trail: [],
      maxTrailLength: 15 + Math.random() * 10,
      size: 1 + Math.random() * 3,
      color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.4, 0.9, 0.8),
      life: Math.random() * 50,
      maxLife: 100 + Math.random() * 150
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((starGroup, index) => {
        const starData = shootingStars[index];
        
        // Update position
        starData.position[0] += starData.velocity[0];
        starData.position[1] += starData.velocity[1];
        starData.position[2] += starData.velocity[2];
        
        // Scroll-based movement
        starData.position[2] -= scrollProgress * 0.8;
        
        // Add to trail
        starData.trail.push([...starData.position]);
        if (starData.trail.length > starData.maxTrailLength) {
          starData.trail.shift();
        }
        
        // Life cycle
        starData.life++;
        if (starData.life > starData.maxLife) {
          // Reset star
          starData.life = 0;
          starData.position = [
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
          ];
          starData.velocity = [
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.03
          ];
          starData.trail = [];
        }
        
        // Wrap around boundaries
        if (Math.abs(starData.position[0]) > 50) starData.velocity[0] *= -1;
        if (Math.abs(starData.position[1]) > 50) starData.velocity[1] *= -1;
        if (Math.abs(starData.position[2]) > 50) starData.velocity[2] *= -1;
        
        // Update main star
        const mainStar = starGroup.children[0];
        mainStar.position.set(...starData.position);
        
        // Scale and opacity based on life and scroll
        const lifeScale = 1 - (starData.life / starData.maxLife);
        const scrollScale = 1 + scrollProgress * 3;
        const scale = starData.size * lifeScale * scrollScale;
        mainStar.scale.setScalar(scale);
        
        // Update trail particles
        starData.trail.forEach((trailPos, trailIndex) => {
          if (starGroup.children[trailIndex + 1]) {
            const trailParticle = starGroup.children[trailIndex + 1];
            trailParticle.position.set(...trailPos);
            
            // Trail opacity decreases over time
            const trailOpacity = (trailIndex / starData.trail.length) * 0.6;
            trailParticle.material.opacity = trailOpacity;
            
            // Trail scale decreases over time
            const trailScale = scale * (trailIndex / starData.trail.length) * 0.5;
            trailParticle.scale.setScalar(trailScale);
          }
        });
        
        // Hide unused trail particles
        for (let i = starData.trail.length + 1; i < starGroup.children.length; i++) {
          starGroup.children[i].material.opacity = 0;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shootingStars.map((star, index) => (
        <group key={index}>
          {/* Main shooting star */}
          <mesh position={star.position}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial
              color={star.color}
              transparent
              opacity={0.9}
              depthWrite={false}
            />
          </mesh>
          {/* Trail particles */}
          {Array.from({ length: 20 }).map((_, trailIndex) => (
            <mesh key={trailIndex} position={[0, 0, 0]}>
              <sphereGeometry args={[0.5, 4, 4]} />
              <meshBasicMaterial
                color={star.color}
                transparent
                opacity={0}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// Shooting Stars Component
function ShootingStars() {
  const groupRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
      ],
      velocity: [
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ],
      size: 0.5 + Math.random() * 2,
      trailLength: 10 + Math.random() * 20,
      color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.5, 0.8, 0.9),
      life: Math.random() * 100,
      maxLife: 100 + Math.random() * 200
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((star, index) => {
        const starData = shootingStars[index];
        
        // Update position
        star.position.x += starData.velocity[0];
        star.position.y += starData.velocity[1];
        star.position.z += starData.velocity[2];
        
        // Scroll-based movement - shooting stars move faster as we dive
        star.position.z -= scrollProgress * 0.6;
        
        // Life cycle
        starData.life++;
        if (starData.life > starData.maxLife) {
          // Reset star
          starData.life = 0;
          star.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80
          );
          starData.velocity = [
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
          ];
        }
        
        // Wrap around boundaries
        if (Math.abs(star.position.x) > 40) starData.velocity[0] *= -1;
        if (Math.abs(star.position.y) > 40) starData.velocity[1] *= -1;
        if (Math.abs(star.position.z) > 40) starData.velocity[2] *= -1;
        
        // Scale based on life and scroll
        const lifeScale = 1 - (starData.life / starData.maxLife);
        const scrollScale = 1 + scrollProgress * 2;
        const scale = starData.size * lifeScale * scrollScale;
        star.scale.setScalar(scale);
        
        // Opacity based on life
        const material = star.material;
        if (material) {
          material.opacity = lifeScale * 0.8;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shootingStars.map((star, index) => (
        <mesh key={index} position={star.position}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color={star.color}
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Deep Space Nebula Component
function DeepSpaceNebula() {
  const groupRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nebulaParticles = useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      ],
      size: 2 + Math.random() * 8,
      color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6),
      speed: 0.1 + Math.random() * 0.3
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((particle, index) => {
        const particleData = nebulaParticles[index];
        
        // Move particles away as we dive deeper
        particle.position.z -= scrollProgress * 0.8;
        if (particle.position.z < -50) {
          particle.position.z = 50;
        }
        
        // Gentle floating movement
        particle.position.y += Math.sin(state.clock.getElapsedTime() * particleData.speed) * 0.01;
        
        // Scale based on scroll depth
        const scale = particleData.size * (1 + scrollProgress * 2);
        particle.scale.setScalar(scale);
        
        // Opacity based on scroll depth
        const material = particle.material;
        if (material) {
          material.opacity = 0.1 + scrollProgress * 0.4;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {nebulaParticles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color={particle.color}
            transparent
            opacity={0.1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Scroll-Reactive Fog Component
function ScrollFog() {
  const { scene } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (scene.fog) {
      // Increase fog density as we dive deeper
      scene.fog.near = 5 + scrollProgress * 10;
      scene.fog.far = 50 + scrollProgress * 30;
      
      // Change fog color to darker as we dive
      const darkFactor = 0.1 + scrollProgress * 0.3;
      scene.fog.color.setRGB(darkFactor, darkFactor, darkFactor);
    }
  });

  return null;
}

// Scroll-Reactive Camera Component
function ScrollCamera() {
  const { camera } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastUpdate = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const now = Date.now();
    // Only update every 16ms (60fps) for better performance
    if (now - lastUpdate.current > 16) {
      // Gentle camera movement
      camera.position.z = 5 + scrollProgress * 3; // Reduced from 5
      
      // Very subtle tilt
      camera.rotation.x = scrollProgress * 0.03; // Reduced from 0.05
      
      // Update camera
      camera.updateMatrixWorld();
      lastUpdate.current = now;
    }
  });

  return null; // This component only affects the camera
}

// Advanced Stars component with instanced meshes and twinkling effects
const STAR_COUNT = 200; // Reduced from 400 for better performance
const STAR_AREA = 80; // Reduced from 100
const STAR_SPEED = 0.02; // Reduced from 0.03

function randomStarPosition(area) {
  return [
    (Math.random() - 0.5) * area,
    (Math.random() - 0.5) * area,
    (Math.random() - 0.5) * area,
  ];
}

function randomStarColor() {
  const colors = [
    "#ffffff",
    "#ffeedd",
    "#dbeafe",
    "#e0e7ff",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function SmoothStars() {
  const meshRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }).map(() => ({
      position: randomStarPosition(STAR_AREA),
      color: randomStarColor(),
      scale: 0.04 + Math.random() * 0.06, // Smaller stars
      twinklePhase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      for (let i = 0; i < STAR_COUNT; i++) {
        const { position, scale, twinklePhase } = stars[i];

        // Gentle upward movement
        position[1] += STAR_SPEED * delta * 60;
        if (position[1] > STAR_AREA / 2) {
          position[1] = -STAR_AREA / 2;
        }

        // Subtle scroll-based movement
        position[2] -= scrollProgress * 0.15; // Reduced from 0.2
        if (position[2] < -STAR_AREA / 2) {
          position[2] = STAR_AREA / 2;
        }

        // Gentle twinkle effect
        const twinkle =
          0.8 +
          0.2 *
            Math.sin(
              state.clock.getElapsedTime() * 1.2 + // Slower twinkle
                twinklePhase +
                position[0] * 0.2
            );

        // Set instance matrix
        const mat = new THREE.Matrix4();
        mat.makeTranslation(...position);
        mat.scale(new THREE.Vector3(scale * twinkle, scale * twinkle, scale * twinkle));
        meshRef.current.setMatrixAt(i, mat);

        // Set color/opacity
        meshRef.current.setColorAt(
          i,
          new THREE.Color(stars[i].color).lerp(
            new THREE.Color("#fff"),
            0.3 + twinkle * 0.15 // Reduced intensity
          )
        );
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, STAR_COUNT]}
      castShadow={false}
      receiveShadow={false}
    >
      <sphereGeometry args={[1, 6, 6]} /> {/* Reduced segments */}
      <meshBasicMaterial
        toneMapped={false}
        transparent
        opacity={0.6} // Reduced from 0.7
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// Floating Geometric Shapes Component
function FloatingShapes() {
  const groupRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shapes = useMemo(() => {
    return Array.from({ length: 6 }).map(() => ({ // Increased from 4
      position: [
        (Math.random() - 0.5) * 30, // Increased area
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: 0.8 + Math.random() * 1.2, // Larger scale
      type: Math.floor(Math.random() * 3), // 0: cube, 1: sphere, 2: torus
      speed: 0.4 + Math.random() * 0.6, // Faster speed
      color: new THREE.Color().setHSL(Math.random(), 0.4, 0.7), // More vibrant colors
      floatSpeed: 0.5 + Math.random() * 1, // Individual float speed
      floatAmplitude: 0.5 + Math.random() * 1 // Float amplitude
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const shape = shapes[index];
        
        // More dynamic rotation
        child.rotation.x += shape.speed * 0.008; // Increased rotation
        child.rotation.y += shape.speed * 0.008;
        child.rotation.z += shape.speed * 0.004; // Added Z rotation
        
        // Enhanced floating movement
        const time = state.clock.getElapsedTime();
        child.position.y += Math.sin(time * shape.floatSpeed) * shape.floatAmplitude * 0.01;
        child.position.x += Math.cos(time * shape.floatSpeed * 0.7) * shape.floatAmplitude * 0.005;
        
        // Scroll-based movement
        child.position.z -= scrollProgress * 0.2; // Increased movement
        if (child.position.z < -15) {
          child.position.z = 15;
        }
        
        // More dynamic scale pulse
        const scale = shape.scale + Math.sin(time * 2) * 0.2; // Increased pulse
        child.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => (
        <mesh key={index} position={shape.position} rotation={shape.rotation}>
          {shape.type === 0 && <boxGeometry args={[1, 1, 1]} />}
          {shape.type === 1 && <sphereGeometry args={[0.5, 8, 8]} />} {/* Increased segments */}
          {shape.type === 2 && <torusGeometry args={[0.5, 0.2, 8, 16]} />} {/* Increased segments */}
          <meshBasicMaterial
            color={shape.color}
            transparent
            opacity={0.25} // Increased opacity
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// Particle System Component
function ParticleSystem() {
  const particlesRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
      ],
      velocity: [
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008
      ],
      size: 0.08 + Math.random() * 0.15,
      color: new THREE.Color().setHSL(Math.random(), 0.6, 0.8)
    }));
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, index) => {
        const particleData = particles[index];
        
        // Update position
        particle.position.x += particleData.velocity[0];
        particle.position.y += particleData.velocity[1];
        particle.position.z += particleData.velocity[2];
        
        // Scroll-based movement - particles move away as we dive deeper
        particle.position.z -= scrollProgress * 0.4;
        if (particle.position.z < -40) {
          particle.position.z = 40;
        }
        
        // Wrap around boundaries
        if (Math.abs(particle.position.x) > 40) particleData.velocity[0] *= -1;
        if (Math.abs(particle.position.y) > 40) particleData.velocity[1] *= -1;
        if (Math.abs(particle.position.z) > 40) particleData.velocity[2] *= -1;
        
        // Pulse size
        const scale = particleData.size + Math.sin(state.clock.getElapsedTime() * 2 + index) * 0.03;
        particle.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[0.15, 4, 4]} />
          <meshBasicMaterial
            color={particle.color}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// Simple Test Cube Component
function SimpleCube() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ff0000" />
    </mesh>
  );
}

// Enhanced Stars Component with Twinkling and Parallax
function EnhancedStars({ count = 50, size = 1, depth = 50, speed = 0.0002, opacity = 0.8 }) {
  const pointsRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Generate random positions and random twinkle speeds
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push((Math.random() - 0.5) * depth); // x
      arr.push((Math.random() - 0.5) * depth); // y
      arr.push((Math.random() - 0.5) * depth); // z
    }
    return new Float32Array(arr);
  }, [count, depth]);

  const speeds = useMemo(
    () => Array.from({ length: count }, () => Math.random() * 2 + 1), 
    [count]
  );

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.getElapsedTime();
      const mouse = mouseRef.current;

      // Parallax rotation based on mouse
      pointsRef.current.rotation.x = mouse.y * 0.05;
      pointsRef.current.rotation.y += speed + mouse.x * 0.001;

      // Twinkle by adjusting size over time
      const sizes = pointsRef.current.geometry.attributes.size.array;
      for (let i = 0; i < count; i++) {
        sizes[i] = size * (0.4 + Math.sin(t * speeds[i]) * 0.3);
      }
      pointsRef.current.geometry.attributes.size.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute 
          attach="attributes-size"
          count={count}
          array={new Float32Array(count).fill(size)}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color="#ffffff"
        transparent
        opacity={opacity}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Optimized Space Journey Camera Controller
function SpaceJourneyCamera() {
  const { camera } = useThree();
  const scrollProgress = useScrollProgress();
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // Move camera forward through space as user scrolls (from 50 to -170)
      camera.position.z = 50 - scrollProgress * 220;
      
      // Subtle side-to-side sway for realism
      camera.position.x = Math.sin(scrollProgress * Math.PI * 4) * 3;
      camera.position.y = Math.cos(scrollProgress * Math.PI * 2) * 2;
      
      // Always look towards the solar system
      camera.lookAt(0, 0, -100);
      
      // Slowly rotate the whole scene for dynamic feel
      groupRef.current.rotation.y += 0.0005;
      groupRef.current.rotation.z = Math.sin(scrollProgress * Math.PI * 2) * 0.01;
    }
  });

  return <group ref={groupRef} />;
}

// Optimized Warp Speed Stars with Context
function WarpSpeedStars({ count = 100, size = 1, depth = 50, speed = 0.001, opacity = 0.5, warpIntensity = 1 }) {
  const pointsRef = useRef();
  const scrollProgress = useScrollProgress();
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);

  // Track scroll velocity for warp effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const velocity = Math.abs(scrollTop - lastScrollY.current);
      setScrollVelocity(velocity);
      lastScrollY.current = scrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate star positions once
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      pos[i * 3 + 2] = -Math.random() * depth;      // z (negative so stars are "in front")
    }
    return pos;
  }, [count, depth]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const elapsed = clock.getElapsedTime();
      
      // Warp speed effect - stars stretch when scrolling fast
      const warpEffect = Math.min(scrollVelocity * 0.005, 1) * warpIntensity;
      
      // Move stars along z axis, loop them back for endless effect
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        // Base movement speed plus warp effect
        const starSpeed = speed * (1 + warpEffect * 5);
        positions[i * 3 + 2] += starSpeed;
        
        // Loop stars back when they pass the camera
        if (positions[i * 3 + 2] > 10) {
          positions[i * 3 + 2] = -depth;
          // Randomize x,y position when looping
          positions[i * 3] = (Math.random() - 0.5) * 100;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Subtle twinkling effect
      pointsRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color="white"
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
}

// Optimized 3D Planet Component with Mouse Interaction
function Planet({ textureUrl, position, size, ringTextureUrl, rotationSpeed = 0.001, name }) {
  const planetTexture = useTexture(textureUrl);
  const ringTexture = ringTextureUrl ? useTexture(ringTextureUrl) : null;
  const planetRef = useRef();
  const ringRef = useRef();
  const groupRef = useRef();
  const scrollProgress = useScrollProgress();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    const planetGroupRef = planetRef.current?.parent;
    
    if (planetGroupRef) {
      // Planet and ring rotation together (slower auto-rotation)
      planetGroupRef.rotation.y += rotationSpeed * 0.3;
      
      // Subtle floating motion for the whole planet+ring group
      planetGroupRef.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.8;
      
      // Scale slightly based on scroll (planets get bigger as you approach)
      const scaleBoost = 1 + scrollProgress * 0.3;
      planetGroupRef.scale.setScalar(scaleBoost);
    }
    
    if (ringRef.current) {
      // Ring rotation (slightly different speed for realism)
      ringRef.current.rotation.z += rotationSpeed * 0.2;
    }

    // Mouse parallax effect on the whole planet group
    if (groupRef.current) {
      const mouse = mouseRef.current;
      // Parallax intensity based on distance from center
      const parallaxStrength = 1 / (Math.abs(position[2]) / 50 + 1);
      
      groupRef.current.rotation.x = mouse.y * 0.1 * parallaxStrength;
      groupRef.current.rotation.y = mouse.x * 0.1 * parallaxStrength;
      
      // Subtle position shift based on mouse
      groupRef.current.position.x = position[0] + mouse.x * 5 * parallaxStrength;
      groupRef.current.position.y = position[1] + mouse.y * 3 * parallaxStrength;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Planet and Ring Group - ensures they move together */}
      <group>
        {/* Main planet */}
        <Sphere args={[size, 256, 256]} ref={planetRef}>
          <meshStandardMaterial 
            map={planetTexture} 
            roughness={name === 'Moon' ? 0.8 : 0.2}
            metalness={name === 'Moon' ? 0.0 : 0.0}
            emissive={name === 'Moon' ? "#333333" : "#222222"}
            emissiveIntensity={name === 'Moon' ? 0.2 : 0.3}
            displacementScale={0}
            normalScale={[1, 1]}
            flatShading={false}
          />
        </Sphere>

        {/* Saturn ring - positioned relative to planet */}
        {ringTexture && (
          <mesh ref={ringRef} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, 0, 0]}>
            <ringGeometry args={[size * 1.3, size * 2.2, 64]} />
            <meshStandardMaterial
              map={ringTexture}
              side={THREE.DoubleSide}
              transparent
              opacity={0.9}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
        )}
      </group>
      

    </group>
  );
}

// Optimized Solar System with Context
function SolarSystem() {
  return (
    <group>
      {/* Planets positioned for scroll-through journey */}
      
      {/* Moon - Random position */}
      <Planet 
        textureUrl="/textures/Moon.jpg"
        position={[75, -55, -45]}
        size={12}
        rotationSpeed={0.001}
        name="Moon"
      />
      
      {/* Earth - Random position */}
      <Planet 
        textureUrl="/textures/Earth.jpg"
        position={[-45, 70, -95]}
        size={16}
        rotationSpeed={0.0015}
        name="Earth"
      />
      
      {/* Venus - Random position */}
      <Planet 
        textureUrl="/textures/Vernus.jpg"
        position={[105, 35, -165]}
        size={14}
        rotationSpeed={0.0008}
        name="Venus"
      />
      
      {/* Jupiter - Random position */}
      <Planet 
        textureUrl="/textures/Jupiter.jpg"
        position={[-120, -45, -210]}
        size={24}
        rotationSpeed={0.002}
        name="Jupiter"
      />
      
      {/* Saturn - Random position */}
      <Planet 
        textureUrl="/textures/Saturn.jpg"
        ringTextureUrl="/textures/Saturn_ring.jpg"
        position={[25, -85, -310]}
        size={20}
        rotationSpeed={0.0012}
        name="Saturn"
      />
    </group>
  );
}

// Enhanced Space Journey with Planets and Stars
function SpaceJourneyStarfield() {
  return (
    <>
      <SpaceJourneyCamera />
      

      
      {/* Enhanced lighting for planets */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[100, 100, 100]} intensity={3} color="#ffffff" castShadow />
      <pointLight position={[50, 50, 50]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-50, -50, 50]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, 150]} intensity={2} color="#ffffff" />
      <pointLight position={[-100, 0, 0]} intensity={1} color="#FFA500" />
      <pointLight position={[100, 0, 0]} intensity={1} color="#87CEEB" />
      

    </>
  );
}

function App() {
  // Memoize the 3D background components to prevent unnecessary re-renders
  const ThreeBackground = useMemo(() => (
    <ScrollProvider>
      <div className="three-background">
        <Canvas 
          camera={{ position: [0, 0, 50], fov: 75 }}
          gl={{ 
            antialias: false, // Disable antialiasing for better performance
            powerPreference: "high-performance",
            stencil: false,
            depth: false
          }}
          dpr={[1, 2]} // Limit pixel ratio for better performance
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#0a0a0a', 50, 300]} />
          <SpaceJourneyStarfield />
        </Canvas>
      </div>
    </ScrollProvider>
  ), []);

  useEffect(() => {
    // Initialize AOS with performance optimizations
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true, // Only animate once
      offset: 100,
      delay: 0,
      disable: 'mobile' // Disable on mobile for better performance
    });

    // Smooth scrolling with passive listeners
    const handleSmoothScroll = (e) => {
      const target = e.target.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add smooth scroll listeners
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll, { passive: false });
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  // Detect if device is ONLY touch (true mobile/tablet), not desktop with touch screen
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  
  React.useEffect(() => {
    // Only disable cursor on devices with ONLY coarse pointer (actual mobile/tablet)
    // This allows desktop browsers (even when resized to mobile width) to still show cursor
    const isOnlyTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isOnlyTouch);
  }, []);

  return (
    <div className="App">
      {/* Only show custom cursor on desktop */}
      {!isTouchDevice && (
        <TargetCursor 
          spinDuration={2}
          hideDefaultCursor={true}
        />
      )}

      {ThreeBackground}
      <div className="content">
        <Suspense fallback={<LoadingSpinner />}>
          <Navigation />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      </div>
      </div>
  );
}

export default App; 