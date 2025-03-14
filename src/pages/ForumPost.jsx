import React, { useContext, useEffect, useState } from 'react'
import { addComment, readPost, readUsers } from '../utility/crudUtility';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export default function ForumPost() {
    const { user } = useContext(UserContext);
    const [users,setUsers]=useState([])
    const [post,setPost]=useState(null)
    const [txt,setTxt]=useState("")
    const [comment,setComment]=useState("")
    const param = useParams();
    const navigate=useNavigate()

    useEffect(() => {
      readPost(param.id, setPost);
      readUsers(setUsers)
  }, [param.id]);

  const sendCommetn=async()=>{
    addComment(param.id,{uid:user.uid,comment,date:new Date})
    setComment("")
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
                        <div>{post.uid}</div>
                        <div>{new Date(post.letrehozas.toDate()).toLocaleDateString()}</div>
                      </div>
                      <div className="my-5 p-2 text-lg">
                        {post.content}
                      </div>
                    </div>
                  </div>
                  <div className='w-full my-10'>
                    {/*Add comment*/}
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
                          <h4 className='opacity-70'>{commentsArray[0]}</h4>
                          <div className='opacity-70'>{new Date(commentsArray[2].toDate()).toLocaleDateString()}</div>
                        </div>
                        <div className='m-3 text-lg'>{commentsArray[1]}</div>
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
            {txt &&<Alerts txt={txt} err={false}/>}
        </div>
    </>
  )
}
