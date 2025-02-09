import React, {useEffect, useState } from 'react';
import { readCategories, readRaces } from '../utility/crudUtility';
import { Footer } from '../components/Footer';

export const Futamok = () => {
  const [categories,setCategories]=useState(null)
  useEffect(()=>{
    readCategories(setCategories)
  },[])

  const [races,setRaces]=useState(null)
  useEffect(()=>{
    readRaces(setRaces)
  },[])
  const today=new Date().toLocaleDateString("de-DE").split(".");
  let racedate

  return (
    <div className="home" >
      <div className='min-h-screen'>
        <h1 className='text-3xl m-3 text-center font-bold w-100'>Futamok</h1>
        <div className="btn-group pb-4 text-center flex justify-center" role="group" aria-label="Category selection">
          {categories && categories.map((category) => (
            <div key={category.id} className="p-1">
              <label className={`btn btn-outline`} style={{color:`${category.color}`, opacity:"0.8"}} htmlFor={category.name}>
                {category.nev}
              </label>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {races && races.map((races) => (
            categories && categories.map((category) => (
              racedate =new Date(races.idopont.seconds * 1000 + races.idopont.nanoseconds / 1000000,).toLocaleDateString("de-DE").split("."),
              category.id===races.kategoria?
                <div className="card bg-slate-400 m-5 w-[390px] shadow-xl" key={races.id}>
                  <figure className='relative'>
                    <img
                      src={races.imageUrl}  alt={races.palya} className='transition-opacity duration-300 hover:opacity-0' />
                    <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-60' style={{backgroundColor:`${category.color}`}}>
                      <h2 className="text-4xl font-bold text-center transition-transform duration-300 transform">
                        {races.palya}
                      </h2>
                    </div>
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="card-title rounded-lg p-2 text-sm text-center max-w-fit " style={{backgroundColor:`${category.color}`}}>
                      {category.nev}
                    </h2>
                    {}
                    {today[2]!=racedate[2]?<p className="text-center text-lg font-bold">&gt; 1 év</p>:today[0]!=racedate[0]?<p className="text-center text-lg font-bold">{racedate[0]-today[0]} hónap múlva</p>:today[1]!=racedate[1]?<p className="text-center text-lg font-bold">{racedate[1]-today[1]} nap múlva</p>:<p>Ma</p>}
                  </div>
                </div>
                :
                null
            ))
            ))}
        </div>
        <Footer/>
        </div>
        </div>
        
);
}
