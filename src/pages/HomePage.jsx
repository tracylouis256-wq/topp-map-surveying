import React from 'react';
import Hero from '../components/home/Hero';
import CompanyIntro from '../components/home/CompanyIntro';
import ServicesOverview from '../components/home/ServicesOverview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TechnologyShowcase from '../components/home/TechnologyShowcase';
import SurveyProcess from '../components/home/SurveyProcess';
import Statistics from '../components/home/Statistics';
import DroneGallery from '../components/home/DroneGallery';

const HomePage = () => {
  return (
    <>
      <Hero />
      <CompanyIntro />
      <ServicesOverview />
      <Statistics />
      <WhyChooseUs />
      <TechnologyShowcase />
      <SurveyProcess />
      <DroneGallery />
    </>
  );
};

export default HomePage;