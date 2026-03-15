import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const SurveyRequestForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    description: '',
    requirements: '',
    name: '',
    phone: '',
    email: ''
  });

  const [contactMethod, setContactMethod] = useState('whatsapp');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('📝 WhatsApp Form Data:', formData); // Debug log
    
    // Format the message for WhatsApp (using %0a for line breaks)
    const message = `*NEW SURVEY REQUEST*%0a%0a
*Name:* ${formData.name}%0a
*Phone:* ${formData.phone}%0a
*Email:* ${formData.email}%0a%0a
*Project:* ${formData.projectName}%0a
*Location:* ${formData.location}%0a%0a
*Description:* ${formData.description}%0a%0a
*Requirements:* ${formData.requirements || 'Not specified'}`;
    
    // Admin WhatsApp number
    const adminNumber = '233539896049';
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Create the success data object with proper mapping
    const successData = {
      fullName: formData.name,
      surveyType: formData.projectName,
      projectLocation: formData.location,
      phone: formData.phone,
      email: formData.email,
      description: formData.description,
      requirements: formData.requirements,
      method: 'whatsapp'
    };
    
    console.log('📤 Sending to parent (WhatsApp):', successData); // Debug log
    
    // Call the success callback
    if (onSubmitSuccess) {
      onSubmitSuccess(successData);
    } else {
      console.error('❌ onSubmitSuccess is not defined!');
    }
    
    setIsSubmitting(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('📝 Email Form Data:', formData); // Debug log
    
    // Format the message for email
    const message = `NEW SURVEY REQUEST

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

Project: ${formData.projectName}
Location: ${formData.location}

Description: ${formData.description}

Requirements: ${formData.requirements || 'Not specified'}`;
    
    // Admin email
    const adminEmail = 'info@toppmapsurveying.com';
    
    // Create email subject
    const subject = `Survey Request: ${formData.projectName} - ${formData.name}`;
    
    // Create a temporary link element
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    mailtoLink.target = '_blank';
    mailtoLink.rel = 'noopener noreferrer';
    
    // Trigger the email client
    mailtoLink.click();
    
    // Create the success data object with proper mapping
    const successData = {
      fullName: formData.name,
      surveyType: formData.projectName,
      projectLocation: formData.location,
      phone: formData.phone,
      email: formData.email,
      description: formData.description,
      requirements: formData.requirements,
      method: 'email'
    };
    
    console.log('📤 Sending to parent (Email):', successData); // Debug log
    
    // Call the success callback
    if (onSubmitSuccess) {
      onSubmitSuccess(successData);
    } else {
      console.error('❌ onSubmitSuccess is not defined!');
    }
    
    setIsSubmitting(false);
  };

  const handleSubmit = (e) => {
    if (contactMethod === 'whatsapp') {
      handleWhatsAppSubmit(e);
    } else {
      handleEmailSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-full ${contactMethod === 'whatsapp' ? 'bg-green-100' : 'bg-blue-100'}`}>
          {contactMethod === 'whatsapp' ? (
            <FaWhatsapp className="text-green-600 text-2xl" />
          ) : (
            <FaEnvelope className="text-blue-600 text-2xl" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold">Request a Survey Quote</h2>
          <p className="text-sm text-accent">We'll respond within 2-4 hours</p>
        </div>
      </div>
      
      {/* Contact Method Selector */}
      <div className="mb-6 p-1 bg-gray-100 rounded-lg inline-flex w-full md:w-auto">
        <button
          type="button"
          onClick={() => setContactMethod('whatsapp')}
          className={`flex-1 md:flex-none px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            contactMethod === 'whatsapp'
              ? 'bg-green-600 text-white shadow-lg'
              : 'text-gray-600 hover:text-green-600'
          }`}
        >
          <FaWhatsapp className="text-xl" />
          <span>WhatsApp</span>
        </button>
        <button
          type="button"
          onClick={() => setContactMethod('email')}
          className={`flex-1 md:flex-none px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            contactMethod === 'email'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <FaEnvelope className="text-xl" />
          <span>Email</span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-accent mb-2">
              Your Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-accent mb-2">
              Phone Number <span className="text-primary">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="053 989 6049"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-accent mb-2">
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Project Details */}
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-accent mb-2">
            Project Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g., Residential Plot Survey"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-accent mb-2">
            Project Location <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g., East Legon, Accra"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-accent mb-2">
            Project Description <span className="text-primary">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Please describe your project requirements..."
            required
          />
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-accent mb-2">
            Specific Requirements
          </label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Any specific requirements or deadlines?"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white px-6 py-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2 text-lg ${
              contactMethod === 'whatsapp'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                {contactMethod === 'whatsapp' ? (
                  <>
                    <FaWhatsapp className="text-xl" />
                    Submit via WhatsApp
                  </>
                ) : (
                  <>
                    <FaEnvelope className="text-xl" />
                    Submit via Email
                  </>
                )}
              </>
            )}
          </button>
          <p className="text-xs text-center text-accent mt-3">
            By submitting, you agree to be contacted via {contactMethod === 'whatsapp' ? 'WhatsApp' : 'email'}
          </p>
        </div>
      </form>

      {/* Trust Badge */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-xs text-accent text-center">
          ⚡ We typically respond within 2-4 hours during business hours
        </p>
      </div>
    </motion.div>
  );
};

export default SurveyRequestForm;