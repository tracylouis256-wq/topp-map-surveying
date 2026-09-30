import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../../utils/constants';

const WhatsAppButton = () => {
  // Pre-filled greeting — real newlines, encoded ONCE
  const greeting =
    `Hello ${COMPANY_INFO.name}! 👋\n\n` +
    `I'd like to enquire about your surveying services.`;

  const whatsappLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(greeting)}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 transform hover:scale-110"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </motion.a>
  );
};

export default WhatsAppButton;