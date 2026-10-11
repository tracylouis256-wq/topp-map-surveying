import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TechnologyShowcase = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const technologies = [
    {
      name: 'GNSS RTK Receivers',
      image: '/images/equipment/gnss.jpg',
      description: 'Centimetre-level positioning for control, boundary and detail surveys.'
    },
    {
      name: 'Total Stations',
      image: '/images/equipment/total-station.jpg',
      description: 'Precise angle and distance measurement for engineering and construction work.'
    },
    {
      name: 'Drone Photogrammetry',
      image: '/images/equipment/drone.jpg',
      description: 'Aerial mapping and site documentation on qualifying projects.'
    },
    {
      name: 'GIS & Spatial Analysis',
      image: '/images/equipment/gis.jpg',
      description: 'Spatial analysis, map production and geospatial data management.'
    },
    {
      name: 'CAD Drafting & Plan Preparation',
      image: '/images/equipment/cad-drafting.jpg',
      description: 'Digital survey drawings, site layouts, plans and technical documentation.'
    },
    {
      name: 'GPS Data Collectors',
      image: '/images/equipment/gps-data-collector.jpg',
      description: 'Field-grade handhelds for accurate point capture and boundary work.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="section-title">Technology & Methods</h2>
          <p className="section-subtitle">
            Instruments and workflows applied across our surveying and geospatial projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group flex flex-col h-full"
            >
              <div className="relative h-64 md:h-72 w-full overflow-hidden">
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                <p className="text-accent">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;