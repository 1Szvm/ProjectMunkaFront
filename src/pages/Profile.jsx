import React from 'react';
import { Footer } from '../components/Footer';
import { useState } from 'react';

export default function Profile() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return (
    <div
    className={`${darkMode ? 'bg-slate-900 text-white' : 'bg-gradient-to-r from-neutral-100 text-gray-700'} 
                min-h-screen transition-colors duration-500 ease-in-out`}
  >
    <div className="home h-screen">
    <button
          onClick={toggleDarkMode}
          className="absolute top-[10px] right-5 p-3 rounded-full bg-gray-700 text-white transition-transform duration-300 transform hover:scale-100 md:top-[10px] lg:top-[15px]"
        >
          {darkMode ? '🌙' : '🌞'}
        </button>
    <div className="min-h-screen  flex items-center justify-center">
      <div className="bg-neutral-100 p-8 rounded-lg shadow-lg w-80 h-100 max-w-md mb-16">
        <h1 className="text-2xl font-bold mb-6 text-indigo-950">Profile Settings</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <img src="" alt="" />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
            <input type="text" id="name" className="text-slate-950 mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="text-slate-950 mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" className="text-slate-950 mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" id="confirm-password" className="text-slate-950 mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save Changes</button>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
    </div>
  );
}