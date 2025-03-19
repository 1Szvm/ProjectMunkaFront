import React from "react";
import { motion } from "framer-motion";

import { competitions } from "./Bajnoksagok";
import { useState } from "react";


export const SearchForums = () => {
  
  const [search,setSearch] = useState([])
  const searchWord =async ()=>{
    let input = document.getElementById("keyWord").value
    console.log(input);
    console.log(competitions);
    const filtered = competitions.filter(e => e.name.includes(input) || e.description.includes(input))
    console.log(filtered);
    setSearch(filtered)
    
  }
  const reset =async ()=>{
    window.location.reload()
  }



  return (
    <>
    <div className="pl-2 pr-2">
    <motion.div 
      className=" p-3 max-w-2xl mt-4 text-cyan-700 mx-auto bg-slate-300 rounded-2xl shadow-lg mb-1"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4">Search Threads</h2>
      <input 
        type="text" 
        placeholder="Enter keywords" 
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="keyWord"
      />
      <div className="mt-4">
        
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        
       
      </div>
      {/* <div className="mt-4">
        <input 
          type="number" 
          min="0" 
          placeholder="Minimum number of replies" 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}
     
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={searchWord} >
          Search
        </button>
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          className="px-4 py-2 bg-gray-300 rounded-lg"
          onClick={reset}
        >
          Reset
        </motion.button>
      </div>
      
    </motion.div>
 
    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10"> */}
    <div className="flex justify-center flex-wrap gap-8">
    {search.map((competition) => (
      <motion.div
        key={competition.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: competition.id * 0.2 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transform transition-all flex justify-center flex-wrap content-center max-w-72 "
      >
        <img src={competition.image} alt={competition.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800">{competition.name}</h3>
          <p className="text-gray-700 mt-2">{competition.description}</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-4 py-2 px-6 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
          >
            Részletek
          </motion.button>
        </div>
        
      </motion.div>
      
    ))
    }
    </div>
    </div>
  </>
  );
};

export default SearchForums;
