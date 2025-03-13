import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { readPost, readPosts } from '../utility/crudUtility';
import { useNavigate, useParams } from 'react-router-dom';

export default function ForumPost() {
    const { user } = useContext(UserContext);
    const [post,setPost]=useState(null)
    const [txt,setTxt]=useState("")
    const param = useParams();
    const navigate=useNavigate()

    useEffect(() => {
      readPost(param.id, setPost);
  }, [param.id]);

  console.log(post);
  
  return (
    <>
       <div className="container m-auto px-10 py-5 page rounded-xl bg-slate-700 w-2/3">
            {post ? (
                <div className='py-4'>
                  <div className='flex items-start'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 mt-2 cursor-pointer opacity-90 hover:opacity-100" onClick={()=>navigate("/forum")}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <div className='mx-2'>
                      <div>
                        <h1 className="text-4xl font-bold">{post.title}</h1>
                        {console.log(user.displayName)}
                        <div>{post.uid}</div>
                        <div>{new Date(post.letrehozas.toDate()).toLocaleDateString()}</div>
                      </div>
                      <div className="my-5 p-2 text-lg">
                        {post.content}
                      </div>
                    </div>
                  </div>
                  <div className='mx-2'>
                    comments:
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
