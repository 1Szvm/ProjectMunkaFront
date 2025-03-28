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

  const containerRef = useRef(null); // Attach observer to this container
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after loading
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
          <h1 className="text-4xl md:text-5xl font-bold text-center">Üdvözlünk a HUN-SRT-nél 🏁</h1>
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
          <div className="w-full flex justify-center">
          <div
            ref={containerRef} // Observer works on this wrapper
            className="mt-3 m-3 border-4 w-[99%] min-h-[500px] h-[69vh] overflow-hidden flex justify-center"
            style={{ borderColor: "rgba(50, 228, 330, 0.8)", borderWidth:"0.1rem", borderRadius:"4px" }}
          >
            {isVisible ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="HOMEBG2.jpg"
                className="w-full h-auto max-h-screen object-cover"
              >
                <source src="RaceManagerProjectVideo.mp4" type="video/mp4" />
                Your browser does not support the video.
              </video>
            ) : (
              <img
                src="HOMEBG2.jpg"
                alt="Video Thumbnail"
                className="w-full h-auto max-h-screen object-cover"
              />
            )}
          </div>
        </div>
         ):(   <div ref={containerRef} className="w-full pt-2 overflow-hidden flex justify-center">
          {isVisible ? (
            <video autoPlay loop muted className="w-full h-auto max-h-screen object-cover">
              <source src="RaceManagerProjectVideo.mp4" type="video/mp4" />
            </video>
          ) : (
            <img src="HOMEBG2.jpg" alt="Video Thumbnail" className="w-full h-auto max-h-screen object-cover" />
          )}
        </div>)}
      
      </motion.div>

      {/* About Us with Scroll Animation */}
      <motion.div
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 2 }}
        className="w-full px-4 md:px-8"
      >
        <AboutUs />
        
      </motion.div>

      <Footer />
      {/* <p className="h-[10px]"></p> */}
    </div>
  );
};
