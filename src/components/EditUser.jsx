import React, { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { readAuthorization, toggleAdmin } from '../utility/crudUtility';
import { extractUrlAndId } from '../utility/utils';
import { deletePhoto, deleteUserPfp, editUserDName } from '../utility/backendHandling';

export default function EidtUser({modalRef,selectedUser}) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
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
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (data) => {
        console.log(data);
        try {
            if(admins?.includes(selectedUser?.uid) !== isAdmin){
                toggleAdmin(selectedUser.uid,isAdmin)
            }
            if(selectedUser.displayName !== displayName){
                editUserDName(selectedUser.uid,displayName)
            }
        } catch (error) {
            console.log(error);
        }finally{
            setTimeout(() => modalRef.current?.close(), 800);
        }
    }
    
    
  return (
    <div>
        <dialog ref={modalRef} id="add" className="modal">
            <div className='bg-slate-600 rounded-lg p-4 w-1/2'>
                <div className='flex justify-center'>
                    <p className='text-xl'>Profil szerkesztése</p>
                </div>
                <div className='my-2'>
 
                    <div className="flex justify-center relative">
                        <img src={photo} className="rounded-box z-0 size-60" />
                        {selectedUser?.photoURL?(
                        <div className="btn rounded-box absolute z-10 size-60 opacity-0 hover:opacity-70 text-lg" onClick={()=>handleDeletePfp()}>
                            <DeleteIcon fontSize='large'/>
                        </div>):null}
                    </div>
                    <div>
                        <label className="block font-medium mt-4">Név</label>
                        <input id="dname" type="text" placeholder="Néve"
                            className="input  w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('dname',                 
                                {validate: (value) => {
                                if (value.length>30) return "Maximum 30 karakter lehet a név!";
                                if (!value) return "Név megadása kötelező!"
                                return true;}})
                            }
                            onChange={(e) => setDisplayName(e.target.value)}
                            value={displayName}
                        />
                        <p className="text-red-600">{errors?.dname?.message}</p>
                    </div>
                    <div className='w-full'>
                        <label className="block font-medium mt-4">Jog</label>
                        <select
                            id="authorization"
                            className="select w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('authorization', { required: 'A kategória kiválasztása kötelező.' })}
                            onChange={(e) =>{
                                const value = e.target.value === "true"; // Convert string to boolean
                                setIsAdmin(value)}}
                            value={isAdmin}
                        >
                            <option value="false" >
                                Felhasználó
                            </option>
                            <option value="true" >
                                Admin
                            </option>
                        </select>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className='btn mx-2 bg-blue-600'  onClick={()=>handleSubmit(onSubmit)()}><SaveIcon/></div>
                    <div className='btn bg-red-600' onClick={()=>modalRef.current?.close()}>Bezárás</div>
                </div>
            </div>
        </dialog>
    </div>
  )
}
