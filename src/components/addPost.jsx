import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/userContext';
import { useForm } from 'react-hook-form';
import { addPost } from '../utility/crudUtility';


export default function () {
    const {user}=useContext(UserContext);
    const modalRef = useRef(null);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [title,setTitle]=useState("")
    const [post,setPost]=useState("")

    const handlePost = () => {
        modalRef.current?.showModal();
    };

    const onSubmit = async (data) => {
      console.log("I'll make you submit father");
      try {
        addPost({
          uid:user.uid,
          letrehozas:new Date(),
          content:post,
          title
        })
      } catch (error) {
        
      }finally{
        setTimeout(() => modalRef.current?.close(), 800);
      }
    }

  return (
    <div>
        {user&&
          <div
            className="fixed bottom-5 right-5 flex justify-center items-center w-16 h-16 rounded-full shadow-lg cursor-pointer transition-transform duration-300 bg-red-600"
            onClick={handlePost}
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10 text-white transition-transform duration-300"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>}
        <dialog ref={modalRef} id="add" className="modal">
          <div className='bg-slate-600 rounded-lg'>
            <div className='m-4'>
              <input id="title" type="text" placeholder="Cím"
                className="input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('title', { required: 'A cím megadása kötelező.' })}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <p className="text-red-600">{errors?.title?.message}</p>
            </div>
            <div className='m-4'>
              <textarea id="post" type="text" placeholder="Írj valamit..."
                className="textarea w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('post', { required: 'A szöveg megadása kötelező.' })}
                onChange={(e) => setPost(e.target.value)}
                value={post}
              />
              <p className="text-red-600">{errors?.post?.message}</p>
            </div>
            <div className='flex justify-between m-4'>
              <div className='btn bg-blue-600' onClick={()=> handleSubmit(onSubmit)()}>Post</div>
              <div className='btn bg-red-600' onClick={() => modalRef.current?.close()}>close</div>
            </div>
          </div>
        </dialog>
    </div>
  )
}
