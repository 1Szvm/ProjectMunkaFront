import React, {useEffect, useState } from 'react';
import { readCategories } from '../utility/crudUtility';

export const Futamok = () => {
  const [categories,setCategories]=useState(null)
  useEffect(()=>{
    readCategories(setCategories)
  },[])
  
  return (
    <>
      <h1 className='text-3xl m-3 text-center font-bold w-100'>Futamok</h1>
      <div className="btn-group pb-4 text-center flex justify-center" role="group" aria-label="Category selection">
        {categories && categories.map((category) => (
          <div key={category.id} className="p-1">
            <label className="btn btn-outline" htmlFor={category.name}>
              {category.nev}
            </label>
          </div>
        ))}
      </div>
    </>
  )
}
