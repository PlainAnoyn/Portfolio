import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2235] via-[#232946] to-[#1a2235] opacity-90"></div>
      
      {/* Animated border line */}
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-[#f5c542] to-transparent opacity-60"></div>
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-[#f5c542] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4">
            
            {/* Main copyright text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <p className="text-white text-lg font-medium">
                © {currentYear} <span className="text-[#f5c542] font-semibold">Bipesh Karki</span> • All rights reserved
              </p>
            </motion.div>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <p className="text-gray-400 text-xs">
                Crafted with ❤️ and ☕
              </p>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-4"
            >
              <div className="w-2 h-2 bg-[#f5c542] rounded-full opacity-60"></div>
              <div className="w-1 h-1 bg-[#f5c542] rounded-full opacity-40"></div>
              <div className="w-2 h-2 bg-[#f5c542] rounded-full opacity-60"></div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-[#f5c542] via-transparent to-[#f5c542] opacity-30"></div>
      </div>
    </footer>
  );
};

export default Footer; 