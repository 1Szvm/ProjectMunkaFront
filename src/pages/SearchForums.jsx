import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { readPosts } from "../utility/crudUtility";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const SearchForums = () => {
  const [posts,setPosts]=useState([])
  const [search,setSearch] = useState("")
  const [src,setSrc] = useState(true)
  const navigate = useNavigate()
  const handleClick = () => {
    if (!search.trim()) {
      console.log("Search input is empty");
      return;
    }
  
    const found = posts.some(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
    );
    
    if (found) {
      setSrc(true);
      searchWord(); 
      console.log("Found");
    } else {
      setSrc(false);
      console.log("Not Found");
    }
  };
  
  const searchWord = async () => {
    let input = document.getElementById("keyWord").value.trim();
    
    if (!input) {
      console.log("Search input is empty");
      return;
    }
  
    console.log("Search Input:", input);
    console.log("All Posts:", posts);
  
    // Filter posts based on title or content
    const filtered = posts.filter(e => e.title.includes(input) || e.content.includes(input));
    
    console.log("Filtered Posts:", filtered);
    setPosts(filtered); // Update state with filtered posts
  };
  
  const reset =async ()=>{
    window.location.reload()
  }
  useEffect(() => {
    readPosts(setPosts);
    
  }, []);



  return (
    <>
  
    <div className="pl-2 pr-2">
    <motion.div 
      className=" p-2 max-w-2xl mt-10 mb-5 text-cyan-700 mx-auto bg-slate-100 rounded-2xl shadow-lg "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-2">Beszélgetések keresése</h2>
      <div className="flex gap-2">
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Mire szeretnél rá keresni?" 
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="keyWord"
      />
         <button className="px-4 py-2 bg-blue-500 min-w-[55px]  w-[25%] max-w-[100px] justify-center flex text-white rounded-lg hover:bg-blue-600" onClick={handleClick} >
          Keresés
        </button>
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          className="px-4 py-2 bg-gray-300 rounded-lg  min-w-[55px]  w-[25%] max-w-[100px] justify-center flex"
          onClick={reset}

        >
          Vissza
        </motion.button>
        </div>
      {/* <div className="mt-4">
        <input 
          type="number" 
          min="0" 
          placeholder="Minimum number of replies" 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}
     
      {/* <div className="mt-4 flex gap-2">
        //régi helye a keresesnek es a resetnek
        
      </div> */}
      
    </motion.div>
    <div className="flex justify-center flex-wrap gap-8">
    {/* search.map((competition) => (
    search.map((competition) => (
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
       */}
    {!src ? (
  <div>Nincs talalat</div>
) : (

  <div className='flex justify-center pt-5 p-2 m-3'>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
      {posts?.map(post => (
        <div
          className='cursor-pointer group p'
          key={post.id}
          onClick={() => navigate("/post/" + post.id)}
        >
          <div className="bg-slate-100 card w-full border-slate-300 border shadow-xl opacity-95 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-600 group-hover:opacity-100">
            <div className="card-body p-5 flex flex-col justify-between h-full">
              <div className='flex justify-between mb-3'>
                <h2 className="card-title text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-all duration-300">
                  {post.title.length>70?`${post.title.slice(0,25)}...`:post.title}
                </h2>
                <div className="text-sm text-gray-500">
                  {new Date(post.letrehozas.toDate()).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-700 text-base line-clamp-3 group-hover:text-gray-900 transition-all duration-300">
                {post.content.length>30?`${post.content.slice(0,30)}...`:post.content}
              </p>
            </div>
          </div>
        </div>
      ))}  
    </div>
  </div>
)}

  



    
    </div>
    </div>
  </>
  );
};

export default SearchForums;
