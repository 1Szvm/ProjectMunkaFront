import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Footer } from '../components/Footer';
import './Home.css';
import { AboutUs } from '../components/AboutUs';
import Regulation from './Regulation';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 1168px)").matches);
  const [isLoading, setIsLoading] = useState(true); // State for intro animation

  window.onresize = function () {
    document.location.reload(true);
  };

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
        <div className="w-full h-full overflow-hidden flex justify-center">
          <video autoPlay loop muted className="w-full h-auto max-h-screen object-cover">
            <source src={matches ? 'Project3.mp4' : 'IAMBACK.mp4'} type="video/mp4" />
          </video>
        </div>
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
      <motion.section
        className="max-w-6xl mx-auto mb-16 p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-slate-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-bold text-red-600 dark:text-green-400 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          📩 Szabályzat
        </motion.h2>
        <motion.p
          className="text-lg text-gray-900 dark:text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <strong>📧 Általános szabályzat:  </strong> 
        Ugyanazt a nevet használd Discordon is mint játékban, hogy be tudjunk azonosítani (Írd át a beceneved a szerveren)
        Hirdetni nem hirdetünk csak az arra kijelölt helyen
        A futamokat kötelező rögzíteni amennyiben megoldható, balesetek elemzése érdekében (F1-ben futam után "Save Full Race Replay")

          <br />
          <Button className='font-600' onClick={()=>navigate('/regulation')}> <img src="protected.png" alt="" /> !!Folytatás...!!</Button> 
        </motion.p>
      </motion.section>
   
      <Footer />
      <p className="h-[130px]"></p>
    </div>
  );
};
