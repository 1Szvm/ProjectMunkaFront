import React, { useContext } from 'react';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Toastify from '../components/Toastify';
import { Footer } from '../components/Footer';
import './Home.css'
export const Auth = () => {
  const { user, signInUser, signUpUser, msg, setMsg } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isSignIn = location.pathname === '/auth/in';

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
    <div className="home">
      <div className="flex items-center justify-center  pt-48">
        <div className="w-full max-w-md bg-neutral-100 rounded-lg shadow-lg p-6 text-blue-500">
          <h3 className="text-2xl font-semibold text-center mb-6">
            {isSignIn ? 'Bejelentkezés' : 'Regisztráció'}
          </h3>
          <Form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <div className="flex flex-col">
                <label htmlFor="displayName" className="mb-1 text-sm font-medium ">
                  Felhasználónév
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  className="px-3 py-2 border border-gray-700 bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
            )}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                className="px-3 py-2 border border-gray-700 bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-400">
                Jelszó
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="px-3 py-2 border border-gray-700 bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
            >
              Küldés
            </button>
          </Form>
          <a
            href="#"
            onClick={() => navigate('/pwreset')}
            className="block mt-4 text-sm text-center text-indigo-400 hover:underline"
          >
            Elfelejtett jelszó...
          </a>
          <Toastify {...msg}  />
          <Footer/>
        </div>
      </div>
      </div>
  );
};
