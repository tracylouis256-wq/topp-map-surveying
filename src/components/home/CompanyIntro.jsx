import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CompanyIntro = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-white pt-10 md:pt-16 lg:pt-20 pb-10 md:pb-16 lg:pb-20" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Welcome to <span className="text-primary">TOPP</span> MAP Surveying Consult
            </h2>
            <p className="text-lg text-accent mb-6">
              Your trusted partner in professional land surveying and geomatics services in Ghana.
            </p>
            <p className="text-gray-600 mb-4">
              With years of experience and a team of highly skilled professionals, we provide 
              comprehensive surveying solutions for land development, infrastructure projects, 
              mining operations, and construction developments across the country.
            </p>
            <p className="text-gray-600">
              Our commitment to accuracy, reliability, and customer satisfaction has made us 
              the preferred choice for landowners, real estate developers, construction companies, 
              and government agencies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4 mt-6 lg:mt-0"
          >
            <img
              src="/images/team/surveyor-1.png"
              alt="Surveyor at work"
              className="rounded-lg shadow-lg h-48 sm:h-56 md:h-64 object-cover"
            />
            <img
              src="/images/team/surveyor-2.jpg"
              alt="Drone surveying"
              className="rounded-lg shadow-lg h-48 sm:h-56 md:h-64 object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;