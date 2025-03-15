import { useState, useEffect, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { Footer } from '../components/Footer';

const ChampionshipDetails = () => {
  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 1168px)').matches);
  const [showDrivers, setShowDrivers] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [teamLeaderboard, setTeamLeaderboard] = useState([]);
  const [driverStats, setDriverStats] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1168px)');
    const handleResize = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);
 {/* In the future read this from firebase*/}
  useEffect(() => {
    setLeaderboard([
      { name: 'Max Verstappen', points: 100, position: 1, team: 'Red Bull Racing' },
      { name: 'Lewis Hamilton', points: 85, position: 2, team: 'Mercedes' },
      { name: 'Charles Leclerc', points: 70, position: 3, team: 'Ferrari' },
      { name: 'Sergio Perez', points: 60, position: 4, team: 'Red Bull Racing' },
      { name: 'Lando Norris', points: 55, position: 5, team: 'McLaren' },
      { name: 'George Russell', points: 50, position: 6, team: 'Mercedes' },
    ]);
    setTeamLeaderboard([
      { team: 'Red Bull Racing', points: 160 },
      { team: 'Mercedes', points: 135 },
      { team: 'Ferrari', points: 70 },
      { team: 'McLaren', points: 55 },
    ]);
    setDriverStats([
      { name: 'Max Verstappen', racesPlayed: 30, wins: 15, podiums: 20 },
      { name: 'Lewis Hamilton', racesPlayed: 30, wins: 12, podiums: 22 },
      { name: 'Charles Leclerc', racesPlayed: 30, wins: 10, podiums: 18 },
      { name: 'Sergio Perez', racesPlayed: 30, wins: 8, podiums: 16 },
      { name: 'Lando Norris', racesPlayed: 30, wins: 5, podiums: 10 },
      { name: 'George Russell', racesPlayed: 30, wins: 4, podiums: 9 },
    ]);
    setCalendarEvents([
      { date: '2025-03-20', event: 'Australian Grand Prix', time: '10:00 AM' },
      { date: '2025-03-22', event: 'Bahrain Grand Prix', time: '2:00 PM' },
    ]);
  }, []);

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
            {leaderboard.map((driver, index) => (
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
                src="https://i.pinimg.com/236x/3b/88/21/3b882137d4fd9741631ed9741ec7b46b.jpg"
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
            {driverStats.map((driver, index) => (
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
      </motion.div>
    );
  };

  return (
    <div className="championship-container min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <section ref={aboutRef} className={`transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="section-header flex justify-center mx-auto p-4">
             {/* In the future read this from firebase aswell*/}
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
              Formula 1 Bajnokság - Részletes Áttekintés
            </h2>
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
          <div className="calendar bg-slate-700 p-6 rounded-lg shadow-lg mt-6 md:mt-8">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Eseménynaptár</h3>
            <ul className="text-slate-300">
              {calendarEvents.map((event, index) => (
                <motion.li
                  key={index}
                  className="transition-all py-2 px-2 sm:px-4 border-b border-slate-600 hover:bg-slate-600 rounded-md"
                  whileHover={{ scale: 1.05 }}
                >
                  {event.date} - {event.event} at {event.time}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default ChampionshipDetails;
