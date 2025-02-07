import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Footer } from "./Footer";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaQueryChange = (e) => setMatches(e.matches);

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const navLinks = (
    <>
      <NavLink className="btn btn-ghost text-xl" to="/futamok">Futamok</NavLink>
      <NavLink className="btn btn-ghost text-xl" to="/bajnoksagok">Bajnokságok</NavLink>
      <NavLink className="btn btn-ghost text-xl" to="/forum">Forum</NavLink>
    </>
  );

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-white' : 'bg-gradient-to-r from-neutral-100 text-gray-900'} 
    min-h-screen transition-colors duration-500 ease-in-out`}>
      {matches ? ( // Desktop View
      
        <div className={`${darkMode ? 'bg-rose-600' : 'bg-green-600'} 
        transition-colors duration-500 ease-in-out flex items-center justify-center w-full`}
          
      >
            <button
          onClick={toggleDarkMode}
          className="absolute top-[10px] right-5 p-3 rounded-full bg-gray-700 text-white transition-transform duration-300 transform hover:scale-100 md:top-[10px] lg:top-[15px]"
        >
          {darkMode ? '🌙' : '🌞'}
        </button>
          <div className="navbar px-4 md:px-8 w-full max-w-screen-xl mx-auto flex items-center justify-between">
            <div className="navbar-start flex items-center gap-4">{navLinks}</div>
            <div className="navbar-center flex items-center justify-center">
              <img src="logo.jpg" alt="Logo" className="h-[5vh] w-[5vh]" />
              <NavLink className="btn btn-ghost text-xl">HSRT</NavLink>
            </div>

            <div className="navbar-end flex items-center gap-2">
              {user ? (
                <div className="relative">
                  
                  <button onClick={toggleUserDropdown} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </div>
                  </button>
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 bg-stone-900 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                      >
                        <li>
                          <NavLink className="btn btn-ghost bg-green-600 text-lg hover:bg-green-700" to="/profile">
                            Profil
                          </NavLink>
                        </li>
                        <li>
                          <button className="btn bg-red-800 mt-2 hover:bg-red-700 text-slate-100" onClick={logoutUser}>
                            Kijelentkezés
                          </button>
                        </li>
                      </motion.ul>
                    )}
                    
                  </AnimatePresence>
                  
                </div>
              ) : (
                <>
                  <NavLink className="btn btn-ghost bg-indigo-800 hover:bg-indigo-700 text-xl text-yellow-400" to="/auth/in">
                    Bejelentkezés
                  </NavLink>
                  <NavLink className="btn btn-ghost bg-violet-900 hover:bg-violet-900 text-xl text-yellow-400" to="/auth/up">
                    Regisztráció
                  </NavLink>
                  
                </>
              )}
            </div>
          </div>
        </div>
      ) : ( // Mobile View
        <div>
             <button
          onClick={toggleDarkMode}
          className="absolute top-[10px] right-5 p-3 rounded-full bg-gray-700 text-white transition-transform duration-500 transform hover:scale-100 md:top-[10px] lg:top-[15px]"
        >
          {darkMode ? '🌙' : '🌞'}
        </button>
          <button className="md:hidden btn btn-ghost text-xl" onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
            </svg>
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="md:hidden flex flex-col space-y-4 mt-4 items-center"
              >
                <div className="navbar-center flex items-center space-x-4">
                  <img src="logo.jpg" alt="Logo" className="h-[5vh] w-[5vh]" />
                  <NavLink className="btn btn-ghost text-xl">HSRT</NavLink>
                </div>
                {navLinks}
                {user ? (
                  <NavLink className="btn btn-ghost bg-green-600 text-lg hover:bg-green-700" to="/profile">
                    Profil
                  </NavLink>
                ) : (
                  <>
                    <NavLink className="btn btn-ghost bg-indigo-800 hover:bg-indigo-700 text-xl text-yellow-400" to="/auth/in">
                      Bejelentkezés
                    </NavLink>
                    <NavLink className="btn btn-ghost bg-violet-900 hover:bg-violet-900 text-xl text-yellow-400" to="/auth/up">
                      Regisztráció
                    </NavLink>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <Outlet />
    </div>
  );
};