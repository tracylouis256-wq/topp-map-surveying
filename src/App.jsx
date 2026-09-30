import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { RequestProvider } from './context/RequestContext';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectMapPage from './pages/ProjectMapPage';
import ServicesPage from './pages/ServicesPage';
import SurveyRequestPage from './pages/SurveyRequestPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import WhatsAppButton from './components/common/WhatsAppButton';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RequestProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="project-map" element={<ProjectMapPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="request-survey" element={<SurveyRequestPage />} />
            </Route>
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <WhatsAppButton />
        </RequestProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;