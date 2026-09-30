import React from 'react';
import { Popup } from 'react-leaflet';

const MapPopup = ({ project }) => {
  return (
    <Popup>
      <div className="p-2 max-w-xs">
        <h3 className="font-bold text-lg mb-1">{project.title}</h3>
        <p className="text-sm text-accent mb-2">{project.location}</p>
        <p className="text-sm mb-2">{project.description}</p>
        <p className="text-xs font-semibold">
          Survey Type: {project.surveyType}
        </p>
        <p className="text-xs text-accent mt-1">
          Equipment: {project.equipmentUsed}
        </p>
        {project.images && project.images[0] && (
          <img
            src={project.images[0]}
            alt={project.title}
            className="mt-2 rounded-lg w-full h-32 object-cover"
          />
        )}
        <div className="mt-2 text-xs text-primary">
          Click for more details
        </div>
      </div>
    </Popup>
  );
};

export default MapPopup;