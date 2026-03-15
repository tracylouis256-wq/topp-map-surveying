import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaProjectDiagram, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';

const Statistics = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: <FaProjectDiagram className="text-4xl text-primary" />,
      value: 500,
      label: 'Projects Completed',
      suffix: '+',
    },
    {
      icon: <FaClock className="text-4xl text-primary" />,
      value: 15,
      label: 'Years of Experience',
      suffix: '+',
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      value: 300,
      label: 'Satisfied Clients',
      suffix: '+',
    },
    {
      icon: <FaCheckCircle className="text-4xl text-primary" />,
      value: 99.5,
      label: 'Survey Accuracy Rate',
      suffix: '%',
    },
  ];

  const Counter = ({ value, suffix }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (inView) {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }
    }, [inView, value]);

    return (
      <span className="text-4xl font-bold text-secondary">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section className="py-16 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-accent mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;