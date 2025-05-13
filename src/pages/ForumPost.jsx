import React, { useContext, useEffect, useState } from 'react'
import { addComment, deleteComment, deletePost, readAuthorization, readPost } from '../utility/crudUtility';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useConfirm } from "material-ui-confirm";
import Alerts from '../components/Alerts';
import { readUsers } from '../utility/backendHandling';
import { extractUrlAndId } from '../utility/utils';
import { UserContext } from '../context/UserContexta';

export default function ForumPost() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [admins,setAdmins]=useState([]);
    const [post,setPost]=useState(null)
    const [err,setErr]=useState("")
    const [comment,setComment]=useState("")
    const confirm=useConfirm()
    const { register, handleSubmit, formState: { errors }} = useForm();
    const param = useParams();
    const navigate=useNavigate()

    useEffect(() => {
      readPost(param.id, setPost);
      readUsers(setUsers)
      readAuthorization(setAdmins);
      readUsers(setUsers);
  }, [param.id]);
  
  const onSubmit=async()=>{
    if(user){
    addComment(param.id,{uid:user.uid,comment,date:new Date})
    setComment("")
    }else{
      setErr("Jelentkez be kommenteléshez")
    }
  }

  const handleDeletePost = async(postId)=>{
    const { confirmed }=await confirm({
      description: String("Ez egy visszavonhatatlan művelet"),
      confirmationText:"Igen",
      cancellationText:"Mégsem",
      title:"Biztos ki szeretnéd törölni a posztot?"
    })
    if(confirmed){
      try {
        deletePost(postId)  
        navigate("/forum")
      } catch (error) {
        console.log("error:",error);
      }
    }
  }

  const handleDeleteComment = async(postId,commentId)=>{
    const { confirmed }=await confirm({
      description: String("Ez egy visszavonhatatlan művelet"),
      confirmationText:"Igen",
      cancellationText:"Mégsem",
      title:"Biztos ki szeretnéd törölni a posztot?"
    })
    if(confirmed){
      try {
        deleteComment(postId,commentId)  
      } catch (error) {
        console.log("error:",error);
      }
    }
  }

  return (
    <>
    <div className='flex justify-center'>
      {users.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) :(
        <div className="container m-4 sm:px-5 px-3 py-2 page rounded-xl mt-4 opacity-200 border-sky-600 border-2 min-w-[250px] sm:w-[85%] max-w-[900px] shadow-lg">
            {post ? (
                <div className='py-3 m-1'>
                  {/*Post*/}
                  <div>
                    <div className='flex justify-between mb-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="size-8 mb-5 cursor-pointer opacity-90 hover:opacity-100" 
                        onClick={()=>navigate("/forum")}
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                      </svg>
                      {(admins?.includes(user?.uid) || (user?.uid === post.uid[0]))? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer size-6" onClick={()=>handleDeletePost(param.id)}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>)
                        :
                        null}                        
                    </div>
                    <div className='mx-2'>
                      <div className='flex justify-between'>
                        <div className=' min-w-[250px] max-w-[99%] pl-1'>
                          <div className='flex justify-start items-center mb-4'>
                            {users?.find(obj => obj.uid === post?.uid)?.photoURL 
                                ? (
                                  <img src={extractUrlAndId(users.find(obj => obj.uid === post?.uid)?.photoURL)?.url} alt="Preview" className="object-cover size-16 rounded-full border-2 border-blue-600" />
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                  </svg>
                                )
                            }
                            {user?.uid === post.uid 
                            ? <div className="sm:text-3xl mx-2">Te</div>
                            : <div className="sm:text-3xl mx-2">
                                {users?.find(obj => obj.uid === post.uid)?.displayName || 
                                <>
                                  <div className='text-3xl mx-2 text-red-700'>({post.uid.slice(0,7)})</div>
                                </>
                                }
                              </div>
                          }
                          </div>
                          <p className="text-2xl font-bold break-words">{post.title}</p>

                        </div>
                      </div>
                      <div className="my-5 p-2 text-lg break-words">
                        {post.content}
                      </div>
                    </div>
                  </div>
                  <div className='w-full my-10'>
                    {/*Add comment*/}
                    {user?
                      <div>
                        <textarea id='comment' type="text" placeholder="Írj valamit..." className="text-zinc-800 font-semibold textarea w-full" 
                          {...register('comment', { required: 'A szöveg megadása kötelező.' })}
                          value={comment} 
                          onChange={(e)=>setComment(e.target.value)}
                          />
                        <p className="text-red-600">{errors?.comment?.message}</p>
                      </div>
                      :
                      <textarea type="text" placeholder="" className="textarea w-full" disabled/>  
                    } 
                    <div className='btn bg-blue-500 text-white my-2' onClick={()=>handleSubmit(onSubmit)()}>Küldés</div>
                  </div>
                  <div>
                    {/*comment section*/}
                    {Object.entries(post?.comments || {}).map(([commentId, commentsArray]) => (
                      <div key={commentId} className='m-2 bg-slate-700 text-white rounded-xl p-3'>
                        <div className='flex justify-between'>
                          <div className='flex justify-start'>
                            <div className={`mr-2 rounded-full ${post.uid==commentsArray[0]?"border-2 border-blue-600":""}`}>
                              {users?.find(obj => obj.uid === commentsArray?.[0])?.photoURL 
                                  ? (
                                    <img src={extractUrlAndId(users.find(obj => obj.uid === commentsArray[0])?.photoURL)?.url || ""} alt="Preview" className="object-cover size-12 rounded-full" />
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                  )
                              }
                            </div>
                            <div className='my-1'>
                              {user?.uid === commentsArray[0] 
                                ? <div className="sm:text-lg text-md">Te</div>
                                : <div className="sm:text-lg text-md">
                                    {users?.find(obj => obj.uid === commentsArray[0])?.displayName || 
                                    <>
                                   
                                      <div className='text-red-600 sm:text-lg text-md text-wrap'>{commentsArray[0].slice(0,7)}</div>
                                    </>
                                    }
                                  </div>
                              }
                            </div>
                          </div>
                        </div>
                        <div className='m-3 text-lg  break-words'>{commentsArray[1]}</div>
                        <div className='flex justify-end'>
                          {(admins?.includes(user?.uid) || (user?.uid === commentsArray[0]))? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-2 cursor-pointer size-6" onClick={()=>handleDeleteComment(param.id,commentId)}>
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
        </div>)}
        </div>
    </>
  )
}
