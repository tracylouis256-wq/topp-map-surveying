import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { 
  FaMap, 
  FaRuler, 
  FaHardHat, 
  FaPaperPlane,  // Changed from FaDrone to FaPaperPlane
  FaDraftingCompass 
} from 'react-icons/fa';

const ServiceList = ({ services }) => {
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'FaMap': return <FaMap className="text-3xl" />;
      case 'FaRuler': return <FaRuler className="text-3xl" />;
      case 'FaHardHat': return <FaHardHat className="text-3xl" />;
      case 'FaDrone': return <FaPaperPlane className="text-3xl" />; // Changed to FaPaperPlane but keep case as 'FaDrone' if that's what's passed
      case 'FaDraftingCompass': return <FaDraftingCompass className="text-3xl" />;
      default: return <FaMap className="text-3xl" />;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={service.id}
                smooth={true}
                duration={500}
                offset={-80}
                className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer text-center group"
              >
                <div className="text-primary mb-3 flex justify-center group-hover:scale-110 transition">
                  {getIcon(service.icon)}
                </div>
                <h3 className="font-semibold text-sm">{service.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceList;