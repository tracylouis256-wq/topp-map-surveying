import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilter from '../components/projects/ProjectFilter';
import ProjectModal from '../components/projects/ProjectModal';

/* ------------------------------------------------------------------
   Load all projects written by the CMS (Decap) at build time.
   Each file in content/projects/ becomes one project object.
   ------------------------------------------------------------------ */
const projectModules = import.meta.glob('../../content/projects/*.json', { eager: true });

const normalizeCoordinates = (coords) => {
  if (!coords) return null;
  if (Array.isArray(coords) && coords.length === 2) return coords;
  if (coords.lat != null && coords.lng != null) return [coords.lat, coords.lng];
  return null;
};

const loadProjects = () => {
  const list = Object.entries(projectModules).map(([path, mod]) => {
    const raw = mod.default || mod;
    const slug = raw.slug || path.split('/').pop().replace('.json', '');
    return {
      id: slug,
      slug,
      title: raw.title || '',
      location: raw.location || '',
      description: raw.description || '',
      image: raw.coverImage || raw.image || '',
      gallery: Array.isArray(raw.gallery) ? raw.gallery : [],
      category: raw.category || 'general',
      year: raw.year || '',
      completionDate: raw.year || '',
      client: raw.client || '',
      equipment: raw.equipment || '',
      region: raw.region || '',
      featured: !!raw.featured,
      coordinates: normalizeCoordinates(raw.coordinates)
    };
  });
  // Newest first
  return list.sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));
};

const ProjectsPage = () => {
  const projects = useMemo(loadProjects, []);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['all', ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filteredProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  const hasProjects = projects.length > 0;

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
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {hasProjects
              ? `A growing portfolio of ${projects.length} surveying, geospatial and construction ${projects.length === 1 ? 'project' : 'projects'}.`
              : 'Documenting our first project engagements.'}
          </motion.p>
        </div>
      </section>

      {!hasProjects && (
        <section className="py-24">
          <div className="container-custom max-w-2xl text-center">
            <div className="mx-auto mb-8 flex items-center justify-center">
              <span className="inline-block w-14 h-1 bg-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
              Projects Coming Soon
            </h2>
            <p className="text-lg text-accent mb-10 leading-relaxed">
              MapRivo Survey Consult is a newly established practice. As engagements complete and
              clients grant permission to share their work, genuine project documentation will be
              published here.
            </p>
            <p className="text-base text-gray-500 mb-10">
              In the meantime, we welcome enquiries about surveying, geospatial or planning work
              relevant to your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/request-survey"
                className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
              >
                Request a Survey
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 border-2 border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white transition"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>
      )}

      {hasProjects && (
        <>
          <section className="py-8 bg-gray-50">
            <div className="container-custom">
              <ProjectFilter
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                categories={categories}
              />
            </div>
          </section>

          <section className="py-16">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-accent">No projects found in this category.</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsPage;