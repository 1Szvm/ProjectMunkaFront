import { useInView, motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import { Footer } from '../components/Footer';

const Bajnoksagok_Reszletek = () => {
  const [matches, setMatches] = useState(window.matchMedia('(min-width: 1168px)').matches);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompetitors, setShowCompetitors] = useState(false);  // State to toggle competitor display

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1168px)');
    const handleResize = (e) => setMatches(e.matches);
    
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { triggerOnce: true, threshold: 0.2 });

  const competitors = [
    {
      name: "Hamar Roland",
      imageUrl: "https://images.unsplash.com/photo-1610905376670-5e7e0e8a3cfb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Nagy Gábor",
      imageUrl: "https://images.unsplash.com/photo-1727466928916-9789f30de10b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
    },
    {
      name: "Kovács Anna",
      imageUrl: "https://images.unsplash.com/photo-1676971021467-1e15983381f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUzfHx8ZW58MHx8fHx8"
    },
  ];

  return (
    <div className='flex justify-center p-3'>
      <>

        <section ref={aboutRef} className={`transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className='flex justify-center mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-8'>Az adott bajnokság pl ac f4</h2>
            {/* folytasatok ha meg akartok ide vmit */}
          </div>

          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowCompetitors(!showCompetitors)} // Toggle competitor visibility
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-all"
            >
              {showCompetitors ? 'Rejtse el a versenyzőket' : 'Versenyzők megjelenítése'}
            </button>
          </div>

          {showCompetitors && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {competitors.map((competitor, index) => (
                <motion.div
                  key={index}
                  className="versenyzo"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <motion.section
                    className="shadow-[0px_4px_10px_2px_rgba(0,0,0,0.7)] w-[220px] h-[350px] mx-auto p-2 flex justify-center flex-wrap rounded-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-shadow-pulse hover:scale-105 transition-all duration-500"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    whileHover={{ scale: 1.05 }} // Slight zoom effect on hover
                  >
                    <motion.h2
                      className="text-3xl font-bold text-white mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.7 }}
                    >
                      <img className='mt-1 max-h-[250px] w-full object-cover rounded-lg' src={competitor.imageUrl} alt={competitor.name} />
                    </motion.h2>
                    <motion.p
                      className="text-lg text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.9 }}
                    >
                      <span className="font-bold">{competitor.name}</span>
                    </motion.p>
                  </motion.section>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
        <Footer />
      </>
    </div>
  );
};

export default Bajnoksagok_Reszletek;
