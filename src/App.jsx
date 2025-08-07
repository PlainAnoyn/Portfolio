import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';

// Custom Stars component with smooth upward movement
function SmoothStars() {
  const starsRef = useRef();
  
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.position.y += 0.01; // Slow upward movement
      if (starsRef.current.position.y > 50) {
        starsRef.current.position.y = -50; // Reset to bottom when reaching top
      }
    }
  });

  const stars = [];
  for (let i = 0; i < 1000; i++) {
    stars.push(
      <mesh
        key={i}
        position={[
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200
        ]}
      >
        <sphereGeometry args={[0.1]} />
        <meshBasicMaterial color="white" />
      </mesh>
    );
  }

  return <group ref={starsRef}>{stars}</group>;
}

function App() {
  return (
    <div className="App">
      {/* Three.js Background */}
      <div className="three-background">
        <Canvas camera={{ position: [0, 2, 8], fov: 35 }}>
          <Suspense fallback={null}>
            <SmoothStars />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="content">
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App; 