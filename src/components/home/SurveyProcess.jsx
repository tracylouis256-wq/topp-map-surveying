import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaComments, 
  FaSearch, 
  FaRuler, 
  FaLaptop, 
  FaFileAlt 
} from 'react-icons/fa';

const SurveyProcess = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: <FaComments className="text-3xl" />,
      title: 'Client Consultation',
      description: 'Understanding your requirements and project objectives'
    },
    {
      icon: <FaSearch className="text-3xl" />,
      title: 'Site Reconnaissance',
      description: 'Preliminary site visit and assessment'
    },
    {
      icon: <FaRuler className="text-3xl" />,
      title: 'Field Data Collection',
      description: 'Accurate measurements using modern equipment'
    },
    {
      icon: <FaLaptop className="text-3xl" />,
      title: 'Data Processing',
      description: 'Analysis and processing of collected data'
    },
    {
      icon: <FaFileAlt className="text-3xl" />,
      title: 'Survey Plan Delivery',
      description: 'Final deliverables and project documentation'
    }
  ];

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">How Our Survey Process Works</h2>
          <p className="section-subtitle">
            A systematic approach to delivering accurate survey results
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-primary transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10 text-center"
              >
                <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step.icon}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <span className="text-primary font-bold text-sm mb-2 block">
                    Step {index + 1}
                  </span>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-accent text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurveyProcess;