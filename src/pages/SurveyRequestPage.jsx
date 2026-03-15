import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SurveyRequestForm from '../components/request/SurveyRequestForm';
import RequestSuccess from '../components/request/RequestSuccess';
import { FaClock, FaCheckCircle, FaPhone, FaEnvelope } from 'react-icons/fa';

const SurveyRequestPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [requestData, setRequestData] = useState(null);

  const handleSubmitSuccess = (data) => {
    console.log('✅ SurveyRequestPage received data:', data); // Debug log
    setRequestData(data);
    setSubmitted(true);
  };

  // Log when requestData changes
  React.useEffect(() => {
    console.log('📦 requestData state updated:', requestData);
  }, [requestData]);

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Request a Survey Quote
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Get accurate and professional surveying services for your project
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form or Success Message */}
            <div className="lg:col-span-2">
              {!submitted ? (
                <SurveyRequestForm onSubmitSuccess={handleSubmitSuccess} />
              ) : (
                <RequestSuccess requestData={requestData} />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg shadow-lg p-8 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-6">Why Choose Us</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Professional Expertise</h4>
                      <p className="text-sm text-accent">Certified surveyors with years of experience</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Modern Equipment</h4>
                      <p className="text-sm text-accent">Latest GNSS, drone, and scanning technology</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <FaClock className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Fast Turnaround</h4>
                      <p className="text-sm text-accent">Quick response and project completion</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold mb-4">Need immediate assistance?</h4>
                  
                  <div className="space-y-3">
                    <a
                      href="tel:+233539896049"
                      className="flex items-center space-x-3 text-accent hover:text-primary transition"
                    >
                      <FaPhone />
                      <span>+233 53 989 6049</span>
                    </a>
                    
                    <a
                      href="mailto:info@toppmapsurveying.com"
                      className="flex items-center space-x-3 text-accent hover:text-primary transition"
                    >
                      <FaEnvelope />
                      <span>info@toppmapsurveying.com</span>
                    </a>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-accent">
                    <span className="font-semibold">Response Time:</span> We typically respond within 2-4 hours during business hours.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SurveyRequestPage;