import React, { useContext, useEffect, useState } from 'react'
import { readAuthorization } from '../utility/crudUtility'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Adminpage() {
    const navigate=useNavigate()
        const { user, logoutUser } = useContext(UserContext);
      const [admins,setAdmins]=useState(null)
      useEffect(()=>{
        readAuthorization(setAdmins)
      },[])
      if(!admins.map(admin=>admin.id).includes(user.uid)){
        navigate('/')
      }
  return (
    <div>Adminpage</div>
  )
}
