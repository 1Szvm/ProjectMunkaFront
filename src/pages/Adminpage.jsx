import React, { useContext, useEffect, useRef, useState } from 'react'
import { readAuthorization } from '../utility/crudUtility'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { deleteUserById, readUsers } from '../utility/backendHandling';
import { extractUrlAndId } from '../utility/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EidtUser from '../components/EditUser';
import { useConfirm } from 'material-ui-confirm';

export default function Adminpage() {
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

      const LoadingUsers=()=> {
        const [dots, setDots] = useState("");
      
        useEffect(() => {
          const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
          }, 400);
      
          return () => clearInterval(interval);
        }, []);
      
        return <p className="text-center text-lg font-semibold">Betöltés{dots}</p>;
      }

      const handleDeleteUser=async(uid)=>{
        const { confirmed }=await confirm({
          description: String("Ez egy visszavonhatatlan művelet"),
          confirmationText:"Igen",
          cancellationText:"Mégsem",
          title:"Biztos ki szeretnéd törölni a posztot?"
        })
      if(confirmed) {
        try {
          deleteUserById(uid) 
        } catch (error) {
          console.log(error);
        }
      }
      }
        
  return (
    <>
      <h1 className='text-center text-4xl font-bold m-2'>Admin page</h1>
      {users.length === 0 ? (
          <LoadingUsers />
      ) : (
        <div className='flex justify-center'>
          <div className='border overflow-y-scroll bg-slate-900 w-2/3'>
            {users.map(fetchedUser => (
              <div key={fetchedUser.uid} className='bg-blue-600 rounded-xl m-4'>
                {user?.uid==fetchedUser.uid?<p className='px-2'>Te</p>:null}
                <div className="flex justify-between px-2 items-center bg-slate-800 rounded-xl border">
                  <div className='flex justify-start items-center'>
                    <div><img className="size-20 rounded-box mx-2" src={fetchedUser.photoURL ? extractUrlAndId(fetchedUser.photoURL)?.url : "../NoPFP.jpg"}/></div>
                    <div>
                      <div className={`${admins?.includes(fetchedUser?.uid)?"text-yellow-400":""}`}>{fetchedUser.displayName}</div>
                      <div className='text-sm opacity-70'>{fetchedUser.email}</div>
                    </div>
                  </div>
                  <div className='flex justify-center items-center'>
                    <div className='btn mx-1 bg-ghost text-white' onClick={()=>handleEdit(fetchedUser)}><EditIcon/></div>
                    <div className='btn mx-1 bg-red-600 text-white' onClick={()=>handleDeleteUser(fetchedUser.uid)}><DeleteIcon/></div>
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
