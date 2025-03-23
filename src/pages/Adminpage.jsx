import React, { useContext, useEffect, useRef, useState } from 'react'
import { readAuthorization } from '../utility/crudUtility'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { readUsers } from '../utility/backendHandling';
import { extractUrlAndId } from '../utility/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import EidtUser from '../components/EditUser';

export default function Adminpage() {
      const navigate=useNavigate()
      const { user } = useContext(UserContext);
      const [admins,setAdmins]=useState([])
      const [users, setUsers] = useState([]);
      const [selectedUser, setSelectedUser] = useState({});
      const modalRef = useRef(null);

      useEffect(()=>{
        readAuthorization(setAdmins)
        readUsers(setUsers)
      },[])

      const handleEdit=async (uid)=>{
        setSelectedUser(uid);
        modalRef.current?.showModal();
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

      if(!user||(!admins?.some(admin => admin.Ids.includes(user?.uid)))) return <div className='text-center text-5xl'>Hi Mr.Frog... you shouldn't be here.</div>
        
  return (
    <>
      <h1 className='text-center text-4xl font-bold m-2'>Admin page</h1>
      {users.length === 0 ? (
        <>
          <div className="text-center text-lg font-semibold">Loading users or server is offline</div>
          <LoadingUsers />
        </>
      ) : (
        <div className='flex justify-center'>
          <div className='border overflow-y-scroll bg-slate-900 w-2/3'>
            {users.map(fetchedUser => (
              <div key={fetchedUser.uid} className='bg-blue-600 rounded-xl m-4'>
                {user.uid==fetchedUser.uid?<p className='px-2'>Te</p>:null}
                <div className="flex justify-between px-2 items-center bg-slate-800 rounded-xl border">
                  <div className='flex justify-start items-center'>
                    <div><img className="size-20 rounded-box mx-2" src={fetchedUser.photoURL ? extractUrlAndId(fetchedUser.photoURL)?.url : "../NoPFP.jpg"}/></div>
                    <div className={`${admins?.some(admin => admin.Ids.includes(fetchedUser?.uid))?"text-yellow-400":""}`}>{fetchedUser.displayName}</div>
                  </div>
                  <div className='flex justify-center items-center'>
                    <div className='btn mx-1 bg-ghost text-white' onClick={()=>handleEdit(fetchedUser)}><EditIcon/></div>
                    <div className='btn mx-1 bg-red-600 text-white'><DeleteIcon/></div>
                  </div>
                </div>
              </div>
            ))}
            <EidtUser modalRef={modalRef} selectedUser={selectedUser}/>
          </div>
        </div>)}
    </>
  )
}
