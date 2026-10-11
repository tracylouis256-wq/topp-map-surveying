import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

/* Fix for Leaflet marker icons in React */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/* ------------------------------------------------------------------
   Load CMS projects at build time
   ------------------------------------------------------------------ */
const projectModules = import.meta.glob('../../../content/projects/*.json', { eager: true });

const normalizeCoordinates = (coords) => {
  if (!coords) return null;
  if (Array.isArray(coords) && coords.length === 2) return coords;
  if (coords.lat != null && coords.lng != null) return [coords.lat, coords.lng];
  return null;
};

const loadCmsProjects = () => {
  const list = Object.entries(projectModules).map(([path, mod]) => {
    const raw = mod.default || mod;
    const slug = raw.slug || path.split('/').pop().replace('.json', '');
    return {
      id: slug,
      title: raw.title || '',
      location: raw.location || '',
      description: raw.description || '',
      coordinates: normalizeCoordinates(raw.coordinates),
      type: raw.category || 'general',
      year: raw.year || '',
      region: raw.region || '',
      client: raw.client || '',
      equipment: raw.equipment || '',
    };
  });
  // Only projects with valid coordinates can be plotted
  return list.filter((p) => p.coordinates);
};

/* Custom marker icons by project type */
const getMarkerIcon = (type) => {
  const iconSize = [25, 41];
  const iconAnchor = [12, 41];

  let color = 'red';
  if (type === 'mining') color = 'orange';
  if (type === 'road' || type === 'construction') color = 'blue';
  if (type === 'cadastral') color = 'red';
  if (type === 'topographic') color = 'green';
  if (type === 'drone') color = 'purple';
  if (type === 'engineering') color = 'yellow';
  if (type === 'heritage') color = 'pink';

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize,
    iconAnchor,
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

/* Fly-to helper */
const FlyToLocation = ({ coordinates, shouldFly }) => {
  const map = useMap();
  useEffect(() => {
    if (shouldFly && coordinates) {
      map.flyTo(coordinates, 14, { animate: true, duration: 2 });
    }
  }, [shouldFly, coordinates, map]);
  return null;
};

const ProjectMap = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [shouldFly, setShouldFly] = useState(false);

  const mapSectionRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      // 1. Try API first (if configured)
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (apiUrl) {
          const res = await axios.get(`${apiUrl}/api/projects`);
          const apiData = res.data?.data;
          if (Array.isArray(apiData) && apiData.length > 0) {
            if (!cancelled) {
              const normalized = apiData
                .map((p) => ({ ...p, coordinates: normalizeCoordinates(p.coordinates) }))
                .filter((p) => p.coordinates);
              setProjects(normalized);
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // Silent fallback to CMS content
      }

      // 2. Fall back to CMS JSON files
      if (!cancelled) {
        setProjects(loadCmsProjects());
        setLoading(false);
      }
    };

    fetchProjects();
    return () => { cancelled = true; };
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedCoordinates(project.coordinates);
    setShouldFly(true);

    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => setShouldFly(false), 500);
  };

  const ghanaBounds = useMemo(
    () => [
      [4.5, -3.5],
      [11.5, 1.5],
    ],
    []
  );

  if (loading) {
    return (
      <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12" />
      </div>
    );
  }

  /* ---------------- COMING SOON STATE ---------------- */
  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <div className="mx-auto mb-6 w-14 h-1 bg-primary" />
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-secondary">
            Project Map Coming Soon
          </h3>
          <p className="text-accent leading-relaxed mb-4">
            As survey work is completed and clients grant permission to share their project
            locations, verified sites will be plotted here.
          </p>
          <p className="text-sm text-gray-500">
            In the meantime, we welcome enquiries about surveying, geospatial or planning work
            relevant to your project.
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- POPULATED MAP ---------------- */
  return (
    <div className="space-y-8">
      <div ref={mapSectionRef} className="scroll-mt-24">
        <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 relative">
          <MapContainer
            bounds={ghanaBounds}
            style={{ height: '100%', width: '100%' }}
            zoom={6}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {selectedCoordinates && (
              <FlyToLocation coordinates={selectedCoordinates} shouldFly={shouldFly} />
            )}

            {projects.map((project) => (
              <Marker
                key={project.id}
                position={project.coordinates}
                icon={getMarkerIcon(project.type)}
                eventHandlers={{
                  click: () => {
                    setSelectedProject(project);
                    setSelectedCoordinates(project.coordinates);
                  },
                }}
              >
                <Popup>
                  <div className="p-2 max-w-xs">
                    <h3 className="font-bold text-primary text-lg mb-1">{project.title}</h3>
                    <p className="text-sm text-accent mb-2">{project.location}</p>
                    <p className="text-sm mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                      </span>
                      {project.year && (
                        <span className="text-xs bg-gray-100 text-accent px-2 py-1 rounded-full">
                          {project.year}
                        </span>
                      )}
                    </div>
                    {project.client && (
                      <p className="text-xs mt-2 text-accent">
                        <strong>Client:</strong> {project.client}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg text-xs z-[1000]">
            <p className="font-semibold mb-2">Project Types:</p>
            <div className="space-y-1">
              <LegendRow color="bg-red-500" label="Cadastral / Boundary" />
              <LegendRow color="bg-blue-500" label="Road / Construction" />
              <LegendRow color="bg-green-500" label="Topographic" />
              <LegendRow color="bg-orange-500" label="Mining" />
              <LegendRow color="bg-purple-500" label="Drone / Aerial" />
              <LegendRow color="bg-yellow-500" label="Engineering" />
            </div>
          </div>

          {/* Count */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg text-xs z-[1000]">
            <span className="font-semibold">{projects.length}</span>{' '}
            {projects.length === 1 ? 'Project' : 'Projects'} plotted
          </div>
        </div>
      </div>

      {/* List */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            Plotted Projects ({projects.length})
          </h3>
          <p className="text-sm text-primary">Click any project to view on map</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto p-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-white p-4 rounded-lg shadow border cursor-pointer transition-all hover:shadow-md transform hover:-translate-y-1 ${
                selectedProject?.id === project.id
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                  : 'border-gray-100 hover:border-primary/50'
              }`}
              onClick={() => handleProjectClick(project)}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-primary">{project.title}</h4>
                {project.region && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {project.region}
                  </span>
                )}
              </div>
              <p className="text-sm text-accent mt-1">{project.location}</p>
              <p className="text-xs mt-2 text-gray-600 line-clamp-2">{project.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs bg-gray-100 text-accent px-2 py-1 rounded">
                  {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                </span>
                {project.year && <span className="text-xs text-accent">{project.year}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LegendRow = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <span className={`w-3 h-3 rounded-full ${color}`} />
    <span>{label}</span>
  </div>
);

export default ProjectMap;