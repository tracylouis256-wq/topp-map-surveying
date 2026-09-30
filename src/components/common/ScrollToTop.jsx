import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  // Track scroll position for button visibility and progress
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 400px
      setShowButton(window.scrollY > 400);
      
      // Calculate scroll progress (for the ring)
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Back to Top Button with Progress Ring */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 group cursor-pointer outline-none"
            aria-label="Scroll to top"
          >
            {/* Outer Ring - Progress Indicator */}
            <svg className="absolute inset-0 w-14 h-14 -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="2"
                className="opacity-30"
              />
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="#d90429"
                strokeWidth="3"
                strokeDasharray={2 * Math.PI * 26}
                strokeDashoffset={2 * Math.PI * 26 * (1 - scrollProgress / 100)}
                className="transition-strokeDashoffset duration-300"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Inner Button */}
            <div className="relative w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:shadow-xl">
              <FaArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
              
              {/* Pulse Effect */}
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></span>
            </div>
            
            {/* Tooltip on Hover */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-secondary text-white text-sm py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Back to Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar at Top (Optional) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />
    </>
  );
};

export default ScrollToTop;