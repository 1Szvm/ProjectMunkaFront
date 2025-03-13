import React, { useContext, useRef } from 'react'
import { UserContext } from '../context/UserContext';

export default function () {
    const {user}=useContext(UserContext);
    const modalRef = useRef(null);

    const handlePost = () => {
        modalRef.current?.showModal();
    };
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
            <div>
                <div className='flex justify-between'>
                    <div className='btn'>Post</div>
                    <div className='btn' onClick={() => modalRef.current?.close()}>close</div>
                </div>
            </div>
        </dialog>
    </div>
  )
}
