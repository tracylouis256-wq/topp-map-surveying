import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectMap from '../components/map/ProjectMap';

/* Same loader logic as ProjectMap — tells us if there are any plotted
   projects so the hero text can adapt honestly. */
const projectModules = import.meta.glob('../../content/projects/*.json', { eager: true });

const hasPlottedProjects = () => {
  const list = Object.values(projectModules).map((mod) => mod.default || mod);
  return list.some((p) => {
    const c = p?.coordinates;
    if (!c) return false;
    if (Array.isArray(c) && c.length === 2) return true;
    if (c.lat != null && c.lng != null) return true;
    return false;
  });
};

const ProjectMapPage = () => {
  const showMap = useMemo(hasPlottedProjects, []);

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Interactive Project Map
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {showMap
              ? 'Explore our survey project locations across Ghana.'
              : 'Verified project locations will be published here as engagements are completed.'}
          </motion.p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ProjectMap />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectMapPage;