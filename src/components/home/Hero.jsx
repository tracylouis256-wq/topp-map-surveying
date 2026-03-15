import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaRuler, FaPaperPlane, FaPhone, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden pt-32 md:pt-36 lg:pt-40">
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1600&auto=format&fit=crop)',
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/80 to-primary/40" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 leading-tight">
            <span className="block">Precision in Every</span>
            <span className="block text-primary relative inline-block">
              Measurement
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5C40 8 160 8 199 4.5" stroke="#d90429" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl mb-6 md:mb-10 max-w-2xl text-gray-200 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ghana's trusted leader in professional land surveying and geospatial solutions. 
          Delivering accuracy and excellence with cutting-edge technology.
        </motion.p>

        {/* Service Pills - Scrollable on mobile if needed */}
        <motion.div 
          className="flex flex-wrap gap-2 sm:gap-3 mb-6 md:mb-10 max-w-full overflow-x-auto pb-2 scrollbar-hide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/20 flex-shrink-0">
            <FaMapMarkedAlt className="text-primary text-sm sm:text-base" />
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Cadastral</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/20 flex-shrink-0">
            <FaRuler className="text-primary text-sm sm:text-base" />
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Topographic</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/20 flex-shrink-0">
            <span role="img" aria-label="construction" className="text-sm">🏗️</span>
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Construction</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/20 flex-shrink-0">
            <FaPaperPlane className="text-primary text-sm sm:text-base" />
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Drone Surveys</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link 
            to="/request-survey" 
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white font-semibold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Free Quote
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>
          
          <a 
            href="https://wa.me/233539896049?text=Hello%20TOPP%20MAP%20Surveying%2C%20I'm%20interested%20in%20your%20surveying%20services." 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg overflow-hidden hover:border-white transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>WhatsApp Us</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.346.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.124 1.525 5.871L.525 23.508c-.081.299.191.571.49.49l5.637-1.001C8.212 23.814 10.05 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.858 0-3.628-.492-5.15-1.35l-.37-.22-4.252.756.756-4.252-.22-.37C2.492 15.628 2 13.858 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
        </motion.div>

        {/* Quick Contact - Compact for mobile */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-8 sm:mt-12 text-xs sm:text-sm text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            <a href="tel:+233539896049" className="flex items-center gap-2 hover:text-primary transition-colors group">
              <div className="p-1.5 sm:p-2 bg-white/10 rounded-full group-hover:bg-primary/20 transition-colors">
                <FaPhone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </div>
              <span className="whitespace-nowrap">053 989 6049</span>
            </a>
            <a href="mailto:info@toppmapsurveying.com" className="flex items-center gap-2 hover:text-primary transition-colors group">
              <div className="p-1.5 sm:p-2 bg-white/10 rounded-full group-hover:bg-primary/20 transition-colors">
                <FaEnvelope className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </div>
              <span className="hidden sm:inline">info@toppmapsurveying.com</span>
              <span className="sm:hidden">Email</span>
            </a>
            <a 
              href="https://wa.me/233539896049" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-400 transition-colors group"
            >
              <div className="p-1.5 sm:p-2 bg-white/10 rounded-full group-hover:bg-green-500/20 transition-colors">
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.346.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.124 1.525 5.871L.525 23.508c-.081.299.191.571.49.49l5.637-1.001C8.212 23.814 10.05 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.858 0-3.628-.492-5.15-1.35l-.37-.22-4.252.756.756-4.252-.22-.37C2.492 15.628 2 13.858 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
              </div>
              <span className="whitespace-nowrap">WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;