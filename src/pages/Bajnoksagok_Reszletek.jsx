import { useState, useEffect, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { readCategoriesById, readChampionshipsById, updateCategory } from '../utility/crudUtility';
import { set } from 'react-hook-form';
import { uploadFile } from '../utility/backendHandling';

const ChampionshipDetails = () => {
  const {id}=useParams()
  const {categ}=useParams()
  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 1168px)').matches);
  const [showDrivers, setShowDrivers] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [teamLeaderboard, setTeamLeaderboard] = useState([]);
  const [driverStats, setDriverStats] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { triggerOnce: true, threshold: 0.2 });
  const navigate=useNavigate()

  const [category, setCategory] = useState([]);
  const [championship, setChampionship] = useState([]);

  useEffect(() => {
    readCategoriesById(id,setCategory)
    readChampionshipsById(id,setChampionship)
  },[])
  
  const handleDriverClick = (driver) => {
    alert(`Viewing profile for ${driver.name}`);
    setSelectedDriver(driver);
  };


  const renderLeaderboard = () => {
    return (
      <motion.div
        className="leaderboard bg-slate-700 p-6 rounded-lg shadow-lg mt-6 md:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-xl sm:text-lg md:text-xl font-bold text-white mb-4">Pilóta Ranglista</h3>
        {championship[categ]?.driverstats?
          <table className="table-auto w-full text-left text-slate-300 text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="py-2 px-2 sm:px-4">Helyezés</th>
                <th className="py-2 px-2 sm:px-4">Pilóta</th>
                <th className="py-2 px-2 sm:px-4">Csapat</th>
                <th className="py-2 px-2 sm:px-4">Pontszám</th>
              </tr>
            </thead>
            <tbody>
              {championship[categ]?.leaderboard?.map((driver, index) => (
                <motion.tr
                  key={index}
                  className="transition-all py-2 hover:bg-slate-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <td className="py-2 px-2 sm:px-4">{driver.position}</td>
                  <td className="py-2 px-2 sm:px-4">{driver.name}</td>
                  <td className="py-2 px-2 sm:px-4">{driver.team}</td>
                  <td className="py-2 px-2 sm:px-4">{driver.points}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          :
          <div className="text-lg font-bold text-slate-300 mb-4 text-center">Jelenleg nincs ranglista</div>
        }
      </motion.div>
    );
  };

  const renderDriverCards = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        {['Max Verstappen', 'Lewis Hamilton', 'Charles Leclerc', 'Sergio Perez', 'Lando Norris', 'George Russell'].map((driver, index) => (
          <motion.div
            key={index}
            className="competitor-card bg-slate-600 p-6 rounded-lg shadow-lg hover:bg-slate-500 cursor-pointer transition-all duration-300 sm:p-4"
            onClick={() => handleDriverClick({ name: driver })}
            whileHover={{ scale: 1.05 }}
          >
            <motion.section className="flex flex-col items-center">
              <motion.img
                className="w-[120px] h-[160px] sm:w-[150px] sm:h-[200px] object-cover rounded-lg mb-4"
                src="https://i.pinimg.com/736x/20/ec/23/20ec232669cd3286e63e5858b6c9bbb4.jpg"
                alt={driver}
              />
              <motion.h2 className="text-lg sm:text-xl text-white font-semibold">{driver}</motion.h2>
            </motion.section>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const renderDriverStats = () => {
    return (
      
      <motion.div
        className="driver-stats bg-slate-700 p-6 rounded-lg shadow-lg mt-6 md:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">Pilóta Statisztikák</h3>
        {championship[categ]?.driverstats?
          <table className="table-auto w-full text-left text-slate-300 text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="py-2 px-2 sm:px-4">Pilóta</th>
                <th className="py-2 px-2 sm:px-4">Versenyek</th>
                <th className="py-2 px-2 sm:px-4">Győzelmek</th>
                <th className="py-2 px-2 sm:px-4">Pódiumok</th>
              </tr>
            </thead>
            <tbody>
              {championship[categ]?.driverstats?.map((driver, index) => (
                <motion.tr
                  key={index}
                  className="transition-all py-2 hover:bg-slate-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <td className="py-2 px-2 sm:px-4">{driver.name}</td>
                  <td className="py-2 px-2 sm:px-4">{driver.racesPlayed}</td>
                  <td className="py-2 px-2 sm:px-4">{driver.wins}</td>
                  <td className="py-2 px-2 sm:px-4">{driver.podiums}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          :
          <div className="text-lg font-bold text-slate-300 mb-4 text-center">Jelenleg nincsenek statisztikák</div>
        }
      </motion.div>
    );
  };

  return (
    <div className="championship-container min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className='w-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="size-8 mb-5 cursor-pointer opacity-90 hover:opacity-100" 
            onClick={()=>navigate("/bajnoksagok")}
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </div>
        <section ref={aboutRef} className={`transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="section-header flex justify-center mx-auto p-4">
             {/* In the future read this from firebase aswell*/}
            <div>
              <p className="text-3xl sm:text-4xl font-bold ">
                {category.nev} Bajnokság - Részletes Áttekintés
              </p>
              <p className='text-center text-2xl font-bold m-4'>
                {categ}
              </p>
            </div>
          </div>

          {/* Show Drivers Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowDrivers(!showDrivers)}
              className="bg-slate-600 text-white py-2 px-4 sm:py-2 sm:px-6 rounded hover:bg-slate-500 transition-all"
            >
              {showDrivers ? 'Rejtse el a Pilótákat' : 'Mutassa a Pilótákat'}
            </button>
          </div>

          {/* Show Drivers Section */}
          {showDrivers && renderDriverCards()}

          {/* Driver Leaderboard */}
          {renderLeaderboard()}

          {/* Driver Stats */}
          {renderDriverStats()}

          {/* Event Calendar */}
          <div className="calendar  bg-slate-700 p-6 rounded-lg shadow-lg mt-6 md:mt-8">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Eseménynaptár</h3>
            {championship[categ]?.calendarevents?
              <ul className="text-slate-300">
                {championship[categ]?.calendarevents?.map((event, index) => (
                  <motion.li
                    key={index}
                    className="transition-all py-2 px-2 sm:px-4 border-b border-slate-600 hover:bg-slate-600 rounded-md"
                    whileHover={{ scale: 1.05 }}
                  >
                    {event.date} - {event.event} at {event.time}
                  </motion.li>
                ))}
              </ul>
              :
              <div className="text-lg font-bold text-slate-300 mb-4 text-center">Jelenleg nincsenek esmények</div>
            }
          </div>
          <p style={{height:'100px'}}></p>
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default ChampionshipDetails;
