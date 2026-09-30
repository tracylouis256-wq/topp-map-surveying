import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTimes, FaExpand } from 'react-icons/fa';

const DroneGallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop',
      title: 'Aerial Survey Mission',
      description: 'Professional drone conducting aerial survey over development site'
    },
    {
      url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop',
      title: 'Agricultural Mapping',
      description: 'Drone capturing high-resolution imagery for agricultural assessment'
    },
    {
      url: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop',
      title: 'Construction Progress',
      description: 'Aerial monitoring of construction site development'
    },
    {
      url: 'https://images.unsplash.com/photo-1536240474400-95dad9822e3d?w=800&auto=format&fit=crop',
      title: 'Topographic Survey',
      description: 'Drone capturing terrain data for topographic mapping'
    },
    {
      url: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&auto=format&fit=crop',
      title: 'Survey Site Preparation',
      description: 'Setting up drone survey equipment at project site'
    },
    {
      url: 'https://images.unsplash.com/photo-1541971875076-8f970d573be5?w=800&auto=format&fit=crop',
      title: 'Mining Operation Survey',
      description: 'Aerial survey of mining site for volume calculations'
    }
  ];

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Drone Mapping Gallery</h2>
          <p className="section-subtitle">
            Aerial imagery and mapping from our drone surveys
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                  <FaExpand className="text-white text-2xl" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-bold text-lg">{image.title}</h3>
                <p className="text-gray-200 text-sm line-clamp-2">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-14 right-0 text-white/80 hover:text-primary transition-colors group"
                aria-label="Close lightbox"
              >
                <div className="bg-black/50 backdrop-blur-sm p-3 rounded-full group-hover:bg-primary/20">
                  <FaTimes size={28} />
                </div>
              </button>

              {/* Image */}
              <div className="relative h-full flex flex-col">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-t-lg"
                />
                
                {/* Image info */}
                <div className="bg-gradient-to-t from-black via-black/95 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-300 text-lg">{selectedImage.description}</p>
                  
                  {/* Image metadata */}
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      High-resolution aerial capture
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Professional drone survey
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation arrows (optional) */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = images.findIndex(img => img.url === selectedImage.url);
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
                    setSelectedImage(images[prevIndex]);
                  }}
                  className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-primary/50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = images.findIndex(img => img.url === selectedImage.url);
                    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
                    setSelectedImage(images[nextIndex]);
                  }}
                  className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-primary/50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Stats */}
      <div className="container-custom mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-accent">Drone Flights</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-primary">10,000+</div>
            <div className="text-sm text-accent">Aerial Images</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-primary">50+</div>
            <div className="text-sm text-accent">Projects Mapped</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-primary">5cm</div>
            <div className="text-sm text-accent">Accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DroneGallery;