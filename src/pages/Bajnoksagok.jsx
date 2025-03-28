import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { readCategories, readChampionships } from '../utility/crudUtility';



export const competitions = [
  { id: 1, name: 'Assetto Corsa - F4 Championship', image: 'https://images.unsplash.com/photo-1610905376670-5e7e0e8a3cfb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Formula 4 racing series for emerging talents.' },
  { id: 2, name: 'Assetto Corsa Competizione - Porsche Cup', image: 'https://images.unsplash.com/photo-1706177357152-611d8d76b64d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'A prestigious cup for Porsche racing enthusiasts.' },
  { id: 3, name: 'F1 23', image: 'https://i.pinimg.com/736x/b6/75/74/b6757464caf3a48c84f6cabd6be503a7.jpg', description: 'The latest installment in the F1 racing series.' },
  { id: 4, name: 'F1 24', image: 'https://i.pinimg.com/736x/dd/a7/66/dda7664bd840eda7ed595239837ce501.jpg', description: 'Next-gen F1 racing simulation, with new tracks and cars.' },
];

const Bajnoksagok = () => {
  const [champions, setChampions] = useState([]);
  const [categories, setCategories]=useState([])

  useEffect(() => {
    readChampionships(setChampions);
    readCategories(setCategories)
  }, []);

  const atemptCoppy=()=>{
    
    champions.map((competition) => {  
      categories.map(category=>{
        if(competition.id==category.id){
          console.log();
          console.log(category.nev);
          Object.entries(competition?.data || {}).map(([id, champsArr]) => (            
            console.log("--> "+id)
          ))
        }
      })
    })
  }
    

  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-2"
        >
          <p className="text-xl italic text-sky-500 mb-8 pt-5 font-semibold ">Fedezd fel a legnagyobb versenyeket a virtuális világban!</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8  p-2">
          {competitions.map((competition) => (
            <motion.div
              key={competition.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: competition.id * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transform transition-all"
            >
              <img src={competition.image} alt={competition.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">{competition.name}</h3>
                <p className="text-gray-700 mt-2">{competition.description}</p>
                <motion.button
                onClick={()=>navigate('/championship_desc')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="mt-4 py-2 px-6 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
                >
                  Részletek
                </motion.button>
              </div>
            </motion.div>
          ))}
          <div className='btn' onClick={()=>atemptCoppy()}>Championships</div>
        </div>
      </main>

      {/* Footer */}
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Bajnoksagok;
