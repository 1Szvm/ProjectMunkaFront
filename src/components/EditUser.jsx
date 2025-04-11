import React, { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { readAuthorization, toggleAdmin } from '../utility/crudUtility';
import { extractUrlAndId } from '../utility/utils';
import { deletePhoto, deleteUserPfp, editUserDName } from '../utility/backendHandling';
import { motion } from 'framer-motion';

export default function EidtUser({modalRef,selectedUser,refreshUsers}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [admins,setAdmins]=useState([])
    useEffect(() => {
        readAuthorization(setAdmins)
    }, []);

    const [displayName,setDisplayName]=useState("")
    const [isAdmin,setIsAdmin]=useState(false)
    const [photo,setPhoto]=useState("../NoPFP.jpg")

    useEffect(() => {
        setDisplayName(selectedUser.displayName||"")
        setIsAdmin(admins?.includes(selectedUser?.uid))
        setPhoto(selectedUser?.photoURL ? extractUrlAndId(selectedUser.photoURL)?.url : "../NoPFP.jpg")
    },[selectedUser])

    
    const handleDeletePfp= async()=>{
        try {
            deletePhoto(extractUrlAndId(selectedUser.photoURL).id)
            deleteUserPfp(selectedUser.uid) 
            setPhoto("../NoPFP.jpg")
            refreshUsers()
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (data) => {
        try {
            if(admins?.includes(selectedUser?.uid) !== isAdmin){
                toggleAdmin(selectedUser.uid,isAdmin)
            }
            if(selectedUser.displayName !== displayName){
                editUserDName(selectedUser.uid,displayName)
            }
            refreshUsers()
        } catch (error) {
            console.log(error);
        }finally{
            setTimeout(() => modalRef.current?.close(), 800);
        }
    }
    
    
  return (
    <div>
      <dialog ref={modalRef} id="add" className="modal fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black">
        <motion.div
          className='bg-slate-700 rounded-lg p-6 w-full max-w-lg'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <div className='flex justify-center'>
            <p className='text-2xl font-semibold text-white'>Profil szerkesztése</p>
          </div>
          
          <div className='my-4'>
            <div className="flex justify-center relative mb-6">
              <motion.img
                src={photo}
                className="rounded-full object-cover h-40 w-40 border-4 border-white shadow-lg"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              {selectedUser?.photoURL && (
                <motion.div
                  className="btn rounded-full absolute top-0 right-0 z-10 h-10 w-10 opacity-80 hover:opacity-100 text-lg bg-red-600 text-white flex justify-center items-center"
                  onClick={() => handleDeletePfp()}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.1 }}
                >
                  <DeleteIcon fontSize='small'/>
                </motion.div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mt-2">Név</label>
              <input
                id="dname"
                type="text"
                placeholder="Néve"
                className="input text-zinc-800 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
                {...register('dname', {
                  validate: (value) => {
                    if (value.length > 30) return "Maximum 30 karakter lehet a név!";
                    if (!value) return "Név megadása kötelező!";
                    return true;
                  }
                })}
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
              />
              <p className="text-red-600 text-sm">{errors?.dname?.message}</p>
            </div>
    
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-200 mt-2">Jog</label>
              <select
                id="authorization"
                className="select w-full border text-zinc-800 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
                {...register('authorization', { required: 'A kategória kiválasztása kötelező.' })}
                onChange={(e) => {
                  const value = e.target.value === "true"; // Convert string to boolean
                  setIsAdmin(value);
                }}
                value={isAdmin}
              >
                <option value="false">Felhasználó</option>
                <option value="true">Admin</option>
              </select>
            </div>
          </div>
          
          <div className='flex justify-end space-x-3'>
            <motion.button
              className='btn bg-blue-600 text-white rounded-lg px-4 py-2 transition-all hover:bg-blue-700 flex items-center gap-2'
              onClick={() => handleSubmit(onSubmit)()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <SaveIcon />
              Mentés
            </motion.button>
            <motion.button
              className='btn bg-red-600 text-white rounded-lg px-4 py-2 transition-all hover:bg-red-700'
              onClick={() => modalRef.current?.close()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Bezárás
            </motion.button>
          </div>
        </motion.div>
      </dialog>
    </div>
    
  )
}
