import React, { useContext } from 'react';
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Toastify from '../components/Toastify';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import './Home.css'
import { DarkModeContext } from '../components/DarkModeContext';
export const Auth = () => {
  const { user, signInUser, signUpUser, msg, setMsg } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isSignIn = location.pathname === '/auth/in';
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isSignIn) {
      signInUser(data.get('email'), data.get('password'));
    } else {
      signUpUser(data.get('email'), data.get('password'), data.get('displayName'));
    }
  };

  return (
    <div className="home m-4">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}

      >
        <div className="flex items-center justify-center  pt-48 ">
          <motion.div
            initial={{ opacity: 0.2, y: -10 }}
            className="w-full max-w-md bg-neutral-950 rounded-lg shadow-lg p-6 text-indigo-500 border-2 border-indigo-600"
            transition={{ duration: 0.6 }}
            animate={{
              background: darkMode ? "#1F1F1F" : "#F0F5F5",
              color: darkMode ? "#ffffff" : "#222222",
              opacity: 1, y: 0
            }}

          >
            <h3 className="text-2xl font-semibold text-center mb-6">
              {isSignIn ? 'Bejelentkezés' : 'Regisztráció'}
            </h3>
            <Form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (

                <div className="flex flex-col">
                  <label htmlFor="displayName" className="text-indigo-500 mb-1 text-sm font-medium ">
                    Felhasználónév
                  </label>
                  <input
                    id="displayName"
                    name="displayName"
                    placeholder='felhasználónév'
                    type="text"
                    className="px-3 py-2 border text-slate-50 border-gray-700 bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                  />
                </div>

              )}
              <div className="flex flex-col">
                <label htmlFor="email" className=" mb-1 text-sm font-medium text-indigo-500">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  className="px-3 py-2 border text-slate-50  border-gray-700 bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 text-sm font-medium text-indigo-500">
                  Jelszó
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="jelszó"
                  className="px-3 py-2 borde text-slate-50  border-gray-700 bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
              >
                Küldés
              </button>
            </Form>
            <Link
              to="#"
              onClick={() => navigate('/pwreset')}
              className="block mt-4 text-sm text-center text-indigo-400 hover:underline"
            >
              Elfelejtett jelszó...
            </Link>
            {/* <Toastify {...msg} /> */}
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>

  );
};
