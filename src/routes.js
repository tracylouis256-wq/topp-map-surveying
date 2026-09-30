import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectMapPage from './pages/ProjectMapPage';
import ServicesPage from './pages/ServicesPage';
import SurveyRequestPage from './pages/SurveyRequestPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/project-map" element={<ProjectMapPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/request-survey" element={<SurveyRequestPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;