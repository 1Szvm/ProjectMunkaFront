import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/userContext';
import { deletePhoto, uploadFile } from '../utility/backendHandling';
import { extractUrlAndId } from '../utility/utils';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user,updateUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const navigate=useNavigate()
  const [text,setText] =useState("")
  const [photo,setPhoto]=useState("");
  const [name,setName]=useState("")

  useEffect(() => {
    if (user) {
      setPhoto(user.photoURL ? extractUrlAndId(user.photoURL)?.url : "");
      setName(user?.displayName);
    }
  }, [user]);

  const onSubmit=async(data)=>{
    if(data?.file[0]){
      try {
        deletePhoto(extractUrlAndId(user.photoURL).id)
      } catch (error) {
        console.log("no pfp or something shit itself");
      }
      const file=data?.file ? data.file[0]:null
      const {url,id}=file ? await uploadFile(file) : null
      updateUser(data.displayName,url+'/'+id)
    }else{
      updateUser(data.displayName)
    }
    setTimeout(() => navigate("/"), 1000);
  }

  return (
    <div className="home h-screen flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md mb-16 border border-gray-300"
      >
        <h1 className="text-2xl font-bold mb-6 text-indigo-900 text-center">Profile Settings</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" className="text-slate-900 bg-slate-100 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="text-slate-900 bg-slate-100 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" className="bg-slate-100 text-slate-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {hovered ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </form>
      </motion.div>
      <Footer />
    </div>
  );
}