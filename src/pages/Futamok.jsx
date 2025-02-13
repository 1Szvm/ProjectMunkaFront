import React, { useContext, useEffect, useState } from 'react';
import { readAuthorization, readCategories, readRaces } from '../utility/crudUtility';
import { Footer } from '../components/Footer';
import { UserContext } from '../context/UserContext';

export const Futamok = () => {
  const { user } = useContext(UserContext);
  const [admins, setAdmins] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [detailsId, setDetailsId] = useState(null);
  const [races, setRaces] = useState(null);
  const today = new Date();

  useEffect(() => {
    readCategories(setCategories);
    readRaces(setRaces);
    readAuthorization(setAdmins);
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleDetails = (id) => {
    setDetailsId(id);
    document.getElementById('details').showModal();
  };

  const handleAdd=()=>{
    document.getElementById('add').showModal()
  }

  const selectedRace = races?.find((race) => race.id === detailsId);

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
            .filter((race) => !selectedCategory || race.kategoria === selectedCategory)
            .map((race) => {
              const racedate = new Date(
                race.idopont.seconds * 1000 + race.idopont.nanoseconds / 1000000
              );
              const daysDiff = Math.ceil((racedate - today) / (1000 * 60 * 60 * 24));

              const category = categories?.find(cat => cat.id === race.kategoria);
              if (!category) return null;

              return (
                <div className="card m-5 w-[390px] shadow-xl" key={race.id}>
                  <figure className='relative'>
                    <img src={race.imageUrl} alt={race.palya} className='transition-opacity duration-300 hover:opacity-0 rounded-xl' />
                    <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-60 rounded-xl' 
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
                    <div className='rounded-lg p-2 text-sm text-white text-center max-w-fit' style={{backgroundColor: category.color}}>
                      {daysDiff} nap múlva
                    </div>
                  </div>
                  <div 
                    className='p-2 btn text-white text-xl text-center max-w-full m-2 rounded-lg'
                    style={{ backgroundColor: category.color }} 
                    onClick={() => handleDetails(race.id)}
                  >
                    Részletek
                  </div>
                </div>
              );
            })
          }
        </div>

        {admins?.some(admin => admin.Ids.includes(user.uid)) && (
          <div
            className={`fixed bottom-20 right-5 flex justify-center items-center w-16 h-16 rounded-full shadow-lg cursor-pointer transition-transform duration-300 bg-red-600`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-10 text-white transition-transform duration-300 `}
              onClick={handleAdd}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        )}

        <dialog id="add" className="modal">
          <div className="modal-box max-h-screen">
            <h3 className="font-bold text-lg">Verseny létrehozása.</h3>
            <select className="select w-full max-w-xs my-2 border input-bordered">
              <option disabled selected>Válaszd ki a játékot</option>
              {
                categories&&categories.map(obj=>
                  <option key={obj.id} style={{color:obj.color}}>{obj.nev}</option>
                )
              }
            </select>
            <input type="text" placeholder="Pálya neve" className="input input-bordered w-full max-w-xs" />
            <p className='px-1 mt-5'>Pálya kép:</p>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs my-2" />
            <div className="modal-action">
              <div className='btn bg-green-600 text-white hover:bg-green-700'>Létrehozás</div>
              <form method="dialog">
                <button className="btn">Bezárás</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* Details Modal */}
        <dialog id="details" className="modal">
          <div className="modal-box">
            {selectedRace ? (
              <>
                <img src={selectedRace.imageUrl} alt={selectedRace.palya} className='rounded mb-5' />
                <h3 className="font-bold text-xl py-4">{selectedRace.palya}</h3>
                <p className="py-2">
                  Kategória: {categories?.find(cat => cat.id === selectedRace.kategoria)?.nev}
                </p>
                <p className="py-2">Dátum: {new Date(selectedRace.idopont.seconds * 1000).toLocaleDateString()}</p>
                <p className="py-2">Hátralévő idő: {Math.ceil((new Date(selectedRace.idopont.seconds * 1000) - today) / (1000 * 60 * 60 * 24))} nap</p>
              </>
            ) : (
              <p className="py-4">Nincsenek részletek.</p>
            )}
              <div className="modal-action w-full flex justify-between">
                {selectedRace?.jelentkezesek?.includes(user.uid) ? 
                  <button className="btn text-yellow-600 hover:bg-yellow-400 hover:text-slate-950 ">Jeletkezés visszavonás</button>: 
                  <button className="btn text-green-600 hover:bg-green-400 hover:text-slate-950">Jelentkezek</button>}
                <form method="dialog">
                  <button className="btn bg-red-600 txet-white">Bezárás</button>
                </form>
              </div>
          </div>
        </dialog>

        <Footer />
      </div>
    </div>
  );
};