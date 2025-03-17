import React, { useContext, useEffect, useState } from 'react'
import { addComment, deleteComment, readAuthorization, readPost, readUsers } from '../utility/crudUtility';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Alerts from '../components/Alerts';

export default function ForumPost() {
    const { user } = useContext(UserContext);
    const [users,setUsers]=useState([])
    const [admins,setAdmins]=useState([]);
    const [post,setPost]=useState(null)
    const [err,setErr]=useState("")
    const [comment,setComment]=useState("")
    const param = useParams();
    const navigate=useNavigate()

    const [editComment,setEditComment]=useState(false)

    useEffect(() => {
      readPost(param.id, setPost);
      readUsers(setUsers)
      readAuthorization(setAdmins);
  }, [param.id]);

  const sendCommetn=async()=>{
    if(user){
    addComment(param.id,{uid:user.uid,comment,date:new Date})
    setComment("")
    }else{
      setErr("Jelentkez be kommenteléshez")
    }
  }

  const handleDelete = async(postId,commentId)=>{
    deleteComment(postId,commentId)
  }

  return (
    <>
       <div className="container m-auto px-10 py-5 page rounded-xl bg-slate-700 w-2/3">
            {post ? (
                <div className='py-4'>
                  {/*Post*/}
                  <div className='flex items-start'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 mt-2 cursor-pointer opacity-90 hover:opacity-100" onClick={()=>navigate("/forum")}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <div className='mx-2'>
                      <div>
                        <h1 className="text-4xl font-bold">{post.title}</h1>
                        {user?.uid === post.uid 
                              ? <div className="text-lg">Te</div>
                              : <div className="text-lg">
                                  {users?.find(obj => obj.uid === post.uid)?.displayName || 
                                    <div className='flex'>
                                      <span className="text-red-600">törölt felhasználó</span>
                                      <div className='text-xs m-1'>({post.uid})</div>
                                    </div>
                                  }
                                </div>
                        }
                        <div>{new Date(post.letrehozas.toDate()).toLocaleDateString()}</div>
                      </div>
                      <div className="my-5 p-2 text-lg">
                        {post.content}
                      </div>
                    </div>
                  </div>
                  <div className='w-full my-10'>
                    {/*Add comment*/}
                    {/*empty comment!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
                    {user?
                      <textarea type="text" placeholder="Írj valamit..." className="textarea w-full" value={comment} onChange={(e)=>setComment(e.target.value)}/>:
                      <textarea type="text" placeholder="" className="textarea w-full" disabled/>  
                    } 
                    <div className='btn bg-blue-500 text-white my-2' onClick={()=>sendCommetn()}>Küldés</div>
                  </div>
                  <div>
                    {/*comment section*/}
                    {Object.entries(post.comments || {}).map(([commentId, commentsArray]) => (
                      <div key={commentId} className='m-2 bg-slate-800 rounded-xl p-3'>
                        <div className='flex justify-between'>
                          <div>
                            {user?.uid === commentsArray[0] 
                              ? <div className="text-lg">Te</div>
                              : <div className="text-lg">
                                  {users?.find(obj => obj.uid === commentsArray[0])?.displayName || 
                                    <div className='flex'>
                                      <span className="text-red-600">törölt felhasználó</span>
                                      <div className='text-xs m-1'>({commentsArray[0]})</div>
                                    </div>
                                  }
                                </div>
                            }
                            {post.uid==commentsArray[0]?
                              <div className='text-lg bg-blue-700 rounded-xl text-center w-fit px-2'>{post.uid==commentsArray[0]?"Posztoló":""}</div>:null
                            }
                          </div>
                          <div className='opacity-70'>{new Date(commentsArray[2].toDate()).toLocaleDateString()}</div>
                        </div>
                        <div className='m-3 text-lg'>{commentsArray[1]}</div>
                        <div className='flex justify-end'>
                          {/*delete warning*/}
                          {(admins?.some(admin => admin.Ids.includes(user?.uid)) || (user?.uid === commentsArray[0]))? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-2 cursor-pointer size-6" onClick={()=>handleDelete(param.id,commentId)}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          ):null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            ) : (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {err &&<Alerts err={err}/>}
        </div>
    </>
  )
}
