import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "./ProfileMenu";

export const Header = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaQueryChange = (e) => setMatches(e.matches);

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [darkMode]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const navLinks = (
    <>
      <NavLink className="btn btn-ghost text-xl hover:text-orange-400 transition-all transform hover:scale-110" to="/futamok">Futamok</NavLink>
      <NavLink className="btn btn-ghost text-xl hover:text-orange-400 transition-all transform hover:scale-110" to="/bajnoksagok">Bajnokságok</NavLink>
      <NavLink className="btn btn-ghost text-xl hover:text-orange-400 transition-all transform hover:scale-110" to="/forum">Forum</NavLink>
      
    </>

  );

  return (
    <motion.div
    className={`min-h-screen transition-colors duration-300 ease-in-out ${
      darkMode
        ? "bg-gradient-to-r from-gray-800 to-black text-white"
        : "bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800"
    }`}
    animate={{
      background: darkMode
        ? "linear-gradient(to right, #1f2937, #000000)" // Dark mode gradient
        : "linear-gradient(to right, #f3f4f6, #d1d5db)", // Light mode gradient
    }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >

      {matches ? ( // Desktop View
        <div className={`${darkMode ? 'bg-gradient-to-r from-gray-900 to-black' : 'bg-gradient-to-r from-teal-500 to-teal-600'} 
          transition-colors duration-300 ease-in-out flex items-center justify-center w-full pb-1`}>
          <motion.div
            className="navbar px-4 md:px-8 w-full max-w-screen-xl mx-auto flex items-center justify-between"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="pl-10 navbar-start flex items-center gap-4">{navLinks}</div>
            <div className="navbar-center flex items-center justify-center pl-16">
              <motion.button
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1}} // asdssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss csak egy kis fun xd
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'} // Redirect on click (if needed)
              >
                <motion.img
                  src="logo.jpg"
                  alt="Logo"
                  className="h-[5vh] w-[5vh] transition-all duration-300 ease-in-out"
                />
                <span className="text-xl font-bold transition-all transform hover:scale-110 hover:text-amber-500">
                  HSRT
                </span>
              </motion.button>
              {/* <ProfileMenu/> */}
            </div>


            <div className="navbar-end flex items-center gap-2">
              {/* Dark Mode Toggle Button */}
              <motion.button
                onClick={toggleDarkMode}
                className="absolute left-8 p-[11px] rounded-full bg-gray-600 text-white transition-transform duration-300 transform hover:scale-125"
                whileHover={{ scale: 1.2 }}
              >
                {darkMode ? '🌙' : '🌞'}
              </motion.button>

              {user ? (
                <div className="relative">
                  <ProfileMenu/>
                  {/* <motion.button
                    onClick={toggleUserDropdown}
                    className="btn btn-ghost btn-circle avatar"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </div>
                  </motion.button>
                  {/* <ProfileMenu/> */}
                  {/* <AnimatePresence>
                    
                    {isUserDropdownOpen && (
                      <>
                      <ProfileMenu/>
                      <motion.ul
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute right-0 bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow flex flex-col items-center"
                      >
                        <li>
                          <NavLink className="btn btn-ghost bg-orange-600 text-lg hover:bg-orange-700 w-[118px]" to="/profile">
                            Profil
                          </NavLink>
                        </li>
                        <li>
                          <motion.button
                            className="btn bg-red-700 mt-2 hover:bg-red-600 text-slate-100"
                            whileHover={{ scale: 1.1 }}
                            onClick={logoutUser}
                          >
                            Kijelentkezés
                          </motion.button>
                        </li>
                      </motion.ul>
                      </>
                    )}
                  </AnimatePresence> */} 
                </div>
              ) : (
                <>
                  <NavLink
                    className="btn btn-ghost bg-amber-700 p-1 hover:bg-amber-600 text-l text-white ml-1"
                    to="/auth/in"
                  >
                    Bejelentkezés
                  </NavLink>
                  <NavLink
                    className="btn btn-ghost bg-blue-800 p-1 hover:bg-blue-700 text-l text-white mr-6"
                    to="/auth/up"
                  >
                    Regisztráció
                  </NavLink>
                </>
              )}
            </div>
          </motion.div>
        </div>
      ) : ( // Mobile View
        <div>
          <motion.button
            onClick={toggleDarkMode}
            className="absolute top-3 left-3 p-2 rounded-full bg-gray-600 text-white transition-transform duration-500 transform hover:scale-125"
            whileHover={{ scale: 1.2 }}
          >
            {darkMode ? '🌙' : '🌞'}
          </motion.button>
          <div className="flex justify-end pb-2 pt-1">
            <motion.button
              className="md:hidden btn btn-ghost text-xl"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
              </svg>
            </motion.button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="md:hidden flex flex-col space-y-4 mt-4 items-center"
              >
                <div className="navbar-center flex items-center space-x-4">
                  <motion.img
                    src="logo.jpg"
                    alt="Logo"
                    className="h-[5vh] w-[5vh] transition-all duration-300 ease-in-out transform hover:scale-110"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  />
                  <NavLink className="btn btn-ghost text-xl font-bold transition-all transform hover:scale-110">HSRT</NavLink>
                </div>
                {navLinks}
                {user ? (
                  //telefon-bejelenkezes utan
                  <>
                <div className="rounded-lg shadow-md flex flex-col gap-1 w-40 ">
                  <NavLink
                    className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 hover:opacity-90 text-center shadow-md hover:shadow-lg"
                    to="/profile"
                  >
                    Profil
                  </NavLink>
                  <NavLink
                    className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 hover:opacity-90 text-center shadow-md hover:shadow-lg"
                    to="/"
                    onClick={logoutUser}
                  >
                    Kijelentkezés
                  </NavLink>
                </div>

                  </>
                ) : (
                  <>
                  <div className="rounded-lg shadow-md flex flex-col gap-1 w-50">
                    <NavLink
                      className="px-4 py-3 text-lg font-medium text-white bg-gradient-to-r from-amber-600 to-yellow-500 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:opacity-90 hover:from-amber-700 hover:to-yellow-400 text-center shadow-md hover:shadow-lg"
                      to="/auth/in"
                    >
                      Bejelentkezés
                    </NavLink>
                    <NavLink
                      className="px-4 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:opacity-90 hover:from-blue-900 hover:to-blue-500 text-center shadow-md hover:shadow-lg"
                      to="/auth/up"
                    >
                      Regisztráció
                    </NavLink>
                  </div>
                </>
                
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <Outlet />
    </motion.div>
  );
};
