import React, { useContext, useEffect, useRef, useState } from 'react'
import { readAuthorization } from '../utility/crudUtility'
import { useNavigate } from 'react-router-dom';

import { deleteUserById, deleteUserPfp, readUsers } from '../utility/backendHandling';
import { extractUrlAndId } from '../utility/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EidtUser from '../components/EditUser';
import { useConfirm } from 'material-ui-confirm';
import { UserContext } from '../context/UserContext';

export default function AdminUsersList() {
      const navigate=useNavigate()
      const confirm=useConfirm()
      const { user } = useContext(UserContext);
      const [admins,setAdmins]=useState([])
      const [users, setUsers] = useState([]);
      const [selectedUser, setSelectedUser] = useState({});
      const modalRef = useRef(null);

      useEffect(()=>{
        readAuthorization(setAdmins)
        readUsers(setUsers)
      },[])

      const refreshUsers = () => {
        readUsers(setUsers);
        readAuthorization(setAdmins);
      };
      

      useEffect(() => {
        if(admins?.length===0) return;
        if(!admins?.includes(user?.uid)){
          navigate("/")
        }
      }, [user,admins])

      const handleEdit=async (uid)=>{
        setSelectedUser(uid);
        modalRef.current?.showModal();
      }

      const handleDeleteUser=async(fetchedUser)=>{
        const { confirmed }=await confirm({
          description: String("Ez egy visszavonhatatlan művelet"),
          confirmationText:"Igen",
          cancellationText:"Mégsem",
          title:"Biztos ki szeretnéd törölni a felhasználót?"
        })
      if(confirmed) {
        try {
          deleteUserById(fetchedUser.uid) 
          deleteUserPfp(extractUrlAndId(fetchedUser.photoURL).id)
        } catch (error) {
          console.log(error);
        }
      }
      }
        
  return (
    <>
      <h1 className='text-center text-4xl font-bold m-2'>Felhasználók</h1>
      {users.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className='flex justify-center h-full text-zinc-100'>
          <div className='border mx-2 bg-slate-900 sm:w-2/3 w-screen rounded-xl'>
            {users.map(fetchedUser => (
              <div key={fetchedUser.uid} className='bg-blue-600 rounded-xl m-4'>
                {user?.uid==fetchedUser.uid?<p className='px-2'>Te</p>:null}
                <div className="grid grid-cols-1 w-full sm:grid-cols-2 p-2 items-center bg-slate-800 rounded-xl border">
                  <div className='flex justify-start items-center'>
                    <div><img className="object-cover sm:size-20 size-12 rounded-box mx-2" src={fetchedUser.photoURL ? extractUrlAndId(fetchedUser.photoURL)?.url : "../NoPFP.jpg"}/></div>
                    <div>
                      <div className={`${admins?.includes(fetchedUser?.uid)?"text-yellow-400 ":""}`}>{fetchedUser.displayName}</div>
                      <div className='text-sm opacity-70'>{fetchedUser.email}</div>
                    </div>
                  </div>
                  <div className='flex justify-end items-center'>
                    <div className='btn mx-1 bg-ghost text-white' onClick={()=>handleEdit(fetchedUser)}><EditIcon/></div>
                    <div className='btn mx-1 bg-red-600 text-white' onClick={()=>handleDeleteUser(fetchedUser)}><DeleteIcon/></div>
                  </div>
                </div>
              </div>
            ))}
            <EidtUser modalRef={modalRef} selectedUser={selectedUser} refreshUsers={refreshUsers}/>
          </div>
        </div>
      )}
    </>
  )
}
