import React, { useContext, useEffect, useState } from 'react';
import { deleteFutam, readAuthorization, readCategories, readRaces } from '../utility/crudUtility';
import { UserContext } from '../context/UserContext';
import AddNew from '../components/AddNew';
import Details from '../components/Details';
import Alerts from '../components/Alerts';
import { deletePhoto } from '../utility/uploadFile';

export const Futamok = () => {
  const { user } = useContext(UserContext);
  const [admins,setAdmins]=useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [detailsId, setDetailsId] = useState(null);
  const [races, setRaces] = useState([]);
  const today = new Date();
  const [showDetails, setShowDetails] = useState(false);
  const selectedRace = races.find((race) => race?.id === detailsId);
  const [txt,setText]=useState(null)
  const [addEdit,setAddEdit]=useState(false)

  useEffect(() => {
    readCategories(setCategories);
    readAuthorization(setAdmins);
    readRaces(setRaces);
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleDetails = (id) => {
    setDetailsId(id);
    setShowDetails(true);
    document.getElementById("details").showModal();
  };

  const handleDelete= async (race)=>{
    try {
      await confirm({
        description:"Ez egy visszavonhatatlan művelet",
        confirmationText:"Igen",
        cancellationText:"Mégsem",
        title:"Biztos ki szeretnéd törölni a posztot?"
      })
      deleteFutam(race.id)
      deletePhoto(race.imageUrl.id)
      setText("Sikeres törlés")
    } catch (error) {
      console.log("mégsem:",error);
    }
  }

  return (
    <div className="home">
      <div className='min-h-screen'>
        <h1 className='text-3xl m-3 text-center font-bold w-100'>Futamok</h1>
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
                  <div
                    className="card m-2 max-w-[380px] bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    style={{
                      border: "2px solid",
                      borderColor: category?.color,
                      boxShadow: `0px 4px 15px ${category?.color || "rgba(0,0,0,0.2)"}`, 
                    }}
                    key={race?.id}
                  >
                    <figure className='relative'>
                      <img src={race?.imageUrl.url} alt={race?.palya} className='transition-opacity duration-300 hover:opacity-0 rounded-xl w-full object-cover' />
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
                    {admins?.some(admin => admin.Ids.includes(user?.uid)) && (
                      <div className='absolute top-0 right-0 m-2'>
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} role="button" className="btn m-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                          </div>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-fit p-2 shadow">
                            <li onClick={()=>setAddEdit(race)}><a>Szereksztés</a></li>
                            <li onClick={()=>handleDelete(race)} ><a>Törölés</a></li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            }
          </div>
        </div>
        <AddNew addEdit={addEdit} setAddEdit={setAddEdit}/>
        <Details selectedRace={selectedRace} showDetails={showDetails} setShowDetails={setShowDetails}/>
        {txt&&<Alerts txt={txt}/>}
      </div>
    </div>
  );
};
