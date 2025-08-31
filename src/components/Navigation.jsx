import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/Logo.png';

// Flip Animation Component
const FlipNavItem = ({ children, onClick, delay = 0 }) => {
  return (
    <motion.div
      className="flip-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <motion.div
        className="flip-content"
        whileHover={{
          rotateX: 15,
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Text Slide Animation Component
const SlideTextNavItem = ({ label, hoverText, onClick, delay = 0 }) => {
  return (
    <motion.li
      className="nav-item"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
              <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="nav-link text-white fw-medium position-relative d-flex align-items-center gap-2 slide-text-container cursor-target"
          onClick={onClick}
        >
        <span className="slide-text-wrapper">
          <span className="slide-text-original">{label}</span>
          <span className="slide-text-hover" data-hover={hoverText || label}>
            {hoverText || label}
          </span>
        </span>
        <span className="nav-link-underline"></span>
      </motion.button>
    </motion.li>
  );
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  const navItems = [
    { id: 'home', label: 'Home', hoverText: 'Home' },
    { id: 'about', label: 'About', hoverText: 'About' },
    { id: 'projects', label: 'Projects', hoverText: 'Projects' },
    { id: 'contact', label: 'Contact', hoverText: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`navbar navbar-expand-lg fixed-top nav-glass ${
        isScrolled ? 'scrolled' : ''
      }`}
    >
      <div className="container">
        {/* Brand/Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="navbar-brand d-flex align-items-center cursor-target"
          onClick={() => scrollToSection('home')}
          style={{ cursor: 'pointer' }}
        >
          <img src={Logo} alt="Site logo" style={{height: '56px', objectFit: 'contain', marginRight: '12px'}} />
        </motion.div>

        {/* Mobile Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="navbar-toggler border-0 cursor-target"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="navbar-toggler-icon">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </motion.button>

        {/* Navigation Items */}
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map((item, index) => (
              <SlideTextNavItem
                key={item.id}
                label={item.label}
                hoverText={item.hoverText}
                onClick={() => scrollToSection(item.id)}
                delay={index * 0.1}
              />
            ))}
          </ul>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="ms-lg-3 mt-3 mt-lg-0"
          >
            <FlipNavItem delay={0.4}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-sm cursor-target"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </motion.button>
            </FlipNavItem>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </motion.nav>
  );
};

export default Navigation; 