import React from 'react';

export const Footer = () => {
  return (
    <footer
      style={{
        height: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: '#1d1d1d', // Dark black background
        color: '#fff',
        position: 'fixed', // Make the footer stick to the bottom
        bottom: 0, // Stick to the bottom
        left: 0,
        borderBottom:'#34E4CB solid 1px',
        width: '100%',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)', // Slight shadow for separation
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.5px',
          transition: 'color 0.3s ease',
        }}
        onMouseOver={(e) => e.target.style.color = '#ff7f50'} // Hover effect on text
        onMouseOut={(e) => e.target.style.color = '#fff'}
      >
        &copy; {new Date().getFullYear()} HUN SRT. All rights reserved.
      </p>
    </footer>
  );
};
