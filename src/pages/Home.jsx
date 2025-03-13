import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Footer } from '../components/Footer';
import './Home.css';
import { AboutUs } from '../components/AboutUs';
import Regulation from './Regulation';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


export const Home = () => {

  const [matches, setMatches] = useState(window.matchMedia("(min-width: 1168px)").matches);
  const [isLoading, setIsLoading] = useState(true); // State for intro animation

  // window.onresize = function () {
  //   document.location.reload(true);
  // };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1168px)");
    const handleMediaQueryChange = (e) => setMatches(e.matches);

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Intro animation lasts 2s
  }, []);

  // Ref for AboutUs section animation
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { triggerOnce: true, threshold: 0.2 });

  return (
    <div className='home relative'>
      {/* Full Page Intro Animation (Centered on All Screens) */}
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center text-white z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          exit={{ opacity: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-center">Welcome to HUN-SRT 🏁</h1>
        </motion.div>
      )}

      {/* Background Fade-in */}
      <motion.div
        className="absolute top-0 left-0 w-full h-screen bg-black z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Video Section Animation (Centered for Mobile & Desktop) */}
      <motion.div
        className="w-full flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
         {matches ? (
         <div className="w-full h-full overflow-hidden flex justify-center">
         <video autoPlay loop muted playsInline preload="auto" poster="thumbnail.jpg" className="w-full h-auto max-h-screen object-cover">
  <source src="Project3.webm" type="video/webm" />
  <source src="Project3.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

       </div>
         ):( <div className="w-full pt-2 overflow-hidden flex justify-center">
          <video autoPlay loop muted className="w-full h-auto max-h-screen object-cover">
            <source src='Project3.mp4' type="video/mp4" />
          </video>
        </div>)}
      
      </motion.div>

      {/* About Us with Scroll Animation */}
      <motion.div
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="w-full px-4 md:px-8"
      >
        <AboutUs />
        
      </motion.div>
    
   
      <Footer />
      <p className="h-[130px]"></p>
    </div>
  );
};
