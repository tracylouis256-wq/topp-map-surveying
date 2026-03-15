import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Project Map', path: '/project-map' },
    { name: 'Request Survey', path: '/request-survey' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? 'bg-secondary/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-secondary/90 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Professional Logo - Always Red and White */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-baseline">
              <span className="text-3xl font-black tracking-tight text-primary">
                TOPP
              </span>
              <span className="text-3xl font-light ml-0.5 text-white">
                MAP
              </span>
            </div>
            <div className="ml-3 flex flex-col">
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/80">
                Surveying
              </span>
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase leading-tight text-white/80">
                Consult
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 font-medium text-sm tracking-wide transition-all duration-300 group text-white/90 hover:text-primary`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2 ${
                  location.pathname === link.path ? 'w-1/2' : ''
                }`} />
                <span className={`absolute bottom-0 right-1/2 translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2 ${
                  location.pathname === link.path ? 'w-1/2' : ''
                }`} />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 bg-white/10 text-white hover:bg-primary/20 backdrop-blur-sm`}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4"
            >
              <div className="bg-secondary/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-6 py-4 text-white/80 hover:bg-primary/20 hover:text-white transition-all duration-300 border-b border-white/10 last:border-0 ${
                        location.pathname === link.path 
                          ? 'text-primary bg-primary/10 font-semibold' 
                          : ''
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {link.name}
                        {location.pathname === link.path && (
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;