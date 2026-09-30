import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import {
  COMPANY_INFO,
  SOCIAL_LINKS,
  SOCIAL_ORDER,
  TEL_BASE,
  MAILTO_BASE,
} from '../../utils/constants';

// Map social keys → icon components
// Only includes icons available in react-icons/fa (Font Awesome 5)
const ICONS = {
  whatsapp:  FaWhatsapp,
  facebook:  FaFacebookF,
  instagram: FaInstagram,
  linkedin:  FaLinkedinIn,
  twitter:   FaTwitter,     // fa5 uses FaTwitter (bird); fa6 has FaXTwitter
  youtube:   FaYoutube,
  // tiktok: FaTiktok,      // not available in fa5 — enable if you upgrade to fa6
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-1">
              {COMPANY_INFO.name.split(' ')[0].toUpperCase()}
              <span className="text-primary">
                {COMPANY_INFO.name.split(' ')[1]?.toUpperCase()}
              </span>
            </h3>
            <p className="text-xs tracking-[0.2em] text-gray-500 mb-4 uppercase">
              Survey Consult
            </p>
            <p className="text-gray-400 mb-6">
              Professional land surveying and geomatics consulting firm providing accurate
              and reliable surveying services across Ghana.
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-3">
              {SOCIAL_ORDER.map((key) => {
                const url = SOCIAL_LINKS[key];
                const Icon = ICONS[key];
                if (!url || !Icon) return null;   // skips platforms without an icon or URL
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="text-gray-400 hover:text-primary transition"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
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
                <span className="text-gray-400">{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <a
                  href={TEL_BASE}
                  className="text-gray-400 hover:text-primary transition"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <a
                  href={MAILTO_BASE}
                  className="text-gray-400 hover:text-primary transition break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2 tracking-widest uppercase">
            {COMPANY_INFO.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;