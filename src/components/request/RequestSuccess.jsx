import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const RequestSuccess = ({ requestData }) => {
  // Log the received data for debugging
  console.log('RequestSuccess received:', requestData);
  
  // Default values in case requestData is missing
  const data = requestData || {
    fullName: 'Not provided',
    surveyType: 'Not provided',
    projectLocation: 'Not provided',
    phone: 'Not provided',
    email: 'Not provided',
    method: 'whatsapp'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg p-8 text-center"
    >
      <div className="flex justify-center mb-4">
        <FaCheckCircle className="text-6xl text-green-500" />
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Request Submitted Successfully!</h2>
      
      <p className="text-accent mb-6">
        Thank you for choosing TOPP MAP Surveying Consult. We have received your survey request 
        and will contact you within 24 hours.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
        <h3 className="font-semibold mb-2">Request Summary:</h3>
        <p><strong>Name:</strong> {data.fullName}</p>
        <p><strong>Project:</strong> {data.surveyType}</p>
        <p><strong>Location:</strong> {data.projectLocation}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>Email:</strong> {data.email}</p>
        {data.description && (
          <p className="mt-2"><strong>Description:</strong> {data.description.substring(0, 50)}...</p>
        )}
        <p className="mt-2 text-xs text-accent">
          <strong>Submitted via:</strong> {data.method === 'whatsapp' ? 'WhatsApp' : 'Email'}
        </p>
      </div>

      <p className="text-sm text-accent mb-6">
        Need immediate assistance? Chat with us on WhatsApp
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://wa.me/233539896049"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
        >
          <FaWhatsapp />
          WhatsApp Us
        </a>
        
        <Link
          to="/"
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Return to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default RequestSuccess;