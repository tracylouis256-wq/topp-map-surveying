import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaProjectDiagram, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';
import statsData from '../../../content/statistics.json';

const Statistics = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const data = {
    cadastral: statsData?.cadastral ?? 0,
    years: statsData?.years ?? 0,
    clients: statsData?.clients ?? 0,
    accuracy: statsData?.accuracy ?? 0,
  };

  const stats = [
    {
      icon: <FaProjectDiagram className="text-4xl text-primary" />,
      value: data.cadastral,
      label: 'Cadastral Surveys Completed',
      suffix: '+',
    },
    {
      icon: <FaClock className="text-4xl text-primary" />,
      value: data.years,
      label: 'Years of Field Experience',
      suffix: '+',
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      value: data.clients,
      label: 'Clients Served',
      suffix: '+',
    },
    {
      icon: <FaCheckCircle className="text-4xl text-primary" />,
      value: data.accuracy,
      label: 'Accuracy Commitment',
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
        <motion.div
          className="text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">Experience Behind the Practice</h2>
          <p className="text-accent">
            The figures below reflect our Managing Director's prior surveying
            experience, brought into MapRivo Survey Consult.
          </p>
        </motion.div>

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