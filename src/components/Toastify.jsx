import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';
import { EmailAuthCredential, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '../utility/firebaseApp';

export default function Toastify({err,signin,signup,resetPw,update}) {
    const {user,msg, setMsg}=useContext(UserContext)
    const navigate=useNavigate()
 
    useEffect(()=>{
        try {
            if(err){
                toast.error(err,{position:"bottom-right"})
            }else if(signup){
                toast.success(signup,{position:"bottom-right"})
                setTimeout(()=>navigate("/"),2000)
                
            }else if(signin){
                toast.success(signin,{position:"bottom-right"})
                setTimeout(()=>navigate("/"),2000)
            }else if(resetPw){
                toast.success(resetPw,{position:"top-left"})
                setTimeout(()=>navigate("/auth/in"),2000)
            }else if(update){
                toast.success(update,{position:"top-left"})
            }
        } catch (error) {
            setMsg({error})
            setMsg({error})
        }
        
    }, [msg])
  return (
    <div>
        <ToastContainer />
    </div>
  )
}
