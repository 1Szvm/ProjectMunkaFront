import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { readCategories, readChampionships } from '../utility/crudUtility';
import { DarkModeContext } from '../components/DarkModeContext.jsx'; // Import it properly
import { LazyMotion, domAnimation, m } from 'framer-motion';    

const Bajnoksagok = () => {
  const [champions, setChampions] = useState([]);  // State for championships
  const [categories, setCategories] = useState([]); // State for categories

  const { darkMode, setDarkMode } = useContext(DarkModeContext); // ✅ Access BOTH darkMode and setDarkMode here

  useEffect(() => {
    readChampionships(setChampions); // Fetch championships from backend
    readCategories(setCategories);   // Fetch categories from backend
  }, []);

  const atemptCoppy = () => {
    // Helper function to log relationships between categories and championships
    categories.map(category => {
      console.log(category.nev);

      champions.map((competition) => {
        if (competition.id == category.id) {
          console.log();
          console.log(category.nev);
          Object.entries(competition?.data || {}).map(([id, champsArr]) =>
            console.log("--> " + id)
          );
        }
      });
    });
  };

  const navigate = useNavigate();

  return (
    <LazyMotion features={domAnimation}>
    <motion.div
    className={`min-h-screen p-3`}
    animate={{
      // background: darkMode ? "rgb(30, 41, 59)" : "rgb(255, 255, 255)",
      color: darkMode ? "#ffffff" : "#000000",
    }}
    transition={{ duration: 0.5, ease: "easeInOut" }} 
  >

      <main className="flex-grow flex flex-col items-center justify-center ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-2"
        >
          <p className="text-lg italic text-sky-500 font-semibold ">Fedezd fel a legnagyobb versenyeket a virtuális világban!</p>
        </motion.div>

        <div className='p-[0.1px]'>
 <motion.div
      className="flex justify-center flex-wrap p-1 sm:p-3"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
          <motion.div className="p-5 w-[100%] max-w-[1000px] min-w-[100px] rounded-xl shadow-lg shadow-indigo-500/50 
            sm:m-4 "
          animate={{
             background: darkMode ? "#0A0A0A" : "#292929",
            color: darkMode ? "#ffffff" : "#000000",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }} 
          >
            {
              categories.map(category => (
                champions.map((competition) => (
                  competition.id == category.id ? (
                    <motion.div
                      key={competition.id}
                      initial={{ opacity: 0, y: -20 }}
                      className="text-left p-3 mb-5  border-2 border-sky-800 rounded-lg"
                      animate={{
                        background: darkMode ? "#1F1F1F" : "#F5F5F5",
                       color: darkMode ? "#ffffff" : "#000000",
                       opacity: 1, y: 0
                     }}
                     transition={{ duration: 0.5, ease: "easeInOut" }} 
                    >
                      <p className="text-xl italic mb-8 font-semibold " style={{ color: `${category.color}` }}>{category.nev}</p>
                      
                      <div className='flex flex-wrap justify-center'>
                        {Object.entries(competition?.data || {}).map(([id, champsArr]) => (
                          <motion.div
                            key={id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            whileHover={{ scale: 1.0 }}
                            className="bg-slate-200 rounded-xl shadow-md overflow-hidden border-[0.2rem] border-blue-800 hover:shadow-2xl transform transition-all m-1 w-full max-w-[95%] lg:max-w-sm lg:flex-1"

                            ><img 
                            src={champsArr.imgUrl} 
                            alt="Champion"
                            className="w-full h-auto object-cover rounded-xl transition-opacity duration-500"
                            loading="lazy"
                            />


                            <div className="p-6">
                              <h3 className="text-2xl font-bold text-gray-800">{id}</h3>
                              <p className="text-gray-700 mt-2">{competition.description}</p>
                              <motion.button
                                onClick={() => navigate('/championship_desc/'+category.id+"/"+id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-700 to-teal-700 text-slate-100 font-semibold tracking-wide rounded-xl shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
                              >
                                Részletek
                              </motion.button>


                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : null
                ))
              ))
            }

          </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </motion.div>
    </LazyMotion>
  );
};

export default Bajnoksagok;
