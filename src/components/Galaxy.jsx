import React, { useRef, useEffect, useState } from 'react';

const Galaxy = ({ 
  mouseRepulsion = true,
  mouseInteraction = true,
  density = 1.5,
  glowIntensity = 0.5,
  saturation = 0.8,
  hueShift = 240
}) => {
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create simple stars
    const starCount = Math.floor(100 * density);
    const stars = [];
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        originalX: Math.random() * canvas.width,
        originalY: Math.random() * canvas.height
      });
    }

    // Mouse interaction
    const handleMouseMove = (e) => {
      if (!mouseInteraction) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMouse({ x, y });
    };

    const handleMouseLeave = () => {
      setMouse({ x: -1000, y: -1000 });
    };

    if (mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        // Update star position
        star.x += star.speed;
        if (star.x > canvas.width) star.x = 0;
        
        // Mouse repulsion effect
        if (mouseRepulsion && mouse.x > 0 && mouse.y > 0) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            const force = (80 - distance) / 80;
            star.x += (dx / distance) * force * 3;
            star.y += (dy / distance) * force * 3;
          }
        }
        
        // Twinkle effect
        star.twinkle += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinkle) * 0.3 + 0.7;
        
        // Draw star
        ctx.save();
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = `hsl(${hueShift}, ${saturation * 100}%, 70%)`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (mouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mouseRepulsion, mouseInteraction, density, hueShift, saturation]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        background: 'transparent'
      }}
    />
  );
};

export default Galaxy; 