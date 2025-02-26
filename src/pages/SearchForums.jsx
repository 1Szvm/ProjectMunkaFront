import React from "react";
import { motion } from "framer-motion";

export const SearchForums = () => {
  return (
    <motion.div 
      className=" p-6 max-w-2xl mt-32 text-cyan-700 mx-auto bg-slate-300 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4">Search Threads</h2>
      <input 
        type="text" 
        placeholder="Enter keywords" 
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          Search titles only
        </label>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <input 
          type="date" 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Newer than"
        />
        <input 
          type="date" 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Older than"
        />
      </div>
      {/* <div className="mt-4">
        <input 
          type="number" 
          min="0" 
          placeholder="Minimum number of replies" 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}
      <div className="mt-4">
        <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Relevance</option>
          <option>Date</option>
          <option>Most replies</option>
        </select>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Search
        </button>
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          className="px-4 py-2 bg-gray-300 rounded-lg"
        >
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchForums;
