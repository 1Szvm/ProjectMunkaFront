import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { readPosts } from '../utility/crudUtility';

export default function ForumPost() {
    const { user } = useContext(UserContext);
    const [posts,setPosts]=useState(null)
    useEffect(() => {
        readPosts(setPosts);
    }, []);
    console.log(posts);
    
  return (
    <div className='flex justify-center pt-5'>
      {posts?.map(post=>(
        <div className='cursor-pointer' key={post.id} onClick={()=>console.log(post)} >
            <div className="card w-96 shadow-xl">
                <div className="card-body">
                    <div className='flex justify-between'>
                        <h2 className="card-title">{post.title}</h2>
                        <div>{new Date(post.letrehozas.toDate()).toLocaleDateString()}</div>
                    </div>
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
      ))}
    </div>
  )
}
