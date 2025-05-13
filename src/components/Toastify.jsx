import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContexta';
import { EmailAuthCredential, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '../utility/firebaseApp';

export default function Toastify({err,signin,signup,resetPw,update}) {
    const {user,msg, setMsg}=useContext(UserContext)
    const navigate=useNavigate()
 
    useEffect(()=>{
        try {
            if(err){
                toast.error(err,{position:"bottom-right"})
            }
            //sign up
            else if (signup) {
                toast.success(signup, {
                    position: "top-left",
                    icon: "🎉",
                    style: {
                        background: "#111827",
                        color: "#e5e7eb",
                        fontWeight: 600,
                        borderRadius: "10px",
                        padding: "12px 16px",
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
                        border: "1px solid #374151",
                        textAlign: "center",
                        transition: "all 0.3s ease-in-out",
                        fontSize: "20px",
                        marginTop: "70px",
                    },
                    duration: 1500,
                });
            
                setTimeout(() => navigate("/"), 2000);
            }
            
            //sign in
            else if (signin) {
                toast.success(signin, {
                    position: "top-left",
                    icon: "🔑",
                    style: {
                        background: "#111827",
                        color: "#e5e7eb",
                        fontWeight: 600,
                        borderRadius: "10px",
                        padding: "12px 16px",
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
                        border: "1px solid #374151",
                        textAlign: "center",
                        transition: "all 0.3s ease-in-out",
                        fontSize: "20px",
                        marginTop: "70px",
                    },
                    duration: 1500,
                });
            
                setTimeout(() => navigate("/"), 2000);
            }
            
            
            
            //reset password
            else if (resetPw) {
                toast.success(resetPw, {
                    position: "top-left",
                    icon: "✅",
                    style: {
                        background: "#111827", // dark gray
                        color: "#e5e7eb",       // light gray
                        fontWeight: 600,
                        borderRadius: "10px",
                        padding: "12px 16px",
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
                        border: "1px solid #374151",
                        textAlign: "center",
                        transition: "all 0.3s ease-in-out",
                        fontSize:"20px",
                        marginTop:"70px"
                    },
                    duration: 1500,
                });
            
                setTimeout(() => navigate("/auth/in"), 2000);
            }
            
            else if(update){
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
