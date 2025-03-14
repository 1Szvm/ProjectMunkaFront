import React, { useContext, useEffect, useState } from 'react';
import { SearchForums } from './SearchForums';
import ForumPost from './ForumPost';
import AddPost from '../components/addPost';
import { readPosts, readUsers } from '../utility/crudUtility';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Forum = () => {
  const { user } = useContext(UserContext);
  const [users,setUsers]=useState([])
  const [posts,setPosts]=useState(null)
  const [newPost, setNewPost] = useState('');
  const navigate=useNavigate()

  useEffect(() => {
    readPosts(setPosts);
    readUsers(setUsers)
  }, []);
  
  const handlePostSubmit = () => {
    const post = {
      id: Date.now(),
      text: newPost,
      timestamp: new Date().toLocaleString(),
    };
    console.log(users);
  };

  return (
    <>
      <SearchForums/> 
      <div className='flex justify-center pt-5'>
        {posts?.map(post=>(
          <div className='cursor-pointer' key={post.id} onClick={() => navigate("/post/" + post.id)} >
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
      <AddPost/>
    </>
  );
};

export default Forum;
