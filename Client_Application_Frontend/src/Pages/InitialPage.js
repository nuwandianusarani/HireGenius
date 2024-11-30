import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import JoinTeam from '../components/JoinTeam';
import CoreValues from '../components/CoreValues';
import GlobalEnvironment from '../components/GlobalEnvironment';
import Testimonial from '../components/Testimonial';
import LifeAtIFS from '../components/LifeAtIFS';

import JobTable from '../components/JobTable';

const InitialPage = () => {
  return (
    <div className="App">
    <Navbar />
    <HeroSection />
    <GlobalEnvironment />
    
      <JoinTeam />
      
      <CoreValues />
      <JobTable />
      <Testimonial />
      <LifeAtIFS />
   
    <Footer />

  </div>
  )
}

export default InitialPage