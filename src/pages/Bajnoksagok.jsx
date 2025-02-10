import React from 'react';
import { Footer } from '../components/Footer';



 const Bajnoksagok = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r text-gray-800">
      <header className="w-full py-5 shadow-md bg-white flex justify-center">
        <h1 className="text-3xl font-bold tracking-wide">🏆 Bajnokságok</h1>
      </header>
      <div className="flex-grow flex items-center justify-center">
        <p className="text-lg text-gray-600 italic">Hamarosan elérhető...</p>
      </div>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};
export default Bajnoksagok