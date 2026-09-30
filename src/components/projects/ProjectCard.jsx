import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';

const ProjectCard = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
          {project.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">
          {project.title}
        </h3>
        
        <div className="flex items-center text-accent mb-2">
          <FaMapMarkerAlt className="mr-2 text-sm" />
          <span className="text-sm">{project.location}</span>
        </div>
        
        <div className="flex items-center text-accent mb-4">
          <FaCalendar className="mr-2 text-sm" />
          <span className="text-sm">{project.completionDate}</span>
        </div>
        
        <p className="text-accent mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <button className="text-primary font-semibold hover:underline">
          View Details →
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;