import React from 'react';
import { motion } from 'framer-motion';
import ServiceDetail from '../components/services/ServiceDetail';
import ServiceList from '../components/services/ServiceList';
import { FaMap, FaRuler, FaHardHat, FaPaperPlane, FaDraftingCompass } from 'react-icons/fa';

const ServicesPage = () => {
  const services = [
    {
      id: 'cadastral',
      title: 'Cadastral and Site Plans',
      icon: 'FaMap',
      description: 'Accurate cadastral surveys and site plans for property boundaries and land registration.',
      applications: [
        'Land registration and title preparation',
        'Property boundary determination',
        'Site planning and development',
        'Easement and right-of-way mapping',
        'Subdivision planning'
      ],
      benefits: [
        'Legal recognition of property boundaries',
        'Clear documentation for transactions',
        'Support for development applications',
        'Prevention of boundary disputes'
      ],
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&auto=format&fit=crop',
      imageAlt: 'Surveyor with theodolite equipment'
    },
    {
      id: 'topographic',
      title: 'Topographic and Boundary Surveys',
      icon: 'FaRuler',
      description: 'Detailed topographic mapping and precise boundary determination for development projects.',
      applications: [
        'Construction planning',
        'Infrastructure design',
        'Flood risk assessment',
        'Volume calculations',
        'Site grading design'
      ],
      benefits: [
        'Accurate terrain representation',
        'Optimized design decisions',
        'Cost-effective planning',
        'Regulatory compliance'
      ],
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e6c880?w=800&auto=format&fit=crop',
      imageAlt: 'Surveying equipment on map'
    },
    {
      id: 'construction',
      title: 'Construction and Mine Surveys',
      icon: 'FaHardHat',
      description: 'Comprehensive survey support for construction projects and mining operations.',
      applications: [
        'Construction layout',
        'Progress monitoring',
        'Volume calculations',
        'Pit and stockpile surveys',
        'As-built documentation'
      ],
      benefits: [
        'Precise construction guidance',
        'Real-time progress tracking',
        'Accurate material calculations',
        'Safety compliance'
      ],
      image: 'https://images.unsplash.com/photo-1541971875076-8f970d573be5?w=800&auto=format&fit=crop',
      imageAlt: 'Construction site with survey equipment'
    },
    {
      id: 'drone',
      title: 'Drone Mapping',
      icon: 'FaPaperPlane',
      description: 'Cutting-edge drone technology for aerial mapping and site inspections.',
      applications: [
        'Aerial orthomosaic mapping',
        '3D terrain modeling',
        'Progress monitoring',
        'Stockpile volume calculations',
        'Inspection and surveillance'
      ],
      benefits: [
        'Fast data collection',
        'High-resolution imagery',
        'Safe access to difficult areas',
        'Cost-effective surveying'
      ],
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop',
      imageAlt: 'Drone flying over landscape'
    },
    {
      id: 'architectural',
      title: 'Architectural Designs',
      icon: 'FaDraftingCompass',
      description: 'Professional architectural design services integrated with survey data.',
      applications: [
        'Residential design',
        'Commercial buildings',
        'Site planning',
        'Renovation projects',
        '3D visualization'
      ],
      benefits: [
        'Integrated design approach',
        'Accurate site integration',
        'Visual project planning',
        'Regulatory compliance'
      ],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop',
      imageAlt: 'Architectural blueprints and plans'
    }
  ];

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16">
        <div className="container-custom text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Comprehensive surveying solutions tailored to your specific needs
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <ServiceList services={services} />

      {/* Service Details */}
      {services.map((service, index) => (
        <ServiceDetail
          key={service.id}
          service={service}
          index={index}
        />
      ))}

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today for a free consultation and quote
          </p>
          <a
            href="/request-survey"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Request Survey Quote
          </a>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;