import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "./ProfileMenu";
import { UserContext } from "../context/userContext";

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
        ? "linear-gradient(to right, #1f2937,rgb(13, 9, 26))" // Dark mode gradient
        : "linear-gradient(to right, #f3f4f6, #d1d5db)", // Light mode gradient
    }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >

      {matches ? ( // Desktop View

        <div className={`${darkMode ? 'bg-gradient-to-r from-violet-800 to-violet-900 delay-75 ' : ' bg-gradient-to-r delay-75 from-blue-500 to-rose-500  text-fuchsia-50' }
          transition-colors duration-300 ease-in-out flex items-center justify-center w-full pb-1`}>
             <motion.button
                onClick={toggleDarkMode}
                className="absolute left-8 p-[11px] rounded-full bg-gray-600 text-white transition-all duration-300 transform hover:scale-125"
              >
                {darkMode ? '🌙' : '🌞'}
              </motion.button>
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
                whileHover={{ scale: 1.1}}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'} // Redirect on click (if needed)
              >
                <motion.img
                  src="hsrtlogov1.jpg"
                  alt="Logo"
                  className="rounded-xl h-[5vh] w-[5vh] transition-all duration-300 ease-in-out"
                />
                <span className="text-xl font-bold transition-all transform hover:scale-110 hover:text-amber-500">
                  HSRT
                </span>
              </motion.button>
              {/* <ProfileMenu/> */}
            </div>


            <div className="navbar-end flex items-center gap-2">
              {/* Dark Mode Toggle Button */}
             

              {user ? (
                <div className="flex justify-end items-center space-x-2">
                  <ProfileMenu/>
             
                </div>
              ) : (
                <>
                  <NavLink
                    className=" btn btn-ghost bg-blue-500 p-1 hover:bg-sky-600 text-l text-white ml-1"
                    to="/auth/in"
                  >
                    Bejelentkezés
                  </NavLink>
                  <NavLink
                    className="btn btn-ghost bg-green-600 p-1 hover:bg-emerald-700 text-l text-white mr-6"
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
      <div className="navbar-center flex items-center space-x-4 p-2">
        <motion.img
          src="hsrtlogov1.jpg"
          alt="Logo"
          className="rounded-xl h-[5vh] w-[5vh] transition-all duration-300 ease-in-out transform hover:scale-110"
          whileHover={{ scale: 1.1, rotate: 10 }}
        />
        <NavLink className="btn btn-ghost text-xl font-bold transition-all transform hover:scale-110">HSRT</NavLink>
      </div>

      {/* Navigation Links */}
      {navLinks}

      {/* Conditional User Links */}
      {user ? (
        <div className="rounded-lg shadow-md flex flex-col p-2">
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
    </motion.div>
  );
};
