import React from 'react';
import { Footer } from '../components/Footer';

const Forum = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 text-gray-900">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center">Forum</h1>
        <p className="text-center text-gray-600 mt-2">Welcome to the discussion!</p>
      </div>
      <Footer />
    </div>
  );
};

export default Forum;
