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
          <div className='bg-slate-800 gap-2 min-w-[200px] max-w-[700px] w-[85%] h-[60%]  flex flex-col justify-center items-center rounded-lg'>
            <h1 className='text-4xl mb-8'>Új bejegyzés</h1>
          <div className=' w-[95%] p-1'>

            <div className='m-4'>
            <h2>A bejegyzés cime:</h2>
              <input id="title" type="text" placeholder="Cím"
                className="input text-slate-900 bg-slate-50 w-[100%] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('title',                
                  {validate: (value) => {
                  if (value.length>100) return "A cím maximum 100 karakter lehet!";
                  if (!value) return "A cím megadása kötelező!"
                  return true;}})}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <p className="text-red-600">{errors?.title?.message}</p>
            </div>
            <div className='m-4 '>
              <h2>A bejegyzés szövege:</h2>
              <textarea id="post" type="text" placeholder="Írj valamit..."
                className="textarea w-full border text-slate-900 bg-slate-50 border-gray-300 rounded-lg px-3 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('post',                   
                  {validate: (value) => {
                  if (value.length>1000) return "A szöveg maximum 1000 karakter lehet!";
                  if (!value) return "A szöveg megadása kötelező!"
                  return true;}})}
                onChange={(e) => setPost(e.target.value)}
                value={post}
              />
              <p className="text-red-600">{errors?.post?.message}</p>
            </div>
            <div className='flex justify-between m-4'>
              <div className='btn bg-blue-600 min-w-[70px] w-[25%] max-w-[100px] text-white hover:bg-indigo-700' onClick={()=> handleSubmit(onSubmit)()}>Bejegyzés</div>
              <div className='btn bg-rose-600 min-w-[70px] w-[25%] max-w-[100px] text-white hover:bg-slate-800' onClick={() => modalRef.current?.close()}>Bezárás</div>
            </div>
          </div>
          </div>
          
        </dialog>
    </div>
  )
}
