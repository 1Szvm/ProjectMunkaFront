import React, { useContext, useEffect, useState } from 'react';
import { readAuthorization, readCategories, readRaces } from '../utility/crudUtility';
import { Footer } from '../components/Footer';
import { UserContext } from '../context/UserContext';

export const Futamok = () => {
  const { user } = useContext(UserContext);
  const [admins, setAdmins] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Single selection
  const [races, setRaces] = useState(null);
  const today = new Date();

  useEffect(() => {
    readCategories(setCategories);
    readRaces(setRaces);
    readAuthorization(setAdmins);
  }, []);

  // Toggle selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId)); // Deselect if clicked again
  };
  
  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(!add);    
  };

  return (
    <div className="home">
      <div className='min-h-screen'>
        <h1 className='text-3xl m-3 text-center font-bold w-100'>Futamok</h1>

        {/* Category Selector */}
        <div className="btn-group pb-4 text-center flex justify-center" role="group" aria-label="Category selection">
          {categories && categories.map((category) => (
            <div key={category.id} className="p-1">
              <label 
                className={`btn ${selectedCategory === category.id ? 'btn-outline ' : ''}`}
                style={{ color: category.color, opacity: "0.8" }}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.nev}
              </label>
            </div>
          ))}
        </div>

        {/* Filter and Display Races */}
        <div className='grid grid-cols-4 gap-4'>
          {races && races
            .filter((race) => !selectedCategory || race.kategoria === selectedCategory) // Show only selected category races
            .map((race) => {
              const racedate = new Date(
                race.idopont.seconds * 1000 + race.idopont.nanoseconds / 1000000
              )
              const daysDiff = Math.ceil((racedate - today) / (1000 * 60 * 60 * 24));
              
              const category = categories?.find(cat => cat.id === race.kategoria);
              if (!category) return null;

              return (
                <div className="card  m-5 w-[390px] shadow-xl" key={race.id}>
                  <figure className='relative'>
                    <img src={race.imageUrl} alt={race.palya} className='transition-opacity duration-300 hover:opacity-0' />
                    <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-60' 
                      style={{ backgroundColor: category.color }}>
                      <h2 className="text-4xl font-bold text-center text-white transition-transform duration-300 transform">
                        {race.palya}
                      </h2>
                    </div>
                  </figure>
                  <div className="m-2 flex justify-between">
                    <div className="rounded-lg p-2 text-sm text-white text-center max-w-fit" 
                      style={{ backgroundColor: category.color }}>
                      {category.nev}
                    </div>
                    <div className='rounded-lg p-2 text-sm text-white text-center max-w-fit' style={{backgroundColor:category.color}}>{daysDiff} nap mulva</div>
                  </div>
                  <div className='p-2 btn text-white text-xl text-center max-w-full m-2 rounded-lg' style={{backgroundColor:category.color}} >Részletek</div>
                </div>
              );
            })
          }
        </div>

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
        <Footer />
      </div>
    </div>
  );
};