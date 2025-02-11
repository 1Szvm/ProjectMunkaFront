import React, {useContext, useEffect, useState } from 'react';
import { readAuthorization, readCategories, readRaces } from '../utility/crudUtility';
import { Footer } from '../components/Footer';
import { UserContext } from '../context/UserContext';

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

  const { user } = useContext(UserContext);
  const [admins,setAdmins]=useState(null)
  useEffect(()=>{
    readAuthorization(setAdmins)
  },[])


  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(!add);    
  };

  return (
    <div className="home" >
      <div className='min-h-screen '>
        <div className='bg-slate-700'>
          <h1 className='text-3xl m-3 text-center font-bold w-100 text-white'>Futamok</h1>
          <div className="btn-group pb-4 text-center flex justify-center" role="group" aria-label="Category selection">
            {categories?.map((category) => (
              <div key={category.id} className="px-2 pt-1">
                <label className={`btn btn-outline`} style={{color:`${category.color}`, opacity:"0.8"}} htmlFor={category.name}>
                  {category.nev}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {races?.map((races) => (
            categories?.map((category) => (
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
        {add && admins?.some(admin => admin.Ids.includes(user.uid)) && (
            <div className='transition-transform duration-300'>
              <p>ADD</p>
            </div>
          )}

        {admins?.some(admin => admin.Ids.includes(user.uid)) && (
          <div
          className="fixed bottom-20 right-5 flex justify-center items-center w-16 h-16 rounded-full bg-red-600 shadow-lg cursor-pointer transition-transform duration-300"
          onClick={handleAdd}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-10 transition-transform duration-300 ${
              add ? "rotate-[45deg]" : ""
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          </div>
        )}
        <Footer/>
        </div>
      </div>
        
);
}
