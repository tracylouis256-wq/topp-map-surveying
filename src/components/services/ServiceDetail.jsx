import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ServiceDetail = ({ service, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isEven = index % 2 === 0;

  return (
    <section 
      id={service.id}
      ref={ref}
      className={`py-20 ${isEven ? 'bg-white' : 'bg-gray-50'}`}
    >
      <div className="container-custom">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          isEven ? '' : 'lg:flex-row-reverse'
        }`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <img
              src={service.image}
              alt={service.title}
              className="rounded-lg shadow-xl w-full h-96 object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <h2 className="text-3xl font-bold mb-6">{service.title}</h2>
            <p className="text-lg text-accent mb-8">{service.description}</p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Applications</h3>
              <ul className="space-y-2">
                {service.applications.map((app, i) => (
                  <li key={i} className="flex items-center text-accent">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Benefits</h3>
              <ul className="space-y-2">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-accent">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;