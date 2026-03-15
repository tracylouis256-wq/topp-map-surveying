import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-accent mb-8">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="btn-primary inline-block"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;