import React, { useContext, useEffect, useState } from 'react';
import { SearchForums } from './SearchForums';

import { readPosts } from '../utility/crudUtility';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { generateSchema } from '../utility/generareFirebaseSchema';
import AddPost from '../components/addPost';

const Forum = () => {
  const { user } = useContext(UserContext);
  const [posts,setPosts]=useState(null)
  const navigate=useNavigate()

  useEffect(() => {
    readPosts(setPosts);
  }, []);

  generateSchema("forum");

  return (
    <>
      <SearchForums /> 
      {/*<div className='flex justify-center pt-5 p-2 m-3'>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
    {posts?.map(post => (
      <div
        className='cursor-pointer grou p'
        key={post.id}
        onClick={() => navigate("/post/" + post.id)}
      >
        <div className=" bg-slate-200 card w-full shadow-xl rounded-lg overflow-hidden transform transition-all duration-500 hover: text-red-300 scale-105 hover:rotate-2 hover:shadow-2xl hover:shadow-red-500 group-hover:opacity-90">
          <div className="card-body p-5 flex flex-col justify-between h-full">
            <div className='flex justify-between mb-3'>
              <h2 className="card-title text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-all duration-300">{post.title}</h2>
              <div className="text-sm text-gray-500">{new Date(post.letrehozas.toDate()).toLocaleDateString()}</div>
            </div>
            <p className="text-gray-700 text-base line-clamp-3 group-hover:text-gray-900 transition-all duration-300">{post.content}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>*/}



      <AddPost/>
    </>
  );
};

export default Forum;
