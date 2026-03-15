import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  FaMap, 
  FaRuler, 
  FaHardHat, 
  FaDraftingCompass,
  FaPaperPlane  // Add this
} from 'react-icons/fa';

const ServicesOverview = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <FaMap className="text-4xl text-primary" />,
      title: 'Cadastral and Site Plans',
      description: 'Accurate cadastral surveys and site plans for property boundaries and land registration.',
      link: '/services#cadastral'
    },
    {
      icon: <FaRuler className="text-4xl text-primary" />,
      title: 'Topographic and Boundary Surveys',
      description: 'Detailed topographic mapping and precise boundary determination for development projects.',
      link: '/services#topographic'
    },
    {
      icon: <FaHardHat className="text-4xl text-primary" />,
      title: 'Construction and Mine Surveys',
      description: 'Comprehensive survey support for construction projects and mining operations.',
      link: '/services#construction'
    },
    {
      icon: <FaPaperPlane className="text-4xl text-primary" />,  // Changed to FaPaperPlane
      title: 'UAV / Drone Surveys',
      description: 'Cutting-edge drone technology for aerial mapping and site inspections.',
      link: '/services#drone'
    },
    {
      icon: <FaDraftingCompass className="text-4xl text-primary" />,
      title: 'Architectural Designs',
      description: 'Professional architectural design services integrated with survey data.',
      link: '/services#architectural'
    }
  ];

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive surveying solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6 hover:transform hover:-translate-y-2"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-accent mb-4">{service.description}</p>
              <Link
                to={service.link}
                className="text-primary font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;