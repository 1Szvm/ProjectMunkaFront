import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { readPosts } from "../utility/crudUtility";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";


export const SearchForums = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [src, setSrc] = useState(true)

  const reset = async () => {
    window.location.reload()
  }
  useEffect(() => {
    readPosts(setPosts);

  }, []);


  console.log(search);

  return (
    <>
      <div className="pl-2 pr-2 m-8">
        <motion.div

          className=" p-4 max-w-2xl mt-10 mb-4 text-cyan-700 mx-auto bg-slate-100 rounded-2xl shadow-lg "
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

            />
          </div>

        </motion.div>

        <div className="flex justify-center flex-wrap gap-8">
          <div className='flex justify-center pt-4 p-2 m-2'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
              {posts?.filter((post) => {
                return search.toLowerCase() === ''
                  ? post
                  : post.title.toLowerCase().includes(search) || post.content.includes(search)
              }).map((post) => (

                <div
                  className='cursor-pointer group p'
                  key={post.id}
                  onClick={() => navigate("/post/" + post.id)}
                >
                  <div className="bg-slate-100 card w-full border-slate-300 border shadow-xl opacity-95 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-600 group-hover:opacity-100">
                    <div className="card-body p-5 flex flex-col justify-between h-full">
                      <div className='flex justify-between mb-3'>
                        <h2 className="card-title text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-all duration-300">
                          {post.title.length > 70 ? `${post.title.slice(0, 25)}...` : post.title}
                        </h2>
                        <div className="text-sm text-gray-500 p-2">
                          {new Date(post.letrehozas.toDate()).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-gray-700 text-base line-clamp-3 group-hover:text-gray-900 transition-all duration-300">
                        {post.content.length > 30 ? `${post.content.slice(0, 30)}...` : post.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default SearchForums;
