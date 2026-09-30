import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt, FaCalendar, FaTools, FaImages, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);

  // If no project, don't render
  if (!project) return null;

  // Safe access to project properties with defaults
  const projectType = project.type || 'cadastral';
  const projectTitle = project.title || 'Project';
  const projectRegion = project.region || 'Ghana';
  const projectLocation = project.location || 'Location not specified';
  const projectDate = project.completionDate || 'Date not specified';
  const projectClient = project.client || 'Client not specified';
  const projectDescription = project.description || 'No description available';
  const projectEquipment = project.equipment || 'Equipment not specified';
  const projectCoordinates = project.coordinates || [5.5, -0.1];
  const projectId = project.id || '1';

  // Get the main project image
  const getMainImage = () => {
    return project.image || '/images/projects/placeholder.jpg';
  };

  // Handle image errors - try different formats
  const handleImageError = (e, imageIndex) => {
    const currentSrc = e.target.src;
    
    if (currentSrc.endsWith('.jpg')) {
      // Try .png instead
      const pngSrc = currentSrc.replace('.jpg', '.png');
      e.target.src = pngSrc;
      
      // Update the loaded images array with the working format
      const updatedImages = [...galleryImages];
      updatedImages[imageIndex] = { path: pngSrc, format: 'png' };
      setLoadedImages(updatedImages);
    } else {
      // If both fail, show placeholder
      e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
    }
  };

  // Generate gallery images
  const getGalleryImages = () => {
    return [
      { path: `/images/projects/galleries/${projectId}/1.jpg`, format: 'jpg' },
      { path: `/images/projects/galleries/${projectId}/2.jpg`, format: 'jpg' },
      { path: `/images/projects/galleries/${projectId}/3.jpg`, format: 'jpg' },
      { path: `/images/projects/galleries/${projectId}/4.jpg`, format: 'jpg' }
    ];
  };

  const galleryImages = loadedImages.length > 0 ? loadedImages : getGalleryImages();

  // Lightbox navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Open lightbox with selected image
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Main Modal */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Main Project Image */}
            <div className="relative h-96 bg-gray-100">
              <img
                src={getMainImage()}
                alt={projectTitle}
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, -1)}
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition z-10"
              >
                <FaTimes size={24} />
              </button>
              
              {/* Project Type Badge */}
              <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-lg font-semibold">
                {projectType.charAt(0).toUpperCase() + projectType.slice(1)} Survey
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2">{projectTitle}</h2>
              <p className="text-accent mb-4">{projectRegion} Region</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-accent">
                  <FaMapMarkerAlt className="mr-2 text-primary flex-shrink-0" />
                  <span className="text-sm">{projectLocation}</span>
                </div>
                <div className="flex items-center text-accent">
                  <FaCalendar className="mr-2 text-primary flex-shrink-0" />
                  <span className="text-sm">Completed: {projectDate}</span>
                </div>
                {projectClient && (
                  <div className="flex items-center text-accent md:col-span-2">
                    <span className="font-semibold mr-2">Client:</span>
                    <span className="text-sm">{projectClient}</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Project Description
                </h3>
                <p className="text-accent leading-relaxed">{projectDescription}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Equipment Used
                </h3>
                <div className="flex items-center text-accent bg-primary/5 p-3 rounded-lg">
                  <FaTools className="mr-2 text-primary" />
                  <span>{projectEquipment}</span>
                </div>
              </div>

              {/* Project Gallery */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  <FaImages className="text-primary" />
                  Project Gallery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleryImages.map((image, index) => (
                    <div key={index} className="relative group cursor-pointer" onClick={() => openLightbox(index)}>
                      <img
                        src={image.path}
                        alt={`${projectTitle} - Image ${index + 1}`}
                        className="rounded-lg h-24 w-full object-cover hover:opacity-90 transition"
                        onError={(e) => handleImageError(e, index)}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-semibold bg-primary px-3 py-1 rounded-full">
                          Click to View
                        </span>
                      </div>
                      {/* Image number badge */}
                      <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full">
                        {index + 1}/{galleryImages.length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Project Info */}
              {projectCoordinates && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-accent">
                    <strong>Coordinates:</strong> {projectCoordinates[0].toFixed(4)}°, {projectCoordinates[1].toFixed(4)}°
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-primary transition z-10 bg-black/50 p-3 rounded-full"
            >
              <FaTimes size={24} />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition bg-black/50 p-3 rounded-full"
            >
              <FaChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition bg-black/50 p-3 rounded-full"
            >
              <FaChevronRight size={24} />
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded-lg">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>

            {/* Main lightbox image */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-6xl max-h-[90vh] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[currentImageIndex].path}
                alt={`${projectTitle} - Full size ${currentImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain mx-auto"
                onError={(e) => {
                  if (e.target.src.endsWith('.jpg')) {
                    e.target.src = e.target.src.replace('.jpg', '.png');
                  }
                }}
              />
            </motion.div>

            {/* Image caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-6 py-3 rounded-lg text-center">
              <p className="font-semibold">{projectTitle}</p>
              <p className="text-sm text-gray-300">{projectLocation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectModal;