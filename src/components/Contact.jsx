import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import githubIcon from '../assets/github.png';
import linkedinIcon from '../assets/linkedin.png';
import twitterIcon from '../assets/twitter.png';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [messageLength, setMessageLength] = useState(0);
  const [burstParticles, setBurstParticles] = useState([]);
  const maxCharacters = 500;

  // Firecracker burst effect
  const createBurstEffect = (x, y) => {
    const particles = [];
    const colors = ['#fbbf24', '#f59e0b', '#d97706', '#92400e', '#ffffff'];
    
    for (let i = 0; i < 12; i++) {
      particles.push({
        id: Date.now() + i,
        x: x,
        y: y,
        angle: (i * 30) + Math.random() * 30,
        distance: 80 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 4,
        delay: Math.random() * 0.2
      });
    }
    
    setBurstParticles(particles);
    
    // Clear particles after animation
    setTimeout(() => {
      setBurstParticles([]);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setMessageLength(0);
        
        // Reset form
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setSubmitStatus('error');
        console.error('Server Error:', result.message);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'message') {
      // Character counting logic
      const characterCount = value.length;
      
      if (characterCount <= maxCharacters) {
        setFormData({
          ...formData,
          [name]: value,
        });
        setMessageLength(characterCount);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear status when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

    const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/PlainAnoyn',
      icon: githubIcon,
      color: '#333'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bipesh-karki-50607a279/',
      icon: linkedinIcon,
      color: '#0077b5'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: twitterIcon,
      color: '#1DA1F2'
    }
  ];

  return (
    <section id="contact" className="py-5 position-relative">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h2 className="display-4 fw-bold gradient-text mb-3">Get In Touch</h2>
          <p className="lead text-muted">
            Ready to start a project? Let's discuss how I can help bring your ideas to life.
          </p>
        </motion.div>

        <div className="row g-5">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-lg-8"
          >
            <div className="card card-custom border-0">
              <div className="card-body p-4">
                <h3 className="h4 fw-bold text-white mb-4">Send Message</h3>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="alert alert-success mb-4"
                    role="alert"
                    aria-live="polite"
                  >
                    <strong>Success!</strong> Your message has been sent successfully. I'll get back to you soon!
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="alert alert-danger mb-4"
                    role="alert"
                    aria-live="polite"
                  >
                    <strong>Error!</strong> There was an issue sending your message. Please try again or contact me directly.
                  </motion.div>
                )}

                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label text-white">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control bg-transparent text-white border-0 border-bottom"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-describedby="nameHelp"
                        placeholder="Your name"
                        disabled={isSubmitting}
                        aria-required="true"
                      />
                      <div id="nameHelp" className="form-text text-muted">
                        Please enter your full name
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label text-white">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control bg-transparent text-white border-0 border-bottom"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-describedby="emailHelp"
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                        aria-required="true"
                      />
                      <div id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label text-white">
                        Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control bg-transparent text-white border-0 border-bottom message-textarea"
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        aria-describedby="messageHelp"
                        placeholder="Tell me about your project or inquiry... (max 500 characters)"
                        disabled={isSubmitting}
                        aria-required="true"
                        maxLength="1000"
                      ></textarea>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div id="messageHelp" className="form-text text-muted">
                          Please provide details about your project or inquiry (max 500 characters)
                        </div>
                        <div className="word-counter">
                          <small className={`${messageLength >= maxCharacters ? 'text-danger' : 'text-muted'}`}>
                            {messageLength}/{maxCharacters} characters
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="btn btn-primary btn-lg w-100 cursor-target"
                        disabled={isSubmitting || messageLength === 0}
                        aria-label={isSubmitting ? "Sending message..." : "Send message"}
                        aria-describedby="submitHelp"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </motion.button>
                      <div id="submitHelp" className="form-text text-muted mt-2">
                        {isSubmitting ? "Please wait while we send your message..." : "Click to send your message"}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-lg-4"
          >
            <div className="card card-custom border-0 h-100">
              <div className="card-body p-4">
                <h3 className="h4 fw-bold text-white mb-4">Contact Info</h3>
                
                <div className="mb-4">
                  <h5 className="text-white mb-3">📍 Location</h5>
                  <p className="text-muted mb-0">Kathmandu, Nepal</p>
                </div>

                <div className="mb-4">
                  <h5 className="text-white mb-3">📧 Email</h5>
                  <a 
                    href="mailto:bipeshk48@gmail.com" 
                    className="text-decoration-none text-muted"
                    aria-label="Send email to bipeshk48@gmail.com"
                  >
                    bipeshk48@gmail.com
                  </a>
                </div>

                <div className="mb-4">
                  <h5 className="text-white mb-3">📱 Phone</h5>
                  <a 
                    href="tel:+977 9767805929" 
                    className="text-decoration-none text-muted"
                    aria-label="Call +977 9767805929"
                  >
                    +977 9767805929
                  </a>
                </div>

                <div className="mb-4">
                  <h5 className="text-white mb-3">🌐 Social Media</h5>
                  <div className="d-flex gap-4">
                    {socialLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ 
                          scale: 1.15, 
                          y: -8,
                          rotate: 5,
                          transition: { 
                            type: "spring", 
                            stiffness: 300,
                            damping: 10
                          }
                        }}
                        whileTap={{ 
                          scale: 0.7,
                          rotate: -15,
                          transition: { duration: 0.1 }
                        }}
                        className="social-icon-container"
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${link.color}22, ${link.color}44)`,
                          border: `2px solid ${link.color}66`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <motion.a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-target"
                          style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            zIndex: 2
                          }}
                          aria-label={`Visit ${link.name} profile`}
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = rect.left + rect.width / 2;
                            const y = rect.top + rect.height / 2;
                            createBurstEffect(x, y);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              window.open(link.url, '_blank');
                            }
                          }}
                        >
                          <motion.img
                            src={link.icon}
                            alt={link.name}
                            style={{
                              width: '32px',
                              height: '32px',
                              filter: 'brightness(0.8)',
                              transition: 'all 0.3s ease'
                            }}
                            whileHover={{
                              filter: 'brightness(1.2) drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))',
                              scale: 1.1,
                              transition: { duration: 0.3 }
                            }}
                          />
                        </motion.a>
                        
                        {/* Hover effect overlay */}
                        <motion.div
                          className="social-hover-overlay"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.4))`,
                            borderRadius: '50%',
                            opacity: 0,
                            zIndex: 1
                          }}
                          whileHover={{
                            opacity: 1,
                            scale: 1.2,
                            transition: { duration: 0.3 }
                          }}
                        />
                        
                        {/* Glow effect */}
                        <motion.div
                          className="social-glow"
                          style={{
                            position: 'absolute',
                            top: '-2px',
                            left: '-2px',
                            right: '-2px',
                            bottom: '-2px',
                            background: `radial-gradient(circle, rgba(251, 191, 36, 0.4), transparent 70%)`,
                            borderRadius: '50%',
                            opacity: 0,
                            zIndex: 0
                          }}
                          whileHover={{
                            opacity: 1,
                            scale: 1.3,
                            transition: { duration: 0.4 }
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <h5 className="text-white mb-3">⏰ Availability</h5>
                  <p className="text-muted mb-0">
                    Available for freelance projects and full-time opportunities
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Firecracker Burst Particles */}
      <AnimatePresence>
        {burstParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              opacity: 1
            }}
            animate={{
              x: particle.x + Math.cos(particle.angle * Math.PI / 180) * particle.distance,
              y: particle.y + Math.sin(particle.angle * Math.PI / 180) * particle.distance,
              scale: [0, 1, 0],
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: 1,
              delay: particle.delay,
              ease: "easeOut"
            }}
            style={{
              position: 'fixed',
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              pointerEvents: 'none',
              zIndex: 9999
            }}
          />
        ))}
      </AnimatePresence>
    </section>
  );
};

export default Contact; 