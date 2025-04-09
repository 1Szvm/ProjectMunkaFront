import React, { useContext, useEffect, useState } from 'react';
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
  const [photo,setPhoto]=useState(user?.photoURL ? extractUrlAndId(user.photoURL)?.url : "");
  const [name,setName]=useState(user?.displayName)

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
        console.error("Error deleting photo:", error);
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
        initial={{ opacity: 0, y: -200 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-lg shadow-lg w-80 max-w-md mb-16 border border-gray-300"
      >
        <h1 className="text-2xl font-bold mb-6 text-indigo-900 text-center">Profile Settings</h1>
        <div>
          <div className='my-2'>
            <label htmlFor="name" className="block text-sm text-center font-medium text-gray-700">Profil kép</label>
            <div className='flex justify-center'>
              {photo && <img src={photo} alt="Preview" className="object-cover size-52 rounded-md mt-3" />}
            </div>
              <input
                id="file"
                type="file"
                accept="image/*"
                className="file-input w-full border border-gray-300 bg-indigo-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("file", {
                    validate: (value) => {
                      if (!value[0]) return true;
                      const fileExtension = value[0]?.name.split(".").pop().toLowerCase();
                      const acceptedFormats = ["jpg", "png"];
                      if (!acceptedFormats.includes(fileExtension)) return "Invalid fájl formátum!";
                      if (value[0].size > 1 * 1000 * 1024) return "Az engedélyezett fájl mérete 1MB";
                      return true;
                  }
                })}
                onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
              />
             <p className="text-red-600">{errors?.file?.message}</p>
            </div>
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700">Név</label>
              <input type="text" id="displayName" className="text-slate-900 bg-slate-100 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition" 
                {...register('displayName',                 
                  {validate: (value) => {
                  if (value.length>30) return "Maximum 30 karakter lehet a név!";
                  if (!value) return "Név megadása kötelező!"
                  return true;}}
                )}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <p className="text-red-600">{errors?.displayName?.message}</p>
            </div>
          <div className="btn w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            onClick={()=>handleSubmit(onSubmit)()}
          >Mentés</div>
        </div>
      </motion.div>
      <Footer />
      {text &&<Alerts text={text}/>}
    </div>
  );
}