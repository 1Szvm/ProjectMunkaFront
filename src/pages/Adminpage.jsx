import React, { useContext, useEffect, useState } from 'react'
import { readAuthorization } from '../utility/crudUtility'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Adminpage() {
    const navigate=useNavigate()
      const { user } = useContext(UserContext);
      const [admins,setAdmins]=useState(null)
      useEffect(()=>{
        readAuthorization(setAdmins)
      },[])
      if(admins&&!admins.map(admin=>admin.Ids.includes(user.uid))){
        navigate('/')
      }
      
  return (
    <>
    {admins&&!admins.map(admin=>admin.Ids.includes(user.uid))?navigate('/'):
      <div>
        <h1 className='text-center text-4xl font-bold m-2'>Admin page</h1>
        <div className='grid grid-cols-4 gap-4 m-auto'>
          <div className='btn btn-lg'>Felhasználók</div>
          <div className='btn btn-lg'>Futamok</div>
          
        </div>
      </div>
    }
    </>
  )
}
