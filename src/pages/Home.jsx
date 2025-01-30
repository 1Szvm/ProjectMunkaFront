import React from 'react'

import { useRef } from "react"
export const Home = () => {
  console.log('Home');  
  function Component() {
    const scrollRef = useRef(null)

  return (
    <>
    <div className='justify-center items-center flex m-0 w-full'>
      <div className='overflow-hidden'>
           <video autoPlay loop muted className=''>
              <source src='Project3.mp4' type="video/mp4" className='w-full'/>
           </video>
      </div>
      <div>
    
      </div>
    </div>
    </>
  )
}

}
