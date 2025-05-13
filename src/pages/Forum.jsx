import React, { useContext, useEffect, useState } from 'react';
import { SearchForums } from './SearchForums';


import { readPosts } from '../utility/crudUtility';
import { useNavigate } from 'react-router-dom';

import { generateSchema } from '../utility/generareFirebaseSchema';
import AddPost from '../components/addPost';
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from '../context/UserContexta';
const Forum = () => {
  const { user } = useContext(UserContext);
  const [posts,setPosts]=useState(null)
  const navigate=useNavigate()

  useEffect(() => {
    readPosts(setPosts);
  }, []);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <SearchForums /> 
      </motion.div>
      <motion.div
      initial={{ opacity: 0, }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8 }}
    >
      <AddPost/>
      </motion.div>
    </>
  );
};

export default Forum;
