import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">TOPP MAP</h3>
            <p className="text-gray-400 mb-4">
              Professional land surveying and geomatics consulting firm providing accurate 
              and reliable surveying services across Ghana.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/233539896049"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-primary transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/project-map" className="text-gray-400 hover:text-primary transition">
                  Project Map
                </Link>
              </li>
              <li>
                <Link to="/request-survey" className="text-gray-400 hover:text-primary transition">
                  Request Survey
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Cadastral Surveys</li>
              <li className="text-gray-400">Boundary Surveys</li>
              <li className="text-gray-400">Topographic Mapping</li>
              <li className="text-gray-400">Drone Surveys</li>
              <li className="text-gray-400">Construction Surveys</li>
              <li className="text-gray-400">Mining Surveys</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <span className="text-gray-400">Tamso Market, Ghana</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <span className="text-gray-400">+233 53 989 6049</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <span className="text-gray-400">info@toppmapsurveying.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} TOPP MAP Surveying Consult. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;