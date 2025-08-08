import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

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
  const maxCharacters = 500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration for bipeshk48@gmail.com
      // You need to set up EmailJS with these steps:
      // 1. Go to https://www.emailjs.com/
      // 2. Sign up and create a Gmail service
      // 3. Create a template with this content:
      //    Subject: New Portfolio Contact from {{name}}
      //    Body: 
      //    Name: {{name}}
      //    Email: {{email}}
      //    Message: {{message}}
      // 4. Replace the IDs below with your actual IDs
      
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formRef.current,
        'YOUR_USER_ID' // Replace with your EmailJS user ID
      );

      // Alternative: Formspree (if EmailJS doesn't work)
      // const formData = new FormData(formRef.current);
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Accept': 'application/json'
      //   }
      // });

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setMessageLength(0);
        
        // Reset form
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
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
      url: 'https://github.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
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
                        className="btn btn-primary btn-lg w-100"
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
                    href="tel:+9771234567890" 
                    className="text-decoration-none text-muted"
                    aria-label="Call +977 1234567890"
                  >
                    +977 1234567890
                  </a>
                </div>

                <div className="mb-4">
                  <h5 className="text-white mb-3">🌐 Social Media</h5>
                  <div className="d-flex gap-3">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link d-flex align-items-center justify-content-center"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Visit ${link.name} profile`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            window.open(link.url, '_blank');
                          }
                        }}
                      >
                        {link.icon}
                      </motion.a>
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
    </section>
  );
};

export default Contact; 