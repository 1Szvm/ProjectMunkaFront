import React, { useContext, useEffect, useState } from 'react';
import { readAuthorization, readCategories, readRaces } from '../utility/crudUtility';
import { Footer } from '../components/Footer';
import { UserContext } from '../context/UserContext';
import AddNew from '../components/AddNew';
import Details from '../components/Details';

export const Futamok = () => {
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState([]); // Changed from null to []
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [detailsId, setDetailsId] = useState(null);
  const [races, setRaces] = useState([]); // Changed from null to []
  const today = new Date();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    readCategories(setCategories);
    readRaces(setRaces);
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleDetails = (id) => {
    setDetailsId(id);
    setShowDetails(true);
    document.getElementById("details").showModal(); // Ensure the modal opens
  };

  const selectedRace = races.find((race) => race?.id === detailsId);

  return (
    <div className="home">
      <div className='min-h-screen'>
        <h1 className='text-3xl m-3 text-center font-bold w-100'>Futamok</h1>

        {/* Category Selector */}
        <div className="btn-group pb-4 text-center flex justify-center" role="group" aria-label="Category selection">
          {categories.map((category) => (
            <div key={category?.id} className="p-1">
              <label 
                className={`btn ${selectedCategory === category?.id ? 'btn-outline ' : ''}`}
                style={{ color: category?.color, opacity: "0.8" }}
                onClick={() => handleCategoryClick(category?.id)}
              >
                {category?.nev}
              </label>
            </div>
          ))}
        </div>

        {/* Filter and Display Races */}
        <div className='flex justify-center'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1'>
            {races
              .filter((race) => !selectedCategory || race?.kategoria === selectedCategory)
              .map((race) => {
                const raceDate = new Date(
                  race?.idopont.seconds * 1000 + race?.idopont.nanoseconds / 1000000
                );
                const daysDiff = Math.ceil((raceDate - today) / (1000 * 60 * 60 * 24));

                const category = categories.find(cat => cat.id === race?.kategoria);
                if (!category) return null;

                return (
                  <div className="card m-5 w-[390px] shadow-xl bg-neutral-100" key={race?.id}>
                    <figure className='relative'>
                      <img src={race?.imageUrl} alt={race?.palya} className='transition-opacity duration-300 hover:opacity-0 rounded-xl' />
                      <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-60 rounded-xl' 
                        style={{ backgroundColor: category?.color }}>
                        <h2 className="text-4xl font-bold text-center text-white transition-transform duration-300 transform">
                          {race?.palya}
                        </h2>
                      </div>
                    </figure>
                    <div className="m-2 flex justify-between">
                      <div className="rounded-lg p-2 text-sm text-white text-center max-w-fit" 
                        style={{ backgroundColor: category?.color }}>
                        {category?.nev}
                      </div>
                      <div className='rounded-lg p-2 text-sm text-white text-center max-w-fit' style={{ backgroundColor: category?.color }}>
                        {daysDiff} nap múlva
                      </div>
                    </div>
                    <div 
                      className='p-2 btn text-white text-xl text-center max-w-full m-2 rounded-lg'
                      style={{ backgroundColor: category?.color }} 
                      onClick={() => handleDetails(race?.id)}
                    >
                      Részletek
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
        <AddNew/>
        <Details selectedRace={selectedRace} showDetails={showDetails} setShowDetails={setShowDetails}/>
      </div>
    </div>
  );
};
