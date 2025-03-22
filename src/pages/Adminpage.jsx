import React, { useContext, useEffect, useState } from 'react'
import { readAuthorization } from '../utility/crudUtility'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { readUsers } from '../utility/backendHandling';
import { extractUrlAndId } from '../utility/utils';

export default function Adminpage() {
    const navigate=useNavigate()
      const { user } = useContext(UserContext);
      const [admins,setAdmins]=useState(null)
      const [users, setUsers] = useState([]);

      useEffect(()=>{
        readAuthorization(setAdmins)
        readUsers(setUsers)
      },[])
      if(admins&&!admins.map(admin=>admin.Ids.includes(user.uid))){
        navigate('/')
      }

      const LoadingUsers=()=> {
        const [dots, setDots] = useState("");
      
        useEffect(() => {
          const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
          }, 400);
      
          return () => clearInterval(interval);
        }, []);
      
        return <p className="text-center text-lg font-semibold">Loading{dots}</p>;
      }
        
      
  return (
    <>
      <h1 className='text-center text-4xl font-bold m-2'>Admin page</h1>
      <div
          className="btn bg-blue-600 text-white fixed bottom-5 right-5"
          onClick={() => setAddEdit(true)}
      >
        Save
      </div>
      {users.length === 0 ? (
        <>
          <div className="text-center text-lg font-semibold">Loading users or server is offline</div>
          <LoadingUsers />
        </>
      ) : (
        <div className='flex justify-center overflow-auto'>
          <div className='border w-1/2'>
            {users?.map(fetchedUser => (
              <div class="flex justify-between px-4 items-center bg-slate-800 rounded-xl my-4 border">
                <div className='flex justify-start items-center'>
                  <div><img class="size-20 rounded-box mx-2" src={fetchedUser.photoURL ? extractUrlAndId(fetchedUser.photoURL)?.url : ""}/></div>
                  <div className={`${admins?.some(admin => admin.Ids.includes(fetchedUser?.uid))?"text-yellow-400":""}`}>{fetchedUser.displayName}</div>
                </div>
                <div className='flex justify-center items-center'>
                  <div className='mx-2'>isAdmmin: {`${admins?.some(admin => admin.Ids.includes(fetchedUser?.uid))?"true":"false"}`}</div>
                  <div className='btn bg-red-600 text-white'>Törlés</div>
                </div>
              </div>
            ))}
          </div>
        </div>)}
    </>
  )
}
