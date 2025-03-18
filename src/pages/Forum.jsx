import React, { useContext, useEffect, useState } from 'react';
import { SearchForums } from './SearchForums';
import AddPost from '../components/addPost';
import { readPosts } from '../utility/crudUtility';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Forum = () => {
  const { user } = useContext(UserContext);
  const [posts,setPosts]=useState(null)
  const navigate=useNavigate()

  useEffect(() => {
    readPosts(setPosts);
  }, []);

  return (
    <>
      <SearchForums/> 
      <div className='grid  pt-5'>
        {posts?.map(post=>(
          <div className={`cursor-pointer rounded-lg ${user?.uid==post.uid?"border border-yellow-400":""}`} key={post.id} onClick={() => navigate("/post/" + post.id)} >
              <div className="card w-fit shadow-xl">
                  <div className="card-body">
                      <div className='flex justify-between'>
                          <h2 className="card-title">{post.title.length>70?`${post.title.slice(0,70)}...`:post.title}</h2>
                          <div>{new Date(post.letrehozas.toDate()).toLocaleDateString()}</div>
                      </div>
                      <p>{post.content.length>30?`${post.content.slice(0,30)}...`:post.content}</p>
                  </div>
              </div>
          </div>
        ))}
      </div>
      <AddPost/>
    </>
  );
};

export default Forum;
