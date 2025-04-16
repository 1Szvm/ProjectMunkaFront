import React, { useContext, useEffect, useState } from 'react';
import { deleteFutam, readAuthorization, readCategories, readRaces } from '../utility/crudUtility';
import AddNew from '../components/AddEditRace';
import Details from '../components/Details';
import Alerts from '../components/Alerts';

import { Footer } from '../components/Footer';
import { deletePhoto } from '../utility/backendHandling';
import { motion } from "framer-motion";
import { UserContext } from '../context/UserContext';

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
    const { confirmed }=await confirm({
      description: String("Ez egy visszavonhatatlan művelet"),
      confirmationText:"Igen",
      cancellationText:"Mégsem",
      title:"Biztos ki szeretnéd törölni a futamot?"
    })
    if(confirmed){
      try {
        deleteFutam(race.id)
        deletePhoto(race.imageUrl.id)
        setText("Sikeres törlés")        
      } catch (error) {
        console.log("mégsem:",error);
      }
    }
  }

  return (
    <div className="home">
      <div className='min-h-screen'>
        <h1 className='text-3xl m-2 text-center font-bold w-100'>Futamok</h1>
        <div className="pb-5 text-center grid grid-cols-1 gap-3 sm:flex sm:justify-center sm:items-center" role="group" aria-label="Category selection">
        {categories.map((category) => (
          <div key={category?.id} className="w-full sm:w-auto transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            <button
              type="button"
              className={`w-full sm:w-auto px-4 py-3 rounded-xl text-m font-[600]  transition-all duration-300 ease-in-out
                ${selectedCategory === category?.id
                  ? 'bg-gradient-to-r from-zinc-500 to-slate-300 text-slate-800 shadow-xl scale-105'
                  : 'bg-white text-gray-800 border border-zinc-800  hover:bg-gradient-to-r hover:from-zinc-500 hover:to-slate-300 '
                }`}
              style={{
                color: selectedCategory !== category?.id ? category?.color : undefined,
                transition: 'color 0.3s ease, transform 0.3s ease',
              }}
              onClick={() => handleCategoryClick(category?.id)}
            >
              {category?.nev}
            </button>
          </div>
        ))}
      </div>


        <div className='flex justify-center '>
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
                  <motion.div
                  className="card m-1 p-1 max-w-[375px] bg-slate-100 shadow-xl transition-all duration-300 transform"
                  style={{
                    border: "2px solid",
                    borderColor: category?.color,
                    boxShadow: `0px 4px 15px ${category?.color || "rgba(0,0,0,0.2)"}`
                  }}
                  key={race?.id}
                  initial={{
                    scale: 0.9,
                    opacity: 0,
                    y: 100,
                  }}
                  animate={{
                    scale: 0.98,
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: 0.2,
                  }}
                  whileHover={{
                    scale: 1,
                    boxShadow: `0px 10px 25px ${category?.color || "rgba(0,0,0,0.3)"}`,
                    borderColor: "white", 
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      duration: 0.4,
                    },
                  }}
                  whileTap={{
                    scale: 0.95,
                    boxShadow: `0px 4px 20px ${category?.color || "rgba(0,0,0,0.5)"}`,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                      duration: 0.2,
                    },
                  }}
                  onHoverStart={() => {
                    document.body.style.cursor = "pointer";
                  }}
                  onHoverEnd={() => {
                    document.body.style.cursor = "default";
                  }}
                >
                    <figure className='relative'>
                      <img
                        src={race?.imageUrl.url}
                        alt={race?.palya}
                        className="transition-opacity duration-300 hover:opacity-0 rounded-xl w-full h-[215px] object-cover"
                        loading="lazy"
                      />


                      <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-60 rounded-xl' 
                        style={{ backgroundColor: category?.color }}>
                        <h2 className="text-4xl font-bold text-center text-white transition-transform duration-300 transform">
                          {race?.palya}
                        </h2>
                      </div>
                    </figure>
                    <div className="m-2 flex  justify-between">
                      <div className="rounded-lg p-2 text-sm text-white text-center max-w-fit" 
                        style={{ backgroundColor: category?.color }}>
                        {category?.nev}
                      </div>
                      <div className='rounded-lg p-2 text-sm text-white text-center max-w-fit' style={{ backgroundColor: category?.color }}>
                        {daysDiff<1?"A verseny már megtörtént":`${daysDiff} nap múlva`}
                      </div>
                    </div>
                    <motion.div
                    initial={{ scale: 0.85, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 btn text-white text-xl text-center max-w-full m-2 rounded-lg cursor-pointer"
                    style={{ backgroundColor: category?.color }}
                    onClick={() => handleDetails(race?.id)}
                  >
                    Részletek
                  </motion.div>


                    {admins?.includes(user?.uid) && (
                      <div className='absolute top-0  right-0 m-2'>
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} role="button" aria-label="Admin menu" className="btn m-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content  menu bg-slate-50 rounded-lg shadow-md w-fit p-2 text-gray-800"
                          >
                            <li>
                              <button
                                onClick={() => setAddEdit(race)}
                                className="block  px-4 py-2 w-full text-left hover:bg-gray-100 rounded-md transition"
                              >
                                Szerkesztés
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDelete(race)}
                                className="block px-4 py-2 w-full text-left hover:bg-red-100 text-red-600 rounded-md transition"
                              >
                                Törlés
                              </button>
                            </li>
                          </ul>

                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })
            }
          </div>
        </div>
        <AddNew addEdit={addEdit} setAddEdit={setAddEdit}/>
        <Details selectedRace={selectedRace} showDetails={showDetails} setShowDetails={setShowDetails}/>
        {txt&&<Alerts txt={txt}/>}
        <p className="h-[80px]"> </p>
          <Footer />
      </div>
    </div>
  );
};
