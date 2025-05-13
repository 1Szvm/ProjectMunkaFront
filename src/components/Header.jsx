import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";


import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "./ProfileMenu";
import { readAuthorization } from "../utility/crudUtility";
import { UserContext } from "../context/UserContexta";
import { DarkModeContext } from "./DarkModeContext";
import Toastify from "./Toastify";

export const Header = () => {
  const { user, logoutUser, msg } = useContext(UserContext);
  const [admins,setAdmins]=useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);
  const { darkMode, setDarkMode } = useContext(DarkModeContext); // ✅ Access BOTH darkMode and setDarkMode here

  const [isHovered, setIsHovered] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    readAuthorization(setAdmins);
  },[])

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
      <NavLink className="btn btn-ghost text-xl  hover:text-orange-400 transition-all transform hover:scale-110" to="/futamok">Futamok</NavLink>
      <NavLink className="btn btn-ghost text-xl  hover:text-orange-400 transition-all transform hover:scale-110" to="/bajnoksagok">Bajnokságok</NavLink>
      <NavLink className="btn btn-ghost text-xl  hover:text-orange-400 transition-all transform hover:scale-110" to="/forum">Forum</NavLink>
    </>

  );

  return (
    <motion.div
    className={`min-h-screen transition-colors duration-300 ease-in-out ${
      darkMode
        ? "bg-gradient-to-r from-zinc-800 to-black text-white"
        : "bg-gradient-to-r from-zinc-100 to-gray-300 text-gray-800"
    }`}
    animate={{
      background: darkMode
        ? "linear-gradient(to right, #150c38, #03040e)" // Dark mode gradient
        : "linear-gradient(to right, #f3f4f6, #d1d5db)", // Light mode gradient
    }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    
  >

      {matches ? ( // Desktop View

        <div className={`${darkMode ? 'bg-gradient-to-r from-violet-800 to-violet-900 delay-75 ' : ' bg-gradient-to-r delay-75 from-blue-500 to-rose-500  text-fuchsia-50' }
          transition-colors duration-300 ease-in-out flex items-center justify-center w-full pb-1`}>
             <motion.button
                onClick={toggleDarkMode}
                className="absolute left-3 p-[11px] rounded-full bg-zinc-700 border-2 border-emerald-400 text-white transition-all duration-300 transform hover:scale-125"
              >
                {darkMode ? '🌙' : '🌞'}
              </motion.button>
          <motion.div
            className="navbar px-4 md:px-4 w-full  max-w-screen-2xl mx-auto flex items-center justify-between"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="pl-8 navbar-start flex items-center gap-1">{navLinks}</div>
          {/* backtohome */}
          <div className="navbar-center flex items-center justify-center p-1 ">
          <NavLink
            className="btn btn-ghost text-2xl font-bold transition-all duration-500 transform flex items-center gap-2 rounded-2xl "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.img
              src="https://res.cloudinary.com/myblogki2024/image/upload/v1744280378/hsrtlogov1_atp0hq.jpg"
              alt="Logo"
              className="rounded-xl h-[5vh] w-[5vh] transition-all duration-500 ease-in-out transform hover:scale-110"
            />
            
            <AnimatePresence mode="wait">
              <motion.span
                key={isHovered ? "home" : "hun-srt"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="tracking-widest text-[18px]"
              >
                {isHovered ? "Home" : "HUN-SRT"}
              </motion.span>
            </AnimatePresence>
          </NavLink>
        </div>

            <div className="navbar-end flex items-center gap-2">

             

              {user ? (
                <div className="flex justify-end items-center">
                  <ProfileMenu/>
                </div>
              ) : (
                <>
                <NavLink
                  className="btn btn-ghost bg-blue-500 max-w-[95px] px-4 py-2 text-[16px]  md:text-sm hover:bg-sky-600 text-white"
                  to="/auth/in"
                >
                  Bejelentkezés
                </NavLink>
                <NavLink
                  className="btn btn-ghost bg-green-600 max-w-[95px] px-4 py-2 text-sm sm:text-base hover:bg-emerald-700 text-white"
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
        <div className="relative text-neutral-900 p-1 mr-2">
        {/* Dark Mode Toggle Button */}
        <motion.button
          onClick={toggleDarkMode}
          className="absolute top-3 left-3 p-2 rounded-full bg-gray-600 text-white transition-transform duration-500 transform hover:scale-125"
          whileHover={{ scale: 1.2 }}
        >
          {darkMode ? '🌙' : '🌞'}
        </motion.button>
     
        {/* Mobile Menu Toggle Button */}
        <div className="flex justify-end pb-2 pt-1 text-orange-600">
          <motion.button
            className="md:hidden btn btn-ghost text-xl"
            onClick={toggleMobileMenu}
            onBlur={() => setIsMobileMenuOpen(false)}
            whileHover={{ scale: 1.1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
            </svg>
          </motion.button>
        </div>
     
        {/* Mobile Menu */}
        <AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
    onClick={toggleMobileMenu}
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-[120%] right-0 mt-2 rounded-lg shadow-lg bg-white w-40 overflow-hidden z-50 border border-gray-300"
    >
      {/* Logo and App Name */}
      <div className="navbar-center flex items-center ">
        <NavLink className="btn btn-ghost text-xl font-bold transition-all transform hover:scale-110"><motion.img
          src="https://res.cloudinary.com/myblogki2024/image/upload/v1744280378/hsrtlogov1_atp0hq.jpg"
          alt="Logo"
          className="rounded-xl h-[4vh] w-[4vh] transition-all duration-300 ease-in-out transform hover:scale-110"
          whileHover={{ scale: 1.1, rotate: 10 }}
        />Home</NavLink>
      </div>

      {/* Navigation Links */}
      {navLinks}

      {/* Conditional User Links */}
      {user ? (
        <div className="rounded-lg shadow-md flex flex-col p-2">
          {admins?.includes(user?.uid)?(
            <NavLink
              className="m-1 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 hover:opacity-90 text-center shadow-md hover:shadow-lg"
              to="/admin"
            >
              Admin Page
            </NavLink>
          ):null}
          <NavLink
            className="m-1 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 hover:opacity-90 text-center shadow-md hover:shadow-lg"
            to="/profile"
          >
            Profil
          </NavLink>
          <NavLink
            className="m-1 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 hover:opacity-90 text-center shadow-md hover:shadow-lg"
            to="/"
            onClick={logoutUser}
          >
            Kijelentkezés
          </NavLink>
        </div>
      ) : (
        <div className="rounded-lg shadow-md flex flex-col p-2">
          <NavLink
            className="m-1 px-4 py-3 text-lg font-medium text-white bg-gradient-to-r from-amber-600 to-yellow-500 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:opacity-90 hover:from-amber-700 hover:to-yellow-400 text-center shadow-md hover:shadow-lg"
            to="/auth/in"
          >
            Bejelentkezés
          </NavLink>
          <NavLink
            className="m-1 px-4 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:opacity-90 hover:from-blue-900 hover:to-blue-500 text-center shadow-md hover:shadow-lg"
            to="/auth/up"
          >
            Regisztráció
          </NavLink>
        </div>
      )}
    </motion.div>
  )}
</AnimatePresence>

      </div>
     
      )}
      <Outlet />
      <Toastify {...msg} />
    </motion.div>
  );
};
