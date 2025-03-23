import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { readAuthorization } from '../utility/crudUtility';
import { extractUrlAndId } from '../utility/utils';

export default function EidtUser({modalRef,selectedUser}) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [admins,setAdmins]=useState([])
    useEffect(() => {
        readAuthorization(setAdmins)
    }, []);

    const [displayName,setDisplayName]=useState("")
    const [isAdmin,setIsAdmin]=useState(false)
    const [photo,setPhoto]=useState("")

    useEffect(() => {
        setDisplayName(selectedUser.displayName||"")
        setIsAdmin(admins?.some(admin => admin.Ids.includes(selectedUser?.uid)))
        setPhoto(selectedUser?.photoURL ? extractUrlAndId(selectedUser.photoURL)?.url : "../NoPFP.jpg")
    },[selectedUser])
    

    const onSubmit = async (data) => {
        console.log("I'll make you submit father");
    }
    
    
  return (
    <div>
        <dialog ref={modalRef} id="add" className="modal">
            <div className='bg-slate-600 rounded-lg p-4 w-1/2'>
                <div className='flex justify-center'>
                    <p className='text-xl'>Profil szerkesztése</p>
                </div>
                <div className='my-2'>
                    {selectedUser?.photoURL?(
                    <div className="flex justify-center relative">
                        <img src={photo} className="rounded-box z-0 size-60" />
                        <div className="btn rounded-box absolute z-10 size-60 opacity-0 hover:opacity-70 text-lg" >
                            <DeleteIcon/>
                        </div>
                    </div>):null}
                    <div>
                        <label className="block font-medium mt-4">Név</label>
                        <input id="dname" type="text" placeholder="Pálya neve"
                            className="input  w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('dname', { required: 'A név megadása kötelező.' })}
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
                            onChange={(e) => console.log(e.target.value)}
                            value={isAdmin}
                        >
                            <option value={false} >
                                Felhasználó
                            </option>
                            <option value={true} >
                                Admin
                            </option>
                        </select>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className='btn mx-2 bg-blue-600' onClick={()=>handleSubmit(onSubmit)()}><SaveIcon/></div>
                    <div className='btn bg-red-600' onClick={()=>modalRef.current?.close()}>Bezárás</div>
                </div>
            </div>
        </dialog>
    </div>
  )
}
