import React from 'react';

const ProjectFilter = ({ selectedFilter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'cadastral', label: 'Cadastral' },
    { value: 'boundary', label: 'Boundary' },
    { value: 'topographic', label: 'Topographic' },
    { value: 'construction', label: 'Construction' },
    { value: 'drone', label: 'Drone' },
    { value: 'mining', label: 'Mining' }
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-6 py-2 rounded-full font-medium transition ${
            selectedFilter === filter.value
              ? 'bg-primary text-white'
              : 'bg-white text-secondary hover:bg-gray-100'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;