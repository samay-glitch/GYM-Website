import React, { useState, useEffect } from 'react';
import CustomCursor from './components/common/CustomCursor';
import PageLoader from './components/common/PageLoader';
import ScrollProgress from './components/common/ScrollProgress';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import AboutUs from './components/sections/AboutUs';
import Services from './components/sections/Services';
import Trainers from './components/sections/Trainers';
import Membership from './components/sections/Membership';
import Programs from './components/sections/Programs';
import Gallery from './components/sections/Gallery';
import Transformation from './components/sections/Transformation';
import BmiCalculator from './components/sections/BmiCalculator';
import Contact from './components/sections/Contact';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('loading');
    
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.classList.remove('loading');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <FloatingWhatsApp />
      
      <AnimatePresence>
        {loading && <PageLoader />}
      </AnimatePresence>
      
      <Navbar />
      
      <main>
        <Hero />
        <AboutUs />
        <Services />
        <Trainers />
        <Membership />
        <Programs />
        <Gallery />
        <Transformation />
        <BmiCalculator />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
