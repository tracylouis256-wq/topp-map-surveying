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
      title: 'Led by Experience',
      description: 'Directed by a land surveyor with a background in cadastral and field surveying.'
    },
    {
      icon: <FaCogs className="text-3xl" />,
      title: 'Professional Instrumentation',
      description: 'GNSS and total station methods, with digital processing workflows.'
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: 'Organised Delivery',
      description: 'Clear communication and structured project management from brief to handover.'
    },
    {
      icon: <FaCheckCircle className="text-3xl" />,
      title: 'Accuracy First',
      description: 'Careful attention to spatial measurement and data integrity on every project.'
    },
    {
      icon: <FaMoneyBillWave className="text-3xl" />,
      title: 'Transparent Quotations',
      description: 'Scopes and costs agreed in advance — no surprises on the final invoice.'
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
              A professional practice built on substance — careful measurements, clear communication and organised delivery.
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

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/equipment/surveyor-team.jpg"
                alt="Surveyor at work in the field"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
            </div>

            {/* Floating badge — honest replacement for "Trusted Since 2008" */}
            <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
              <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                Mapping Today, Shaping Tomorrow
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;