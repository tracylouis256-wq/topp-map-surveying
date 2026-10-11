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
      description: 'Cadastral surveys and site plans supporting property boundaries, demarcation and land registration.',
      applications: [
        'Land registration and title preparation',
        'Property boundary determination',
        'Site planning and development',
        'Easement and right-of-way mapping',
        'Subdivision planning'
      ],
      benefits: [
        'Clear spatial documentation of property boundaries',
        'Supporting documentation for land transactions',
        'Input for development and planning applications',
        'Reduces risk of boundary-related disputes'
      ],
      image: '/images/services/cadastral.jpg',
      imageAlt: 'Surveyor establishing boundary markers'
    },
    {
      id: 'topographic',
      title: 'Topographic and Boundary Surveys',
      icon: 'FaRuler',
      description: 'Topographic mapping and boundary determination for development, engineering and land-use projects.',
      applications: [
        'Construction planning',
        'Infrastructure design',
        'Flood risk assessment',
        'Volume calculations',
        'Site grading design'
      ],
      benefits: [
        'Reliable terrain representation',
        'Better-informed design decisions',
        'Cost-effective planning',
        'Support for regulatory submissions'
      ],
      image: '/images/services/topographic.jpg',
      imageAlt: 'Topographic survey in the field'
    },
    {
      id: 'construction',
      title: 'Construction and Mine Surveys',
      icon: 'FaHardHat',
      description: 'Survey support for construction, mining and infrastructure works — including setting out, level control and progress documentation.',
      applications: [
        'Construction setting out',
        'Progress monitoring',
        'Volume calculations',
        'Pit and stockpile surveys',
        'As-built documentation'
      ],
      benefits: [
        'Accurate on-site positioning',
        'Reliable progress tracking',
        'Verifiable material volumes',
        'Support for safety and quality compliance'
      ],
      image: '/images/services/construction.jpg',
      imageAlt: 'Surveyor on a construction site'
    },
    {
      id: 'drone',
      title: 'UAV / Drone Mapping',
      icon: 'FaPaperPlane',
      description: 'Aerial mapping and site documentation on qualifying projects, where equipment and qualified personnel are available.',
      applications: [
        'Aerial orthomosaic mapping',
        '3D terrain modelling',
        'Progress monitoring',
        'Stockpile volume calculations',
        'Site inspection and documentation'
      ],
      benefits: [
        'Rapid coverage of large sites',
        'High-resolution aerial imagery',
        'Access to areas difficult to reach on foot',
        'Cost-effective for wide-area capture'
      ],
      image: '/images/services/drone.jpg',
      imageAlt: 'Drone used for aerial mapping'
    },
    {
      id: 'architectural',
      title: 'Architectural Drawing & Planning Support',
      icon: 'FaDraftingCompass',
      description: 'Floor plans, site layouts, elevations and CAD drafting prepared in coordination with survey data.',
      applications: [
        'Residential floor plans',
        'Commercial building drawings',
        'Site layout planning',
        'Renovation and extension drawings',
        'Conceptual design support'
      ],
      benefits: [
        'Drawings coordinated with survey data',
        'Accurate site integration',
        'Clear documentation for planning',
        'Support for approval submissions'
      ],
      image: '/images/services/architectural.jpg',
      imageAlt: 'Architectural drawings and plans'
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
            Surveying, geospatial and planning support for land and development projects.
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
            Send us your project details and we'll respond with a scope and quotation.
          </p>
          <a
            href="/request-survey"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Request a Survey Quote
          </a>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;