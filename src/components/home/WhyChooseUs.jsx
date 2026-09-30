import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCheckCircle, FaClock, FaMoneyBillWave, FaCogs, FaUsers } from 'react-icons/fa';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const advantages = [
    {
      icon: <FaUsers className="text-3xl" />,
      title: 'Experienced Professionals',
      description: 'Team of certified surveyors with years of industry experience'
    },
    {
      icon: <FaCogs className="text-3xl" />,
      title: 'Modern Equipment',
      description: 'State-of-the-art GNSS, total stations, and drone technology'
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: 'Fast Delivery',
      description: 'Efficient project completion without compromising quality'
    },
    {
      icon: <FaCheckCircle className="text-3xl" />,
      title: 'Reliable Expertise',
      description: 'Proven track record of accurate and dependable surveys'
    },
    {
      icon: <FaMoneyBillWave className="text-3xl" />,
      title: 'Affordable Services',
      description: 'Competitive pricing with transparent cost structure'
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why Choose Us</h2>
            <p className="text-lg text-accent mb-8">
              We combine technical expertise with modern technology to deliver exceptional results
            </p>

            <div className="space-y-6">
              {advantages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="text-primary flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-accent">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image with Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Image Container */}
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/equipment/surveyor-team.jpg"
                alt="Survey team at work"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            
            

            {/* Optional: Floating badge for mobile */}
            <div className="absolute top-4 right-4 lg:hidden">
              <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                Trusted Since 2008
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;