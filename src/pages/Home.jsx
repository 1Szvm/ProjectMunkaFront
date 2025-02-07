import React, { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import './Home.css'
import { AboutUs } from '../components/AboutUs';
export const Home = () => {
  
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1168px)").matches
  );
  window.onresize = function(event)
{
document.location.reload(true);
}

  // Update match state when the screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1168px)");
    const handleMediaQueryChange = (e) => setMatches(e.matches);

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
  
  return (
    
    <div className='home'>
      {matches ? (
        <div className='justify-center items-center flex m-0 w-full'>
          <div className='overflow-hidden'>
            <video autoPlay loop muted className=''>
              <source src='Project3.mp4' type='video/mp4' className='w-full'/>
            </video>
          </div>
          <div></div>
        </div>
      ) : (
        <div className='justify-center items-center flex m-0 w-full'>
          <div className='overflow-hidden'>
            <video autoPlay loop muted className=''>
              <source src='IAMBACK.mp4' type='video/mp4' className='w-full h-full'/>
            </video>
          </div>
          <div></div>
        </div>
      )}
      <AboutUs/>
      <Footer/>
      <p className='h-[130px]'></p>
    </div>
  );
};
