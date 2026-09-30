import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapMarker = ({ project }) => {
  // Handle both coordinate formats
  const position = project.coordinates 
    ? project.coordinates 
    : [project.latitude, project.longitude];

  // If no valid position, don't render marker
  if (!position || position.length !== 2) {
    return null;
  }

  return (
    <Marker 
      position={position} 
      icon={customIcon}
    >
      <Popup>
        <div className="p-2 max-w-xs">
          <h3 className="font-bold text-lg mb-1">{project.title || project.name}</h3>
          <p className="text-sm text-accent mb-2">{project.location}</p>
          <p className="text-sm mb-2">{project.description}</p>
          <p className="text-xs font-semibold">
            Survey Type: {project.type || project.surveyType}
          </p>
          {project.images && project.images[0] && (
            <img
              src={project.images[0]}
              alt={project.title}
              className="mt-2 rounded-lg w-full h-32 object-cover"
            />
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;